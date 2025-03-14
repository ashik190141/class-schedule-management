import { Request, Response } from "express";
import { catchAsync } from "../../../helper/catchAsync";
import { sendResponse } from "../../../helper/sendResponse";
import { authServices } from "./auth.service";


const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authServices.loginUser(req.body);
  sendResponse(res, {
    statusCode: result.statusCode,
    success: result.success,
    message: result.message,
    data: result.data,
  });
});

export const authController = {
    loginUser
}