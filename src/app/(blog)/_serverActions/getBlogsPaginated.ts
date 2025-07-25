"use server";
import { getBlogs } from "@/app/(blog)/_libs/microCMSFunc";

export async function getBlogsPaginated(limit: number, offset: number) {
  return await getBlogs(limit, offset);
}
