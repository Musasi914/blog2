import { ReactNode } from "react";

type ListProps = {
  className?: string;
  children: ReactNode;
};

export default function ListUnderline({ className, children }: ListProps) {
  return (
    <li className={`border-b border-gray-400 ${className}`}>{children}</li>
  );
}
