import { isValidObjectId } from "mongoose";
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

// At this point user will be pulled from the database.
// Will still validate it in case of mistakes on the service calling the method]#
// I guess the error messages should be generic
export const createSession = async (userID: string, expiresAt: Date) => {
  if (!isValidObjectId(userID)) {
    throw new BadRequestError("Something went wrong during session creation.");
  }

  if (expiresAt <= new Date()) {
    throw new BadRequestError("Something went wrong during session creation.");
  }

  const session = await Session.create({
    userId: userID,
    expiresAt: expiresAt,
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
