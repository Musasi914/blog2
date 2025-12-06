import dynamic from "next/dynamic";

import { getAllContentIds, getPost } from "@/app/(blog)/_libs/microCMSFunc";
import Container from "@/app/(blog)/_components/layout/Container";
import dayjs from "dayjs";
import { BlogCategoryType } from "@/types/BlogType";
import type { Metadata } from "next";
import Link from "next/link";
const ConvertHtml = dynamic(
  () => import("@/app/(blog)/_components/layout/ConvertHtml")
);

type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  // ルートパラメータを読み取る
  const id = (await params).id;

  // データをフェッチする
  const blog = await getPost(id);

  // 親メタデータにアクセスして拡張する（置換しない）ことができます
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: blog.title,
    description: blog.summary,
    openGraph: {
      title: blog.title,
      description: blog.summary,
      // images: ["/some-specific-page-image.jpg", ...previousImages],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  // params.idから
  const { id } = await params;
  // 記事取得を取得
  const blog = await getPost(id);

  // dayjsを使ってpublishedAtをYY.MM.DD形式に
  const formattedPublishedAt = dayjs(blog.publishedAt).format("YYYY/MM/DD");

  return (
    <Container>
      <div className="pt-10 sm:pt-28">
        <div className="flex gap-x-8 gap-y-2 flex-wrap items-center justify-center py-4 border-y border-dashed border-gray-400 text-center">
          <h1 className="text-2xl mb-2">{blog.title}</h1>
          <div>
            {blog.category.length !== 0 && (
              <p className="flex gap-x-2 justify-center flex-wrap text-sm">
                {blog.category.map((cat: BlogCategoryType) => {
                  let category;
                  switch (cat.title) {
                    case "日記":
                      category = "memory";
                      break;
                    case "重要":
                      category = "important";
                      break;
                    case "リリース":
                      category = "release";
                      break;
                    case "覚えておきたい":
                      category = "learn";
                      break;
                    default:
                      break;
                  }
                  return (
                    <Link
                      href={`/category/${category}`}
                      key={cat.id}
                      className="bg-customgray px-2 rounded-sm hover:opacity-80"
                    >
                      {cat.title}
                    </Link>
                  );
                })}
              </p>
            )}
            <p>
              <small>{formattedPublishedAt}</small>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-16 sm:mb-40">
        <ConvertHtml htmlStr={blog.content} />
      </div>
    </Container>
  );
}

// SGにするらしい
export async function generateStaticParams() {
  const ids = await getAllContentIds();
  return ids.map((id: string) => ({ id }));
}
