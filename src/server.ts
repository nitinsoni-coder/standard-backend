import envConfig from "./config/env.config";

import app from "./app";
import logger from "./utils/logger";

// handle unhandled promise rejection
process.on("uncaughtException", (err) => {
  logger.error(`ERROR : ${err.stack}`);
  logger.error(`Shutting down the server due to uncaught exception error`);
  server.close(() => {
    process.exit(1);
  });
});

// server listen
const server = app.listen(8000, () => {
  logger.info("server is running", {
    meta: {
      PORT: envConfig.PORT,
      env: envConfig.NODE_ENV,
    },
  });
});

// handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
  if (err instanceof Error) logger.error(`ERROR : ${err.stack}`);
  logger.error(`Shutting down the server due to unhandled Promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
