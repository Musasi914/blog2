import type { Metadata } from "next";
import "../globals.css";

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
      <body className={`antialiased`}>
        <main className="">{children}</main>
        <footer>&copy; 2024 matsutech</footer>
      </body>
    </html>
  );
}
