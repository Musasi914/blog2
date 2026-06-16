"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BlogListQuery, BlogType, CategoryType } from "@/types/BlogType";
import BlogItem from "../common/List/BlogItem";
import Spinner from "../common/Spinner/Spinner";
import BlogFilterBar from "../common/Filter/BlogFilterBar";
import BlogFilterPanel from "../common/Filter/BlogFilterPanel";
import CategorySelector from "../common/Select/CategorySelector";
import {
  BlogListFilters,
  buildBlogListPath,
  buildBlogListQueryOptions,
  buildBlogListScrollKey,
  buildBlogListStorageKey,
  buildBlogListUrlQueryString,
  hasActiveFilters,
  normalizeDateRange,
  parseBlogListFilters,
} from "@/app/(blog)/_libs/blogListUrl";

const LIMIT = 10;
const CACHE_EXPIRY_TIME = 60 * 60 * 1000; // 1時間（ミリ秒）

type Props = {
  category?: CategoryType;
  fetchBlogs: (
    limit: number,
    offset: number,
    category?: CategoryType,
    options?: BlogListQuery
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialFilters = parseBlogListFilters(searchParams);

  const [filters, setFilters] = useState<BlogListFilters>(initialFilters);
  const [blogs, setBlogs] = useState<BlogType[]>(initialBlogs || []);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const storageKey = buildBlogListStorageKey(category, filters);
  const scrollKey = buildBlogListScrollKey(category, filters);

  const updateUrl = useCallback(
    (nextFilters: BlogListFilters) => {
      const nextUrl = `${buildBlogListPath(category)}${buildBlogListUrlQueryString(nextFilters)}`;
      router.replace(nextUrl, { scroll: false });
    },
    [category, router]
  );

  const fetchAndSetBlogs = useCallback(
    async (offset: number, append: boolean, activeFilters: BlogListFilters) => {
      setLoading(true);
      const options = buildBlogListQueryOptions(activeFilters);
      const newBlogs = await fetchBlogs(LIMIT, offset, category, options);

      setHasMore(newBlogs.length >= LIMIT);
      setBlogs((prev) => {
        const allBlogs = append ? [...prev, ...newBlogs] : newBlogs;
        return Array.from(
          new Map(allBlogs.map((blog) => [blog.id, blog])).values()
        );
      });
      setLoading(false);
    },
    [category, fetchBlogs]
  );

  const resetAndFetch = useCallback(
    async (nextFilters: BlogListFilters) => {
      window.scrollTo(0, 0);
      sessionStorage.removeItem(scrollKey);
      setHasMore(true);
      await fetchAndSetBlogs(0, false, nextFilters);
    },
    [fetchAndSetBlogs, scrollKey]
  );

  const applyFilters = useCallback(
    (partial: Partial<BlogListFilters>) => {
      const nextFilters: BlogListFilters = {
        ...filters,
        ...partial,
      };

      if ("dateFrom" in partial || "dateTo" in partial) {
        const normalized = normalizeDateRange(
          nextFilters.dateFrom,
          nextFilters.dateTo
        );
        nextFilters.dateFrom = normalized.dateFrom;
        nextFilters.dateTo = normalized.dateTo;
      }

      const isSame =
        nextFilters.query === filters.query &&
        nextFilters.sort === filters.sort &&
        nextFilters.dateFrom === filters.dateFrom &&
        nextFilters.dateTo === filters.dateTo;

      if (isSame) return;

      setFilters(nextFilters);
      updateUrl(nextFilters);
      void resetAndFetch(nextFilters);
    },
    [filters, resetAndFetch, updateUrl]
  );

  /**
   * URL パラメータがある場合は初期データを再取得
   */
  useEffect(() => {
    if (initialized) return;

    if (hasActiveFilters(initialFilters)) {
      void resetAndFetch(initialFilters);
      setInitialized(true);
      return;
    }

    const savedData = sessionStorage.getItem(storageKey);

    if (savedData) {
      try {
        const cached: CachedData = JSON.parse(savedData);
        const now = Date.now();

        if (cached.timestamp && now - cached.timestamp < CACHE_EXPIRY_TIME) {
          setBlogs(cached.blogs);
          setHasMore(cached.blogs.length % LIMIT === 0);
        } else {
          sessionStorage.removeItem(storageKey);
          setBlogs(initialBlogs);
        }
      } catch {
        sessionStorage.removeItem(storageKey);
        setBlogs(initialBlogs);
      }
    } else {
      setBlogs(initialBlogs);
    }

    setInitialized(true);
  }, [initialBlogs, initialFilters, initialized, resetAndFetch, storageKey]);

  /**
   * セッションストレージへの保存（タイムスタンプ付き）
   */
  useEffect(() => {
    if (!initialized || blogs.length === 0) return;

    const uniqueBlogs = Array.from(
      new Map(blogs.map((blog) => [blog.id, blog])).values()
    );
    const cachedData: CachedData = {
      blogs: uniqueBlogs,
      timestamp: Date.now(),
    };
    sessionStorage.setItem(storageKey, JSON.stringify(cachedData));
  }, [blogs, initialized, storageKey]);

  /**
   * 無限スクロール
   */
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    await fetchAndSetBlogs(blogs.length, true, filters);
  }, [blogs.length, fetchAndSetBlogs, filters, hasMore, loading]);

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        void loadMore();
      }
    });
    const target = observerRef.current;
    if (target) {
      observer.observe(target);
    }
    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasMore, loadMore]);

  /**
   * スクロール位置の復元（コンポーネントマウント時）
   */
  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem(scrollKey);
    if (savedScrollPosition && parseInt(savedScrollPosition) > 0) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollPosition));
      }, 100);
    }
  }, [scrollKey]);

  /**
   * スクロール位置の保存
   */
  useEffect(() => {
    const getScrollPosition = () => {
      return (
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset ||
        0
      );
    };

    const handleScroll = () => {
      const currentScrollPosition = getScrollPosition();
      if (currentScrollPosition > 0) {
        sessionStorage.setItem(scrollKey, currentScrollPosition.toString());
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollKey]);

  return (
    <>
      <BlogFilterPanel
        filters={filters}
        category={category}
        initialOpen={hasActiveFilters(filters)}
      >
        <CategorySelector visiting={category} />
        <BlogFilterBar
          query={filters.query}
          sort={filters.sort}
          dateFrom={filters.dateFrom}
          dateTo={filters.dateTo}
          onQueryChange={(query) => applyFilters({ query })}
          onSortChange={(sort) => applyFilters({ sort })}
          onDateRangeChange={(dateFrom, dateTo) =>
            applyFilters({ dateFrom, dateTo })
          }
        />
      </BlogFilterPanel>
      {blogs.length === 0 && !loading ? (
        <p className="py-8 text-center text-sm opacity-70">
          該当する記事がありません
        </p>
      ) : (
        <ul>
          {blogs.map((blog) => (
            <BlogItem key={blog.id} blogData={blog} />
          ))}
        </ul>
      )}
      {hasMore && <div ref={observerRef} className="h-px" />}
      {loading && <Spinner />}
    </>
  );
}
