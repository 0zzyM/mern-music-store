import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { UnauthorizedError } from "../../errors/AppError.js";
import {
  createAccessToken,
  createRefreshToken,
  validateAccessToken,
  validateRefreshToken,
} from "../../services/tokenService.js";

const userID = "507f1f77bcf86cd799439011";
const sessionID = "507f1f77bcf86cd799439012";

beforeEach(() => {
  vi.stubEnv("JWT_SECRET", "test-access-secret");
  vi.stubEnv("JWT_REFRESH_SECRET", "test-refresh-secret");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("access tokens", () => {
  it("creates and validates an access token", () => {
    const token = createAccessToken(userID, sessionID, "user");

    expect(validateAccessToken(token)).toEqual({
      sub: userID,
      sid: sessionID,
      role: "user",
    });
  });

  it("rejects an invalid access token", () => {
    expect(() => validateAccessToken("randomToken")).toThrow(UnauthorizedError);
  });

  it("rejects an access token signed with another secret", () => {
    const token = createAccessToken(userID, sessionID, "user");
    vi.stubEnv("JWT_SECRET", "random-secret");
    expect(() => validateAccessToken(token)).toThrow(UnauthorizedError);
  });

  it("rejects to create the access token if secret is undefined", () => {
    vi.stubEnv("JWT_SECRET", undefined);
    expect(() => createAccessToken(userID, sessionID, "user")).toThrow(
      "JWT_SECRET is not defined",
    );
  });

  it("rejects to validate access token if secret is undefined", () => {
    const token = createAccessToken(userID, sessionID, "user");
    vi.stubEnv("JWT_SECRET", undefined);
    expect(() => validateAccessToken(token)).toThrow(
      "JWT_SECRET is not defined",
    );
  });
});

describe("refresh tokens", () => {
  it("creates and validates a refresh token", () => {
    const expiresAt = new Date(Date.now() + 60_000);
    const token = createRefreshToken(userID, sessionID, expiresAt);

    expect(validateRefreshToken(token)).toEqual({
      sub: userID,
      sid: sessionID,
      exp: Math.floor(expiresAt.getTime() / 1000),
    });
  });

  it("creates unique refresh tokens for identical inputs", () => {
    const expiresAt = new Date(Date.now() + 60_000);
    const firstToken = createRefreshToken(userID, sessionID, expiresAt);
    const secondToken = createRefreshToken(userID, sessionID, expiresAt);
    expect(firstToken).not.toBe(secondToken);
  });

  it("rejects an expired refresh token", () => {
    const expiredAt = new Date(Date.now() - 60_000); //min ago
    const token = createRefreshToken(userID, sessionID, expiredAt);
    expect(() => validateRefreshToken(token)).toThrow(UnauthorizedError);
  });

  it("rejects an invalid refresh token", () => {
    expect(() => validateRefreshToken("invalidToken")).toThrow(
      UnauthorizedError,
    );
  });

  it("refuses to create a refresh token when secret is undefined", () => {
    vi.stubEnv("JWT_REFRESH_SECRET", undefined);

    expect(() =>
      createRefreshToken(userID, sessionID, new Date(Date.now() + 60_000)),
    ).toThrow("JWT_REFRESH_SECRET is not defined");
  });

  it("refuses to validate a refresh token when secret is undefined", () => {
    const token = createRefreshToken(
      userID,
      sessionID,
      new Date(Date.now() + 60_000),
    );

    vi.stubEnv("JWT_REFRESH_SECRET", undefined);

    expect(() => validateRefreshToken(token)).toThrow(
      "JWT_REFRESH_SECRET is not defined",
    );
  });
});
