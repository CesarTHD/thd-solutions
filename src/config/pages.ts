/**
 * Rotas do site e seus tipos de página.
 * O `page_type` acompanha todos os eventos de rastreamento, o que permite
 * comparar o desempenho da página institucional com o das páginas de anúncio.
 */

export type PageType = "home" | "lp_integracao" | "lp_desenvolvimento" | "privacidade" | "outra";

export const routes = {
  home: "/",
  integracao: "/integracao-de-sistemas",
  desenvolvimento: "/desenvolvimento-de-software",
  privacidade: "/privacidade",
} as const;

const PAGE_TYPES: Record<string, PageType> = {
  [routes.home]: "home",
  [routes.integracao]: "lp_integracao",
  [routes.desenvolvimento]: "lp_desenvolvimento",
  [routes.privacidade]: "privacidade",
};

export function getPageType(pathname: string): PageType {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return PAGE_TYPES[normalized] ?? "outra";
}
