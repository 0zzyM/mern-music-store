import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import User, { UserDoc } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { saltRounds } from "../config/constants.js";

dotenv.config();

type UserSeed = Omit<UserDoc, "createdAt" | "updatedAt">;

const users: UserSeed[] = [
  {
    name: "Ozzy",
    surname: "Acar",
    email: `ozzytest123123@gmail.com`,
    phoneNumber: "+35600000000",
    address: "123, 123. Street, Malta",
    password: "123EasyPassword123",
    role: "user",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, saltRounds),
      })),
    );

    await User.deleteMany({});
    await User.insertMany(hashedUsers);
    console.log(`${users.length} user inserted successfully`);
  } catch (error) {
    console.error("Seed error:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
