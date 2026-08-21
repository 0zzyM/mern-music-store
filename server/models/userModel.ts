import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: false, //!so it won't be leaked!!
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export type UserDoc = mongoose.InferSchemaType<typeof userSchema>;

export default User;
