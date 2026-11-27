/**
 * Captura e preservação de parâmetros de atribuição (UTMs e identificadores
 * de clique do Google Ads: gclid, gbraid e wbraid).
 *
 * - Durante a visita: sessionStorage (escopo da aba, apagado ao fechar).
 * - Entre visitas (até 90 dias): localStorage, SOMENTE com consentimento
 *   de armazenamento publicitário. Sem consentimento, o dado persistente é removido.
 */
import { hasAdsConsent } from "./consent";

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>> & { captured_at?: string };

const SESSION_KEY = "lp_attribution_session";
const PERSIST_KEY = "lp_attribution";
const PERSIST_DAYS = 90;

function safeGet(storage: Storage, key: string): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(storage: Storage, key: string, value: string): void {
  try {
    storage.setItem(key, value);
  } catch {
    /* ignora */
  }
}

function safeRemove(storage: Storage, key: string): void {
  try {
    storage.removeItem(key);
  } catch {
    /* ignora */
  }
}

function parse(raw: string | null): Attribution | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Attribution;
  } catch {
    return null;
  }
}

/** Lê os parâmetros da URL atual e os guarda. Chamado uma vez por carregamento. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) found[key] = value.slice(0, 200);
  }

  if (Object.keys(found).length > 0) {
    // Nova campanha substitui a anterior (último clique não-direto).
    found.captured_at = new Date().toISOString();
    safeSet(window.sessionStorage, SESSION_KEY, JSON.stringify(found));
  }

  syncPersistentAttribution();
}

/** Aplica a decisão de consentimento ao armazenamento persistente. */
export function syncPersistentAttribution(): void {
  if (typeof window === "undefined") return;
  if (!hasAdsConsent()) {
    safeRemove(window.localStorage, PERSIST_KEY);
    return;
  }
  const session = parse(safeGet(window.sessionStorage, SESSION_KEY));
  if (session) safeSet(window.localStorage, PERSIST_KEY, JSON.stringify(session));
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const session = parse(safeGet(window.sessionStorage, SESSION_KEY));
  if (session) return session;

  if (!hasAdsConsent()) return {};
  const persisted = parse(safeGet(window.localStorage, PERSIST_KEY));
  if (!persisted?.captured_at) return {};
  const ageDays = (Date.now() - new Date(persisted.captured_at).getTime()) / 86_400_000;
  if (ageDays > PERSIST_DAYS) {
    safeRemove(window.localStorage, PERSIST_KEY);
    return {};
  }
  return persisted;
}

/**
 * Código curto de referência para a mensagem do WhatsApp (opcional,
 * ativado por NEXT_PUBLIC_WHATSAPP_INCLUDE_ATTRIBUTION). Não contém dados pessoais.
 */
export function getAttributionReference(): string | null {
  const a = getAttribution();
  const parts = [a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean);
  if ((a.gclid || a.gbraid || a.wbraid) && !a.utm_source) parts.unshift("google-ads");
  return parts.length ? parts.join(" / ") : null;
}
