import type { Request, Response, NextFunction } from "express";

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 20;

// TODO: When auth is ready admin should be able to call ALL with limit = 0

export const validateProductQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { limit } = req.query;

  // If no limit default to 12
  if (!limit) {
    req.validatedQuery = { limit: DEFAULT_LIMIT };
  }

  // Check the limit if the parsed value is safe/valid then pass it to the controller
  if (limit) {
    const parsedLimit = typeof limit === "string" ? parseInt(limit, 10) : NaN;

    if (Number.isNaN(parsedLimit) || parsedLimit < 1) {
      return res
        .status(400)
        .json({ message: "Invalid limit parameter was called" });
    }

    const safeLimit = Math.min(parsedLimit, MAX_LIMIT);

    req.validatedQuery = { limit: safeLimit };
  }

  next();
};
