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
  description: "フロントエンドエンジニアに憧れを持つ社会不適合者のブログ。ニートになって勉強する期間が必要ではないかと思っている。",
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
        <div className="font-zengothic grid grid-rows-[1fr_auto] min-h-screen w-full">
          <header className="py-2 mx-auto fixed bottom-0 sm:bottom-auto sm:top-0 sm:opacity-80 sm:backdrop-blur-md w-full bg-background sm:bg-inherit border-t sm:border-none border-customgray z-10">
            <div className="grid grid-cols-3 sm:flex justify-center gap-5 mx-auto w-11/12 max-w-screen-xl uppercase">
              <Link href={"/"} className="grid place-items-center p-2 hover:opacity-80">
                blog
              </Link>
              <Link href={"/labo"} className="grid place-items-center p-2 hover:opacity-80">
                labo
              </Link>
              <Link href={"/about"} className="grid place-items-center p-2 hover:opacity-80">
                about
              </Link>
            </div>
          </header>
          <main className="min-h-[70svh]">{children}</main>
          <footer className="py-3 text-center mb-14 sm:mb-0">&copy; 2025 matsutech</footer>
        </div>
      </body>
    </html>
  );
}
