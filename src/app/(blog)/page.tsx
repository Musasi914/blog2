import Container from "@/app/(blog)/_components/layout/Container";
import Intro from "@/app/(blog)/_components/layout/Intro";
import BlogList from "@/app/(blog)/_components/layout/BlogList";
import { Suspense } from "react";
import BlogListFallback from "./_components/fallback/BlogListFallback";
export default function Home() {
  return (
    <div>
      <Intro title="BLOG">
        何かしらアウトプット用。
        <br />
        三日坊主だけど続けてほしいと未来の自分へ思っている。
      </Intro>
      <Container>
        <Suspense fallback={<BlogListFallback />}>
          <BlogList />
        </Suspense>
      </Container>
    </div>
  );
}
