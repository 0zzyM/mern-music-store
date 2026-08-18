import type { Request, Response } from "express";
import { handleRegistration } from "../services/registrationService.js";

export const registerUser = async (req: Request, res: Response) => {
  const user = req.body;

  const response = await handleRegistration(user);

  res.status(201).json(response);
};
