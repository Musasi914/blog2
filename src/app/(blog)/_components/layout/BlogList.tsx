import { getBlogs } from "@/app/(blog)/_libs/microCMSFunc";
import Link from "next/link";
import { BlogCategoryType, BlogType } from "@/types/BlogType";
import dayjs from "dayjs";
import ListUnderline from "@/app/(blog)/_components/common/List/ListUnderline";
// import { useEffect, useState } from "react";
// import BlogListFallback from "@/app/(blog)/_components/fallback/BlogListFallback";

export default async function BlogList() {
  const data: BlogType[] = await getBlogs(10, 0);
  // const SHOW_NUMBER = 20;
  // const [blogs, setBlogs] = useState<BlogType[]>([]);
  // const [offset, setOffset] = useState(0);
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);
  //     const data: BlogType[] = await getBlogs(SHOW_NUMBER, offset);
  //     setBlogs(data);
  //     setLoading(false);
  //   })();
  // }, []);
  return (
    <>
      {/* {loading && <BlogListFallback />} */}
      <ul>
        {data.map((data: BlogType) => (
          <li key={data.id} className="border-b border-gray-400">
            <Link href={`/${data.id}`} className="px-2 py-5 block hover:opacity-80">
              <h2 className="text-xl leading-none">{data.title}</h2>
              <p className="line-clamp-1 whitespace-pre-line opacity-70 text-sm my-2">{data.content.replace(/<[^>]+>/g, "")}</p>
              <div className="flex gap-x-2 flex-wrap-reverse">
                <p className="leading-none">
                  <small>{dayjs(data.publishedAt).format("YYYY/MM/DD")}</small>
                </p>
                {data.category.length !== 0 && (
                  <p className="leading-none mb-1">
                    <small>
                      {data.category.map((cat: BlogCategoryType) => (
                        <span key={cat.id} className="mr-2 py-1 rounded-sm px-2 break-keep inline-block bg-customgray">
                          {cat.title}
                        </span>
                      ))}
                    </small>
                  </p>
                )}
              </div>
            </Link>
          </li>
        ))}
        {/* <button className="text-center p-20 block w-full" onClick={handleClickButton}>
          more
        </button> */}
      </ul>
    </>
  );
}
