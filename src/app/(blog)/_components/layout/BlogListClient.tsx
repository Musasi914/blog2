"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { BlogType, CategoryType } from "@/types/BlogType";
import { getBlogsPaginated, getBlogsPaginatedFromCategory } from "@/app/(blog)/_serverActions/getBlogsPaginated";
import BlogItem from "../common/List/BlogItem";
import Spinner from "../common/Spinner/Spinner";

const LIMIT = 10;

type Props = {
  initialBlogs: BlogType[];
  category?: CategoryType;
};

export default function BlogListClient({ initialBlogs, category }: Props) {
  const [blogs, setBlogs] = useState<BlogType[]>(initialBlogs);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

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
