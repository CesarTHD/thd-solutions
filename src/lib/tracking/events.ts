/**
 * Eventos de conversão enviados ao dataLayer (GTM) ou ao gtag (modo direto).
 *
 * Regras:
 * - Nunca enviar nome, telefone, empresa, ERP digitado ou descrição.
 * - Cada interação dispara UM único evento (sem duplicidade entre eventos).
 * - Cliques repetidos no mesmo botão em curto intervalo são ignorados.
 * - Um clique no WhatsApp representa INTENÇÃO de contato, não um lead
 *   qualificado nem uma venda (veja docs/TRACKING.md).
 */
import { trackingConfig, trackingMode } from "@/config/tracking";
import { getAttribution } from "./attribution";

export type TrackEventName =
  | "whatsapp_click"
  | "lead_form_submit"
  | "partnership_click"
  | "solution_click";

export type LeadType = "empresa" | "software_house";

export interface TrackEventParams {
  /** Seção de origem (ex.: hero, header, solucoes). */
  section: string;
  /** Identificação do botão (ex.: hero_primary). */
  button_id: string;
  /** Categoria da solução, quando aplicável. */
  solution_category?: string;
  /** Tipo de lead, quando aplicável. */
  lead_type?: LeadType;
}

const DEDUPE_WINDOW_MS = 1500;
const lastFired = new Map<string, number>();

/** Nível de intenção: diferencia clique de contato efetivo. */
const INTENT_LEVEL: Record<TrackEventName, string> = {
  whatsapp_click: "click_intent",
  partnership_click: "click_intent",
  solution_click: "click_intent",
  lead_form_submit: "form_intent",
};

export function trackEvent(name: TrackEventName, params: TrackEventParams): void {
  if (typeof window === "undefined") return;

  const key = `${name}:${params.button_id}`;
  const now = Date.now();
  const previous = lastFired.get(key);
  if (previous && now - previous < DEDUPE_WINDOW_MS) return;
  lastFired.set(key, now);

  const attribution = getAttribution();
  const payload: Record<string, string | boolean | undefined> = {
    section: params.section,
    button_id: params.button_id,
    solution_category: params.solution_category,
    lead_type: params.lead_type,
    destination: "whatsapp",
    intent_level: INTENT_LEVEL[name],
    utm_source: attribution.utm_source,
    utm_medium: attribution.utm_medium,
    utm_campaign: attribution.utm_campaign,
    utm_content: attribution.utm_content,
    utm_term: attribution.utm_term,
    has_gclid: Boolean(attribution.gclid),
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
  // Limpa parâmetros do evento anterior para evitar herança no modelo de dados do GTM.
  window.dataLayer.push({
    solution_category: undefined,
    lead_type: undefined,
  });
  window.dataLayer.push({ event: name, ...payload });
}

function sendAdsConversion(name: TrackEventName): void {
  const { adsId, adsLeadLabel, adsWhatsAppLabel } = trackingConfig;
  if (!adsId || typeof window.gtag !== "function") return;
  const label = name === "lead_form_submit" ? adsLeadLabel : adsWhatsAppLabel;
  if (!label) return;
  window.gtag("event", "conversion", { send_to: `${adsId}/${label}` });
}
