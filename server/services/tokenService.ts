import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES_MINS,
  USER_ROLES,
  type UserRole,
} from "../config/constants.js";
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
    expiresIn: `${ACCESS_TOKEN_EXPIRES_MINS}m`,
    algorithm: "HS256", //* At the moment symmetrical algorthm is appopriate
  });

  return accessToken;
};

export const createRefreshToken = (
  userID: string,
  sessionID: string,
  sessionExpiresAt: Date,
) => {
  const payload = {
    sub: userID,
    sid: sessionID,
    exp: Math.floor(sessionExpiresAt.getTime() / 1000), //exp is using secs while JS Date time is ms
  };
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) throw new Error("JWT_REFRESH_SECRET is not defined");

  const refreshToken = jwt.sign(payload, secret, {
    algorithm: "HS256",
  });

  return refreshToken;
};

export const validateAccessToken = (token: string) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error("JWT_SECRET is not defined");

  //need try-catch as verify method throws directly doesn't return a promise etc. its syn
  try {
    const decoded = jwt.verify(token, secret, {
      algorithms: ["HS256"],
    });

    if (typeof decoded === "string") {
      throw new Error();
    }

    if (
      typeof decoded.sub !== "string" ||
      typeof decoded.sid !== "string" ||
      typeof decoded.exp !== "number" ||
      typeof decoded.role !== "string" ||
      !USER_ROLES.includes(decoded.role as UserRole) //Only way to work this out in run time
    ) {
      throw new Error();
    }

    return {
      sub: decoded.sub,
      sid: decoded.sid,
      role: decoded.role as UserRole, //otherwise TS infers as string
    };
  } catch {
    throw new UnauthorizedError("Invalid token, login to continue.");
  }
};

export const validateRefreshToken = (token: string) => {
  const secret = process.env.JWT_REFRESH_SECRET;

  if (!secret) throw new Error("JWT_REFRESH_SECRET is not defined");

  //need try-catch as verify method throws directly doesn't return a promise etc. its syn
  try {
    const decoded = jwt.verify(token, secret, {
      algorithms: ["HS256"],
    });

    if (typeof decoded === "string") {
      throw new Error();
    }

    if (
      typeof decoded.sub !== "string" ||
      typeof decoded.sid !== "string" ||
      typeof decoded.exp !== "number"
    ) {
      throw new Error();
    }

    return {
      sub: decoded.sub,
      sid: decoded.sid,
      exp: decoded.exp,
    };
  } catch {
    throw new UnauthorizedError("Invalid token, login to continue.");
  }
};
