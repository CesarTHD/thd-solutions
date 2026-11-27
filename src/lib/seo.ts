import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetadataInput {
  /** Título da página. Com `absolute`, é usado sem o sufixo do template. */
  title: string;
  absolute?: boolean;
  description: string;
  /** Caminho canônico, ex.: "/integracao-de-sistemas". */
  path: string;
}

/** Imagem gerada por src/app/opengraph-image.tsx. */
const shareImage = { url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name };

/**
 * Metadata completa de uma página: title, description, canonical, Open Graph e Twitter.
 * O Next substitui objetos aninhados (openGraph, twitter) em vez de mesclá-los,
 * por isso cada página precisa declarar o conjunto inteiro.
 * A imagem de compartilhamento é referenciada explicitamente, pois um openGraph
 * declarado na página descarta a imagem herdada do segmento raiz.
 */
export function buildPageMetadata({ title, absolute, description, path }: PageMetadataInput): Metadata {
  const fullTitle = absolute ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: path,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [shareImage.url],
    },
  };
}
