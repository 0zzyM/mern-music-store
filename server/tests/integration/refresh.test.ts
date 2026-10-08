import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  vi,
  beforeEach,
} from "vitest";
import request from "supertest";
import app from "../../app.js";
import User, { UserDoc } from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import { saltRounds } from "../../config/constants.js";
import Session from "../../models/sessionModel.js";
import { createHash } from "node:crypto";

let mongoServer: MongoMemoryServer;
let agent: ReturnType<typeof request.agent>;
let cookies: string | string[] | undefined;
let user: mongoose.HydratedDocument<UserDoc>;

const userDetails = {
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

  user = await User.create({
    ...userDetails,
    password: await bcrypt.hash(userDetails.password, saltRounds),
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  vi.unstubAllEnvs();
});

beforeEach(async () => {
  agent = request.agent(app);

  const response = await agent
    .post("/api/v1/auth/login")
    .send(userCredentials)
    .expect(200);

  cookies = response.headers["set-cookie"];
});

describe("happy refresh path", () => {
  it("refreshes the accessToken and rotates refreshToken", async () => {
    const sessionBefore = await Session.findOne({
      userId: user._id,
    });

    if (sessionBefore === null) {
      throw new Error("Session is null");
    }

    if (!Array.isArray(cookies)) {
      throw new Error(
        "Expected 2 Set-Cookie headers and didn't receive an array",
      );
    }

    const accessCookie = cookies.find((cookie) =>
      cookie.startsWith("accessToken="),
    );

    const refreshCookie = cookies.find((cookie) =>
      cookie.startsWith("refreshToken="),
    );

    expect(accessCookie).toBeDefined();
    expect(refreshCookie).toBeDefined();

    const response = await agent.post("/api/v1/auth/refresh");

    const sessionAfter = await Session.findOne({
      userId: user._id,
    });

    if (sessionAfter === null) {
      throw new Error("Session is null");
    }

    expect(response.status).toBe(200);

    expect(sessionBefore._id).toEqual(sessionAfter._id);

    expect(sessionBefore.hashedRefreshToken).not.toEqual(
      sessionAfter.hashedRefreshToken,
    );

    const newCookies = response.headers["set-cookie"];

    if (!Array.isArray(newCookies)) {
      throw new Error(
        "Expected 2 Set-Cookie headers and didn't receive an array",
      );
    }

    const newAccessCookie = newCookies.find((cookie) =>
      cookie.startsWith("accessToken="),
    );

    const newRefreshCookie = newCookies.find((cookie) =>
      cookie.startsWith("refreshToken="),
    );

    expect(newAccessCookie).toBeDefined();
    expect(newRefreshCookie).toBeDefined();

    expect(newRefreshCookie).not.toBe(refreshCookie);

    // Verify the new refresh token is the one stored in the session
    const newRefreshToken = newRefreshCookie!.split(";")[0].split("=")[1];

    const hashedNewRefreshToken = createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    expect(sessionAfter.hashedRefreshToken).toBe(hashedNewRefreshToken);
  });
});

describe("unhappy refresh path", () => {
  it("rejects the old refresh token and ends the session", async () => {
    if (!Array.isArray(cookies)) {
      throw new Error(
        "Expected 2 Set-Cookie headers and didn't receive an array",
      );
    }

    const oldRefreshCookie = cookies.find((cookie) =>
      cookie.startsWith("refreshToken="),
    );

    if (!oldRefreshCookie) {
      throw new Error("Refresh cookie not found");
    }

    const oldRefreshToken = oldRefreshCookie.split(";")[0].split("=")[1];

    // First refresh succeeds and rotates the token
    await agent.post("/api/v1/auth/refresh").expect(200);

    // Second refresh with old token must fail and throw 401
    await request(app)
      .post("/api/v1/auth/refresh")
      .set("Cookie", `refreshToken=${oldRefreshToken}`)
      .expect(401);

    const session = await Session.findOne({ userID: user._id });
    expect(session).toBeNull();
  });

  it("rejects if refresh token is missing", async () => {
    if (!Array.isArray(cookies)) {
      throw new Error(
        "Expected 2 Set-Cookie headers and didn't receive an array",
      );
    }

    const accessCookie = cookies.find((cookie) =>
      cookie.startsWith("accessToken="),
    );

    if (!accessCookie) {
      throw new Error("Access cookie not found");
    }

    const accessToken = accessCookie.split(";")[0].split("=")[1];

    await request(app)
      .post("/api/v1/auth/refresh")
      .set("Cookie", `accessToken=${accessToken}`)
      .expect(401);
  });

  it("rejects if refresh token is missing", async () => {
    if (!Array.isArray(cookies)) {
      throw new Error(
        "Expected 2 Set-Cookie headers and didn't receive an array",
      );
    }

    const accessCookie = cookies.find((cookie) =>
      cookie.startsWith("accessToken="),
    );

    if (!accessCookie) {
      throw new Error("Access cookie not found");
    }

    const accessToken = accessCookie.split(";")[0].split("=")[1];

    await request(app)
      .post("/api/v1/auth/refresh")
      .set("Cookie", `accessToken=${accessToken}`)
      .expect(401);
  });

  it("rejects if refresh token is invalid", async () => {
    if (!Array.isArray(cookies)) {
      throw new Error(
        "Expected 2 Set-Cookie headers and didn't receive an array",
      );
    }

    const accessCookie = cookies.find((cookie) =>
      cookie.startsWith("accessToken="),
    );

    if (!accessCookie) {
      throw new Error("Access cookie not found");
    }

    const accessToken = accessCookie.split(";")[0].split("=")[1];

    await request(app)
      .post("/api/v1/auth/refresh")
      .set(
        "Cookie",
        `accessToken=${accessToken}, refreshToken="invalidRandomToken"`,
      )
      .expect(401);
  });
});
