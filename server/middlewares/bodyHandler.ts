import type { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/AppError.js";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { checkLength } from "../validation/lengthCheck.js";
import { validatePassword } from "../validation/passwordValidation.js";
import { validateAndNormalizeMail } from "../validation/mailValidation.js";

type StringRule = {
  type: "string";
  minLength: number;
  maxLength: number;
  required?: boolean;
};

type MailRule = {
  type: "email";
  required: boolean;
};

type PasswordRule = {
  type: "password";
  required: boolean;
};

//! FE will have a box to choose country and code of it, so FE will always send +...
type PhoneNumberRule = {
  type: "phoneNumber";
  required: boolean;
};

export type FieldRule = StringRule | MailRule | PasswordRule | PhoneNumberRule;

export type BodySpec = Record<string, FieldRule>;

export const validateBody =
  (spec: BodySpec) => (req: Request, _res: Response, next: NextFunction) => {
    const dto: Record<string, unknown> = {};

    for (const [key, rule] of Object.entries(spec)) {
      const value = req.body[key];

      // Unless QueryHandler no defaulting here so wasn't used
      // !value is falsy here cause  cause body is JSON and value can be 0 or false etc.
      if (value === undefined || value === null) {
        if ("required" in rule && rule.required) {
          throw new BadRequestError(`(${key}) is required`);
        }
        continue;
      }

      switch (rule.type) {
        case "string": {
          if (typeof value !== "string") {
            throw new BadRequestError(
              `Invalid request ${key}, it can only be a string`,
            );
          }

          const trimmed = value.trim();
          checkLength(key, trimmed, rule.minLength, rule.maxLength);

          dto[key] = trimmed;
          break;
        }

        case "email": {
          if (typeof value !== "string") {
            throw new BadRequestError(
              `Invalid request ${key}, it can only be a string`,
            );
          }

          const normalisedMail = validateAndNormalizeMail(value);

          dto[key] = normalisedMail;
          break;
        }
        case "password": {
          if (typeof value !== "string") {
            throw new BadRequestError(
              `Invalid request ${key}, it can only be a string`,
            );
          }

          validatePassword(value);

          dto[key] = value;
          break;
        }

        case "phoneNumber": {
          if (typeof value !== "string") {
            throw new BadRequestError(
              `Invalid request ${key}, it can only be a string`,
            );
          }

          // Have to parse to standartize the input for
          const parsed = parsePhoneNumberFromString(value);

          /*! Example of what parse returns
          {
            country: "MT",
            countryCallingCode: "356",
            nationalNumber: "79123456",
            number: "+35679123456",       // E.164 — the one you store
            // plus methods: isValid(), getType(), format(), etc.
          }
          */

          if (!parsed?.isValid())
            throw new BadRequestError(`Please provide a valid phone number`);

          dto[key] = parsed.number;
          break;
        }
      }
    }

    req.validatedBody = dto;

    next();
  };
