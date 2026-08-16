import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  // TODO: no encryption temporarily
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export type UserDoc = mongoose.InferSchemaType<typeof userSchema>;

export default User;
