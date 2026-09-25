import type { Request, Response } from "express";
import { handleRegistration } from "../services/registrationService.js";
import type { RegistrationBodyDTO } from "../validation/registrationBodySpecs.js";
import { handleLogin } from "../services/loginService.js";
import type { LoginBodyDTO } from "../validation/loginBodySpecs.js";
import { ACCESS_TOKEN_EXPIRES_MS } from "../config/constants.js";
import {
  createAccessToken,
  createRefreshToken,
  validateAccessToken,
  validateRefreshToken,
} from "../services/tokenService.js";
import { BadRequestError, UnauthorizedError } from "../errors/AppError.js";
import { endSession } from "../services/sessionService.js";
import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";
import { createHash } from "node:crypto";

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

  res.status(200).json("Login Successful");
};

//TODO: clean the code
export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  //TODO: Decide if to count these fails as a suspicios activity and lock the account!

  // if refreshToken is not valid fall back to accessToken
  if (!refreshToken || typeof refreshToken !== "string") {
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

export const refreshAndRotateTokens = async (req: Request, res: Response) => {
  const refreshToken = req.validatedCookies?.refreshToken;

  //TODO: All these should be handled on input validation
  if (!refreshToken || typeof refreshToken !== "string") {
    throw new BadRequestError("Something went wrong, invalid cookies");
  }

  const decoded = validateRefreshToken(refreshToken);

  //TODO: Should be 2 different fix here
  if (typeof decoded === "string") {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken", { path: "/api/v1/auth" });
    throw new UnauthorizedError("Invalid token, login again");
  }
  // or do input validation for the cookie and throw before
  if (
    !decoded.sub ||
    !decoded.exp ||
    !decoded.sid ||
    typeof decoded.sid !== "string" ||
    typeof decoded.sub !== "string"
  ) {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken", { path: "/api/v1/auth" });
    throw new UnauthorizedError("Invalid token, login again");
  }

  //Clear cookies first
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken", { path: "/api/v1/auth" });

  //Validate session
  const session = await Session.findOne({ _id: decoded.sid });
  if (!session)
    throw new UnauthorizedError("Session expired, please login continue");

  //Validate refresh token over hashed value on sessions
  if (
    createHash("sha256").update(refreshToken).digest("hex") !==
    session.hashedRefreshToken
  ) {
    await endSession(session._id);
    throw new UnauthorizedError("Invalid token login to continue again");
  }
  const user = await User.findOne({ _id: session?.userId });
  //TODO: Should this be marked?
  if (!user)
    throw new UnauthorizedError("User not found, please login to continue");

  //Create new refresh token
  //decoded.exp is number --> which is the number of seconds since Jan 1 1970. --> have to convert to ms so multiply by thousand
  const newRefreshToken = createRefreshToken(
    decoded.sub,
    decoded.sid,
    new Date(decoded.exp * 1000),
  );

  //Create new access token
  const newAccessToken = createAccessToken(decoded.sub, decoded.sid, user.role);

  const newHashedRefreshToken = createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  //Rotate the Token
  await Session.findOneAndUpdate(
    { _id: decoded.sid },
    { hashedRefreshToken: newHashedRefreshToken },
  );

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ACCESS_TOKEN_EXPIRES_MS, //15 mins
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/v1/auth",
    expires: new Date(decoded.exp * 1000),
  });

  res.status(200).json({ message: "Success" });
};
