import { siteConfig } from "@/config/site";

/**
 * Origem dos CTAs globais. Cada origem tem uma mensagem inicial própria,
 * para que o time comercial saiba de onde o contato veio.
 * CTAs específicos de uma página (hero, soluções, portfólio) passam a
 * mensagem diretamente pelo conteúdo, via prop `message` do WhatsAppCta.
 */
export type WhatsAppOrigin = "header" | "hero" | "floating" | "final_cta" | "footer" | "partnership" | "projects";

const DEFAULT_MESSAGE = `Olá! Vim pelo site da ${siteConfig.name} e gostaria de conversar sobre um projeto.`;

export const whatsappMessages: Record<WhatsAppOrigin, string> = {
  header: `Olá! Vim pelo site da ${siteConfig.name} e gostaria de solicitar um diagnóstico gratuito.`,
  hero: `Olá! Vim pelo site da ${siteConfig.name} e gostaria de solicitar um diagnóstico gratuito.`,
  floating: DEFAULT_MESSAGE,
  final_cta: `Olá! Vim pelo site da ${siteConfig.name} e gostaria de conversar com um especialista.`,
  footer: DEFAULT_MESSAGE,
  partnership: `Olá! Vim pelo site da ${siteConfig.name}. Tenho uma empresa de sistemas ERP e gostaria de conversar sobre uma parceria tecnológica.`,
  projects: `Olá! Vim pelo site da ${siteConfig.name} e gostaria de avaliar uma integração ou automação para minha empresa.`,
};

/** Mensagem padrão para um CTA de solução específica. */
export function solutionMessage(title: string): string {
  return `Olá! Vim pelo site da ${siteConfig.name} e gostaria de informações sobre ${title.charAt(0).toLowerCase()}${title.slice(1)}.`;
}

/**
 * Monta a URL do WhatsApp (wa.me) com a mensagem codificada corretamente.
 * Sem número configurado, a URL abre o seletor de contatos do WhatsApp.
 */
export function buildWhatsAppUrl(message: string, phone = siteConfig.contact.whatsappNumber): string {
  const digits = phone.replace(/\D/g, "");
  const text = encodeURIComponent(message.trim());
  return digits ? `https://wa.me/${digits}?text=${text}` : `https://wa.me/?text=${text}`;
}

export function getWhatsAppMessage(origin: WhatsAppOrigin): string {
  return whatsappMessages[origin] ?? DEFAULT_MESSAGE;
}

export function withReference(message: string, reference: string | null): string {
  return reference ? `${message}\n\nRef.: ${reference}` : message;
}

export interface LeadFormData {
  name: string;
  system?: string;
  need: string;
}

/** Mensagem estruturada enviada a partir do formulário de diagnóstico. */
export function buildLeadMessage(data: LeadFormData): string {
  const lines = [
    `Olá! Vim pelo site da ${siteConfig.name} e gostaria de solicitar um diagnóstico.`,
    "",
    `*Nome:* ${data.name.trim()}`,
  ];
  const system = data.system?.trim();
  if (system) lines.push("", `*Sistema utilizado:* ${system}`);
  lines.push("", `*Necessidade:* ${data.need.trim()}`);
  return lines.join("\n");
}
