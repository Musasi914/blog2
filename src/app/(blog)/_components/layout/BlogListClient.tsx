"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { BlogType, CategoryType } from "@/types/BlogType";
import { getBlogsPaginated, getBlogsPaginatedFromCategory } from "@/app/(blog)/_serverActions/getBlogsPaginated";
import BlogItem from "../common/List/BlogItem";
import Spinner from "../common/Spinner/Spinner";

const LIMIT = 10;
const STORAGE_KEY_BLOGS = "blogList";
// const STORAGE_KEY_SCROLL = "blogListScroll";

type Props = {
  initialBlogs: BlogType[];
  category?: CategoryType;
};

export default function BlogListClient({ initialBlogs, category }: Props) {
  const [blogs, setBlogs] = useState<BlogType[]>(() => {
    const saveList = sessionStorage.getItem(STORAGE_KEY_BLOGS);
    return saveList ? JSON.parse(saveList) : initialBlogs;
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  console.log("ルートです　レンダリング");

  /**
   * セッションストレージ
   */
  // blogsが変わるたびに保存
  useEffect(() => {
    const uniqueBlogs = Array.from(new Map(blogs.map((blog) => [blog.id, blog])).values());
    sessionStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(uniqueBlogs));
  }, [blogs]);

  //　ページ離脱時にスクロール位置保存
  // useEffect(() => {
  //   const saveScroll = () => {
  //     sessionStorage.setItem(STORAGE_KEY_SCROLL, String(window.scrollY));
  //   };
  //   window.addEventListener("beforeunload", saveScroll);
  //   return () => window.removeEventListener("beforeunload", saveScroll);
  // }, []);

  /**
   * 無限スクロール
   */
  // 記事読み込み
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextOffset = blogs.length;
    const newBlogs = category
      ? await getBlogsPaginatedFromCategory(category, LIMIT, nextOffset)
      : await getBlogsPaginated(LIMIT, nextOffset);
    if (newBlogs.length < LIMIT) setHasMore(false);
    setBlogs((prev) => [...prev, ...newBlogs]);
    setLoading(false);
  }, [blogs, loading, hasMore]);

  // observer
  useEffect(() => {
    if (!hasMore) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore, hasMore]);

  return (
    <>
      <ul>
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blogData={blog} />
        ))}
      </ul>
      {hasMore && <div ref={observerRef} style={{ height: 1 }} />}
      {loading && <Spinner />}
    </>
  );
}
