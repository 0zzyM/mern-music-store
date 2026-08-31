import jwt from "jsonwebtoken";
import type { UserRole } from "../config/constants.js";
import { UnauthorizedError } from "../errors/AppError.js";

export const createAccessToken = (
  userID: string,
  sessionID: string,
  role: UserRole,
) => {
  const payload = { sub: userID, sid: sessionID, role };
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error("JWT_SECRET is not defined");

  const accessToken = jwt.sign(payload, secret, {
    expiresIn: "15m",
  });

  return accessToken;
};

export const createRefreshToken = (
  userID: string,
  sessionID: string,
  role: UserRole,
) => {
  const payload = { sub: userID, sid: sessionID, role };
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) throw new Error("JWT_REFRESH_SECRET is not defined");

  const refreshToken = jwt.sign(payload, secret, {
    expiresIn: "30d",
  });

  return refreshToken;
};

export const validateRefreshToken = (token: string) => {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) throw new Error("JWT_REFRESH_SECRET is not defined");

  //need try-catch as verify method throws directly doesn't return a promise etc. its syn
  try {
    jwt.verify(token, secret);
  } catch (error) {
    throw new UnauthorizedError("Invalid token, login to continue.");
  }
};
