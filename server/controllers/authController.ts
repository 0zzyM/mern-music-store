import type { Request, Response } from "express";
import { handleRegistration } from "../services/registrationService.js";
import type { RegistrationBodyDTO } from "../validation/registrationBodySpecs.js";
import { handleLogin } from "../services/loginService.js";
import type { LoginBodyDTO } from "../validation/loginBodySpecs.js";

export const registerUser = async (req: Request, res: Response) => {
  const user = req.validatedBody as RegistrationBodyDTO;
  const response = await handleRegistration(user);
  res.status(201).json(response);
};

export const login = async (req: Request, res: Response) => {
  const user = req.validatedBody as LoginBodyDTO;
  const { accessToken, refreshToken } = await handleLogin(user);

  console.log(accessToken, refreshToken);

  //TODO: decide if to use opaque refresh token or JWT
  //TODO: decide if accessToken is stored in mem(redux) only or both as httpOnly cookie

  //Don't return anything yet!
  res.status(200).json("Login Successful");
};
