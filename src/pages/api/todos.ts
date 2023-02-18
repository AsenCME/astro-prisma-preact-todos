import { Todo } from "@prisma/client";
import { APIRoute } from "astro";
import { getAuthCookie, getUser } from "../../utils/auth";
import prisma from "../../utils/prisma";

export type TodoWithUser = Todo & { user: { id: string; username: string } };
export type GetTodosReturn = TodoWithUser[];
export const get: APIRoute = async ({ cookies }) => {
  const userid = getAuthCookie(cookies);
  if (!userid) return new Response(null, { status: 401 });

  const todos = await prisma.todo.findMany({
    where: { userId: userid },
    include: { user: { select: { id: true, username: true } } },
    orderBy: { createdAt: "desc" },
  });
  return new Response(JSON.stringify(todos));
};

export const post: APIRoute = async ({ cookies, request }) => {
  const userid = getAuthCookie(cookies);
  if (!userid) return new Response(null, { status: 401 });

  const formData = await request.formData();
  const todo = await prisma.todo.create({
    data: {
      title: formData.get("title").toString() ?? "",
      notes: formData.get("notes").toString() ?? "",
      user: { connect: { id: userid } },
    },
  });
  const user = await getUser(userid);
  return new Response(JSON.stringify({ ...todo, user }));
};
