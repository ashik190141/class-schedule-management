import { Request, Response } from "express";
import { catchAsync } from "../../../helper/catchAsync";
import { pick } from "../../../helper/pick";
import { sendResponse } from "../../../helper/sendResponse";
import { userServices } from "./user.service";
import httpStatus from 'http-status';


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

const getAllTrainers = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getAllTrainers();
  if (result) {
    sendResponse(res, {
      statusCode: result.statusCode,
      success: result.success,
      message: result.message,
      data: result.data,
    });
  }
});

const getAllTrainees = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, ["page", "limit"]);
  const result = await userServices.getAllTrainees(options);
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Fetch Trainee Data',
      data: result,
    });
  }
});

export const userController = {
  createAdmin,
  createTrainee,
  createTrainer,
  removeTrainer,
  getMyProfile,
  updateMyProfile,
  getAllTrainers,
  getAllTrainees,
};