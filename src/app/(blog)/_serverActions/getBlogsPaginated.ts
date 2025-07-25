"use server";

import { getBlogs, getBlogsFromCategory } from "@/app/(blog)/_libs/microCMSFunc";
import { CategoryType } from "@/types/BlogType";
import { cache } from "react";

export const getBlogsPaginated = cache(async (limit: number, offset: number) => {
  return await getBlogs(limit, offset);
});

export const getBlogsPaginatedFromCategory = cache(async (category: CategoryType, limit: number, offset: number) => {
  return await getBlogsFromCategory(category, limit, offset);
});
