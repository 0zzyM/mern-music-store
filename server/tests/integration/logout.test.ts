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

describe("POST /auth/logout", () => {
  it("logs out the user, cleans the cookies, ends the session", async () => {
    const sessionBefore = await Session.findOne({
      userId: user._id,
    });
    expect(cookies?.length).toBe(2);
    expect(sessionBefore).not.toBeNull();

    const response = await agent.post("/api/v1/auth/logout");

    const sessionAfter = await Session.findOne({
      userId: user._id,
    });

    expect(sessionAfter).toBeNull();

    const logoutCookies = response.headers["set-cookie"];

    if (!Array.isArray(logoutCookies)) {
      throw new Error(
        "Expected 2 Set-Cookie headers and didn't receive an array",
      );
    }

    const accessCookie = logoutCookies.find((cookie) =>
      cookie.startsWith("accessToken="),
    );

    const refreshCookie = logoutCookies.find((cookie) =>
      cookie.startsWith("refreshToken="),
    );

    expect(accessCookie).toContain("Expires=Thu, 01 Jan 1970");
    expect(refreshCookie).toContain("Expires=Thu, 01 Jan 1970");
  });

  it("logs out the user and ends the session when cookies are not present", async () => {
    const sessionBefore = await Session.findOne({
      userId: user._id,
    });
    expect(sessionBefore).not.toBeNull();

    cookies = undefined;

    const response = await agent.post("/api/v1/auth/logout");

    expect(response.status).toBe(200);

    const sessionAfter = await Session.findOne({
      userId: user._id,
    });

    expect(sessionAfter).toBeNull();
  });

  it("returns 200 even if session doesn't exist and clears the cookies", async () => {
    await Session.deleteMany();

    const response = await agent.post("/api/v1/auth/logout");

    const logoutCookies = response.headers["set-cookie"];

    if (!Array.isArray(logoutCookies)) {
      throw new Error(
        "Expected 2 Set-Cookie headers and didn't receive an array",
      );
    }

    const accessCookie = logoutCookies.find((cookie) =>
      cookie.startsWith("accessToken="),
    );

    const refreshCookie = logoutCookies.find((cookie) =>
      cookie.startsWith("refreshToken="),
    );

    expect(accessCookie).toContain("Expires=Thu, 01 Jan 1970");
    expect(refreshCookie).toContain("Expires=Thu, 01 Jan 1970");
  });
});

//TODO: after protected routes add tests to see if logout revoked the access!
