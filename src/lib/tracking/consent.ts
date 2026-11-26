/**
 * Consentimento (LGPD + Google Consent Mode v2).
 *
 * Por padrão, armazenamento analítico e publicitário ficam negados
 * (definido no script inline de TrackingScripts). Esta camada guarda a
 * escolha do visitante e comunica a atualização ao gtag/GTM.
 */

export type ConsentChoice = "granted" | "denied";

export interface ConsentState {
  analytics: ConsentChoice;
  ads: ConsentChoice;
  updatedAt: string;
}

export const CONSENT_STORAGE_KEY = "lp_consent_v1";
export const CONSENT_EVENT = "lp:consent-change";

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

let cachedRaw: string | null | undefined;
let cachedValue: ConsentState | null = null;

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
  if (raw === cachedRaw) return cachedValue;
  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as ConsentState) : null;
    cachedValue =
      parsed && (parsed.analytics === "granted" || parsed.analytics === "denied") ? parsed : null;
  } catch {
    cachedValue = null;
  }
  return cachedValue;
}

export function toGoogleConsent(state: Pick<ConsentState, "analytics" | "ads">) {
  return {
    analytics_storage: state.analytics,
    ad_storage: state.ads,
    ad_user_data: state.ads,
    ad_personalization: state.ads,
  };
}

export function saveConsent(analytics: ConsentChoice, ads: ConsentChoice): void {
  const state: ConsentState = { analytics, ads, updatedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Armazenamento indisponível (modo privado restrito): segue apenas em memória.
  }

  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", toGoogleConsent(state));
  }
  window.dataLayer?.push({ event: "consent_update", consent_analytics: analytics, consent_ads: ads });
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function hasAdsConsent(): boolean {
  return readConsent()?.ads === "granted";
}

export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
