import { APIRoute } from "astro";
import { getAuthCookie } from "../../../utils/auth";
import prisma from "../../../utils/prisma";

export const get: APIRoute = async ({ cookies, url }) => {
  const userid = getAuthCookie(cookies);
  const otherUserid = url.searchParams.get("userId");
  if (!otherUserid) return new Response(null, { status: 400 });
  if (userid === otherUserid)
    return new Response(null, { status: 400, statusText: "same_user" });
  const todos = await prisma.todo.findMany({ where: { userId: otherUserid } });
  return new Response(JSON.stringify(todos));
};
