import { MetadataRoute } from "next";
import { getAllContentIds } from "@/app/(blog)/_libs/microCMSFunc";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.koh-fukuzawa.jp";

  // 静的ページ
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/labo`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ];

  // カテゴリページ
  const categories = ["memory", "release", "learn", "important"];
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // 動的ブログページ
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const blogIds = await getAllContentIds();
    if (Array.isArray(blogIds) && blogIds.length > 0) {
      blogPages = blogIds.map((id: string) => ({
        url: `${baseUrl}/${id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      }));
    } else {
      console.warn("No blog IDs found or empty array returned");
    }
  } catch (error) {
    console.error("Failed to fetch blog IDs for sitemap:", error);
    // エラーが発生してもサイトマップは生成する（静的ページのみ）
  }

  return [...staticPages, ...categoryPages, ...blogPages];
}
