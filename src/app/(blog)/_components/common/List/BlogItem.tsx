import { BlogCategoryType, BlogType } from "@/types/BlogType";
import ListUnderline from "./ListUnderline";
import Link from "next/link";
import dayjs from "dayjs";

dayjs.locale("ja");

export default function BlogItem({ blogData }: { blogData: BlogType }) {
  return (
    <ListUnderline className="border-b border-gray-400">
      <Link href={`/${blogData.id}`} className="px-2 py-5 block hover:opacity-80">
        <h2 className="text-xl leading-none">{blogData.title}</h2>
        <p className="line-clamp-1 whitespace-pre-line opacity-70 text-sm my-2">{blogData.summary ?? ""}</p>
        <div className="flex gap-x-2 flex-wrap-reverse">
          <p className="leading-none">
            <small>{dayjs(blogData.publishedAt).format("YYYY/MM/DD")}</small>
          </p>
          {blogData.category.length !== 0 && (
            <p className="leading-none mb-1">
              <small>
                {blogData.category.map((cat: BlogCategoryType) => (
                  <span key={cat.id} className="mr-2 py-1 rounded-sm px-2 break-keep inline-block bg-customgray">
                    {cat.title}
                  </span>
                ))}
              </small>
            </p>
          )}
        </div>
      </Link>
    </ListUnderline>
  );
}
