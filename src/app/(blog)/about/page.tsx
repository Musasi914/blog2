import { Metadata } from "next";
import TitleH2 from "@/app/(blog)/_components/common/Title/TitleH2";
import Container from "@/app/(blog)/_components/layout/Container";
import Intro from "@/app/(blog)/_components/layout/Intro";
import PushNotificationManager from "../_components/sw/PushNotificationManager";

export const metadata: Metadata = {
  title: "About",
  description: "このブログについて",
};

export default function About() {
  return (
    <div>
      <Intro title="ABOUT">このブログについて</Intro>
      <Container customClass="space-y-12 sm:mb-40">
        <section>
          <TitleH2>PWAプッシュ通知テスト</TitleH2>
          <PushNotificationManager />
        </section>
        <section>
          <TitleH2>ブログ訪問ありがとうございます</TitleH2>
          <div className="space-y-4">
            <p>
              どこからかこの日記帳にたどり着き、ABOUTまで来ていただきありがとうございます。
            </p>
            <p>
              このブログは、2024年の11月くらいに、Next.jsやTypeScriptの勉強として作ったブログです。
            </p>
            <p>
              記事一覧の最初の10件と記事の詳細ページは、ISRで生成されています。ページ下をObserverで監視して、無限スクロールで記事を読み込んでいます。
            </p>
            <p>
              そのため、デザインや機能はかなり雑なものです。
              <br />
              OGPとか未だに後回しにしてますしね。
            </p>
            <p>
              私は孤独なので、ぜひコンタクトをいただければと思います。
              <a
                href="https://x.com/WebDesignDialy/"
                target="_blank"
                rel="noopener"
                className="underline hover:opacity-80"
              >
                X（旧Twitter）
              </a>
              {` `}
              <a
                href="mailto:fuzekou@gmail.com"
                className="underline hover:opacity-80"
              >
                fuzekou@gmail.com
              </a>
            </p>
            <p>それでは、お読みいただきありがとうございました。</p>
          </div>
        </section>
        <section>
          <TitleH2>やることリスト</TitleH2>
          <ul className="list-disc list-inside">
            <li>OGP画像自動生成</li>
            <li>
              ルートグループで作っていた記事を別URLに分離してシンプルにする
            </li>
          </ul>
        </section>
        <section>
          <TitleH2>2025/12/06</TitleH2>
          <p>鋭意勉強中。GLSLマスター目指してます。</p>
        </section>
        <section>
          <TitleH2>2025/7/23</TitleH2>
          <p>Next.jsを再度触りはじめた。進化させていきたい。</p>
        </section>
        {/* <section className="mt-12">
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
              自分が口下手なもんで、すらすら言葉が出てくるのは羨ましいですね。
            </p>
            <p>
              今なろうのシャングリラフロンティアにハマって「小説家になろう」でよんでいます。
              <br />
              ゲームは先月「トトリのアトリエDX」と「summar pokets」を買いましたが、なかなか時間が取れずにいます。
            </p>
          </div>
        </section> */}
      </Container>
    </div>
  );
}
