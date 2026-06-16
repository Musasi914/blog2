"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CategoryType } from "@/types/BlogType";
import {
  buildBlogListUrlQueryString,
  parseBlogListFilters,
} from "@/app/(blog)/_libs/blogListUrl";
import {
  filterFieldWrapperClassName,
  filterLabelClassName,
  filterSelectClassName,
  filterSelectStyle,
} from "@/app/(blog)/_components/common/Filter/filterFieldStyles";

const categoryList = [
  { name: "日記", value: "memory" },
  { name: "重要", value: "important" },
  { name: "覚えておきたい", value: "learn" },
  { name: "リリース", value: "release" },
];

function buildCategoryUrl(value: string, searchParams: URLSearchParams) {
  const suffix = buildBlogListUrlQueryString(parseBlogListFilters(searchParams));

  if (value === "all") {
    return `/${suffix}`;
  }

  return `/category/${value}${suffix}`;
}

export default function CategorySelector({
  visiting,
}: {
  visiting?: CategoryType;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    router.push(buildCategoryUrl(value, searchParams));
  };

  return (
    <label className={filterFieldWrapperClassName}>
      <span className={filterLabelClassName}>カテゴリ</span>
      <select
        name="select category"
        className={filterSelectClassName}
        defaultValue={visiting ?? "all"}
        onChange={handleChange}
        aria-label="カテゴリ"
        style={filterSelectStyle}
      >
        <option value="all">All</option>
        {categoryList.map((categoryData) => (
          <option key={categoryData.value} value={categoryData.value}>
            {categoryData.name}
          </option>
        ))}
      </select>
    </label>
  );
}
