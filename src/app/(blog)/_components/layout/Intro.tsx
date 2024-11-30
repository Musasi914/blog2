import { ReactNode } from "react";

export default function Intro({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="my-10 mx-auto w-11/12 max-w-screen-sm">
      <h1 className="text-center text-2xl">{title}</h1>
      <p className="mt-3 text-center">{children}</p>
    </div>
  );
}
