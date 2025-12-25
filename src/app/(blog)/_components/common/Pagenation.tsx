import Link from "next/link";
import { getNextPost, getPrevPost } from "../../_libs/microCMSFunc";
import { BlogType } from "@/types/BlogType";
import dayjs from "dayjs";

export default async function Pagenation({
  currentPublishedAt,
}: {
  currentPublishedAt: string;
}) {
  const nextPost = await getNextPost(currentPublishedAt);
  const prevPost = await getPrevPost(currentPublishedAt);
  return (
    <div className="flex gap-y-8 items-center mt-20 sm:mt-40 pt-4 flex-row">
      <div className="flex-1">
        {prevPost ? (
          <Link
            className="flex items-center gap-x-4 hover:opacity-80"
            href={`/${prevPost.id}`}
          >
            <div className="basis-5 text-4xl">&lsaquo;</div>
            <div>
              <p className="line-clamp-1">{prevPost.title}</p>
              <div className="flex gap-x-2 text-xs mt-4">
                <p>
                  {prevPost.category.map((cat: { title: string }) => (
                    <span
                      key={cat.title}
                      className="mr-2 bg-customgray px-2 rounded-sm"
                    >
                      {cat.title}
                    </span>
                  ))}
                </p>
                <p className="hidden sm:block">
                  {dayjs(prevPost.publishedAt).format("YYYY/MM/DD")}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <span className="block"></span>
        )}
      </div>
      <div className="flex-1">
        {nextPost ? (
          <Link
            className="flex flex-row-reverse items-center gap-x-4 hover:opacity-80"
            href={`/${nextPost.id}`}
          >
            <div className="basis-5 text-4xl">&rsaquo;</div>
            <div>
              <p className="line-clamp-1">{nextPost.title}</p>
              <div className="flex justify-end gap-x-2 text-xs mt-4">
                <p>
                  {nextPost.category.map((cat: { title: string }) => (
                    <span
                      key={cat.title}
                      className="mr-2 bg-customgray px-2 rounded-sm"
                    >
                      {cat.title}
                    </span>
                  ))}
                </p>
                <p className="hidden sm:block">
                  {dayjs(nextPost.publishedAt).format("YYYY/MM/DD")}
                </p>
              </div>
            </div>
          </Link>
        ) : (
          <span className="block"></span>
        )}
      </div>
    </div>
  );
}
