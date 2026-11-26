"use client";

import type { MouseEvent, ReactNode } from "react";
import { trackingConfig } from "@/config/tracking";
import { getAttributionReference } from "@/lib/tracking/attribution";
import { trackEvent, type LeadType, type TrackEventName } from "@/lib/tracking/events";
import { buildWhatsAppUrl, getWhatsAppMessage, withReference, type WhatsAppOrigin } from "@/lib/whatsapp";

interface WhatsAppCtaProps {
  origin: WhatsAppOrigin;
  section: string;
  buttonId: string;
  event?: Exclude<TrackEventName, "lead_form_submit">;
  solutionCategory?: string;
  leadType?: LeadType;
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
}

/**
 * Link para o WhatsApp comercial com mensagem inicial conforme a origem.
 * Funciona sem JavaScript (href estático); com JS, registra o evento.
 */
export function WhatsAppCta({
  origin,
  section,
  buttonId,
  event = "whatsapp_click",
  solutionCategory,
  leadType,
  className = "btn btn-whatsapp",
  children,
  ...rest
}: WhatsAppCtaProps) {
  const message = getWhatsAppMessage(origin);
  const href = buildWhatsAppUrl(message);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (trackingConfig.whatsappIncludeAttribution) {
      e.currentTarget.href = buildWhatsAppUrl(withReference(message, getAttributionReference()));
    }
    trackEvent(event, {
      section,
      button_id: buttonId,
      solution_category: solutionCategory,
      lead_type: leadType ?? (origin === "partnership" ? "software_house" : undefined),
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
