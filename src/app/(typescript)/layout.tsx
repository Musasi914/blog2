import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "TypeScript練習",
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
        <footer className="mt-20 text-center">&copy; 2024 matsutech</footer>
      </body>
    </html>
  );
}
