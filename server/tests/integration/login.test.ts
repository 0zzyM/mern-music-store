import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import request from "supertest";
import app from "../../app.js";
import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import { saltRounds } from "../../config/constants.js";
import Session from "../../models/sessionModel.js";

let mongoServer: MongoMemoryServer;

const user = {
  name: "Ozzy",
  surname: "Acar",
  email: "ozzytest123123@gmail.com",
  phoneNumber: "+35679123456",
  password: "123EasyPassword123!",
};

const userCredentials = {
  email: "ozzytest123123@gmail.com",
  password: "123EasyPassword123!",
};

beforeAll(async () => {
  vi.stubEnv("JWT_SECRET", "test-access-secret");
  vi.stubEnv("JWT_REFRESH_SECRET", "test-refresh-secret");

  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  await User.create({
    ...user,
    password: await bcrypt.hash(user.password, saltRounds),
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  vi.unstubAllEnvs();
});

describe("login", () => {
  it("signs in the user successfully", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(userCredentials);

    const cookies = response.headers["set-cookie"] as unknown as string[];

    const accessCookie = cookies.find((cookie) =>
      cookie.startsWith("accessToken="),
    );

    const refreshCookie = cookies.find((cookie) =>
      cookie.startsWith("refreshToken="),
    );

    const savedUser = await User.findOne({ email: user.email });

    expect(savedUser).not.toBeNull();

    if (!savedUser) {
      throw new Error("Test user was not found");
    }

    const session = await Session.findOne({
      userId: savedUser._id,
    });

    expect(session).not.toBeNull();
    expect(session?.expiresAt.getTime()).toBeGreaterThan(Date.now());
    expect(session?.hashedRefreshToken).toBeDefined();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Login Successful",
    });
    expect(response.body).not.toHaveProperty("password");

    expect(accessCookie).toBeDefined();
    expect(refreshCookie).toBeDefined();

    expect(accessCookie).toContain("HttpOnly");
    expect(accessCookie).toContain("SameSite=Strict");

    expect(refreshCookie).toContain("HttpOnly");
    expect(refreshCookie).toContain("SameSite=Strict");
    expect(refreshCookie).toContain("Path=/api/v1/auth");
  });

  it("rejects with a generic message if the password is wrong", async () => {
    const invalidUser = { ...userCredentials, password: "ABCD+abc123" };

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(invalidUser);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid email or password",
    });
    expect(response.body).not.toHaveProperty("password");
    expect(response.headers["set-cookie"]).toBeUndefined();
  });

  it("rejects with a generic message if the email doesn't exist", async () => {
    const invalidUser = { ...userCredentials, email: "random@email.com" };

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(invalidUser);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid email or password",
    });
    expect(response.body).not.toHaveProperty("password");
    expect(response.headers["set-cookie"]).toBeUndefined();
  });
});

describe("login email validation", () => {
  it("rejects if email is missing ", async () => {
    const { email, ...invalidUser } = userCredentials;

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "email is required",
    });
    expect(response.headers["set-cookie"]).toBeUndefined();
  });
  it("rejects if the email is too long ", async () => {
    const emailOverLimit = `${"a".repeat(246)}@email.com`;
    const invalidUser = { ...userCredentials, email: emailOverLimit };
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "email can't exceed 254 characters",
    });
    expect(response.headers["set-cookie"]).toBeUndefined();
  });

  it("rejects if the email does not contain @ ", async () => {
    const invalidUser = { ...userCredentials, email: "xyz.com" };
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Provided email address is invalid",
    });
    expect(response.headers["set-cookie"]).toBeUndefined();
  });

  it("rejects if the email contain language specific character ", async () => {
    const invalidUser = { ...userCredentials, email: "ĞĞĞĞ@email.com" };
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(invalidUser);
    expect(response.body).toEqual({
      message: "Provided email address is invalid",
    });
    expect(response.status).toBe(400);
    expect(response.headers["set-cookie"]).toBeUndefined();
  });
});

describe("login password validation", () => {
  it("rejects if password is missing ", async () => {
    const { password, ...invalidUser } = userCredentials;

    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "password is required",
    });
    expect(response.headers["set-cookie"]).toBeUndefined();
  });
  it("rejects a password longer than 72 bytes", async () => {
    const password73Bytes = `A1!${"a".repeat(70)}`;
    const invalidUser = { ...userCredentials, password: password73Bytes };
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "password is too long",
    });
    expect(response.headers["set-cookie"]).toBeUndefined();
  });

  it("rejects a password longer than 72 bytes", async () => {
    const password73Bytes = `A1!🎸${"a".repeat(66)}`;
    const invalidUser = { ...userCredentials, password: password73Bytes };
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "password is too long",
    });
    expect(response.headers["set-cookie"]).toBeUndefined();
  });
});
