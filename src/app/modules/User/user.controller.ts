import { Request, Response } from "express";
import { catchAsync } from "../../../helper/catchAsync";
import { sendResponse } from "../../../helper/sendResponse";
import { userServices } from "./user.service";


const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createAdmin(req);
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});

const createTrainee = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createTrainee(req);
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});

const createTrainer = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.createTrainer(req);
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});

const removeTrainer = catchAsync(async (req: Request, res: Response) => {
  const trainerId = req.params.id
  const result = await userServices.removeTrainer(trainerId);
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});

const getMyProfile = catchAsync(async (req: Request & {user?:any}, res: Response) => {
  const result = await userServices.getMyProfile(req.user);
  if (result) {
    sendResponse(res, {
      statusCode: result.statusCode,
      success: result.success,
      message: result.message,
      data: result.data,
    });
  }
});

const updateMyProfile = catchAsync(async (req: Request & {user?:any}, res: Response) => {
  const result = await userServices.updateMyProfile(req.user, req);
  if (result) {
    sendResponse(res, {
      statusCode: result.statusCode,
      success: result.success,
      message: result.message,
      data: result.data,
    });
  }
});

export const userController = {
  createAdmin,
  createTrainee,
  createTrainer,
  removeTrainer,
  getMyProfile,
  updateMyProfile
};