"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { BlogType, CategoryType } from "@/types/BlogType";
import BlogItem from "../common/List/BlogItem";
import Spinner from "../common/Spinner/Spinner";

const LIMIT = 10;
const CACHE_EXPIRY_TIME = 60 * 60 * 1000; // 1時間（ミリ秒）

type Props = {
  category?: CategoryType;
  fetchBlogs: (
    limit: number,
    offset: number,
    category?: CategoryType
  ) => Promise<BlogType[]>;
  initialBlogs: BlogType[];
};

type CachedData = {
  blogs: BlogType[];
  timestamp: number;
};

export default function BlogListClient({
  category,
  fetchBlogs,
  initialBlogs,
}: Props) {
  const [blogs, setBlogs] = useState<BlogType[]>(initialBlogs || []);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  /**
   * セッションストレージからの初期データ読み込み（1時間の有効期限チェック付き）
   */
  useEffect(() => {
    const storageKey = category ? category : "blogList";
    const savedData = sessionStorage.getItem(storageKey);

    if (savedData) {
      try {
        const cached: CachedData = JSON.parse(savedData);
        const now = Date.now();

        // 1時間経過しているかチェック
        if (cached.timestamp && now - cached.timestamp < CACHE_EXPIRY_TIME) {
          // 有効期限内ならデータを使用
          setBlogs(cached.blogs);
        } else {
          // 1時間経過していたらセッションストレージをクリア
          sessionStorage.removeItem(storageKey);
          setBlogs(initialBlogs);
        }
      } catch (e) {
        // パースエラーなら削除
        sessionStorage.removeItem(storageKey);
        setBlogs(initialBlogs);
      }
    } else {
      setBlogs(initialBlogs);
    }
  }, [category, initialBlogs]);

  /**
   * セッションストレージへの保存（タイムスタンプ付き）
   */
  useEffect(() => {
    if (blogs.length > 0) {
      const uniqueBlogs = Array.from(
        new Map(blogs.map((blog) => [blog.id, blog])).values()
      );
      const storageKey = category ? category : "blogList";
      const cachedData: CachedData = {
        blogs: uniqueBlogs,
        timestamp: Date.now(),
      };
      sessionStorage.setItem(storageKey, JSON.stringify(cachedData));
    }
  }, [blogs, category]);

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
      const uniqueBlogs = Array.from(
        new Map(allBlogs.map((blog) => [blog.id, blog])).values()
      );
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
  }, [hasMore, loadMore]);

  /**
   * スクロール位置の復元（コンポーネントマウント時）
   */
  useEffect(() => {
    // 保存されたスクロール位置を復元
    const savedScrollPosition = sessionStorage.getItem(
      category ? `${category}-scrollPosition` : "scrollPosition"
    );
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
      return (
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset ||
        0
      );
    };

    // スクロールイベントでリアルタイム保存
    const handleScroll = () => {
      const currentScrollPosition = getScrollPosition();
      if (currentScrollPosition > 0) {
        sessionStorage.setItem(
          category ? `${category}-scrollPosition` : "scrollPosition",
          currentScrollPosition.toString()
        );
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
