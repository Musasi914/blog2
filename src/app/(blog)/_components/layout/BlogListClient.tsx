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
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);
  // blog配列が最初空のため、すぐにobserverが動作してしまうため、isInitialLoadを使用して、最初のロードを防ぐ
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const initialLoadRef = useRef(true);

  /**
   * セッションストレージからの初期データ読み込み
   */
  useEffect(() => {
    let savedBlogs: string | null = null;
    if (category) {
      savedBlogs = sessionStorage.getItem(category);
    } else {
      savedBlogs = sessionStorage.getItem(STORAGE_KEY_BLOGS);
    }
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      loadMore();
    }
    setIsInitialLoad(false);
  }, [category]);

  /**
   * セッションストレージへの保存
   */
  useEffect(() => {
    if (blogs.length > 0) {
      const uniqueBlogs = Array.from(new Map(blogs.map((blog) => [blog.id, blog])).values());
      if (category) {
        sessionStorage.setItem(category, JSON.stringify(uniqueBlogs));
      } else {
        sessionStorage.setItem(STORAGE_KEY_BLOGS, JSON.stringify(uniqueBlogs));
      }
    }
  }, [blogs, category]);

  /**
   * 無限スクロール
   */
  const loadMore = useCallback(async () => {
    if (!initialLoadRef.current) return;
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
        if (isInitialLoad) return;
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
  }, [hasMore, loadMore, isInitialLoad]);

  /**
   * スクロール位置の復元（コンポーネントマウント時）
   */
  useEffect(() => {
    // 保存されたスクロール位置を復元
    const savedScrollPosition = sessionStorage.getItem(category ? `${category}-scrollPosition` : "scrollPosition");
    if (savedScrollPosition && parseInt(savedScrollPosition) > 0) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition));
      }, 100);
    }
  }, []);

  /**
   * スクロール位置の保存と復元
   */
  useEffect(() => {
    // スクロール位置を取得する関数
    const getScrollPosition = () => {
      return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset || 0;
    };

    // スクロールイベントでリアルタイム保存
    const handleScroll = () => {
      const currentScrollPosition = getScrollPosition();
      if (currentScrollPosition > 0) {
        sessionStorage.setItem(category ? `${category}-scrollPosition` : "scrollPosition", currentScrollPosition.toString());
      }
    };
    window.addEventListener("scroll", handleScroll);

    // クリーンアップ
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
