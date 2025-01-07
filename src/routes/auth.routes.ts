import { signup } from "../controllers/auth.controller";
import express from "express";
import validate from "../middlewares/validate";
import { signupValidation } from "../validations/user.validation";
import asyncHandler from "../middlewares/asyncHandler";

const authRoutes = express();

authRoutes.post("/signup", validate(signupValidation, "body"), asyncHandler(signup));

export default authRoutes;
