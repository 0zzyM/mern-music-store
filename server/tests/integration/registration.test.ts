import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../../app.js";
import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
// This will create an new instance of "MongoMemoryServer" and automatically start it

let mongoServer: MongoMemoryServer;

const user = {
  name: "Ozzy",
  surname: "Acar",
  email: "ozzytest123123@gmail.com",
  phoneNumber: "+35679123456",
  password: "123EasyPassword123!",
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("registration", () => {
  it("registers a user securely", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(user);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "Registration is successful",
    });

    expect(response.body).not.toHaveProperty("password");

    const savedUser = await User.findOne({ email: user.email }).select(
      "+password",
    );

    expect(savedUser).not.toBeNull();

    if (!savedUser) {
      throw new Error("Registered user was not saved during test");
    }

    expect(savedUser.password).not.toBe(user.password);
    expect(await bcrypt.compare(user.password, savedUser.password)).toBe(true);
    await User.deleteMany({});
  });
});

describe("registration field validation", () => {
  it("rejects if user is missing name ", async () => {
    const { name, ...invalidUser } = user;

    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });

  it("rejects if user is missing surname ", async () => {
    const { surname, ...invalidUser } = user;

    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });
  it("rejects if user is missing email ", async () => {
    const { email, ...invalidUser } = user;

    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });
  it("rejects if user is missing phone number ", async () => {
    const { phoneNumber, ...invalidUser } = user;

    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });

  it("rejects if user is missing password ", async () => {
    const { password, ...invalidUser } = user;

    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });

  it("rejects if phone number is not valid ", async () => {
    const invalidUser = { ...user, phoneNumber: "+35600000000" }; //Number from malta must start with 7 or 9
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
    expect(register.body).toEqual({
      message: "Please provide a valid phone number",
    });
  });
});

describe("registration email validation", () => {
  it("rejects if the email is too long ", async () => {
    const emailOverLimit = `${"a".repeat(246)}@email.com`;
    const invalidUser = { ...user, email: emailOverLimit };
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });

  it("rejects if the email does not contain @ ", async () => {
    const invalidUser = { ...user, email: "xyz.com" };
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });

  it("rejects if the email contain language specific character ", async () => {
    const invalidUser = { ...user, email: "ĞĞĞĞ@email.com" };
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });
});

describe("registration password validation", () => {
  it("rejects if the password is too short ", async () => {
    const invalidUser = { ...user, password: "1234+Aa" };
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });

  it("rejects if the password does not contain lowercase ", async () => {
    const invalidUser = { ...user, password: "1234+AAA" };
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });

  it("rejects if the password does not contain uppercase ", async () => {
    const invalidUser = { ...user, password: "1234+aaa" };
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });

  it("rejects if the password does not contain a number ", async () => {
    const invalidUser = { ...user, password: "ABCD+aaa" };
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });

  it("rejects if the password does not contain a special character", async () => {
    const invalidUser = { ...user, password: "1234Abcd" };
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });

  it("rejects if the password is too long(over 73 char)", async () => {
    const password73Bytes = `A1!${"a".repeat(70)}`;
    const invalidUser = { ...user, password: password73Bytes };
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });

  it("rejects if the password is too long and have emoji", async () => {
    const password73Bytes = `A1!🎸${"a".repeat(66)}`;
    const invalidUser = { ...user, password: password73Bytes };
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(invalidUser);

    expect(register.status).toBe(400);
  });

  it("accepts emoji as a part of password", async () => {
    const validPassword = "A1!🎸abcd";
    const validUser = { ...user, password: validPassword };
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(validUser);

    expect(register.status).toBe(201);
    await User.deleteMany({});
  });
});

describe("registration duplicate validation", () => {
  it("rejects if the email already exists", async () => {
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(user);

    expect(register.status).toBe(201);

    const registerAgain = await request(app)
      .post("/api/v1/auth/register")
      .send({
        ...user,
        email: "ozzytest123123@gmail.com",
        phoneNumber: "+35679123400",
      });

    expect(registerAgain.status).toBe(409);
    await User.deleteMany({});
  });

  it("rejects if the number already exists", async () => {
    const register = await request(app)
      .post("/api/v1/auth/register")
      .send(user);
    expect(register.status).toBe(201);

    const registerAgain = await request(app)
      .post("/api/v1/auth/register")
      .send({
        ...user,
        email: "ozzytest123123@gmail.co",
        phoneNumber: "+35679123456",
      });

    expect(registerAgain.status).toBe(409);
    await User.deleteMany({});
  });
});
