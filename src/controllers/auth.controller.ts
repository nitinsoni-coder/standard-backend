// import protobuf from "protobufjs";
import { Request, Response } from "express";
import AuthService from "../services/auth.services";
import { ISignup } from "../interfaces/user.interface";
import STATUS_CODE from "../constants/constant";

// Load the .proto file
// const root = protobuf.loadSync("user.proto");
// const User = root.lookupType("User");

/**
 * Signup
 */
const signup = async (req: Request, res: Response) => {
  // Decode the buffer into a User message
  // const decodedMessage = User.decode(req.body);

  // // Convert the message into a plain JavaScript object
  // const decodedData = User.toObject(decodedMessage);

  // console.log("---decodedData--", decodedData);

  const responseData = await AuthService.signup(req.body as ISignup);

  res.status(STATUS_CODE.CREATED).send(responseData);
};

export { signup };
