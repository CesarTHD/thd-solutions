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
 *
 * Exceção: as conversões do Google Ads (adsId + rótulos) são enviadas pelo próprio
 * site em qualquer modo. Com o GTM, a tag do Ads é carregada junto. Por isso, NÃO
 * crie no GTM outra tag de conversão para os mesmos eventos (contaria em dobro).
 */

function clean(value: string | undefined): string {
  return (value ?? "").trim();
}

/** Contêiner do GTM da THD Solutions. NEXT_PUBLIC_GTM_ID, se definida, tem prioridade. */
const DEFAULT_GTM_ID = "GTM-WJSKRNDB";

/** Conta do Google Ads e ação de conversão "Contato" (cliques que levam ao WhatsApp). */
const DEFAULT_ADS_ID = "AW-18596529457";
const DEFAULT_ADS_CONTACT_LABEL = "MtqoCNzdosAdELGKwqNF";

export const trackingConfig = {
  gtmId: clean(process.env.NEXT_PUBLIC_GTM_ID) || DEFAULT_GTM_ID,
  ga4Id: clean(process.env.NEXT_PUBLIC_GA4_ID),
  adsId: clean(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID) || DEFAULT_ADS_ID,
  /** Rótulo da conversão para envio do formulário. Vazio: o envio usa a conversão de WhatsApp. */
  adsLeadLabel: clean(process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL),
  /** Rótulo da conversão "Contato": cliques em botões que levam ao WhatsApp. */
  adsWhatsAppLabel: clean(process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_LABEL) || DEFAULT_ADS_CONTACT_LABEL,
  /** Valor atribuído a cada conversão (BRL). */
  adsConversionValue: 1,
  adsCurrency: "BRL",
  /** Inclui um código de origem da campanha na mensagem do WhatsApp. */
  whatsappIncludeAttribution: clean(process.env.NEXT_PUBLIC_WHATSAPP_INCLUDE_ATTRIBUTION) === "true",
} as const;

export type TrackingMode = "gtm" | "gtag" | "none";

export const trackingMode: TrackingMode = trackingConfig.gtmId
  ? "gtm"
  : trackingConfig.ga4Id || trackingConfig.adsId
    ? "gtag"
    : "none";
