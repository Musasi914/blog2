// src/app/api/blogs/route.ts
import { getBlogs, getBlogsFromCategory } from "@/app/(blog)/_libs/microCMSFunc";
import { CategoryType } from "@/types/BlogType";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? 10);
  const offset = Number(searchParams.get("offset") ?? 0);

  // 必要に応じてカテゴリも取得
  const category = searchParams.get("category") as CategoryType;

  const blogs = category ? await getBlogsFromCategory(category, limit, offset) : await getBlogs(limit, offset);

  return NextResponse.json(blogs);
}
