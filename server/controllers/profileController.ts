import type { Request, Response } from "express";
import { getProfileById } from "../services/userService.js";
import { UnauthorizedError } from "../errors/AppError.js";

export const getProfile = async (req: Request, res: Response) => {
  const userID = req.user?.id ?? null;

  if (userID === null || typeof userID !== "string") {
    throw new UnauthorizedError("Invalid user, unable to validate user");
  }

  const user = await getProfileById(userID);

  res.status(200).json(user);
};
