"use client";

import { useEffect } from "react";
import { captureAttribution, syncPersistentAttribution } from "@/lib/tracking/attribution";
import { subscribeConsent } from "@/lib/tracking/consent";

let captured = false;

/** Captura UTMs/gclid uma vez por carregamento e reage a mudanças de consentimento. */
export function AttributionCapture() {
  useEffect(() => {
    if (!captured) {
      captured = true;
      captureAttribution();
    }
    return subscribeConsent(syncPersistentAttribution);
  }, []);

  return null;
}
