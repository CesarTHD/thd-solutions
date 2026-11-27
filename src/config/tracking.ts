/**
 * Identificadores de rastreamento. Todos opcionais.
 *
 * Modo recomendado: defina apenas NEXT_PUBLIC_GTM_ID e configure GA4 e
 * Google Ads dentro do Google Tag Manager, usando os eventos do dataLayer.
 *
 * Modo direto (sem GTM): defina NEXT_PUBLIC_GA4_ID e/ou NEXT_PUBLIC_GOOGLE_ADS_ID.
 * Nesse modo o gtag.js é carregado diretamente e os eventos são enviados por ele.
 *
 * Se o GTM estiver definido, o modo direto é ignorado para evitar hits duplicados.
 */

function clean(value: string | undefined): string {
  return (value ?? "").trim();
}

/** Contêiner do GTM da THD Solutions. NEXT_PUBLIC_GTM_ID, se definida, tem prioridade. */
const DEFAULT_GTM_ID = "GTM-WJSKRNDB";

export const trackingConfig = {
  gtmId: clean(process.env.NEXT_PUBLIC_GTM_ID) || DEFAULT_GTM_ID,
  ga4Id: clean(process.env.NEXT_PUBLIC_GA4_ID),
  adsId: clean(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID),
  /** Rótulo de conversão do Ads para envio do formulário (modo direto). */
  adsLeadLabel: clean(process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL),
  /** Rótulo de conversão do Ads para clique no WhatsApp (modo direto, conversão secundária). */
  adsWhatsAppLabel: clean(process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL),
  /** Inclui um código de origem da campanha na mensagem do WhatsApp. */
  whatsappIncludeAttribution: clean(process.env.NEXT_PUBLIC_WHATSAPP_INCLUDE_ATTRIBUTION) === "true",
} as const;

export type TrackingMode = "gtm" | "gtag" | "none";

export const trackingMode: TrackingMode = trackingConfig.gtmId
  ? "gtm"
  : trackingConfig.ga4Id || trackingConfig.adsId
    ? "gtag"
    : "none";
