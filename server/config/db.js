import mongoose from "mongoose";
//import dotenv from "dotenv"; //not needed here as it is called in server.js

export const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connection Successful");
  } catch (error) {
    console.error("Connection to Atlas Failed", error);
    process.exit(1);
  }
};
