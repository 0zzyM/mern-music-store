import express from "express";
import { getUser, getUsers } from "../controllers/userController.js";

const userRouter = express.Router();

// To get all users should  be avoided until admin panel implemented irl
// Use it for test and deactivate it
userRouter.get("/", getUsers);

userRouter.get("/:_id", getUser);

export default userRouter;
