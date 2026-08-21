import express from "express";
import { registerUser } from "../controllers/authController.js";
import { validateBody } from "../middlewares/bodyHandler.js";
import { registrationBodySpecs } from "../validation/registrationBodySpecs.js";
import {
  registrationDailyLimiter,
  registrationHourlyLimiter,
} from "../middlewares/rateLimiter.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  registrationDailyLimiter,
  registrationHourlyLimiter,
  validateBody(registrationBodySpecs),
  registerUser,
);

export default authRouter;
