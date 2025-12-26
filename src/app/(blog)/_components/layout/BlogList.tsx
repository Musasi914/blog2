import {
  getBlogs,
  getBlogsFromCategory,
} from "@/app/(blog)/_libs/microCMSFunc";
import { BlogType, CategoryType } from "@/types/BlogType";
import BlogListClient from "./BlogListClient";
import CategorySelector from "@/app/(blog)/_components/common/Select/CategorySelector";

async function fetchBlogs(
  limit: number,
  offset: number,
  category?: CategoryType
) {
  "use server";
  const data = category
    ? await getBlogsFromCategory(category, limit, offset)
    : await getBlogs(limit, offset);
  return data;
}

export default function BlogList({
  category,
  initialBlogs,
}: {
  category?: CategoryType;
  initialBlogs?: BlogType[];
}) {
  return (
    <>
      <CategorySelector visiting={category} />
      <BlogListClient
        category={category}
        fetchBlogs={fetchBlogs}
        initialBlogs={initialBlogs}
      />
    </>
  );
}
