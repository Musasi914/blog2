import type { Metadata } from "next";
import Intro from "@/app/(blog)/_components/layout/Intro";
import Container from "@/app/(blog)/_components/layout/Container";
import BlogList from "@/app/(blog)/_components/layout/BlogList";
import { Suspense } from "react";
import BlogListFallback from "../../_components/fallback/BlogListFallback";
import { notFound } from "next/navigation";
import { getBlogsFromCategory } from "../../_libs/microCMSFunc";

type CategoryProps = {
  params: Promise<{ slug: "learn" | "important" | "release" | "memory" }>;
};

export const revalidate = 3600; // ISR: 1日ごとに再検証

export async function generateMetadata({
  params,
}: CategoryProps): Promise<Metadata> {
  const title = (await params).slug;
  return {
    title: title,
    description: `カテゴリー：${title}の一覧`,
    openGraph: {
      title: title,
      description: `カテゴリー：${title}の一覧`,
      // images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

export async function generateStaticParams() {
  const categories = ["important", "memory", "release", "learn"];
  return categories.map((category) => ({ slug: category }));
}

export default async function Category({ params }: CategoryProps) {
  const category = (await params).slug;
  if (
    category !== "important" &&
    category !== "memory" &&
    category !== "release" &&
    category !== "learn"
  ) {
    notFound();
  }
  let categoryJapanese: string = "カテゴリ";
  switch (category) {
    case "memory":
      categoryJapanese = "日記";
      break;
    case "important":
      categoryJapanese = "重要";
      break;
    case "release":
      categoryJapanese = "リリース";
      break;
    case "learn":
      categoryJapanese = "覚えておきたい";
      break;
    default:
      break;
  }
  const initialBlogs = await getBlogsFromCategory(category);
  return (
    <div>
      <Intro title="BLOG">カテゴリ：{categoryJapanese}</Intro>
      <Container>
        <Suspense fallback={<BlogListFallback />}>
          <BlogList category={category} initialBlogs={initialBlogs} />
        </Suspense>
      </Container>
    </div>
  );
}
