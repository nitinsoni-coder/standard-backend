import dotenv from "dotenv";
import { ENV_FILE, ENV_MODE } from "../constants/constant";

const environment = process.env.NODE_ENV;

const envFilePath =
  environment === ENV_MODE.DEVELOPMENT
    ? ENV_FILE.DEVELOPMENT_ENV
    : environment === ENV_MODE.UAT
      ? ENV_FILE.UAT_ENV
      : environment === ENV_MODE.PRODUCTION
        ? ENV_FILE.PRODUCTION_ENV
        : "";

dotenv.config({ path: envFilePath });

const envConfig = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URL: process.env.MONGO_URL,
};

export default envConfig;
