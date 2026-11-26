/**
 * Conteúdo comercial da landing page.
 * Edite os textos aqui sem precisar mexer nos componentes.
 */
import {
  ArrowLeftRight,
  BarChart3,
  Bot,
  ClipboardList,
  Database,
  FileSpreadsheet,
  Gift,
  Layers,
  MessageCircle,
  Network,
  PackagePlus,
  Repeat,
  Unplug,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { WhatsAppOrigin } from "@/lib/whatsapp";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Integrações e automações empresariais",
  title: "Seu ERP não precisa ser substituído.",
  titleHighlight: "Precisa evoluir.",
  subtitle:
    "Desenvolvemos integrações, automações e novas funcionalidades para conectar seu ERP a outras ferramentas, eliminar processos manuais e transformar seus dados em resultados.",
  primaryCta: "Solicitar diagnóstico gratuito",
  secondaryCta: "Conhecer soluções",
  assurances: [
    "Sem necessidade de trocar seu ERP",
    "Desenvolvimento sob medida",
    "Atendimento em todo o Brasil",
  ],
};

/* ------------------------------------------------------------------ */
/* Dores                                                               */
/* ------------------------------------------------------------------ */

export const pains = {
  title: "Seu sistema de gestão acompanha as necessidades da sua empresa?",
  items: [
    {
      icon: ArrowLeftRight,
      title: "Digitação duplicada",
      text: "Funcionários transferindo informações manualmente entre sistemas.",
    },
    {
      icon: Database,
      title: "Dados sem leitura",
      text: "As informações estão no ERP, mas são difíceis de analisar.",
    },
    {
      icon: Repeat,
      title: "Trabalho repetitivo",
      text: "Processos manuais que poderiam ser executados automaticamente.",
    },
    {
      icon: Unplug,
      title: "Ferramentas isoladas",
      text: "ERP, WhatsApp e CRM funcionando sem conversar entre si.",
    },
    {
      icon: FileSpreadsheet,
      title: "Planilhas paralelas",
      text: "Atividades operacionais dependentes de planilhas e controles externos.",
    },
    {
      icon: PackagePlus,
      title: "Recursos que faltam",
      text: "Funcionalidades que o fornecedor do ERP não disponibiliza.",
    },
  ] satisfies { icon: LucideIcon; title: string; text: string }[],
  closing: "Você não precisa mudar todo o seu sistema para resolver esses problemas.",
};

/* ------------------------------------------------------------------ */
/* Soluções                                                            */
/* ------------------------------------------------------------------ */

export type SolutionId =
  | "integracoes"
  | "automacao"
  | "whatsapp"
  | "cashback"
  | "dashboards"
  | "ia";

export interface Solution {
  id: SolutionId;
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  whatsappOrigin: WhatsAppOrigin;
}

export const solutions = {
  title: "Transformamos as limitações do seu ERP em novas possibilidades.",
  subtitle:
    "Soluções construídas sobre o sistema que sua equipe já conhece, sem migrações e sem recomeçar do zero.",
  items: [
    {
      id: "integracoes",
      icon: Network,
      title: "Integrações entre sistemas",
      description:
        "Conecte seu ERP a plataformas externas, APIs, bancos de dados e sistemas internos.",
      benefits: ["Informação atualizada em todos os sistemas", "Fim da redigitação"],
      whatsappOrigin: "solution_integracoes",
    },
    {
      id: "automacao",
      icon: Workflow,
      title: "Automação de processos",
      description:
        "Elimine tarefas repetitivas, transferências manuais de informações e retrabalho.",
      benefits: ["Equipe focada no que gera valor", "Menos erros operacionais"],
      whatsappOrigin: "solution_automacao",
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      title: "WhatsApp integrado ao ERP",
      description:
        "Automatize notificações, cobranças, campanhas comerciais e comunicação com clientes.",
      benefits: ["Contato no canal que o cliente usa", "Cobranças e avisos no momento certo"],
      whatsappOrigin: "solution_whatsapp",
    },
    {
      id: "cashback",
      icon: Gift,
      title: "Cashback e fidelização",
      description:
        "Crie estratégias de relacionamento e incentivo à recompra com os dados do seu ERP.",
      benefits: ["Mais clientes voltando a comprar", "Campanhas baseadas em histórico real"],
      whatsappOrigin: "solution_cashback",
    },
    {
      id: "dashboards",
      icon: BarChart3,
      title: "Dashboards e inteligência comercial",
      description:
        "Transforme dados empresariais em indicadores claros para tomada de decisão.",
      benefits: ["Decisões baseadas em números", "Indicadores sem montar planilhas"],
      whatsappOrigin: "solution_dashboards",
    },
    {
      id: "ia",
      icon: Bot,
      title: "Inteligência artificial",
      description:
        "Consulte informações empresariais em linguagem natural e automatize atividades com IA.",
      benefits: ["Respostas rápidas sobre o negócio", "Atividades analíticas automatizadas"],
      whatsappOrigin: "solution_ia",
    },
  ] satisfies Solution[],
};

