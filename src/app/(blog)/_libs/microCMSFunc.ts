import { CategoryType } from "@/types/BlogType";
import { createClient } from "microcms-js-sdk";
export const client = createClient({
  serviceDomain: process.env.SERVICE_DOMAIN || "",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

// 全ブログ取得
export async function getBlogs(limit = 10, offset = 0) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const data = await client.get({
    endpoint: "blog",
    queries: {
      limit,
      offset,
      fields: "id,title,summary,publishedAt,category.id,category.title",
      orders: "-publishedAt",
    },
  });
  return data.contents;
}

// 特定のブログ取得
export async function getPost(id: string) {
  const data = await client.get({
    endpoint: "blog",
    contentId: id,
  });
  return data;
}

// 静的生成用　idの配列取得
export async function getAllContentIds() {
  const data = await client.getAllContentIds({
    endpoint: "blog",
  });
  return data;
}

// カテゴリ別ブログ取得
export async function getBlogsFromCategory(category: CategoryType, limit = 10, offset = 0) {
  let categoryVariants;
  switch (category) {
    case "memory":
      categoryVariants = "sq6jyab_dcj";
      break;

    case "release":
      categoryVariants = "5plhbfsr2";
      break;

    case "learn":
      categoryVariants = "6x-voqyv7x_k";
      break;

    case "important":
      categoryVariants = "djjof-818q";
      break;

    default:
      break;
  }
  const data = await client.get({
    endpoint: "blog",
    queries: {
      limit,
      offset,
      fields: "id,title,summary,publishedAt,category.id,category.title",
      filters: `category[contains]${categoryVariants}`,
      orders: "-publishedAt",
    },
  });
  return data.contents;
}
