import type { Request, Response } from "express";
import { handleRegistration } from "../services/registrationService.js";
import type { RegistrationBodyDTO } from "../validation/registrationBodySpecs.js";
import { handleLogin } from "../services/loginService.js";
import type { LoginBodyDTO } from "../validation/loginBodySpecs.js";
import { ACCESS_TOKEN_EXPIRES_MS } from "../config/constants.js";
import {
  validateAccessToken,
  validateRefreshToken,
} from "../services/tokenService.js";
import { BadRequestError, UnauthorizedError } from "../errors/AppError.js";
import { endSession } from "../services/sessionService.js";

export const registerUser = async (req: Request, res: Response) => {
  const user = req.validatedBody as RegistrationBodyDTO;
  const response = await handleRegistration(user);
  res.status(201).json(response);
};

export const login = async (req: Request, res: Response) => {
  const user = req.validatedBody as LoginBodyDTO;

  const { accessToken, refreshToken, sessionExpiresAt } =
    await handleLogin(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //TODO: later consider lax here again instead of strict
    maxAge: ACCESS_TOKEN_EXPIRES_MS, //15 mins
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/v1/auth",
    expires: sessionExpiresAt,
  });

  //Don't return anything yet!
  res.status(200).json("Login Successful");
};

//TODO: clean the code
export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  //TODO: Decide if to count these fails as a suspicios activity and lock the account!

  // if refreshToken is not valid fall back to accessToken
  if (refreshToken === undefined || typeof refreshToken !== "string") {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw new BadRequestError("Something went wrong, invalid cookies");
    }
    const decoded = validateAccessToken(accessToken);
    if (typeof decoded === "string")
      throw new UnauthorizedError("Invalid token, logout failed");

    if (!decoded.sid || typeof decoded.sid !== "string") {
      throw new UnauthorizedError("Invalid token content, logout failed");
    }

    await endSession(decoded.sid);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken", { path: "/api/v1/auth" }); //* If I didn't add path as an option here didn't clear the cookie.
    return res.status(200).json("Logout Successful with Access token");
  }

  const decoded = validateRefreshToken(refreshToken);

  if (typeof decoded === "string")
    throw new UnauthorizedError("Invalid token, logout failed");

  if (!decoded.sid || typeof decoded.sid !== "string") {
    throw new UnauthorizedError("Invalid Auth Token");
  }
  await endSession(decoded.sid);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken", { path: "/api/v1/auth" }); //* If I didn't add path as an option here didn't clear the cookie.
  res.status(200).json("Logout Successful");
};
