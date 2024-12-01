import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";
import { Zen_Kaku_Gothic_New } from "next/font/google";

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-zen-gothic",
});

export const metadata: Metadata = {
  title: {
    default: "Matsu Tech",
    template: `%s | Matsu Tech`,
  },
  description:
    "フロントエンドエンジニアに憧れを持つ社会不適合者のブログ。ニートになって勉強する期間が必要ではないかと思っている。",
  alternates: {
    canonical: "https://blog2-one-phi.vercel.app/blog",
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
        <div className="font-zengothic md:grid grid-rows-[auto_1fr_auto] min-h-screen w-full">
          <header className="py-3 mx-auto">
            <div className="flex justify-center gap-5 mx-auto w-11/12 max-w-screen-xl uppercase">
              <Link href={"/blog"}>blog</Link>
              <Link href={"/blog/labo"}>labo</Link>
              <Link href={"/blog/about"}>about</Link>
            </div>
          </header>
          <main>{children}</main>
          <footer className="py-3 text-center">&copy; 2024 matsutech</footer>
        </div>
      </body>
    </html>
  );
}
