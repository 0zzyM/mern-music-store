export const logout = async (accessToken: string, refreshToken: string) => {
  // if refreshToken is not valid fall back to accessToken
  if (!refreshToken || typeof refreshToken !== "string") {
    res.clearCookie("refreshToken", { path: "/api/v1/auth" }); //* If I didn't add path as an option here didn't clear the cookie.
    if (!accessToken) {
      res.clearCookie("accessToken");
      console.log(
        "Something is wrong, user provided invalid tokens on logout request!\n Check the session ",
      );
      throw new UnauthorizedError("Something went wrong, invalid cookies");
    }
    const decoded = validateAccessToken(accessToken);
    if (typeof decoded === "string")
      throw new UnauthorizedError("Invalid token, logout failed");

    if (!decoded.sid || typeof decoded.sid !== "string") {
      throw new UnauthorizedError("Invalid token content, logout failed");
    }

    await endSession(decoded.sid);
    return res.status(200).json("Logout Successful with Access token");
  }

  const decoded = validateRefreshToken(refreshToken);

  await endSession(decoded.sid);

  res.status(200).json("Logout Successful");
};
