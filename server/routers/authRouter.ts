import express from "express";
import {
  login,
  logout,
  refreshAndRotateTokens,
  registerUser,
} from "../controllers/authController.js";
import { validateBody } from "../middlewares/bodyHandler.js";
import { registrationBodySpecs } from "../validation/registrationBodySpecs.js";
import {
  loginMailLimiter,
  loginIPLimiter,
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

authRouter.post(
  "/login",
  loginIPLimiter,
  loginMailLimiter,
  validateBody(loginBodySpecs),
  login,
);

//TODO: wire middlewares
authRouter.post("/logout", logout);

authRouter.post("/refresh", refreshAndRotateTokens);

export default authRouter;
