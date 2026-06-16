import {
  getBlogs,
  getBlogsFromCategory,
} from "@/app/(blog)/_libs/microCMSFunc";
import { BlogListQuery, BlogType, CategoryType } from "@/types/BlogType";
import BlogListClient from "./BlogListClient";
import { Suspense } from "react";
import BlogListFallback from "@/app/(blog)/_components/fallback/BlogListFallback";

async function fetchBlogs(
  limit: number,
  offset: number,
  category?: CategoryType,
  options?: BlogListQuery
) {
  "use server";
  const data = category
    ? await getBlogsFromCategory(category, limit, offset, options)
    : await getBlogs(limit, offset, options);
  return data;
}

export default function BlogList({
  category,
  initialBlogs,
}: {
  category?: CategoryType;
  initialBlogs: BlogType[];
}) {
  return (
    <Suspense fallback={<BlogListFallback />}>
      <BlogListClient
        category={category}
        fetchBlogs={fetchBlogs}
        initialBlogs={initialBlogs}
      />
    </Suspense>
  );
}
