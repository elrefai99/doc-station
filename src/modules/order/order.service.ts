import { Order } from './../../generated/prisma/index.d';
import prisma from '../../config/prisma';
import { OrderStatus, PaymentProviderType, BookingStatus } from '../../Common/enum';
import ServerError from '../../utils/api.errors.utils';
import { PaymentService } from '../payment/payment.service';
import { PaymentFactory } from '../payment/payment.factory';
import { IVerifyResult } from '../payment/types/payment.types';

interface PlaceOrderInput {
  bookingId: number;
  patientId: number;
  payment_gateway: PaymentProviderType;
}

export class OrderService {
  async placeOrder(orderDetails: PlaceOrderInput): Promise<Order & { message: string }> {
    const { bookingId, patientId } = orderDetails;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        doctor: { select: { id: true, fullname: true, email: true, phone: true } },
        patient: { select: { id: true, fullname: true, email: true, phone: true } },
      },
    });

    if (!booking) throw new ServerError('Booking not found', 404);
    if (!booking.patient) throw new ServerError('Patient information not found', 404);
    if (!booking.doctorId) throw new ServerError('Doctor not found for this booking', 404);
    if (booking.patientId !== patientId) throw new ServerError('Booking does not belong to this patient', 403);

    let order = await prisma.order.create({
      data: {
        patientId: patientId,
        doctorId: booking.doctorId,
        bookingId: booking.id,
        status: OrderStatus.PENDING,
        isBooking: true,
        isProduct: false,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        price: booking.price,
        currencies: 'EGP',
        payment_getway: orderDetails.payment_gateway,
      },
    });

    const paymentService = new PaymentService(PaymentFactory.getProvider(orderDetails.payment_gateway));

    let paymentResponse;

    try {
      paymentResponse = await paymentService.createPayment({
        amount: booking.price,
        currency: 'EGP',
        orderId: 0,
        provider: orderDetails.payment_gateway,
        items: [
          {
            name: `Booking Payment for Booking ID: ${booking.id}`,
            amount: booking.price,
            description: `Payment for booking on ${booking.date} at ${booking.time}`,
            quantity: 1,
          },
        ],
        billingData: {
          firstName: booking.patient.fullname,
          lastName: booking.patient.fullname,
          email: booking.patient.email,
          phoneNumber: booking.patient.phone || undefined,
        },
        special_reference: `${order.id}`,
      });
    } catch (paymentError) {
      throw new ServerError('Payment processing failed. Please try again.', 502);
    }

    if (!paymentResponse.success) {
      throw new ServerError(paymentResponse.message || 'Payment creation failed', 402);
    }

    try {
      order = await prisma.order.update({
        where: { id: order.id },
        data: {
          Trnx_id: paymentResponse.transactionId || '',
          method_payment: paymentResponse.methodPayment || '',
          payment_type: paymentResponse.paymentType || '',
          payment_getway_status: paymentResponse.paymentGatewayStatus || '',
          payment_getway_code: paymentResponse.paymentGatewayCode || '',
          data_message: paymentResponse.dataMessage || '',
          card_number: paymentResponse.cardNumber || '',
        },
        include: {
          booking: true,
          doctor: { select: { id: true, fullname: true, email: true, phone: true } },
          patient: { select: { id: true, fullname: true, email: true, phone: true } },
        },
      });
    } catch (orderError) {
      throw new ServerError(
        'Order creation failed after payment. Transaction ID: ' +
          paymentResponse.transactionId +
          '. Please contact support for refund.',
        500,
      );
    }

    // Step 4: Send notification to doctor and patient about the new order
    // TODO: Implement notification sending

    return { ...order, message: 'Order placed successfully' };
  }

  async updateOrderAfterVerification(verifyResult: IVerifyResult): Promise<void> {
    try {
      console.log('Updating order after payment verification with data:', verifyResult);
      if (!verifyResult.order_id) {
        throw new ServerError('Order ID is missing in the verification result', 400);
      }

      await prisma.order.update({
        where: { id: Number(verifyResult.order_id) },
        data: {
          status: verifyResult.verified
            ? verifyResult.success
              ? OrderStatus.SUCCESS
              : OrderStatus.FAILED
            : OrderStatus.FAILED,
          payment_getway_status: verifyResult.status || 'FAILED',
          data_message: verifyResult.message || '',
          card_number: verifyResult.card_number || '',
          hmac_signature: verifyResult.hmacSignature || '',
        },
      });

      if (verifyResult.success) {
        //Get order to find booking_id if not provided in verifyResult
        const order = await prisma.order.findUnique({
          where: { id: Number(verifyResult.order_id) },
          select: { bookingId: true },
        });

        const bookingId = order?.bookingId;

        if (bookingId) {
          await prisma.booking.update({
            where: { id: bookingId },
            data: {
              status: BookingStatus.ACCEPTED,
            },
          });
        }
      }

      console.log('Updating order with order ID:', verifyResult.order_id);
      return;
    } catch (error) {
      throw new ServerError(error instanceof Error ? error.message : String(error), 500);
    }
  }
}
