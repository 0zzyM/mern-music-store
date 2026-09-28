import { isValidObjectId } from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/AppError.js";
import User from "../models/userModel.js";
import { USER_ROLES } from "../config/constants.js";

/*
const DEFAULT_FIELDS = "name surname email phoneNumber createdAt";
*/
const PROFILE_FIELDS = "name surname email phoneNumber address createdAt";

export const getAllUsers = async () => {
  /*
  const users = await User.find({}, DEFAULT_FIELDS);

  return users;
  */

  return null;
};

export const getUserById = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError("User ID is not valid.");
  }
  const user = await User.findOne({ _id: id }, PROFILE_FIELDS).lean();

  if (!user) {
    throw new NotFoundError("User was not found");
  }

  return null;

  /*
  return user;
  */
};

export const getUserRolebyId = async (id: string) => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError("User ID is not valid.");
  }

  const user = await User.findOne({ _id: id }, "role").lean();

  if (!user || !USER_ROLES.includes(user.role)) {
    throw new NotFoundError("User role doesn't exist, unexpected error");
  }

  return user.role;
};
