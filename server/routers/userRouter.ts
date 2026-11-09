import express from "express";
import { getUser, getUsers } from "../controllers/userController.js";
import { validateToken, validateRole } from "../middlewares/authHandler.js";
const userRouter = express.Router();

userRouter.get("/", validateToken, validateRole(["admin", "owner"]), getUsers);

userRouter.get("/:_id", validateRole(["admin", "owner"]), getUser);

export default userRouter;
