import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { TooManyRequestsError } from "../errors/AppError.js";
import type { Request } from "express";

const timeMultiplier = {
  secs: 1000,
  mins: 60000,
  hours: 3600000,
  days: 86400000,
} as const;

type TimeOption = keyof typeof timeMultiplier;

type LimiterOptions = {
  window: number;
  limit: number;
  timeUnit: TimeOption;
  keyGenerator?: (req: Request) => string;
  skipSuccessfulRequests?: true;
};

const loginMailKeygen = (req: Request) => {
  // req.body is always any which wouldn't work if I try to validate typeof req.body.email === string directly
  // as email was defaulting to any as well
  // tried debugging for a long time and couldn't figure out for a while
  // the fix is assigning to a variable and validating the variable later
  // this is apparently a workaround however wasn't easy to find
  // better approach here is also using unknown instead of any tho as it doesn't silently break
  // !careful with ? after body if undefined then would throw 5XX instead 4XX
  // ! also can't throw on undefined path here otherwise would skip counting and req will be validated on next middleware anyways
  const email: unknown = req.body?.email;

  if (typeof email === "string") {
    const normalizedMail = email.trim().toLowerCase();
    return normalizedMail;
  }

  // fallback to ip address
  // req.ip should never be undefined because there is trust proxy but TS needs validation
  return ipKeyGenerator(req.ip ?? "", 56);
};

const buildLimiter = ({ window, timeUnit, limit, ...rest }: LimiterOptions) => {
  const multiplier = timeMultiplier[timeUnit];

  return rateLimit({
    windowMs: window * multiplier, // window in ms
    limit: limit, // Limit each IP to "limit" amount of requests per "window"
    standardHeaders: true, // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
    ...rest, //! Looked up a lot for this, super useful for the  future check again if you comeback can be used in context of another factory
    handler: (_req, _res, next) => {
      next(
        new TooManyRequestsError(
          `You can only make ${limit} requests every ${window} ${timeUnit}`,
        ),
      );
    },
  });
};

export const appLimiter = buildLimiter({
  window: 15,
  timeUnit: "mins",
  limit: 750,
});

export const searchLimiter = buildLimiter({
  window: 30,
  timeUnit: "secs",
  limit: 30,
});

//TODO: Might add another one using some sort of key generator
export const registrationHourlyLimiter = buildLimiter({
  window: 60,
  timeUnit: "mins",
  limit: 5,
});

export const registrationDailyLimiter = buildLimiter({
  window: 24,
  timeUnit: "hours",
  limit: 15,
});

export const loginIPLimiter = buildLimiter({
  window: 15,
  timeUnit: "mins",
  limit: 30,
  skipSuccessfulRequests: true,
});

export const loginMailLimiter = buildLimiter({
  window: 15,
  timeUnit: "mins",
  limit: 10,
  skipSuccessfulRequests: true,
  keyGenerator: loginMailKeygen,
});
