import bcrypt from "bcryptjs";
import { InvalidCredentialsError } from "../errors/AppError.js";
import User from "../models/userModel.js";
import type { LoginBodyDTO } from "../validation/loginBodySpecs.js";
import { saltRounds } from "../config/constants.js";

// !Declared outside the function so hashes only on module load.
// This was necessary  as I found out if no dummy  password compare, from response times it is possible to understand,
// which email address has account and which not
const DUMMY_HASH = bcrypt.hashSync("123invalidDummyPassword123", saltRounds);

export const handleLogin = async (user: LoginBodyDTO) => {
  const dbUser = await User.findOne({ email: user.email })
    .select("+password")
    .lean();

  const isPasswordCorrect = await bcrypt.compare(
    user.password,
    dbUser ? dbUser.password : DUMMY_HASH, //!If user with email doesn't exist just look up for dummy hash to match response times
  );

  if (!dbUser || !isPasswordCorrect) {
    throw new InvalidCredentialsError("Invalid email or password");
  }

  return { message: "Login is successful" };
};
