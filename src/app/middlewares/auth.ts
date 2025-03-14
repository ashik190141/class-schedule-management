import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { JWT } from "../../helper/jwtHelpers";
import config from "../config";
import apiError from "../errors/apiError";

export const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new apiError(httpStatus.UNAUTHORIZED, "you are not authorized!");
      }
      const decoded = JWT.jwtVerify(token, config.secret as Secret);

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        throw new apiError(httpStatus.FORBIDDEN, "Forbidden!");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
