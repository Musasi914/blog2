import { ReactNode } from "react";

export type ButtonProps = {
  className?: string;
  mainTitle?: string;
  secondaryTitle?: string;
  children: ReactNode;
  href?: string;
  as?: "button" | "a" | "link";
};
