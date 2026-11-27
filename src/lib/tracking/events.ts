/**
 * Eventos enviados ao dataLayer (GTM) ou ao gtag (modo direto).
 *
 * Regras:
 * - Nunca enviar nome, sistema digitado, necessidade descrita ou qualquer dado pessoal.
 * - O caminho da página vai sem query string (a URL pode conter gclid).
 * - Cada interação dispara UM único evento (sem duplicidade entre eventos).
 * - Cliques repetidos no mesmo botão em curto intervalo são ignorados.
 * - Um clique no WhatsApp representa INTENÇÃO de contato, não um lead
 *   qualificado nem uma venda (veja docs/TRACKING.md).
 */
import { trackingConfig, trackingMode } from "@/config/tracking";
import { getPageType } from "@/config/pages";
import { getAttribution } from "./attribution";

export type TrackEventName =
  | "whatsapp_click"
  | "lead_form_submit"
  | "partnership_click"
  | "solution_click"
  | "project_view";

export type LeadType = "empresa" | "software_house";

export interface TrackEventParams {
  /** Onde a interação aconteceu (ex.: hero, header, solucoes, formulario). */
  button_location: string;
  /** Identificação do botão ou elemento (ex.: hero_diagnostico, projeto_cashback). */
  button_id: string;
  /** Categoria da solução, quando aplicável. */
  solution_category?: string;
  /** Tipo de lead, quando aplicável. */
  lead_type?: LeadType;
}

const DEDUPE_WINDOW_MS = 1500;
const lastFired = new Map<string, number>();

/** Nível de intenção: diferencia visualização, clique e formulário. */
const INTENT_LEVEL: Record<TrackEventName, string> = {
  project_view: "view",
  whatsapp_click: "click_intent",
  partnership_click: "click_intent",
  solution_click: "click_intent",
  lead_form_submit: "form_intent",
};

/** Eventos que levam o visitante ao WhatsApp. */
const WHATSAPP_EVENTS = new Set<TrackEventName>([
  "whatsapp_click",
  "partnership_click",
  "solution_click",
  "lead_form_submit",
]);

/** Parâmetros opcionais: limpos no dataLayer antes de cada evento para não herdar valores. */
const RESETTABLE_KEYS = ["solution_category", "lead_type", "destination"] as const;

export function trackEvent(name: TrackEventName, params: TrackEventParams): void {
  if (typeof window === "undefined") return;

  const key = `${name}:${params.button_id}`;
  const now = Date.now();
  const previous = lastFired.get(key);
  if (previous && now - previous < DEDUPE_WINDOW_MS) return;
  lastFired.set(key, now);

  const pagePath = window.location.pathname;
  const attribution = getAttribution();
  const payload: Record<string, string | boolean | undefined> = {
    page_path: pagePath,
    page_type: getPageType(pagePath),
    button_location: params.button_location,
    /** @deprecated Mantido por compatibilidade com variáveis já criadas no GTM. Use button_location. */
    section: params.button_location,
    button_id: params.button_id,
    solution_category: params.solution_category,
    lead_type: params.lead_type,
    destination: WHATSAPP_EVENTS.has(name) ? "whatsapp" : undefined,
    intent_level: INTENT_LEVEL[name],
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_content: attribution.utm_content,
    utm_term: attribution.utm_term,
    has_gclid: Boolean(attribution.gclid),
    has_gbraid: Boolean(attribution.gbraid),
    has_wbraid: Boolean(attribution.wbraid),
  };
  for (const k of Object.keys(payload)) {
    if (payload[k] === undefined) delete payload[k];
  }

  window.dataLayer = window.dataLayer || [];

  if (trackingMode === "gtag" && typeof window.gtag === "function") {
    window.gtag("event", name, payload);
    sendAdsConversion(name);
    return;
  }

  // Modo GTM (ou sem rastreamento configurado): evento puro no dataLayer.
  window.dataLayer.push(Object.fromEntries(RESETTABLE_KEYS.map((k) => [k, undefined])));
  window.dataLayer.push({ event: name, ...payload });
  sendAdsConversion(name);
}

/**
 * Conversões do Google Ads, enviadas em qualquer modo (GTM ou direto).
 * - Cliques que levam ao WhatsApp → conversão "Contato".
 * - Envio do formulário (também abre o WhatsApp) → conversão própria, se houver
 *   rótulo; senão, "Contato".
 * - Visualizações nunca são conversões.
 * Uma interação gera no máximo uma conversão (o formulário não dispara whatsapp_click).
 */
function sendAdsConversion(name: TrackEventName): void {
  const { adsId, adsLeadLabel, adsWhatsAppLabel, adsConversionValue, adsCurrency } = trackingConfig;
  if (!adsId || typeof window.gtag !== "function") return;
  let label = "";
  if (name === "lead_form_submit") label = adsLeadLabel || adsWhatsAppLabel;
  else if (name === "whatsapp_click" || name === "solution_click" || name === "partnership_click") {
    label = adsWhatsAppLabel;
  }
  if (!label) return;
  window.gtag("event", "conversion", {
    send_to: `${adsId}/${label}`,
    value: adsConversionValue,
    currency: adsCurrency,
  });
}
