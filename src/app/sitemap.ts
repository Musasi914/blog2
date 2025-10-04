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
    blogPages = blogIds.map((id: string) => ({
      url: `${baseUrl}/${id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));
  } catch (error) {
    console.error("Failed to fetch blog IDs for sitemap:", error);
  }

  return [...staticPages, ...categoryPages, ...blogPages];
}
