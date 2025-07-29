"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { BlogType, CategoryType } from "@/types/BlogType";
import BlogItem from "../common/List/BlogItem";
import Spinner from "../common/Spinner/Spinner";

const LIMIT = 10;
const STORAGE_KEY_BLOGS = "blogList";

type Props = {
  category?: CategoryType;
  fetchBlogs: (limit: number, offset: number, category?: CategoryType) => Promise<BlogType[]>;
};

export default function BlogListClient({ category, fetchBlogs }: Props) {
  const [blogs, setBlogs] = useState<BlogType[]>(() => {
    let savedBlogs: string | null = null;
    if (category) {
      savedBlogs = sessionStorage.getItem(category);
    } else {
      savedBlogs = sessionStorage.getItem(STORAGE_KEY_BLOGS);
    }
    return savedBlogs ? JSON.parse(savedBlogs) : [];
  });
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  /**
   * セッションストレージ
   */
  // blogsが変わるたびに保存
  useEffect(() => {
    const uniqueBlogs = Array.from(new Map(blogs.map((blog) => [blog.id, blog])).values());
    if (category) {
      sessionStorage.setItem(category, JSON.stringify(uniqueBlogs));
    } else {
      sessionStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(uniqueBlogs));
    }
  }, [blogs]);

  /**
   * 無限スクロール
   */
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextOffset = blogs.length;
    const newBlogs = await fetchBlogs(LIMIT, nextOffset, category);

    if (newBlogs.length < LIMIT) setHasMore(false);
    setBlogs((prev) => {
      const allBlogs = [...prev, ...newBlogs];
      const uniqueBlogs = Array.from(new Map(allBlogs.map((blog) => [blog.id, blog])).values());
      return uniqueBlogs;
    });
    setLoading(false);
  }, [loading, hasMore, blogs, category, fetchBlogs]);

  // observer
  useEffect(() => {
    if (!hasMore) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, observerRef, loadMore]);

  return (
    <>
      <ul>
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blogData={blog} />
        ))}
      </ul>
      {hasMore && <div ref={observerRef} className="h-px" />}
      {loading && <Spinner />}
    </>
  );
}
