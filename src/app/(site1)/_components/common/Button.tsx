"use client";
import { useState } from "react";

import Link from "next/link";
import { ButtonProps } from "../../type/ButtonProps";

export default function Button({
  className = "",
  mainTitle,
  secondaryTitle,
  children,
  href,
  noHover,
  as = "button",
}: ButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const maxLength = Math.max(mainTitle!.length, secondaryTitle!.length);
  const widthClassName = maxLength;
  const baseClasses = `${widthClassName} rounded-lg bg-black px-2 text-sm inline-block group/action py-2 transition-all duration-300 delay-100 ${
    noHover ? "" : "hover:bg-slate-400 hover:rounded-sm"
  } ${noHover && menuOpen ? "bg-red-400" : ""}  ${className}`;
  const content = (
    <div
      data-title={mainTitle}
      data-secondary-title={secondaryTitle}
      className={`flex items-center [clip-path:inset(0%)] transition-all relative leading-none duration-300
        before:content-[attr(data-title)] before:absolute before:inset-0 before:transition-all before:duration-300
        after:content-[attr(data-secondary-title)] after:absolute after:top-full after:[clip-path:inset(0%_0%_100%_0%)] after:opacity-0 after:transition-all after:text-gray-900 after:duration-300
    ${
      noHover
        ? ""
        : "group-hover/action:[clip-path:inset(100%_0%_-100%_0%)] group-hover/action:-translate-y-full group-hover/action:after:opacity-100 group-hover/action:after:[clip-path:inset(0%)]"
    }
    ${
      noHover && menuOpen
        ? `[clip-path:inset(100%_0%_-100%_0%)] -translate-y-full after:opacity-100  after:![clip-path:inset(0%_0%_0%_0%)] after:text-slate-100`
        : ""
    }
        `}
    >
      <span className="opacity-0">{children}</span>
    </div>
  );
  const contentNoHover = `
    <div
      data-title={mainTitle}
      data-secondary-title={secondaryTitle}
      className="flex items-center [clip-path:inset(0%)] transition-all relative leading-none duration-300
        before:content-[attr(data-title)] before:absolute before:inset-0 before:transition-all before:duration-300
        after:content-[attr(data-secondary-title)] after:absolute after:top-full after:[clip-path:inset(0%_0%_100%_0%)] after:opacity-0 after:transition-all after:text-gray-900 after:duration-300
        ${
          menuOpen &&
          `[clip-path:inset(100%_0%_-100%_0%)] -translate-y-full after:opacity-100 after:[clip-path:inset(0%)]`
        }
    >
      <span className="opacity-0">{children}</span>
    </div>
  `;
  if (as === "link") {
    return (
      <Link className={baseClasses} href={href!}>
        {content}
      </Link>
    );
  }
  if (as === "a") {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    );
  }
  if (noHover) {
    return (
      <button className={baseClasses} onClick={() => setMenuOpen(!menuOpen)}>
        {content}
      </button>
    );
  }

  return <button className={baseClasses}>{content}</button>;
}
