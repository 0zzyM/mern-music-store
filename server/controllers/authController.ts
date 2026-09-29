import type { Request, Response } from "express";
import { handleRegistration } from "../services/registrationService.js";
import type { RegistrationBodyDTO } from "../validation/registrationBodySpecs.js";
import { handleLogin } from "../services/loginService.js";
import type { LoginBodyDTO } from "../validation/loginBodySpecs.js";
import { ACCESS_TOKEN_EXPIRES_MS, isEnvProd } from "../config/constants.js";
import {
  createAccessToken,
  createRefreshToken,
  validateAccessToken,
  validateRefreshToken,
} from "../services/tokenService.js";
import { UnauthorizedError } from "../errors/AppError.js";
import {
  endSession,
  rotateRefreshTokenHash,
  validateSession,
} from "../services/sessionService.js";
import { createHash } from "node:crypto";
import { getUserRolebyId } from "../services/userService.js";

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
    secure: isEnvProd,
    sameSite: "strict", //TODO: later consider lax here again instead of strict
    maxAge: ACCESS_TOKEN_EXPIRES_MS, //15 mins
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isEnvProd,
    sameSite: "strict",
    path: "/api/v1/auth",
    expires: sessionExpiresAt,
  });

  res.status(200).json("Login Successful");
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const accessToken = req.cookies.accessToken;

  //Clear the cookies first anyway even if the req is failed, this is better done!
  res.clearCookie("refreshToken", { path: "/api/v1/auth" }); //* If I didn't add path as an option here didn't clear the cookie.
  res.clearCookie("accessToken");

  // if refreshToken is not valid fall back to accessToken
  if (!refreshToken || typeof refreshToken !== "string") {
    res.clearCookie("refreshToken", { path: "/api/v1/auth" }); //* If I didn't add path as an option here didn't clear the cookie.
    if (!accessToken) {
      res.clearCookie("accessToken");
      console.log(
        "Something is wrong, user provided invalid tokens on logout request!\n Check the session ",
      );
      throw new UnauthorizedError("Something went wrong, invalid cookies");
    }
    const decoded = validateAccessToken(accessToken);
    if (typeof decoded === "string")
      throw new UnauthorizedError("Invalid token, logout failed");

    if (!decoded.sid || typeof decoded.sid !== "string") {
      throw new UnauthorizedError("Invalid token content, logout failed");
    }

    await endSession(decoded.sid);
    return res.status(200).json("Logout Successful with Access token");
  }

  const decoded = validateRefreshToken(refreshToken);

  await endSession(decoded.sid);

  res.status(200).json("Logout Successful");
};

export const refreshAndRotateTokens = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  //TODO: Consider input validation
  if (!refreshToken || typeof refreshToken !== "string") {
    throw new UnauthorizedError(
      "Something went wrong, missing or invalid cookie",
    );
  }

  const decoded = validateRefreshToken(refreshToken);
  const session = await validateSession(decoded.sid);
  const sessionUserId = String(session.userId);

  if (decoded.sub !== sessionUserId) {
    throw new UnauthorizedError("Token does not match the session");
  }

  const incomingHash = createHash("sha256").update(refreshToken).digest("hex");
  const userRole = await getUserRolebyId(sessionUserId);
  const refreshExpiresAt = new Date(decoded.exp * 1000);

  //Create new refresh token
  //decoded.exp is number --> which is the number of seconds since Jan 1 1970. --> have to convert to ms so multiply by thousand
  const newRefreshToken = createRefreshToken(
    decoded.sub,
    decoded.sid,
    refreshExpiresAt,
  );

  const newAccessToken = createAccessToken(decoded.sub, decoded.sid, userRole);

  const newHashedRefreshToken = createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  await rotateRefreshTokenHash(
    decoded.sid,
    incomingHash,
    newHashedRefreshToken,
  );

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: isEnvProd,
    sameSite: "strict",
    maxAge: ACCESS_TOKEN_EXPIRES_MS, //15 mins
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: isEnvProd,
    sameSite: "strict",
    path: "/api/v1/auth",
    expires: refreshExpiresAt,
  });

  res.status(200).json({ message: "Success" });
};
