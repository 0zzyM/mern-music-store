import { NextFunction, Request, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../errors/AppError.js";
import { validateAccessToken } from "../services/tokenService.js";
import { USER_ROLES, UserRole } from "../config/constants.js";

export const validateToken = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) throw new UnauthorizedError("Missing Auth Token!");

  //TODO: fe needs to call refresh token endpoint if this fails.
  // validation will throw if access token is not valid
  const validated = validateAccessToken(accessToken);

  req.user = { id: validated.sid, role: validated.role };

  next();
};

export const validateRole =
  (expectedRole: UserRole) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const { id: userID, role } = req.user ?? {};

    if (
      typeof userID !== "string" ||
      typeof role !== "string" ||
      !USER_ROLES.includes(role as UserRole)
    ) {
      throw new UnauthorizedError(
        "Invalid user, unable to validate user or role!",
      );
    }

    if (role !== expectedRole) {
      throw new ForbiddenError(
        "User role does not have sufficient permissions.",
      );
    }

    next();
  };
