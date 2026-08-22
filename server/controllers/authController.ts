import type { Request, Response } from "express";
import { handleRegistration } from "../services/registrationService.js";
import type { registrationBodyDTO } from "../validation/registrationBodySpecs.js";
import { handleLogin } from "../services/loginService.js";

export const registerUser = async (req: Request, res: Response) => {
  const user = req.validatedBody as registrationBodyDTO;
  const response = await handleRegistration(user);
  res.status(201).json(response);
};

export const login = async (req: Request, res: Response) => {
  const user = req.body;
  const response = await handleLogin(user);
  res.status(200).json(response);
};
