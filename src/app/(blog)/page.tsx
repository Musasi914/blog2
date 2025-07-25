import Container from "@/app/(blog)/_components/layout/Container";
import Intro from "@/app/(blog)/_components/layout/Intro";
import BlogList from "@/app/(blog)/_components/layout/BlogList";
export default function Home() {
  return (
    <div>
      <Intro title="BLOG">
        何かしらアウトプット用。
        <br />
        三日坊主だけど続けてほしいと未来の自分へ思っている。
      </Intro>
      <Container>
        <BlogList />
      </Container>
    </div>
  );
}
