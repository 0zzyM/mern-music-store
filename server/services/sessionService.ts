import { isValidObjectId } from "mongoose";
import type { Types } from "mongoose";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/AppError.js";
import Session from "../models/sessionModel.js";

// Validating if the useragent has a valid session
// TODO: Centralize the input validation !!!
export const validateSession = async (sessionID: string) => {
  if (!isValidObjectId(sessionID)) {
    throw new BadRequestError("Invalid SessionID");
  }

  const session = await Session.findOne({
    _id: sessionID,
    expiresAt: { $gt: new Date() },
  });

  if (!session || session.expiresAt < new Date())
    throw new UnauthorizedError("Session Expired");

  return session;
};

//Removed isValidObjectID validation, fn accepts only ObjectID now
export const createSession = async (userID: Types.ObjectId) => {
  const sessionExpiresAt = new Date();
  sessionExpiresAt.setDate(sessionExpiresAt.getDate() + 30); // Adds 30 days

  const session = await Session.create({
    userId: userID,
    expiresAt: sessionExpiresAt,
  });

  return session;
};

export const endSession = async (sessionID: string) => {
  if (!isValidObjectId(sessionID)) {
    throw new BadRequestError("Invalid SessionID");
  }

  const result = await Session.deleteOne({ _id: sessionID });

  if (result.deletedCount === 0) {
    throw new NotFoundError("Error ending the session, session not found");
  }
};