/* ------------------------------------------------------------------ */
/* Projetos                                                            */
/* ------------------------------------------------------------------ */

export type ProjectMockup = "loyalty" | "dashboard" | "automation";

export interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  features: string[];
  mockup: ProjectMockup;
  /**
   * Screenshot real (opcional). Coloque o arquivo em /public/projetos/
   * e informe o caminho, ex.: "/projetos/fidelizacao.png".
   * Enquanto vazio, um mockup ilustrativo é exibido.
   */
  image?: { src: string; alt: string; width: number; height: number };
}

export const projects = {
  title: "Soluções que desenvolvemos",
  subtitle:
    "Exemplos de projetos construídos sobre ERPs existentes. As interfaces abaixo são representações ilustrativas.",
  items: [
    {
      id: "fidelizacao",
      tag: "Relacionamento",
      title: "Plataforma de relacionamento e fidelização",
      description:
        "Sistema integrado ao ERP para segmentação de clientes, cashback e campanhas via WhatsApp.",
      features: ["Segmentação por histórico de compras", "Regras de cashback", "Campanhas via WhatsApp"],
      mockup: "loyalty",
    },
    {
      id: "dashboard",
      tag: "Business Intelligence",
      title: "Dashboard de inteligência empresarial",
      description:
        "Centralização de dados e acompanhamento de indicadores comerciais e operacionais.",
      features: ["Dados de múltiplas fontes", "Indicadores comerciais e operacionais", "Acesso pelo navegador"],
      mockup: "dashboard",
    },
    {
      id: "automacao",
      tag: "Automação",
      title: "Automação de processos empresariais",
      description:
        "Integração entre sistemas para eliminar tarefas manuais e automatizar fluxos operacionais.",
      features: ["Fluxos disparados por eventos do ERP", "Sincronização entre sistemas", "Monitoramento de execuções"],
      mockup: "automation",
    },
  ] as Project[],
};

/* ------------------------------------------------------------------ */
/* Software houses                                                     */
/* ------------------------------------------------------------------ */

export const softwareHouses = {
  eyebrow: "Para fornecedores de ERP",
  title: "Você desenvolve ou comercializa sistemas ERP?",
  description:
    "Amplie o portfólio de soluções oferecidas aos seus clientes sem precisar aumentar sua equipe de desenvolvimento. Desenvolvemos módulos complementares, integrações e soluções personalizadas para empresas fornecedoras de ERP.",
  highlights: [
    { icon: Layers, text: "Desenvolvimento de módulos complementares" },
    { icon: Network, text: "Integrações personalizadas" },
    { icon: PackagePlus, text: "Possibilidade de soluções white label" },
    { icon: ArrowLeftRight, text: "Parcerias tecnológicas" },
    { icon: ClipboardList, text: "Ampliação do portfólio comercial" },
  ] satisfies { icon: LucideIcon; text: string }[],
  cta: "Conversar sobre uma parceria",
};

/* ------------------------------------------------------------------ */
/* Como funciona                                                       */
/* ------------------------------------------------------------------ */

