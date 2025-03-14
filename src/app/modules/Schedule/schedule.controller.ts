import { Request, Response } from "express";
import { catchAsync } from "../../../helper/catchAsync";
import { pick } from "../../../helper/pick";
import { sendResponse } from "../../../helper/sendResponse";
import { scheduleServices } from "./Schedule.service";
import httpStatus from 'http-status';

const createClassSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleServices.createClassSchedule(req);
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});

const getClassSchedule = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ["date", "startTime"]);
  const options = pick(req.query, ["page", "limit"]);
    const result = await scheduleServices.getClassSchedule(filter, options);
    if (result) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Class Schedule Data are Retrieved",
        meta: result.meta,
        data: result.data,
      });
    }
});

const assignTrainer = catchAsync(async (req: Request, res: Response) => {
    const classId = req.params.id
  const result = await scheduleServices.assignTrainer(req,classId);
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});

const updateClassSchedule = catchAsync(async (req: Request, res: Response) => {
  const result = await scheduleServices.updateClassSchedule(req);
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});

const deleteClassSchedule = catchAsync(async (req: Request, res: Response) => {
    const classId = req.params.id;
  const result = await scheduleServices.deleteClassSchedule(classId);
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});

const getClassScheduleOfTrainer = catchAsync(async (req: Request, res: Response) => {
    const trainerId = req.params.id;
  const result = await scheduleServices.getClassScheduleOfTrainer(trainerId);
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});


export const scheduleController = {
  createClassSchedule,
  getClassSchedule,
  assignTrainer,
  updateClassSchedule,
  deleteClassSchedule,
  getClassScheduleOfTrainer,
};
