import TitleH2 from "../../_components/common/Title/TitleH2";
import Container from "../../_components/layout/Container";
import Intro from "../../_components/layout/Intro";

export default function About() {
  return (
    <div>
      <Intro title="ABOUT">このブログについて</Intro>
      <Container>
        <section>
          <TitleH2>使用技術</TitleH2>
          <ul className="list-disc list-inside">
            <li>React</li>
            <li>Next.js</li>
            <li>TypeScript</li>
            <li>Tailwind.css</li>
            <li>Vercel</li>
            <li>MicroCMS</li>
            <li>
              細けえNPM
              <ul className="list-[circle] list-inside ml-7">
                <li>cheerio</li>
                <li>highlight.js</li>
                <li>dayjs</li>
              </ul>
            </li>
          </ul>
        </section>
        <section className="mt-12">
          <TitleH2>使用予定技術・やることリスト</TitleH2>
          <ul className="list-disc list-inside">
            <li>メタ</li>
            <li>OGP画像自動生成</li>
            <li>header追従</li>
            <li>カテゴリで絞り込み</li>
            <li>blog増えたとき スクロールで追加読込される</li>
            <li>youtubeでみたモダンアニメーションをgsapで作る</li>
            <li>shadcn/ui</li>
            <li>three.js</li>
          </ul>
        </section>
        <section className="mt-12">
          <TitleH2>雑記 2024/12/01</TitleH2>
          <div className="space-y-4 mt-4">
            <p>こんにちは。</p>
            <blockquote className="bg-customgray p-4 rounded-lg">
              昨日よりも増していく能力 お前より能はねぇが貪欲
              <br />
              結果を出す俺の努力 ここまでやってきた行動力
              <a
                href="https://www.youtube.com/watch?v=HNW5Xm_07gk"
                target="_blank"
                rel="noopener"
                className="block underline text-sm mt-5 italic"
              >
                "句潤 vs 晋平太" UMB2018 THE CHOICE IS YOURS Vol.2 決勝戦
              </a>
            </blockquote>
            <p>
              MCバトルの晋平太さんにハマっています。かっこいいですね。
              <br />
              愚かを自称しつつも努力で上がって来たぜ、みたいなライム。感動しました。
              <br />
              自分が口下手なもんで、熱く叫ぶ男に惹かれます。
              <br />
              「さっさと帰ってこい晋平太！」
            </p>
            <p>
              今ハマっているものはなろうのシャングリラフロンティア。
              <br />
              ゲームは先月「トトリのアトリエDX」と「summar
              pokets」を買いましたが、なかなか時間が取れずにいます。
            </p>
          </div>
        </section>
      </Container>
    </div>
  );
}