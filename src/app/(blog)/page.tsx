import Container from "@/app/(blog)/_components/layout/Container";
import Intro from "@/app/(blog)/_components/layout/Intro";
import BlogList from "@/app/(blog)/_components/layout/BlogList";
export default function Home() {
  return (
    <div>
      <Intro title="BLOG">何かしらアウトプット用</Intro>
      <Container>
        <BlogList />
      </Container>
    </div>
  );
}
