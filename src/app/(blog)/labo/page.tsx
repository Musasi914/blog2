import Container from "@/app/(blog)/_components/layout/Container";
import Intro from "@/app/(blog)/_components/layout/Intro";
import laboWorks from "./_libs/laboWorks";
import ListUnderline from "@/app/(blog)/_components/common/List/ListUnderline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Labo",
  description: "研究所っぽく",
};

export default function Labo() {
  return (
    <div>
      <Intro title="LABO">作ったものや実験</Intro>
      <Container>
        <ul>
          {laboWorks.map((work) => (
            <ListUnderline key={work.title} className="px-2 py-5">
              <h2 className="text-xl leading-none">{work.title}</h2>
              <p className="md:text-sm my-2 mb-4">{work.description}</p>
              <p className="text-sm opacity-70">
                学び：
                {work.learn.map((tech) => (
                  <span key={tech} className="inline-block mr-2">
                    {tech}
                  </span>
                ))}
              </p>
              <p className="opacity-70">
                <small>公開日：{work.publish}</small>
              </p>
              <div className="flex gap-4 mt-4">
                {work.url && (
                  <a
                    href={work.url}
                    className="border border-foreground rounded-lg p-2 sm:p-1 sm:px-3 inline-block flex-grow sm:flex-grow-0 text-center hover:opacity-80 sm:text-sm"
                    target="_blank"
                    rel="noopener"
                  >
                    ページはこちら
                  </a>
                )}
                {work.github && (
                  <a
                    href={work.github}
                    className="border border-foreground rounded-lg p-2 sm:p-1 sm:px-3 inline-block flex-grow sm:flex-grow-0 text-center hover:opacity-80 sm:text-sm"
                    target="_blank"
                    rel="noopener"
                  >
                    githubはこちら
                  </a>
                )}
              </div>
            </ListUnderline>
          ))}
        </ul>
      </Container>
    </div>
  );
}
