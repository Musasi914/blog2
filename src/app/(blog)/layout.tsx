import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-zen-gothic",
  display: "swap",
  preload: false, // フォントpreloadを無効化（大量のpreloadファイル生成を防ぐ）
});

export const metadata: Metadata = {
  title: {
    default: "福沢コウの日記帳",
    template: `%s | 福沢コウの日記帳`,
  },
  description: "福沢コウの自分振り帰り用途のサイトです。",
  alternates: {
    canonical: "https://www.koh-fukuzawa.jp/",
  },
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${zenKaku.variable} antialiased`}>
        <div className="font-zengothic grid grid-rows-[1fr_auto] grid-cols-1 min-h-screen w-full">
          <header className="py-2 mx-auto fixed bottom-0 sm:bottom-auto sm:top-0 w-full bg-background border-t sm:border-none border-customgray z-10">
            <nav className="grid grid-cols-3 sm:flex justify-center gap-5 mx-auto w-11/12 max-w-screen-xl uppercase">
              <Link
                href={"/"}
                className="grid place-items-center p-2 hover:opacity-80"
              >
                blog
              </Link>
              <Link
                href={"/labo"}
                className="grid place-items-center p-2 hover:opacity-80"
              >
                labo
              </Link>
              <Link
                href={"/about"}
                className="grid place-items-center p-2 hover:opacity-80"
              >
                about
              </Link>
            </nav>
          </header>
          <main className="mb-24 sm:mb-0">{children}</main>
        </div>
      </body>
      <GoogleAnalytics gaId="G-033R4YB0LF" />
    </html>
  );
}
