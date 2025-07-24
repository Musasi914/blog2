import { ReactNode } from "react";

export default function Intro({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="my-20 sm:my-12 mx-auto w-11/12 max-w-screen-sm sm:pt-10">
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <p className="mt-3 text-center">{children}</p>
    </div>
  );
}
