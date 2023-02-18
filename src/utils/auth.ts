import { AstroCookies } from "astro";
import prisma from "./prisma";

export const getAuthCookie = (cookies: AstroCookies) =>
  cookies.get("userid").value;
export const setAuthCookie = (cookies: AstroCookies, userid: string) =>
  cookies.set("userid", userid, { path: "/" });

export const getUser = async (id: string) => {
  return await prisma.user.findFirst({
    where: { id },
    select: { id: true, username: true },
  });
};
