import { Request, Response, NextFunction } from "express";
import helper from "../utils/helper";
import logger from "../utils/logger";

const asyncHandler =
  (func: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const start = Date.now();
    const requestTime = new Date();

    const payloadSize = helper.getPaylodSize(req);

    let statusCode = 200;
    res.on("finish", () => {
      statusCode = res.statusCode;
    });

    try {
      await func(req, res, next);
    } catch (error) {
      next(error);
    } finally {
      const duration = Date.now() - start;

      logger.info("API Triggered", {
        meta: {
          METHOD: req.method,
          ENDPOINT: req.originalUrl,
          USER_IP_Address: req.ip,
          REQUEST_TIME: `${requestTime.getMilliseconds()} ms`,
          PAYLOAD_SIZE: payloadSize,
          RESPONSE_TIME: `${duration} ms`,
          STATUS_CODE: statusCode,
        },
      });
    }
  };

export default asyncHandler;
