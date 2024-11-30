import { getAllIds, getPost } from "@/app/(blog)/_libs/client";
import Container from "../../_components/layout/Container";
import dayjs from "dayjs";
import { BlogCategoryType } from "@/types/BlogType";
import styles from "./_style/blogpost.module.css";
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // params.idから
  const { id } = await params;
  // 記事取得を取得
  const blog = await getPost(id);
  // dayjsを使ってpublishedAtをYY.MM.DD形式に
  const formattedPublishedAt = dayjs(blog.publishedAt).format("YYYY/MM/DD");
  const formattedUpdatedAt = dayjs(blog.updatedAt).format("YYYY/MM/DD");
  return (
    <Container>
      <div className="mt-10 border-b border-gray-500 py-5">
        <h1 className="text-2xl">{blog.title}</h1>
        {blog.category.length !== 0 && (
          <p className="mr-4">
            カテゴリ：
            {blog.category.map((cat: BlogCategoryType) => (
              <span key={cat.id} className="mr-2">
                {cat.title}
              </span>
            ))}
          </p>
        )}
        <p>
          <small>
            {formattedPublishedAt}
            {formattedPublishedAt !== formattedUpdatedAt &&
              ` -最終更新日： ${formattedUpdatedAt}`}
          </small>
        </p>
      </div>
      <div>
        <div
          className={styles.post}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </Container>
  );
}

// SGにするらしい
export async function generateStaticParams() {
  const ids = getAllIds();
  return ids;
}
