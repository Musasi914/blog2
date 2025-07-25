import { getBlogs, getBlogsFromCategory } from "@/app/(blog)/_libs/microCMSFunc";
import { BlogType } from "@/types/BlogType";
import BlogListClient from "./BlogListClient";

type BlogListProps = {
  category?: "learn" | "important" | "release" | "memory";
};

const LIMIT = 10;

export default async function BlogList({ category }: BlogListProps) {
  let initialBlogs: BlogType[];
  if (category == null) {
    initialBlogs = await getBlogs(LIMIT, 0);
  } else {
    initialBlogs = await getBlogsFromCategory(category, LIMIT, 0);
  }
  return <BlogListClient initialBlogs={initialBlogs} category={category} />;
}
