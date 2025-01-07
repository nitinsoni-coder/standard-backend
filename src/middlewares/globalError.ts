import { Request, Response, NextFunction } from "express";
import { Error as MongooseError } from "mongoose";
import envConfig from "../config/env.config";
import { MongoError } from "mongodb";
import { ENV_MODE } from "../constants/constant";

// Global Error Handler
const globalErrorHandler = (
  err: unknown, // Use the defined CustomError type
  _: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error Handler", err);

  if ([ENV_MODE.UAT, ENV_MODE.PRODUCTION].includes(envConfig.NODE_ENV as "uat" | "production")) {
    // Handle Mongoose Validation Errors (e.g., missing required fields)
    if (err instanceof MongooseError.ValidationError) {
      res.status(400).json({
        success: false,
        message: "Validation error, please check the input data.",
      });
    }
    // Handle Duplicate Key Errors (e.g., unique index violation)
    else if (err instanceof MongooseError.CastError) {
      res.status(400).json({
        success: false,
        message: `Invalid data format for field: ${err.path}`,
      });
    } else if (err instanceof MongoError && err.code === 11000) {
      // Handle duplicate id error
      res.status(409).json({
        success: false,
        message: "Duplicate entry found.",
      });
    }
    // General Database Error Handling
    else {
      res.status(500).json({
        success: false,
        message: "An error occurred while processing your request.",
      });
    }
  } else {
    // In development, show full error details
    res.status(400).json({
      success: false,
      message: "Database error occurred",
      error: err instanceof Error ? err.message : err,
      stack: err instanceof Error ? err.stack : null,
    });
  }

  next(err);
};

export default globalErrorHandler;
