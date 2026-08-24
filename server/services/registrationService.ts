import { saltRounds } from "../config/constants.js";
import { AlreadyExistsError } from "../errors/AppError.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import type { RegistrationBodyDTO } from "../validation/registrationBodySpecs.js";

export const isUserMailExist = async (email: string) => {
  const user = await User.findOne({ email: email }).lean();
  return user ? true : false;
};

export const isPhoneNumberExist = async (phoneNumber: string) => {
  const user = await User.findOne({ phoneNumber: phoneNumber }).lean();
  return user ? true : false;
};

export const handleRegistration = async (user: RegistrationBodyDTO) => {
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

  const userPassword = user.password;
  const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

  const secureUser = {
    ...user,
    password: hashedPassword,
  };

  //! added cause here it was just the generic message without it not knowing if from mongoose, server, why etc.
  try {
    await User.create(secureUser);
    //TODO: More should be returned in the future for login redirect
    //TODO: Just be careful here not to leak the bcrypt hash
    return { message: "Registration is successful" };
  } catch (error) {
    //! Relies on auto-indexing at the moment may  require .init() in the future
    //! 11000 is the err code for duplicate entry in DB!!!!
    //! it is already validated one by one but if 2 very close request comes and reach to mongoose.write this is needed to understand
    //! the race conditions happen so it's a good practice, i saw incidents where similar issues occured and it is a good practice to log it properly
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      throw new AlreadyExistsError(
        "A user with one of the detail already exist",
      );
    }

    throw new Error("Something went wrong, registration has failed", {
      cause: error,
    });
  }
};
