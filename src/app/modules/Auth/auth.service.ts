import { prisma } from "../../../helper/prisma";
import bcrypt from 'bcrypt';
import apiError from "../../errors/apiError";
import config from "../../config";
import httpStatus from 'http-status';
import { JWT } from "../../../helper/jwtHelpers";
import { Secret } from "jsonwebtoken";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new apiError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }

  const accessToken = JWT.generateToken(
    userData,
    config.secret as Secret,
    config.secretExpire as string
  );

  return {
    statusCode: httpStatus.OK,
    success: true,
    message: `Logging Successfully`,
    data: accessToken,
  };
};

export const authServices = {
    loginUser
}