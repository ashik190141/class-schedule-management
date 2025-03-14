import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  environment: process.env.ENVIRONMENT,
  secret: process.env.SECRET,
  secretExpire: process.env.SECRET_EXPIRE,
};
