import { Request, Response } from "express";
import { catchAsync } from "../../../helper/catchAsync";
import { sendResponse } from "../../../helper/sendResponse";
import { bookingServices } from "./booking.service";

const classBooking = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const {classId} = req.body;
        const traineeEmail = req.user.email;
    const result = await bookingServices.classBooking(classId, traineeEmail);
    sendResponse(res, {
      statusCode: result.statusCode,
      success: result.success,
      message: result.message,
      data: result.data,
    });
  }
);

const removeBookings = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const bookingId = req.params.id;
    const traineeEmail = req.user.email;
    const result = await bookingServices.removeBookings(bookingId, traineeEmail);
    sendResponse(res, {
      statusCode: result.statusCode,
      success: result.success,
      message: result.message,
      data: result.data,
    });
  }
);

export const bookingController = {
  classBooking,
  removeBookings,
};
