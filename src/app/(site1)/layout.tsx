import type { Metadata } from "next";
import "../globals.css";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import ReactLenis from "lenis/react";
import Header from "./_components/layout/Header";

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-zen-gothic",
});

export const metadata: Metadata = {
  title: "練習サイト1",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${zenKaku.variable} antialiased`}>
        <ReactLenis root>
          <Header />

          <main className="">{children}</main>
          <footer>&copy; 2024 matsutech</footer>
        </ReactLenis>
      </body>
    </html>
  );
}
