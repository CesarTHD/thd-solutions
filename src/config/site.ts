/**
 * Configurações institucionais centralizadas.
 *
 * Valores marcados com `env` podem ser definidos via variáveis de ambiente
 * (veja .env.example). Variáveis NEXT_PUBLIC_* são embutidas no bundle no
 * momento do build — altere-as e gere um novo build para que tenham efeito.
 */

function clean(value: string | undefined): string {
  return (value ?? "").trim();
}

const siteUrl = clean(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:3000";

export const siteConfig = {
  /** Nome exibido no header, footer, metadata e mensagens. */
  name: clean(process.env.NEXT_PUBLIC_COMPANY_NAME) || "THD Solutions",
  /** Descrição curta usada no footer. */
  shortDescription:
    "Integração de sistemas, desenvolvimento de software sob medida e automação de processos para empresas. Especialistas em soluções complementares para ERPs.",
  url: siteUrl.replace(/\/+$/, ""),
  locale: "pt_BR",

  seo: {
    /** Título da página inicial (o nome da empresa é prefixado automaticamente). */
    title: "Integração de Sistemas e Desenvolvimento de Software",
    description:
      "Desenvolvimento de software sob medida, integrações ERP, APIs e automação de processos empresariais. Solicite um diagnóstico gratuito.",
    keywords: [
      "empresa de desenvolvimento de software",
      "integração de sistemas",
      "empresa de desenvolvimento de sistemas",
      "desenvolvimento de software sob medida",
      "integração de API",
      "desenvolvimento de API",
      "automação de processos empresariais",
      "integração de software",
      "integração com ERP",
    ],
  },

  contact: {
    /** Somente dígitos, com DDI e DDD. Ex.: 5511999999999 */
    whatsappNumber: clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER).replace(/\D/g, ""),
    /** Texto exibido para o número (opcional). Se vazio, é derivado do número. */
    whatsappDisplay: clean(process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY),
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  },

  /** Âncoras presentes na página inicial e nas páginas de serviço. */
  nav: [
    { label: "Soluções", href: "#solucoes" },
    { label: "Projetos", href: "#projetos" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Perguntas frequentes", href: "#faq" },
  ],

  /** Páginas de serviço (links internos no rodapé). */
  services: [
    { label: "Integração de sistemas", href: "/integracao-de-sistemas" },
    { label: "Desenvolvimento de software", href: "/desenvolvimento-de-software" },
    { label: "Parcerias para fornecedores de ERP", href: "/#parcerias" },
  ],
} as const;

export function formatWhatsAppDisplay(): string {
  const { whatsappDisplay, whatsappNumber } = siteConfig.contact;
  if (whatsappDisplay) return whatsappDisplay;
  const n = whatsappNumber;
  // Formato brasileiro: 55 + DDD (2) + número (8 ou 9)
  if (n.startsWith("55") && (n.length === 12 || n.length === 13)) {
    const ddd = n.slice(2, 4);
    const rest = n.slice(4);
    const head = rest.slice(0, rest.length - 4);
    const tail = rest.slice(-4);
    return `+55 (${ddd}) ${head}-${tail}`;
  }
  return n ? `+${n}` : "";
}
