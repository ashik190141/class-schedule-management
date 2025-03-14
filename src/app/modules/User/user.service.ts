import { Role } from "@prisma/client";
import { Request } from "express";
import { prisma } from "../../../helper/prisma";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { calculatePagination } from "../../../helper/calculatePagination";

const createAdmin = async (req: Request) => {
  const data = req.body;

  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: Role.ADMIN,
  };

  const isExist = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (isExist) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `${userData.email} is already exist`,
      data: null,
    };
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: data.admin,
    });

    return createdAdminData;
  });

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `Admin Created Successfully`,
    data: result,
  };
};

const createTrainee = async (req: Request) => {
  const data = req.body;

  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    email: data.trainee.email,
    password: hashedPassword,
    role: Role.TRAINEE,
  };

  const isExist = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (isExist) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `${userData.email} is already exist`,
      data: null,
    };
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdTraineeData = await transactionClient.trainee.create({
      data: data.trainee,
    });

    return createdTraineeData;
  });

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `Trainee Created Successfully`,
    data: result,
  };
};

const createTrainer = async (req: Request) => {
  const data = req.body;

  const hashedPassword: string = await bcrypt.hash(data.password, 12);

  const userData = {
    email: data.trainer.email,
    password: hashedPassword,
    role: Role.TRAINER,
  };

  const isExist = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (isExist) {
    return {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: `${userData.email} is already exist`,
      data: null,
    };
  }

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdTrainerData = await transactionClient.trainer.create({
      data: data.trainer,
    });

    return createdTrainerData;
  });

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `Trainer Created Successfully`,
    data: result,
  };
};

const removeTrainer = async (trainerId: string) => {
  return await prisma.$transaction(async (transactionClient) => {
    const trainer = await transactionClient.trainer.findUnique({
      where: { id: trainerId },
      select: { email: true },
    });

    if (!trainer) {
      return {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: `Trainer with ID ${trainerId} not found.`,
        data: null,
      };
    }

    await transactionClient.classSchedule.updateMany({
      where: { trainerEmail: trainer.email },
      data: { trainerEmail: null },
    });

    const deletedTrainer = await transactionClient.trainer.delete({
      where: { id: trainerId },
    });

    await transactionClient.user.delete({
      where: { email: trainer.email },
    });

    return {
      statusCode: httpStatus.OK,
      success: true,
      message: `Trainer removed successfully and unassigned from all classes.`,
      data: deletedTrainer,
    };
  });
};

const updateMyProfile = async (user: any, req: Request) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  let profileData;

  if (user.role == Role.ADMIN) {
    profileData = await prisma.admin.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  }

  if (user.role == Role.TRAINER) {
    profileData = await prisma.trainer.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  }

  if (user.role == Role.TRAINEE) {
    profileData = await prisma.trainee.update({
      where: {
        email: userData.email,
      },
      data: req.body,
    });
  }

  const result = {
    ...userData,
    ...profileData,
  };

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `Update Profile Successfully`,
    data: result,
  };
};

const getMyProfile = async (user: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  let profileData;

  if (user.role == Role.ADMIN) {
    profileData = await prisma.admin.findUniqueOrThrow({
      where: {
        email: userData.email,
      },
    });
  }

  if (user.role == Role.TRAINER) {
    profileData = await prisma.trainer.findUniqueOrThrow({
      where: {
        email: userData.email,
      },
    });
  }

  if (user.role == Role.TRAINEE) {
    profileData = await prisma.trainee.findUniqueOrThrow({
      where: {
        email: userData.email,
      },
    });
  }
  const result = {
    ...userData,
    ...profileData,
  };
  
  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `My Profile Data Fetched`,
    data: result,
  };
};

const getAllTrainers = async () => {
  const result = await prisma.trainer.findMany();
  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `Trainer Data Fetched`,
    data: result,
  };
} 

const getAllTrainees = async (options:any) => {
  const { page, limit, skip } = calculatePagination(options);
  const result = await prisma.trainee.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt:"asc"
    }
  });
  const total = await prisma.trainee.count({
    skip,
    take: limit,
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

export const userServices = {
  createAdmin,
  createTrainee,
  createTrainer,
  removeTrainer,
  updateMyProfile,
  getMyProfile,
  getAllTrainers,
  getAllTrainees,
};
