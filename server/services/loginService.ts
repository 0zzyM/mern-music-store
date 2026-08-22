import bcrypt from "bcryptjs";
import { InvalidCredentialsError } from "../errors/AppError.js";
import User from "../models/userModel.js";
import type { LoginBodyDTO } from "../validation/loginBodySpecs.js";

export const handleLogin = async (user: LoginBodyDTO) => {
  const dbUser = await User.findOne({ email: user.email })
    .select("+password")
    .lean();

  if (!dbUser) {
    throw new InvalidCredentialsError("Invalid email or password");
  }
  const isPasswordCorrect = await bcrypt.compare(
    user.password,
    dbUser.password,
  );

  if (!isPasswordCorrect)
    throw new InvalidCredentialsError("Invalid email or password");

  return { message: "Login is successful" };
};
