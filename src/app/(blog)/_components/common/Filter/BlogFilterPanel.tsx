"use client";

import { BlogListFilters } from "@/app/(blog)/_libs/blogListUrl";
import { CategoryType } from "@/types/BlogType";
import { useState } from "react";
import { filterFieldClassName } from "./filterFieldStyles";

const categoryLabelMap: Record<CategoryType, string> = {
  memory: "日記",
  important: "重要",
  learn: "覚えておきたい",
  release: "リリース",
};

function formatMonthLabel(value: string) {
  const [year, month] = value.split("-");
  return `${year}年${Number(month)}月`;
}

function buildFilterSummary(
  filters: BlogListFilters,
  category?: CategoryType
) {
  const parts: string[] = [];

  if (category) {
    parts.push(categoryLabelMap[category]);
  }
  if (filters.query.trim()) {
    parts.push(`「${filters.query.trim()}」`);
  }
  if (filters.dateFrom && filters.dateTo) {
    parts.push(
      `${formatMonthLabel(filters.dateFrom)}〜${formatMonthLabel(filters.dateTo)}`
    );
  } else if (filters.dateFrom) {
    parts.push(`${formatMonthLabel(filters.dateFrom)}〜`);
  } else if (filters.dateTo) {
    parts.push(`〜${formatMonthLabel(filters.dateTo)}`);
  }
  if (filters.sort === "oldest") {
    parts.push("古い順");
  }

  return parts.join(" / ");
}

type Props = {
  filters: BlogListFilters;
  category?: CategoryType;
  initialOpen?: boolean;
  children: React.ReactNode;
};

export default function BlogFilterPanel({
  filters,
  category,
  initialOpen = false,
  children,
}: Props) {
  const [open, setOpen] = useState(initialOpen);
  const summary = buildFilterSummary(filters, category);

  return (
    <div className="mb-4 w-full min-w-0 max-w-full overflow-x-clip">
      <button
        type="button"
        className={`${filterFieldClassName} sm:hidden flex items-center justify-between gap-2 cursor-pointer text-left`}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-controls="blog-filter-panel"
      >
        <span className="min-w-0">
          <span className="block">絞り込み</span>
          {!open && summary && (
            <span className="block text-xs opacity-70 truncate mt-0.5">
              {summary}
            </span>
          )}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`size-5 shrink-0 opacity-70 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div
        id="blog-filter-panel"
        className={`flex w-full min-w-0 max-w-full flex-col gap-4 overflow-x-clip ${open ? "flex" : "hidden"} sm:flex`}
      >
        {children}
      </div>
    </div>
  );
}
