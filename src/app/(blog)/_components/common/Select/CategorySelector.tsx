"use client";

import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/BlogType";

const categoryList = [
  { name: "日記", value: "memory" },
  { name: "重要", value: "important" },
  { name: "覚えておきたい", value: "learn" },
  { name: "リリース", value: "release" },
];

export default function CategorySelector({
  visiting,
}: {
  visiting?: CategoryType;
}) {
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "all") router.push("/");
    else router.push(`/category/${value}`);
  };

  return (
    <div className="flex gap-4 align-center">
      <select
        name="select category"
        className="flex-1 border text-sm rounded-lg block p-2.5 bg-background border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 cursor-pointer appearance-none"
        defaultValue={visiting ?? "all"}
        onChange={handleChange}
        aria-label="カテゴリで絞り込む"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg fill='none' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M6 8l4 4 4-4' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0.5rem center",
          backgroundSize: "1.5em 1.5em",
        }}
      >
        <option value="all">カテゴリ選択： All</option>
        {categoryList.map((categoryData) => (
          <option key={categoryData.value} value={categoryData.value}>
            {categoryData.name}
          </option>
        ))}
      </select>
    </div>
  );
}
