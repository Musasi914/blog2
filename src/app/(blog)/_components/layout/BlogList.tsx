import { getBlogs, getBlogsFromCategory } from "@/app/(blog)/_libs/microCMSFunc";
import { CategoryType } from "@/types/BlogType";
import BlogListClient from "./BlogListClient";

const LIMIT = 10;

async function fetchBlogs(limit: number, offset: number, category?: CategoryType) {
  const data = category ? await getBlogsFromCategory(category, limit, offset) : await getBlogs(limit, offset);
  return data;
}

export default async function BlogList({ category }: { category?: CategoryType }) {
  const initialBlogs = await fetchBlogs(LIMIT, 0, category);
  return <BlogListClient initialBlogs={initialBlogs} category={category} />;
}
