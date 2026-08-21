import { rateLimit } from "express-rate-limit";
import { TooManyRequestsError } from "../errors/AppError.js";

// Can add a factory here later when there are more limiters.
//FIXME: Write a function to simplify all these
export const appLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  limit: 750, // Limit each IP to 1500 requests per `window`
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
  handler: (_req, _res, next, options) => {
    const mins = options.windowMs / 60000;

    next(
      new TooManyRequestsError(
        `You can only make ${options.limit} requests every ${mins} mins`,
      ),
    );
  },
});

export const searchLimiter = rateLimit({
  windowMs: 30 * 1000,
  //TODO: Might need to change this
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  handler: (_req, _res, next, options) => {
    const seconds = options.windowMs / 1000;

    next(
      new TooManyRequestsError(
        `You can only make ${options.limit} requests every ${seconds} seconds`,
      ),
    );
  },
});

export const registrationHourlyLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 mins
  //TODO: Might need to change this
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  handler: (_req, _res, next, options) => {
    const mins = options.windowMs / 60000;

    next(
      new TooManyRequestsError(
        `You can only make ${options.limit} requests every ${mins} minutes`,
      ),
    );
  },
});

export const registrationDailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, //24h
  //TODO: Might need to change this
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  ipv6Subnet: 56,
  handler: (_req, _res, next, options) => {
    const hours = options.windowMs / 3600000;

    next(
      new TooManyRequestsError(
        `You can only make ${options.limit} requests every ${hours} hours`,
      ),
    );
  },
});
