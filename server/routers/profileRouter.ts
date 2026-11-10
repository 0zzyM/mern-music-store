import express from "express";
import { validateToken } from "../middlewares/authHandler.js";
import { getProfile } from "../controllers/profileController.js";
const profileRouter = express.Router();

profileRouter.get("/", validateToken, getProfile);

export default profileRouter;
