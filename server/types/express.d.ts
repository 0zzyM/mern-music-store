import "express";
import type { UserRole } from "../config/constants.js";

declare global {
  namespace Express {
    interface Request {
      validatedQuery?: Record<string, unknown>;
      validatedBody?: Record<string, unknown>;
      validatedCookies?: Record<string, unknown>;
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}
