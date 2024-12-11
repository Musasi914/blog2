import Link from "next/link";
import { ButtonProps } from "../../type/ButtonProps";

export default function Button({
  className,
  mainTitle,
  secondaryTitle,
  children,
  href,
  as = "button",
}: ButtonProps) {
  const baseClasses = `rounded-lg bg-black px-2 text-sm inline-block group/action py-2 transition-all duration-500 delay-100 hover:bg-slate-400 hover:rounded-sm ${className}`;
  const content = (
    <div
      data-title={mainTitle}
      data-secondary-title={secondaryTitle}
      className="flex items-center [clip-path:inset(0%)] transition-all relative leading-none duration-500
        before:content-[attr(data-title)] before:absolute before:inset-0 before:transition-all before:duration-500
        after:content-[attr(data-secondary-title)] after:absolute after:top-full after:[clip-path:inset(0%_0%_100%_0%)] after:opacity-0 after:transition-all after:text-gray-900 after:duration-500
        group-hover/action:[clip-path:inset(100%_0%_-100%_0%)] group-hover/action:-translate-y-full 
        group-hover/action:after:opacity-100 group-hover/action:after:[clip-path:inset(0%)]"
    >
      <span className="opacity-0">{children}</span>
    </div>
  );
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
  return <button className={baseClasses}>{content}</button>;
}
