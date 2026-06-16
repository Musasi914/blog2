"use client";

import {
  BLOG_MONTH_MIN,
  getBlogMonthMax,
} from "@/app/(blog)/_libs/blogListUrl";
import { BlogSortOrder } from "@/types/BlogType";
import { useEffect, useState } from "react";
import {
  filterFieldClassName,
  filterFieldWrapperClassName,
  filterLabelClassName,
  filterSelectClassName,
  filterSelectStyle,
} from "./filterFieldStyles";

type Props = {
  query: string;
  sort: BlogSortOrder;
  dateFrom: string;
  dateTo: string;
  onQueryChange: (query: string) => void;
  onSortChange: (sort: BlogSortOrder) => void;
  onDateRangeChange: (dateFrom: string, dateTo: string) => void;
};

export default function BlogFilterBar({
  query,
  sort,
  dateFrom,
  dateTo,
  onQueryChange,
  onSortChange,
  onDateRangeChange,
}: Props) {
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== query) {
        onQueryChange(inputValue);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, query, onQueryChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onQueryChange(inputValue);
    }
  };

  const monthMax = getBlogMonthMax();
  const dateFromMax = dateTo && dateTo <= monthMax ? dateTo : monthMax;
  const dateToMin =
    dateFrom && dateFrom >= BLOG_MONTH_MIN ? dateFrom : BLOG_MONTH_MIN;

  return (
    <div className="flex flex-col gap-4">
      <label className={filterFieldWrapperClassName}>
        <span className={filterLabelClassName}>キーワード</span>
        <input
          type="search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="キーワードを入力"
          aria-label="キーワード"
          className={filterFieldClassName}
        />
      </label>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
        <label className={filterFieldWrapperClassName}>
          <span className={filterLabelClassName}>開始月</span>
          <input
            type="month"
            value={dateFrom}
            min={BLOG_MONTH_MIN}
            max={dateFromMax}
            onChange={(e) => onDateRangeChange(e.target.value, dateTo)}
            aria-label="開始月"
            className={filterFieldClassName}
          />
        </label>

        <span className="hidden sm:block pb-2.5 opacity-70">〜</span>

        <label className={filterFieldWrapperClassName}>
          <span className={filterLabelClassName}>終了月</span>
          <input
            type="month"
            value={dateTo}
            min={dateToMin}
            max={monthMax}
            onChange={(e) => onDateRangeChange(dateFrom, e.target.value)}
            aria-label="終了月"
            className={filterFieldClassName}
          />
        </label>

        <label className={filterFieldWrapperClassName}>
          <span className={filterLabelClassName}>並び順</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as BlogSortOrder)}
            aria-label="並び順"
            className={filterSelectClassName}
            style={filterSelectStyle}
          >
            <option value="newest">新しい順</option>
            <option value="oldest">古い順</option>
          </select>
        </label>
      </div>
    </div>
  );
}
