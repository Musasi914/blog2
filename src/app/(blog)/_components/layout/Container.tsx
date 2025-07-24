import { ReactNode } from "react";

export default function Container({ children, customClass }: { children: ReactNode; customClass?: string }) {
  return <div className={`w-11/12 max-w-screen-md mx-auto ${customClass}`}>{children}</div>;
}
