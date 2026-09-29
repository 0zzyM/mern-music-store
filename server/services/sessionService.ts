import { isValidObjectId } from "mongoose";
import type { Types } from "mongoose";
import { BadRequestError, UnauthorizedError } from "../errors/AppError.js";
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

  if (!session) throw new UnauthorizedError("Session Expired");
  return session;
};

//Removed isValidObjectID validation, fn accepts only ObjectID now
export const createSession = async (userID: string | Types.ObjectId) => {
  const sessionExpiresAt = new Date();
  sessionExpiresAt.setDate(sessionExpiresAt.getDate() + 30); // Adds 30 days

  const session = await Session.create({
    userId: userID,
    expiresAt: sessionExpiresAt,
  });

  return session;
};

export const endSession = async (sessionID: string | Types.ObjectId) => {
  if (!isValidObjectId(sessionID)) {
    throw new BadRequestError("Invalid SessionID");
  }

  await Session.deleteOne({ _id: sessionID });
};

export const rotateRefreshTokenHash = async (
  id: string,
  expectedHash: string,
  newHash: string,
) => {
  const result = await Session.updateOne(
    {
      _id: id,
      hashedRefreshToken: expectedHash,
      expiresAt: { $gt: new Date() },
    },
    {
      $set: { hashedRefreshToken: newHash },
    },
  );

  if (result.matchedCount === 0) {
    throw new UnauthorizedError("Refresh token is no longer valid");
  }
};