export const howItWorks = {
  title: "Um processo claro, do diagnóstico à implantação",
  subtitle: "Cada etapa é validada com você antes de seguirmos para a próxima.",
  steps: [
    {
      title: "Diagnóstico",
      text: "Entendemos seu ERP, sua operação e a necessidade da empresa.",
    },
    {
      title: "Planejamento",
      text: "Avaliamos a viabilidade técnica e definimos a solução.",
    },
    {
      title: "Desenvolvimento",
      text: "Construímos e testamos a integração.",
    },
    {
      title: "Implantação",
      text: "Disponibilizamos a solução e acompanhamos seu funcionamento.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Tecnologias                                                         */
/* ------------------------------------------------------------------ */

export const technologies = {
  title: "Tecnologias e compatibilidade",
  items: [
    "Firebird",
    "PostgreSQL",
    "SQL Server",
    "APIs REST",
    "Webhooks",
    "WhatsApp",
    "Node.js",
    "Python",
    "n8n",
  ],
  note: "Trabalhamos com diferentes arquiteturas e tecnologias. A viabilidade da integração é avaliada individualmente, conforme as possibilidades de acesso ao seu sistema.",
};

/* ------------------------------------------------------------------ */
/* Formulário                                                          */
/* ------------------------------------------------------------------ */

export const leadForm = {
  title: "O que seu ERP ainda não consegue fazer?",
  subtitle:
    "Preencha os campos abaixo. Ao enviar, você será direcionado ao nosso WhatsApp comercial com as informações já organizadas.",
  cta: "Solicitar diagnóstico gratuito",
  privacyNote:
    "Seus dados são usados apenas para iniciar a conversa no WhatsApp. Nada é armazenado nesta página.",
  solutionOptions: [
    { value: "integracao", label: "Integração entre sistemas", leadType: "empresa" },
    { value: "automacao", label: "Automação de processos", leadType: "empresa" },
    { value: "whatsapp", label: "WhatsApp", leadType: "empresa" },
    { value: "cashback", label: "Cashback e fidelização", leadType: "empresa" },
    { value: "dashboards", label: "Dashboards e análise de dados", leadType: "empresa" },
    { value: "ia", label: "Inteligência artificial", leadType: "empresa" },
    { value: "parceria", label: "Parceria para software houses", leadType: "software_house" },
    { value: "outra", label: "Outra necessidade", leadType: "empresa" },
  ] as const,
};

export type SolutionOptionValue = (typeof leadForm.solutionOptions)[number]["value"];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faq = {
  title: "Perguntas frequentes",
  items: [
    {
      q: "Preciso trocar meu ERP?",
      a: "Não. Nosso trabalho é complementar o sistema que sua empresa já utiliza, com integrações, automações e novas funcionalidades desenvolvidas em torno dele.",
    },
    {
      q: "Vocês trabalham com sistemas que utilizam Firebird?",
      a: "Sim. Temos experiência com Firebird, PostgreSQL e SQL Server. A forma de acesso aos dados e a viabilidade de cada integração são avaliadas no diagnóstico.",
    },
    {
      q: "É possível integrar sistemas que não possuem API?",
      a: "Em muitos casos, sim — por exemplo, por acesso ao banco de dados, arquivos de exportação ou serviços intermediários. Isso depende do sistema e das permissões disponíveis, por isso cada caso passa por avaliação técnica.",
    },
    {
      q: "Quanto custa uma integração?",
      a: "O investimento depende do escopo, da complexidade e da forma de acesso ao sistema. Após o diagnóstico, apresentamos uma proposta com o escopo definido.",
    },
    {
      q: "Qual o prazo de desenvolvimento?",
      a: "O prazo é definido na etapa de planejamento, depois de entendermos a necessidade e as condições técnicas do seu ambiente.",
    },
    {
      q: "Vocês oferecem suporte e manutenção?",
      a: "Sim. Após a implantação, acompanhamos o funcionamento da solução. As condições de suporte e manutenção são combinadas em cada projeto.",
    },
    {
      q: "Atendem empresas de outras cidades?",
      a: "Sim. Atendemos empresas de todo o Brasil, com reuniões e implantação realizadas de forma remota.",
    },
    {
      q: "Trabalham em parceria com fornecedores de ERP?",
      a: "Sim. Desenvolvemos módulos complementares, integrações e soluções que podem ser oferecidas em formato white label, conforme o modelo de parceria definido.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* CTA final                                                           */
/* ------------------------------------------------------------------ */

export const finalCta = {
  title: "Seu ERP pode fazer muito mais pela sua empresa.",
  subtitle:
    "Conte-nos qual processo você precisa automatizar ou qual funcionalidade gostaria de implementar.",
  cta: "Conversar com um especialista",
};
