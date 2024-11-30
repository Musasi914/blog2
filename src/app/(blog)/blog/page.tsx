import Container from "@/app/(blog)/_components/layout/Container";
import Intro from "@/app/(blog)/_components/layout/Intro";
import { getAllBlogs } from "@/app/(blog)/_libs/client";
import Link from "next/link";
import { BlogCategoryType, BlogType } from "@/types/BlogType";
import dayjs from "dayjs";

export default async function Home() {
  const data = await getAllBlogs();
  return (
    <div>
      <Intro title="BLOG">
        何かしらアウトプット用。三日坊主だけど続けてほしいと未来の自分へ思っている。
      </Intro>
      <Container>
        <ul>
          {data.map((data: BlogType) => (
            <li key={data.id} className="border-b border-gray-400">
              <Link
                href={`/blog/${data.id}`}
                className="px-2 py-5 block hover:opacity-80"
              >
                <h2 className="text-xl leading-none">{data.title}</h2>
                <p className="truncate opacity-70 text-sm my-2">
                  {data.content.replace(/<[^>]+>/g, "").slice(0, 50)}
                </p>
                <div className="flex gap-2">
                  <p className="leading-none">
                    <small>
                      {dayjs(data.publishedAt).format("YYYY/MM/DD")}
                    </small>
                  </p>
                  {data.category.length !== 0 && (
                    <p className="leading-none mb-1">
                      <small>
                        {data.category.map((cat: BlogCategoryType) => (
                          <span
                            key={cat.id}
                            className="mr-2 border border-gray-600 rounded-md px-2"
                          >
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
        </ul>
      </Container>
    </div>
  );
}
