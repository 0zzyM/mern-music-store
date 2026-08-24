import type { BodySpec } from "../middlewares/bodyHandler.js";
const MIN_LENGTH = 2;
const MAX_LENGTH = 128;

export const registrationBodySpecs: BodySpec = {
  name: {
    type: "string",
    minLength: MIN_LENGTH,
    maxLength: MAX_LENGTH,
    required: true,
  },
  surname: {
    type: "string",
    minLength: MIN_LENGTH,
    maxLength: MAX_LENGTH,
    required: true,
  },
  email: {
    type: "email",
    required: true,
  },
  phoneNumber: {
    type: "phoneNumber",
    required: true,
  },
  password: {
    type: "password",
    required: true,
  },
};

export type RegistrationBodyDTO = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
};
