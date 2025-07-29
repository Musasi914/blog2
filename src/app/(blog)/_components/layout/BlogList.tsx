import { getBlogs, getBlogsFromCategory } from "@/app/(blog)/_libs/microCMSFunc";
import { CategoryType } from "@/types/BlogType";
import BlogListClient from "./BlogListClient";

const LIMIT = 10;

async function fetchBlogs(limit: number, offset: number, category?: CategoryType) {
  "use server";
  const data = category ? await getBlogsFromCategory(category, limit, offset) : await getBlogs(limit, offset);
  return data;
}

export default function BlogList({ category }: { category?: CategoryType }) {
  return <BlogListClient category={category} fetchBlogs={fetchBlogs} />;
}
