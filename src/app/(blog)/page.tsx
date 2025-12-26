import Container from "@/app/(blog)/_components/layout/Container";
import Intro from "@/app/(blog)/_components/layout/Intro";
import BlogList from "@/app/(blog)/_components/layout/BlogList";
import { getBlogsForSSG } from "./_libs/microCMSFunc";

export default async function Home() {
  const initialBlogs = await getBlogsForSSG();
  return (
    <div>
      <Intro title="BLOG">何かしらアウトプット用</Intro>
      <Container>
        <BlogList initialBlogs={initialBlogs} />
      </Container>
    </div>
  );
}
