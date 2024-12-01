import { ReactNode } from "react";

export default function TitleH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xl border-b border-customgray mb-2">{children}</h2>
  );
}
