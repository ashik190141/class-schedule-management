import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const generateToken = (userData: any, secret: Secret, expire: any) => {
  const token = jwt.sign(
    {
      email: userData?.email,
      role: userData.role,
    },
    secret,
    {
      algorithm: "HS256",
      expiresIn: expire,
    }
  );
  return token;
};

const jwtVerify = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const JWT = {
  generateToken,
  jwtVerify,
};
