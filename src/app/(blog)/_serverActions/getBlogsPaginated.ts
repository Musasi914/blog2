"use server";
import { getBlogs, getBlogsFromCategory } from "@/app/(blog)/_libs/microCMSFunc";
import { CategoryType } from "@/types/BlogType";

export async function getBlogsPaginated(limit: number, offset: number) {
  return await getBlogs(limit, offset);
}

export async function getBlogsPaginatedFromCategory(category: CategoryType, limit: number, offset: number) {
  return await getBlogsFromCategory(category, limit, offset);
}
