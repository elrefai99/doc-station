import { Order } from './../../generated/prisma/index.d';
import prisma from '../../config/prisma';
import { OrderStatus } from '../../Common/enum';
import ServerError from '../../utils/api.errors.utils';
import { Booking } from '../../generated/prisma/index.d';
interface PlaceOrderInput {
  bookingId: number;
  patientId: number;
}

export class OrderService {
  async placeOrder(orderDetails: PlaceOrderInput): Promise<Order & { message: string }> {
    try {
      const { bookingId, patientId } = orderDetails;

      // Fetch booking details with doctor and patient information
      const booking: Booking | null = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          doctor: true,
          patient: true,
        },
      });

      console.log('Booking Details:', booking);
      if (!booking) {
        throw new ServerError('Booking not found', 404);
      }

      // Check if booking belongs to the patient
      if (booking.patientId !== patientId) {
        throw new ServerError('Booking does not belong to this patient', 403);
      }

      // Check if order already exists for this booking
      //   const existingOrder = await prisma.order.findFirst({
      //     where: {
      //       bookingId: bookingId,
      //       isBooking: true,
      //     },
      //   });

      //   if (existingOrder) {
      //     return {
      //       ...existingOrder,
      //       message: 'Order already exists for this booking',
      //     };
      //   }

      // Create order for the booking
      const order = await prisma.order.create({
        data: {
          patientId: booking.patientId as number,
          doctorId: booking.doctorId as number,
          bookingId: booking.id,
          status: OrderStatus.PENDING,
          isBooking: true,
          isProduct: false,
          date: booking.date,
          time: booking.time,
          price: booking.price,
          currencies: 'EGP',
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

      const response = await prisma.booking.update({
        where: { id: booking.id },
        data: { orders: { connect: { id: order.id } } },
        include: { orders: true },
      });
      console.log('Updated Booking with Order:', response);
      return {
        ...order,
        message: 'Order placed successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
