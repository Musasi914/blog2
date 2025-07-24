import { ReactNode } from "react";

type ListProps = {
  className?: string;
  children: ReactNode;
  key?: string;
};

export default function ListUnderline({ className, children, key }: ListProps) {
  return (
    <li key={key} className={`border-b border-gray-400 ${className}`}>
      {children}
    </li>
  );
}
