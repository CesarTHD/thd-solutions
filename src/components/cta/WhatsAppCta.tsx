"use client";

import type { MouseEvent, ReactNode } from "react";
import { trackingConfig } from "@/config/tracking";
import { getAttributionReference } from "@/lib/tracking/attribution";
import { trackEvent, type LeadType, type TrackEventName } from "@/lib/tracking/events";
import { buildWhatsAppUrl, getWhatsAppMessage, withReference, type WhatsAppOrigin } from "@/lib/whatsapp";

interface WhatsAppCtaProps {
  /** Mensagem padrão por origem. Ignorada quando `message` é informada. */
  origin?: WhatsAppOrigin;
  /** Mensagem inicial específica (ex.: vinda do conteúdo da página). */
  message?: string;
  /** Onde o botão está (button_location). */
  location: string;
  buttonId: string;
  event?: Extract<TrackEventName, "whatsapp_click" | "solution_click" | "partnership_click">;
  solutionCategory?: string;
  leadType?: LeadType;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

/**
 * Link para o WhatsApp comercial com mensagem inicial.
 * Funciona sem JavaScript (href estático); com JS, registra o evento.
 */
export function WhatsAppCta({
  origin = "floating",
  message,
  location,
  buttonId,
  event = "whatsapp_click",
  solutionCategory,
  leadType,
  className = "btn btn-whatsapp",
  children,
  ...rest
}: WhatsAppCtaProps) {
  const text = message ?? getWhatsAppMessage(origin);
  const href = buildWhatsAppUrl(text);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (trackingConfig.whatsappIncludeAttribution) {
      e.currentTarget.href = buildWhatsAppUrl(withReference(text, getAttributionReference()));
    }
    trackEvent(event, {
      button_location: location,
      button_id: buttonId,
      solution_category: solutionCategory,
      lead_type: leadType ?? (event === "partnership_click" ? "software_house" : undefined),
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      aria-label={rest["aria-label"]}
    >
      {children}
    </a>
  );
}
