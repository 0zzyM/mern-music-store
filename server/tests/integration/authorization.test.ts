import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { createAccessToken } from "../../services/tokenService.js";
import User, { UserDoc } from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import { saltRounds } from "../../config/constants.js";

let mongoServer: MongoMemoryServer;
let user: mongoose.HydratedDocument<UserDoc>;
let userID: string;
let admin: mongoose.HydratedDocument<UserDoc>;
let adminID: string;

const userDetails = {
  name: "Ozzy",
  surname: "Acar",
  email: "ozzytest123123@gmail.com",
  phoneNumber: "+35679123456",
  password: "123EasyPassword123!",
};

const adminDetails = {
  name: "Ozzy",
  surname: "Acar",
  email: "admintest123123@gmail.com",
  phoneNumber: "+35679123457",
  password: "123EasyPassword123!",
};

beforeAll(async () => {
  vi.stubEnv("JWT_SECRET", "test-access-secret");
  vi.stubEnv("JWT_REFRESH_SECRET", "test-refresh-secret");

  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  user = await User.create({
    ...userDetails,
    password: await bcrypt.hash(userDetails.password, saltRounds),
  });

  admin = await User.create({
    ...adminDetails,
    password: await bcrypt.hash(adminDetails.password, saltRounds),
    role: "admin",
  });

  userID = user._id.toString();
  adminID = admin._id.toString();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  vi.unstubAllEnvs();
});

describe("/profile tests", () => {
  it("rejects if missing the access cookie", async () => {
    const response = await request(app).get("/api/v1/profile");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Missing Auth Token!",
    });
    expect(response).not.toBeNull();
  });

  it("returns the user's profile", async () => {
    const token = createAccessToken(userID, "test-session-id", "user");

    const response = await request(app)
      .get("/api/v1/profile")
      .set("Cookie", `accessToken=${token}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(userID);
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).not.toHaveProperty("role");
  });
});

describe("/users rbac tests", () => {
  it("rejects if missing the access cookie", async () => {
    const response = await request(app).get("/api/v1/users");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Missing Auth Token!",
    });
    expect(response).not.toBeNull();
  });

  it("rejects the permision is not admin or owner", async () => {
    const token = createAccessToken(userID, "test-session-id", "user");

    const response = await request(app)
      .get(`/api/v1/users/${userID}`)
      .set("Cookie", `accessToken=${token}`);

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "User role does not have sufficient permissions.",
    });
    expect(response).not.toBeNull();
  });

  it("returns the user's details when permission is admin", async () => {
    const token = createAccessToken(adminID, "test-session-id", "admin");

    const response = await request(app)
      .get(`/api/v1/users/${userID}`)
      .set("Cookie", `accessToken=${token}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(userID);
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("role");
  });
});
