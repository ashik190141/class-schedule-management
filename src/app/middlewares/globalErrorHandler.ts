import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  let statusCode = 500;
  let message = "Something went wrong";

  if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation Error";
    res.status(statusCode).json({
      success: false,
      message,
      errors: err.errors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      })),
    });
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation Error";

    const missingFieldMatch = err.message.match(/Argument `(\w+)` is missing/);
    const missingField = missingFieldMatch
      ? missingFieldMatch[1]
      : "Unknown field";
    
    res.status(statusCode).send({
      success: false,
      message,
      errorDetails: `${missingField} is missing`,
    });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err?.message || message,
    error: err,
  });
  next();
};
