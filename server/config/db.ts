import mongoose from "mongoose";

export const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not set — check server/.env");
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connection Successful");
  } catch (error) {
    console.error("Connection to Atlas Failed", error);
    process.exit(1);
  }
};
