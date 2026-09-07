import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/AppError.js";
import { validateAccessToken } from "../services/tokenService.js";

//TODO: Attach req.user later when ready

export const validateToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) throw new UnauthorizedError("Missing Auth Token!");

  //TODO: fe needs to call refresh token endpoint if this fails.
  // validation will throw if access token is not valid
  validateAccessToken(accessToken);

  next();
};
