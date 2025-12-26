import Container from "@/app/(blog)/_components/layout/Container";
import Intro from "@/app/(blog)/_components/layout/Intro";
import BlogList from "@/app/(blog)/_components/layout/BlogList";
import { getInitialBlogs } from "./_libs/microCMSFunc";

export const revalidate = 86400; // ISR: 1日ごとに再検証

export default async function Home() {
  const initialBlogs = await getInitialBlogs();
  return (
    <div>
      <Intro title="BLOG">何かしらアウトプット用</Intro>
      <Container>
        <BlogList initialBlogs={initialBlogs} />
      </Container>
    </div>
  );
}
