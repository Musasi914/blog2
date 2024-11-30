import Container from "@/app/(blog)/_components/layout/Container";
import Intro from "@/app/(blog)/_components/layout/Intro";
import { getAllBlogs } from "@/app/(blog)/_libs/client";
import Link from "next/link";
import { BlogType } from "@/types/BlogType";

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
                <h2 className="text-2xl">{data.title}</h2>
                <p className="truncate opacity-70 mb-2 text-lg">
                  {data.content}
                </p>
                <small>2024/11/12</small>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
