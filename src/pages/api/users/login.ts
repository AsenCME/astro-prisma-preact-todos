import { APIRoute } from "astro";
import { setAuthCookie } from "../../../utils/auth";
import prisma from "../../../utils/prisma";

export const post: APIRoute = async ({ cookies, request }) => {
  const data = await request.formData();
  const username = data.get("username").toString() ?? "";
  if (!username) throw new Error("You must specify a username");
  let user = await prisma.user.findFirst({
    where: { username },
    select: { id: true, username: true },
  });
  if (!user) user = await prisma.user.create({ data: { username } });
  setAuthCookie(cookies, user.id);
  return new Response(JSON.stringify(user));
};
