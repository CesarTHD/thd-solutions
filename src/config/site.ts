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
  name: clean(process.env.NEXT_PUBLIC_COMPANY_NAME) || "Integra ERP",
  /** Descrição curta usada no footer. */
  shortDescription:
    "Integrações, automações e funcionalidades complementares para os sistemas de gestão que sua empresa já utiliza.",
  url: siteUrl.replace(/\/+$/, ""),
  locale: "pt_BR",

  seo: {
    title: "Integrações ERP e Automação de Processos Empresariais",
    description:
      "Desenvolvimento de integrações personalizadas para ERP, automação de processos, WhatsApp, cashback, dashboards e inteligência artificial.",
    keywords: [
      "integração ERP",
      "automação de processos",
      "integração WhatsApp ERP",
      "Firebird",
      "PostgreSQL",
      "SQL Server",
      "n8n",
      "dashboards",
      "cashback",
      "inteligência artificial",
    ],
  },

  contact: {
    /** Somente dígitos, com DDI e DDD. Ex.: 5511999999999 */
    whatsappNumber: clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER).replace(/\D/g, ""),
    /** Texto exibido para o número (opcional). Se vazio, é derivado do número. */
    whatsappDisplay: clean(process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY),
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  },

  nav: [
    { label: "Soluções", href: "#solucoes" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Projetos", href: "#projetos" },
    { label: "Perguntas frequentes", href: "#faq" },
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
