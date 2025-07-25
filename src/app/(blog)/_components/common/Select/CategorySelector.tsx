"use client";

import { useRouter } from "next/navigation";
import { CategoryType } from "@/types/BlogType";
import Container from "../../layout/Container";

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

  return (
    <Container>
      <select
        name="select category"
        className="border text-sm rounded-lg block w-full p-2.5 mb-4 bg-background border-gray-600 placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500"
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
    </Container>
  );
}
