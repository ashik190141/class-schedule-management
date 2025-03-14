import { prisma } from "../../../helper/prisma";
import httpStatus from "http-status";

const classBooking = async (classId: string, email: string) => {
  const isClassExist = await prisma.classSchedule.findUnique({
    where: {
      id: classId,
    },
  });

  if (!isClassExist) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `Do not exist the class id:- ${classId}`,
      data: null,
    };
  }

  if (isClassExist.bookingNumber >= 10) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `Already exist 10 trainee of the class:- ${classId}`,
      data: null,
    };
  }

  const conflictingClass = await prisma.booking.findFirst({
    where: {
      traineeEmail: email,
      classSchedule: {
        date: isClassExist.date,
        OR: [
          {
            startTime: { lte: isClassExist.startTime },
            endTime: { gt: isClassExist.startTime },
          },
          {
            startTime: { lt: isClassExist.endTime },
            endTime: { gte: isClassExist.endTime },
          },
          {
            startTime: { gte: isClassExist.startTime },
            endTime: { lte: isClassExist.endTime },
          },
        ],
      },
    },
  });

  if (conflictingClass) {
    return {
      statusCode: httpStatus.CONFLICT,
      success: false,
      message: `Trainee is already booked for another class at this time.`,
      data: null,
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    const bookingData = await tx.booking.create({
      data: { classId, traineeEmail: email },
    });

    await tx.classSchedule.update({
      where: {
        id: classId,
      },
      data: {
        bookingNumber: { increment: 1 },
      },
    });

    return bookingData;
  });

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully booked class ${classId} for trainee ${email}.`,
    data: result,
  };
};

const removeBookings = async (bookingId: string, email: string) => {
  const bookingData = await prisma.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!bookingData) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `Do not exist the booking id:- ${bookingId}`,
      data: null,
    };
  }

  const isClassExist = await prisma.classSchedule.findUnique({
    where: {
      id: bookingData.classId,
    },
  });

  if (!isClassExist) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `Do not exist the class id:- ${bookingData.classId}`,
      data: null,
    };
  }

  const isTraineeExist = await prisma.trainee.findUnique({
    where: {
      email: email,
    },
  });

  if (!isTraineeExist) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `Do not exist trainee email`,
      data: null,
    };
  }

  const result = await prisma.$transaction(async (tx) => {
    const removeClass = await tx.booking.delete({
      where: {
        id: bookingId,
      },
    });

    await tx.classSchedule.update({
      where: {
        id: bookingData.classId,
      },
      data: {
        bookingNumber: { increment: -1 },
      },
    });

    return removeClass;
  });

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully canceled booked class ${bookingData.classId} for trainee ${email}.`,
    data: result,
  };
};

export const bookingServices = {
  classBooking,
  removeBookings,
};
