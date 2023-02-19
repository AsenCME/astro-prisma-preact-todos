import { Comment } from "@prisma/client";
import { APIRoute } from "astro";
import { getAuthCookie } from "../../utils/auth";
import prisma from "../../utils/prisma";

export type CommentWithUser = Comment & {
  commenter: {
    id: string;
    username: string;
  };
};
export const post: APIRoute = async ({ cookies, request }) => {
  const userid = getAuthCookie(cookies);
  if (!userid) return new Response(null, { status: 401 });

  const formData = await request.formData();
  const comment = await prisma.comment.create({
    data: {
      content: formData.get("content").toString() ?? "",
      commenter: { connect: { id: userid } },
      todo: { connect: { id: formData.get("todoid").toString() ?? "" } },
    },
    include: { commenter: { select: { id: true, username: true } } },
  });
  return new Response(JSON.stringify(comment));
};
