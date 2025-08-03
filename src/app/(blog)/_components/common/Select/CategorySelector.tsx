"use client";

import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/BlogType";
import { useCallback } from "react";

const categoryList = [
  { name: "日記", value: "memory" },
  { name: "重要", value: "important" },
  { name: "覚えておきたい", value: "learn" },
  { name: "リリース", value: "release" },
];

export default function CategorySelector({ visiting }: { visiting?: CategoryType }) {
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "all") router.push("/");
    else router.push(`/category/${value}`);
  };

  const getLatestBlogs = useCallback(async () => {
    sessionStorage.removeItem(visiting ? `${visiting}-scrollPosition` : "scrollPosition");
    sessionStorage.removeItem(visiting ? visiting : "blogList");
    window.location.reload();
  }, [visiting]);

  return (
    <div className="flex gap-4 align-center">
      <select
        name="select category"
        className="flex-1 border text-sm rounded-lg block  p-2.5 bg-background border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
        defaultValue={visiting ?? "all"}
        onChange={handleChange}
      >
        <option value="all">All</option>
        {categoryList.map((categoryData) => (
          <option key={categoryData.value} value={categoryData.value}>
            {categoryData.name}
          </option>
        ))}
      </select>
      <div className="z-10">
        <button className="bg-black block w-full h-full text-foreground px-4 py-2 rounded-md " onClick={getLatestBlogs}>
          最新記事の取得
        </button>
      </div>
    </div>
  );
}
