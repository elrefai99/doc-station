import { Order } from './../../generated/prisma/index.d';
import prisma from '../../config/prisma';
import { OrderStatus, PaymentProviderType } from '../../Common/enum';
import ServerError from '../../utils/api.errors.utils';
import { PaymentService } from '../payment/payment.service';
import { PaymentFactory } from '../payment/payment.factory';

interface PlaceOrderInput {
  bookingId: number;
  patientId: number;
  payment_getway: PaymentProviderType;
}

export class OrderService {
  async placeOrder(orderDetails: PlaceOrderInput): Promise<Order & { message: string }> {
    try {
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

      const paymentService = new PaymentService(PaymentFactory.getProvider(orderDetails.payment_getway));

      const paymentResponse = await paymentService.createPayment({
        amount: booking.price,
        currency: 'EGP',
        orderId: 0,
        provider: orderDetails.payment_getway,
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
      });

      if (!paymentResponse.success) {
        throw new ServerError(paymentResponse.message || 'Payment creation failed', 402);
      }

      const order = await prisma.order.create({
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
          payment_getway: orderDetails.payment_getway,
          Trnx_id: paymentResponse.transactionId || '',
          method_payment: paymentResponse.methodPayment || '',
          payment_type: paymentResponse.paymentType || '',
          payment_getway_status: paymentResponse.paymentGatewayStatus || '',
          payment_getway_code: paymentResponse.paymentGatewayCode || '',
          data_message: paymentResponse.dataMessage || '',
          card_number: paymentResponse.cardNumber || '',
          hmac_signature: paymentResponse.hmacSignature || '',
        },
        include: {
          booking: true,
          doctor: { select: { id: true, fullname: true, email: true, phone: true } },
          patient: { select: { id: true, fullname: true, email: true, phone: true } },
        },
      });

      // tpo: send notification to doctor and patient about the new order

      
      return { ...order, message: 'Order placed successfully' };
    } catch (error) {
      if (error instanceof ServerError) throw error;
      throw new ServerError('Failed to place order', 500);
    }
  }
}
