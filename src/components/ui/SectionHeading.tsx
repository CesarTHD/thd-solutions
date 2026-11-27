import type { ReactNode } from "react";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div data-reveal className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow ? (
        <p className={`eyebrow ${tone === "dark" ? "text-electric-300" : ""}`}>{eyebrow}</p>
      ) : null}
      <h2
        id={id}
        className={`mt-3 text-3xl font-semibold tracking-tight sm:text-4xl sm:leading-[1.15] ${
          tone === "dark" ? "text-white" : "text-navy-900"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-lg leading-relaxed ${tone === "dark" ? "text-navy-200" : "text-slate-600"}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
