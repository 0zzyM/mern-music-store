import { isValidObjectId } from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/AppError.js";
import User from "../models/userModel.js";

export const getAllUsers = async () => {
  const users = await User.find();

  return users;
};

export const getUserById = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError("User ID is not valid.");
  }
  const user = await User.findOne({ _id: id }).lean();

  if (!user) {
    throw new NotFoundError("User was not found");
  }

  return user;
};
