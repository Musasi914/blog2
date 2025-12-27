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
    <div className="flex gap-x-4 sm:gap-x-8">
      <div className="flex-1">
        {prevPost ? (
          <Link
            className="flex gap-x-4 hover:opacity-80"
            href={`/${prevPost.id}`}
          >
            <div className="basis-5 text-4xl">&lsaquo;</div>
            <div>
              <p className="line-clamp-1">{prevPost.title}</p>
              <div className="sm:flex gap-x-2 text-xs mt-2">
                <p className="flex flex-col sm:flex-row items-start gap-y-1 gap-x-2">
                  {prevPost.category.map((cat: { title: string }) => (
                    <span
                      key={cat.title}
                      className="bg-customgray px-2 rounded-sm"
                    >
                      {cat.title}
                    </span>
                  ))}
                </p>
                <time dateTime={prevPost.publishedAt}>
                  {dayjs(prevPost.publishedAt).format("YYYY/MM/DD")}
                </time>
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
            className="flex flex-row-reverse gap-x-4 hover:opacity-80"
            href={`/${nextPost.id}`}
          >
            <div className="basis-5 text-4xl">&rsaquo;</div>
            <div>
              <p className="line-clamp-1 text-right">{nextPost.title}</p>
              <div className="flex flex-col sm:flex-row items-end sm:items-start justify-end gap-x-2 text-xs mt-2">
                <p className="flex flex-col sm:flex-row items-end gap-y-1 gap-x-2">
                  {nextPost.category.map((cat: { title: string }) => (
                    <span
                      key={cat.title}
                      className="bg-customgray px-2 rounded-sm"
                    >
                      {cat.title}
                    </span>
                  ))}
                </p>
                <time dateTime={nextPost.publishedAt}>
                  {dayjs(nextPost.publishedAt).format("YYYY/MM/DD")}
                </time>
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
