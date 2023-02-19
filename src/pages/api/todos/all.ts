import { Comment, Todo } from "@prisma/client";
import { APIRoute } from "astro";
import { getAuthCookie } from "../../../utils/auth";
import prisma from "../../../utils/prisma";

export type TodoFull = Todo & {
  user: {
    id: string;
    username: string;
  };
  comments: (Comment & {
    commenter: {
      id: string;
      username: string;
    };
  })[];
};
export const get: APIRoute = async ({ cookies }) => {
  const userid = getAuthCookie(cookies);
  if (!userid) return new Response(null, { status: 401 });

  const todos = await prisma.todo.findMany({
    where: { userId: { not: userid } },
    include: {
      user: { select: { id: true, username: true } },
      comments: {
        include: {
          commenter: { select: { id: true, username: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return new Response(JSON.stringify(todos));
};
