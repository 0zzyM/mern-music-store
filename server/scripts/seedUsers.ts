import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import User, { UserDoc } from "../models/userModel.js";

dotenv.config();

type UserSeed = Omit<UserDoc, "createdAt" | "updatedAt">;

const users: UserSeed[] = [
  {
    name: "Ozzy",
    surname: "Acar",
    email: `ozzytest123123@gmail.com`,
    phoneNumber: "+35600000000",
    address: "123, 123. Street, Malta",
    password: "123EasyPassword123", //no encrypt temp
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await User.deleteMany({});
    await User.insertMany(users);
    console.log(`${users.length} user inserted successfully`);
  } catch (error) {
    console.error("Seed error:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
