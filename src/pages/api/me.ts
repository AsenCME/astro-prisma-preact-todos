import { APIRoute } from "astro";
import { getAuthCookie, getUser } from "../../utils/auth";

export const get: APIRoute = async ({ cookies }) => {
  const userid = getAuthCookie(cookies);
  if (!userid) return new Response(null, { status: 401 });

  const user = await getUser(userid);
  return new Response(JSON.stringify(user));
};
