import { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  jsonData: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
      page: number | undefined;
      limit: number | undefined;
      total: number;
    };
    data: T | null | undefined;
  }
) => {
  res.status(jsonData.statusCode).json({
    success: jsonData.success,
    statusCode: jsonData.statusCode,
    message: jsonData.message,
    meta: jsonData.meta,
    data: jsonData.data,
  });
};
