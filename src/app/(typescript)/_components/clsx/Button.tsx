import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  variant?: "primary" | "secondary" | "default";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  rounded?: boolean;
  children: ReactNode;
};

export default function Button({
  variant = "default",
  size = "md",
  disabled = false,
  rounded = false,
  children,
}: Props) {
  const className = clsx(
    variant === "primary" && "border border-blue-500 bg-blue-500 text-white",
    variant === "secondary" && "border border-gray-500 bg-gray-500 text-white",
    variant === "default" && "border border-gray-500 bg-white text-gray-500",
    size === "sm" && "px-2 py-1 text-xs",
    size === "md" && "px-2 py-1 text-sm",
    size === "lg" && "px-2 py-1 text-lg",
    disabled && "cursor-not-allowed opacity-50",
    rounded && "rounded",
    "flex cursor-pointer items-center justify-center font-medium hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  );
  return <button className={className}>{children}</button>;
}
