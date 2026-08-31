import { NextFunction, Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../errors/AppError.js";
import jwt from "jsonwebtoken";

export const validateToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new BadRequestError("Missing Auth header!");

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");

  const [authType, token] = authHeader.split(" ");

  if (authType !== "Bearer") throw new BadRequestError("Invalid Auth Header");

  //TODO: fe needs to call refresh token endpoint if this fails.
  try {
    jwt.verify(token, secret);
  } catch (error) {
    throw new UnauthorizedError("Invalid token, login to continue.");
  }

  next();
};
