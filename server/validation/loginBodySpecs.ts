import type { BodySpec } from "../middlewares/bodyHandler.js";

export const loginBodySpecs: BodySpec = {
  email: {
    type: "email",
    required: true,
  },
  password: {
    type: "credential",
    required: true,
  },
};

export type LoginBodyDTO = {
  email: string;
  password: string;
};
