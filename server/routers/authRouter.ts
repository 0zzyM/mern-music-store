import express from "express";
import { login, registerUser } from "../controllers/authController.js";
import { validateBody } from "../middlewares/bodyHandler.js";
import { registrationBodySpecs } from "../validation/registrationBodySpecs.js";
import {
  registrationDailyLimiter,
  registrationHourlyLimiter,
} from "../middlewares/rateLimiter.js";
import { loginBodySpecs } from "../validation/loginBodySpecs.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  registrationDailyLimiter,
  registrationHourlyLimiter,
  validateBody(registrationBodySpecs),
  registerUser,
);

authRouter.post("/login", validateBody(loginBodySpecs), login);

export default authRouter;
