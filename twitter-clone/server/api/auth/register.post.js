import { sendError } from "h3";
import { createUser } from "../../db/users";
import { userTransformer } from "../../transformers/user";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, username, email, password, repeatPassword } = body;

  if (!name || !username || !email || !password || !repeatPassword) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Invalid Params",
      })
    );
  }

  if (password !== repeatPassword) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Password don't Match" })
    );
  }

  const userData = {
    name,
    username,
    email,
    password,
    profileImage: "https://picsum.photos/200/200",
  };

  const user = await createUser(userData);

  return {
    body: userTransformer(user),
  };
});
