import { sendError } from "h3";
import bcrypt from "bcrypt";

import { userTransformer } from "../../transformers/user";
import { getUserByUsername } from "../../db/users";
import { createRefreshToken } from "../../db/refreshTokens";
import { generateTokens, sendRefreshToken } from "../../utils/jwt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { username, password } = body;

  if (!username || !password) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid Params",
      })
    );
  }

  // Is the user registered
  const user = await getUserByUsername(username);

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or Password is Invalid",
      })
    );
  }

  // Compare Passwords
  const doesPasswordMatch = await bcrypt.compare(password, user.password);

  if (!doesPasswordMatch) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Username or Password is Invalid",
      })
    );
  }

  // Generate Tokens
  // Access Token
  // Refresh Token
  const { accessToken, refreshToken } = generateTokens(user);

  // Save it inside DB
  await createRefreshToken({
    token: refreshToken,
    userId: user.id,
  });

  // Add http only cookie
  sendRefreshToken(event, refreshToken);

  return {
    access_token: accessToken,
    user: userTransformer(user),
  };
});
