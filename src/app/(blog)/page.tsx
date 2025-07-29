import Container from "@/app/(blog)/_components/layout/Container";
import Intro from "@/app/(blog)/_components/layout/Intro";
import BlogList from "@/app/(blog)/_components/layout/BlogList";
import CategorySelector from "./_components/common/Select/CategorySelector";
import { Suspense } from "react";
import BlogListFallback from "./_components/fallback/BlogListFallback";
export default function Home() {
  return (
    <div>
      <Intro title="BLOG">何かしらアウトプット用</Intro>
      <CategorySelector />
      <Container>
        <BlogList />
      </Container>
    </div>
  );
}
