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
