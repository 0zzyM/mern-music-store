import bcrypt from "bcryptjs";
import { InvalidCredentialsError } from "../errors/AppError.js";
import User, { UserDoc } from "../models/userModel.js";

export const handleLogin = async (user: UserDoc) => {
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
