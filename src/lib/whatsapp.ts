import { siteConfig } from "@/config/site";

/**
 * Origem do CTA. Cada origem possui uma mensagem inicial própria,
 * para que o time comercial saiba de onde o contato veio.
 */
export type WhatsAppOrigin =
  | "header"
  | "hero"
  | "floating"
  | "final_cta"
  | "footer"
  | "partnership"
  | "solution_integracoes"
  | "solution_automacao"
  | "solution_whatsapp"
  | "solution_cashback"
  | "solution_dashboards"
  | "solution_ia";

const DEFAULT_MESSAGE =
  "Olá! Gostaria de informações sobre uma integração com o ERP da minha empresa.";

export const whatsappMessages: Record<WhatsAppOrigin, string> = {
  header: "Olá! Gostaria de falar com um especialista sobre o ERP da minha empresa.",
  hero: "Olá! Gostaria de solicitar um diagnóstico gratuito para o ERP da minha empresa.",
  floating: DEFAULT_MESSAGE,
  final_cta: "Olá! Gostaria de conversar com um especialista sobre uma necessidade no ERP da minha empresa.",
  footer: DEFAULT_MESSAGE,
  partnership:
    "Olá! Tenho uma empresa de sistemas ERP e gostaria de conversar sobre uma parceria tecnológica.",
  solution_integracoes:
    "Olá! Gostaria de informações sobre integração do ERP da minha empresa com outros sistemas.",
  solution_automacao:
    "Olá! Gostaria de informações sobre automação de processos ligados ao ERP da minha empresa.",
  solution_whatsapp: "Olá! Gostaria de informações sobre integrar o WhatsApp ao ERP da minha empresa.",
  solution_cashback:
    "Olá! Gostaria de informações sobre cashback e fidelização usando os dados do meu ERP.",
  solution_dashboards:
    "Olá! Gostaria de informações sobre dashboards e indicadores com os dados do meu ERP.",
  solution_ia:
    "Olá! Gostaria de informações sobre inteligência artificial aplicada aos dados do meu ERP.",
};

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
  company: string;
  whatsapp: string;
  erp: string;
  solutionLabel: string;
  description?: string;
}

/** Mensagem estruturada enviada a partir do formulário de qualificação. */
export function buildLeadMessage(data: LeadFormData): string {
  const lines = [
    "Olá! Gostaria de solicitar um diagnóstico gratuito.",
    "",
    `*Nome:* ${data.name}`,
    `*Empresa:* ${data.company}`,
    `*WhatsApp:* ${data.whatsapp}`,
    `*ERP utilizado:* ${data.erp}`,
    `*Solução procurada:* ${data.solutionLabel}`,
  ];
  const description = data.description?.trim();
  if (description) {
    lines.push("", "*Descrição da necessidade:*", description);
  }
  return lines.join("\n");
}
