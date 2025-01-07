import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import envConfig from "../config/env.config";
import { ENV_MODE } from "../constants/constant";

// Middleware for validating api data input.
const validate = (schema: ObjectSchema, location: "body" | "params" | "query") => {
  return (req: Request, res: Response, next: NextFunction): any => {
    const data = req[location];
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      if (envConfig.NODE_ENV === ENV_MODE.DEVELOPMENT) {
        const errorMessages = error.details.map((err) => err.message.replace(/"/g, ""));
        return res.status(422).json({ errors: errorMessages });
      } else if (envConfig.NODE_ENV === ENV_MODE.PRODUCTION) {
        return res.status(422).send("Oops! Something went wrong with your input. Please correct it and try again.");
      }
    }
    next();
  };
};

export default validate;
