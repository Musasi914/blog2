"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { BlogType, CategoryType } from "@/types/BlogType";
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
  const [blogs, setBlogs] = useState<BlogType[]>(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  /**
   * セッションストレージ
   */
  // useEffect(() => {
  //   const saveList = sessionStorage.getItem(STORAGE_KEY_BLOGS);
  //   if (saveList) setBlogs(JSON.parse(saveList));
  // }, []);

  // // blogsが変わるたびに保存
  // useEffect(() => {
  //   const uniqueBlogs = Array.from(new Map(blogs.map((blog) => [blog.id, blog])).values());
  //   sessionStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(uniqueBlogs));
  // }, [blogs]);

  /**
   * 無限スクロール
   */
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const nextOffset = blogs.length;
    const res = await fetch(`/api/blog?offset=${nextOffset}&limit=${LIMIT}`);
    if (!res.ok) {
      console.log("response false");
      setLoading(false);
      return;
    }
    const newBlogs: BlogType[] = await res.json();

    if (newBlogs.length < LIMIT) setHasMore(false);
    setBlogs((prev) => {
      const allBlogs = [...prev, ...newBlogs];
      const uniqueBlogs = Array.from(new Map(allBlogs.map((blog) => [blog.id, blog])).values());
      uniqueBlogs.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      return uniqueBlogs;
    });
    setLoading(false);
  }, [loading, hasMore, blogs]);

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
