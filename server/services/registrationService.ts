import { saltRounds } from "../config/constants.js";
import { AlreadyExistsError } from "../errors/AppError.js";
import User from "../models/userModel.js";
import type { UserDoc } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const isUserMailExist = async (email: string) => {
  const user = await User.findOne({ email: email }).lean();
  return user ? true : false;
};

export const isPhoneNumberExist = async (phoneNumber: string) => {
  const user = await User.findOne({ phoneNumber: phoneNumber }).lean();
  return user ? true : false;
};

export const handleRegistration = async (user: UserDoc) => {
  if (await isUserMailExist(user.email)) {
    throw new AlreadyExistsError(
      `User with email:${user.email} already exists`,
    );
  }

  if (await isPhoneNumberExist(user.phoneNumber)) {
    throw new AlreadyExistsError(
      `User with number:${user.phoneNumber} already exists`,
    );
  }

  console.log(user);

  const userPassword = user.password;

  console.log(userPassword);

  const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

  console.log(hashedPassword);

  const secureUser = {
    ...user,
    password: hashedPassword,
  };

  try {
    await User.create(secureUser);
    //TODO: More should be returned in the future for login redirect
    return { message: "Registration is successful" };
  } catch (error) {
    throw new Error(
      "Server Error:  Something went wrong, registration has failed",
    );
  }
};
