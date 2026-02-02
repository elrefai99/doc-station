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
    const { bookingId, patientId } = orderDetails;

    // Fetch booking details with doctor and patient information
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        doctor: {
          select: {
            id: true,
            fullname: true,
            email: true,
            phone: true,
          },
        },
        patient: {
          select: {
            id: true,
            fullname: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!booking) {
      throw new ServerError('Booking not found', 404);
    }

    if (!booking.patient) {
      throw new ServerError('Patient information not found', 404);
    }

    // Check if booking belongs to the patient
    if (booking.patientId !== patientId) {
      throw new ServerError('Booking does not belong to this patient', 403);
    }

    const paymentService = new PaymentService(PaymentFactory.getProvider(orderDetails.payment_getway));

    const paymentResponse = await paymentService.createPayment({
      amount: booking.price,
      currency: 'EGP',
      orderId: 0, // Temporary, will be updated after order creation
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

    // Create order for the booking
    const order = await prisma.order.create({
      data: {
        patientId: patientId,
        doctorId: booking.doctorId as number,
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
        doctor: {
          select: {
            id: true,
            fullname: true,
            email: true,
            phone: true,
          },
        },
        patient: {
          select: {
            id: true,
            fullname: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    // to be continued with sending notifications and emails

    return {
      ...order,
      message: 'Order placed successfully',
    };
  }
}
