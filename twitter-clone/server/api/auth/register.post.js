export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { name, username, email, password, repeatPassword } = body;

  if (!name || !username || !email || !password || !repeatPassword) {
    return sendError(event, createError({ statusCode: 400, statusMessage: "Invalid Params" }));
  }

  return {
    body: body,
  };
});
