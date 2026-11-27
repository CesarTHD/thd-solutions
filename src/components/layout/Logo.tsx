import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import logoDark from "../../../public/brand/logo.png";
import logoLight from "../../../public/brand/logo-light.png";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link href="/" className="flex items-center rounded-md" aria-label={`${siteConfig.name} — início`}>
      <Image
        src={tone === "light" ? logoLight : logoDark}
        alt={siteConfig.name}
        className="h-9 w-auto"
        sizes="170px"
        loading={tone === "dark" ? "eager" : "lazy"}
      />
    </Link>
  );
}
