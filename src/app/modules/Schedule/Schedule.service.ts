import { Request } from "express";
import { prisma } from "../../../helper/prisma";
import httpStatus from "http-status";
import { calculatePagination } from "../../../helper/calculatePagination";
import { Prisma } from "@prisma/client";

const createClassSchedule = async (req: Request) => {
  const { date, startTime } = req.body;

  const classSchedules = await prisma.classSchedule.findMany({
    where: {
      date: date,
    },
  });

  // console.log(classSchedules);

  if (classSchedules.length >= 5) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `Already create 5 class of ${date}`,
      data: null,
    };
  }

  let splitStartTime = startTime.split(" ")[0].split(":");
  let amOrPm = startTime.split(" ")[1];
  let endHour = parseInt(splitStartTime[0]) + 2;
  let endMin = splitStartTime[1];
  if (endHour >= 12) {
    amOrPm = "PM";
  }
  const endTime = `${
    endHour > 12 ? endHour % 12 : endHour
  }:${endMin} ${amOrPm}`;

  const result = await prisma.classSchedule.create({
    data: { date, startTime, endTime },
  });

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully Create Class Schedule`,
    data: result,
  };
};

const getClassSchedule = async (params: any, options: any) => {
  const { page, limit, skip } = calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ClassScheduleWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: ["date", "startTime"].map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((field) => ({
        [field]: {
          equals: (filterData as any)[field],
        },
      })),
    });
  }

  const whereConditions: Prisma.ClassScheduleWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma?.classSchedule?.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options?.sortBy && options?.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.classSchedule.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const assignTrainer = async (req: Request, classId: string) => {
  const { trainerId } = req.body;

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

  const isTrainerExist = await prisma.trainer.findUnique({
    where: {
      id: trainerId,
    },
    select: { email: true },
  });

  if (!isTrainerExist) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `Do not exist the trainer id:- ${trainerId}`,
      data: null,
    };
  }

  const trainerScheduleConflict = await prisma.classSchedule.findFirst({
    where: {
      trainerEmail: isTrainerExist.email,
      date: isClassExist.date,
      AND: [
        {
          OR: [
            {
              startTime: {
                lte: isClassExist.startTime,
              },
              endTime: {
                gt: isClassExist.startTime,
              },
            },
            {
              startTime: {
                lt: isClassExist.endTime,
              },
              endTime: {
                gte: isClassExist.endTime,
              },
            },
            {
              startTime: {
                gte: isClassExist.startTime,
              },
              endTime: {
                lte: isClassExist.endTime,
              },
            },
          ],
        },
      ],
    },
  });


  if (trainerScheduleConflict) {
    return {
      statusCode: httpStatus.CONFLICT,
      success: false,
      message: `Trainer is already assigned to another class during this time.`,
      data: null,
    };
  }

  const result = await prisma.classSchedule.update({
    where: {
      id: classId,
    },
    data: {
      trainerEmail: isTrainerExist.email,
    },
  });

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully Assign Trainer`,
    data: result,
  };
};

const updateClassSchedule = async (req: Request) => {
  const { classId } = req.params;
  const { date, startTime, trainerId } = req.body;

  const existingClass = await prisma.classSchedule.findUnique({
    where: { id: classId },
  });

  if (!existingClass) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `Do not exist the class id:- ${classId}`,
      data: null,
    };
  }

  const updatedValues: any = {};

  if (date) updatedValues.date = date;
  if (startTime) {
    updatedValues.startTime = startTime;

    let splitStartTime = startTime.split(" ")[0].split(":");
    let amOrPm = startTime.split(" ")[1];
    let endHour = parseInt(splitStartTime[0]) + 2;
    let endMin = splitStartTime[1];
    if (endHour >= 12) {
      amOrPm = "PM";
    }
    const endTime = `${
      endHour > 12 ? endHour % 12 : endHour
    }:${endMin} ${amOrPm}`;
    updatedValues.endTime = endTime;
  }

  if (trainerId) {
    const trainer = await prisma.trainer.findUnique({
      where: { id: trainerId },
      select: { email: true },
    });

    if (!trainer) {
      return {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: `Do not exist the trainer id:- ${trainerId}`,
        data: null,
      };
    }

    const trainerConflict = await prisma.classSchedule.findFirst({
      where: {
        trainerEmail: trainer.email,
        date: updatedValues.date,
        OR: [
          {
            startTime: {
              lte: existingClass.endTime,
            },
            endTime: {
              gte: updatedValues.startTime,
            },
          },
        ],
      },
    });

    if (trainerConflict) {
      return {
        statusCode: httpStatus.CONFLICT,
        success: false,
        message: `Trainer is already assigned to another class during this time.`,
        data: null,
      };
    }

    updatedValues.trainerEmail = trainer.email;
  }

  const updatedClass = await prisma.classSchedule.update({
    where: { id: classId },
    data: updatedValues,
  });

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `Class schedule updated successfully.`,
    data: updatedClass,
  };
};

const deleteClassSchedule = async (classId: string) => {
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

  const result = await prisma.classSchedule.delete({
    where: {
      id: classId,
    },
  });

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `Delete the class successfully`,
    data: result,
  };
};

const getClassScheduleOfTrainer = async (trainerId: string) => {
  const isTrainerExist = await prisma.trainer.findUnique({
    where: {
      id: trainerId,
    },
    select: { email: true },
  });

  if (!isTrainerExist) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `Do not exist the trainer id:- ${trainerId}`,
      data: null,
    };
  }

  const result = await prisma.classSchedule.findMany({
    where: {
      trainerEmail: isTrainerExist.email,
    },
  });

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `Successfully retrieve class schedule of the trainer`,
    data: result,
  };
};

export const scheduleServices = {
  createClassSchedule,
  getClassSchedule,
  assignTrainer,
  updateClassSchedule,
  deleteClassSchedule,
  getClassScheduleOfTrainer,
};
