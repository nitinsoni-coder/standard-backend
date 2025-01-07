import mongoose from "mongoose";
import envConfig from "../config/env.config";
import logger from "../utils/logger";

// Database connection
const connectToDB = async () => {
  try {
    await mongoose.connect(envConfig.MONGO_URL as string).then((data) => {
      logger.info(`Database is connected successfully.`, { meta: { DATABASE_NAME: data.connection.name } });
    });
  } catch (error) {
    logger.error("Failed to connect to Database", error);
    process.exit(1);
  }
};

export default connectToDB;
