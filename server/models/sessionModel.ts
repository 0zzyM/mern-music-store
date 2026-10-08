import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    hashedRefreshToken: {
      type: String,
    },
  },
  { timestamps: true }, //keep it will needed for logged in time
);

sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
sessionSchema.index({ userId: 1 });

const Session = mongoose.model("Session", sessionSchema);

export type SessionDoc = mongoose.InferSchemaType<typeof sessionSchema>;

export default Session;
