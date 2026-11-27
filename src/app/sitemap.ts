import type { MetadataRoute } from "next";
import { routes } from "@/config/pages";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}${routes.integracao}`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}${routes.desenvolvimento}`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/privacidade`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
