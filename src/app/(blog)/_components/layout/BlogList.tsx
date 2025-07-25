import { getBlogs } from "@/app/(blog)/_libs/microCMSFunc";
import { BlogType } from "@/types/BlogType";
import BlogListClient from "./BlogListClient";

const LIMIT = 10;

export default async function BlogList() {
  const initialBlogs: BlogType[] = await getBlogs(LIMIT, 0);
  return <BlogListClient initialBlogs={initialBlogs} />;
}
