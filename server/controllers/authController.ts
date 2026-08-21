import type { Request, Response } from "express";
import { handleRegistration } from "../services/registrationService.js";
import type { registrationBodyDTO } from "../validation/registrationBodySpecs.js";

export const registerUser = async (req: Request, res: Response) => {
  const user = req.validatedBody as registrationBodyDTO;
  const response = await handleRegistration(user);
  res.status(201).json(response);
};
