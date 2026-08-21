import { BadRequestError } from "../errors/AppError.js";
import { checkLength } from "./lengthCheck.js";

const MIN_MAIL_LENGTH = 5;
const MAX_MAIL_LENGTH = 254;

// Final desicion here to accept only ascii input - language specific are rejected
const mailValidationRegex =
  /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

export const validateAndNormalizeMail = (value: string) => {
  const trimmed = value.trim();

  checkLength("email", trimmed, MIN_MAIL_LENGTH, MAX_MAIL_LENGTH);

  const isMailValid = mailValidationRegex.test(trimmed);

  if (!isMailValid) {
    throw new BadRequestError(`Provided email address is invalid`);
  }

  const normalisedMail = trimmed.toLowerCase();

  return normalisedMail;
};
