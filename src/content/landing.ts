/**
 * Conteúdo comercial da página inicial e blocos compartilhados entre páginas.
 * Edite os textos aqui sem precisar mexer nos componentes.
 * O conteúdo das páginas de anúncio fica em ./service-pages.ts.
 */
import {
  ArrowLeftRight,
  BarChart3,
  Bot,
  Code,
  Database,
  FileSpreadsheet,
  Gift,
  Handshake,
  Layers,
  MessageCircle,
  Network,
  PackagePlus,
  Repeat,
  Tag,
  TrendingUp,
  Unplug,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ProjectId } from "@/config/project-media";
import { routes } from "@/config/pages";
import { whatsappMessages } from "@/lib/whatsapp";
import type {
  FaqContent,
  FinalCtaContent,
  HeroContent,
  LeadContent,
  PainsContent,
  ProcessContent,
  Project,
  ProjectsContent,
  SolutionsContent,
} from "./types";

/* ------------------------------------------------------------------ */
/* Blocos compartilhados                                               */
/* ------------------------------------------------------------------ */

export const sharedAssurances = [
  "Sem precisar trocar seu ERP",
  "Desenvolvimento sob medida",
  "Atendimento em todo o Brasil",
];

/** Catálogo de projetos. A mídia real fica em src/config/project-media.ts. */
export const projectCatalog: Record<ProjectId, Project> = {
  cashback: {
    id: "cashback",
    tag: "Relacionamento e fidelização",
    title: "Plataforma de relacionamento e fidelização",
    description:
      "Sistema conectado ao ERP para conhecer melhor os clientes, gerir cashback e criar campanhas de recompra pelo WhatsApp.",
    features: [
      "Integração com ERP e banco Firebird",
      "Cadastro e segmentação de clientes",
      "Gestão de cashback",
      "Campanhas via WhatsApp",
      "Histórico de compras",
    ],
    mockup: "loyalty",
  },
  dashboard: {
    id: "dashboard",
    tag: "Inteligência de dados",
    title: "Dashboard de inteligência empresarial",
    description:
      "Painel que reúne informações de diferentes fontes para acompanhar a operação e apoiar decisões.",
    features: [
      "Centralização de informações empresariais",
      "Indicadores comerciais e operacionais",
      "Análise de dados",
      "Acompanhamento de resultados",
    ],
    mockup: "dashboard",
  },
  automation: {
    id: "automation",
    tag: "Integração e automação",
    title: "Automação de processos empresariais",
    description:
      "Fluxos que conectam sistemas e executam tarefas automaticamente, sem transferências manuais de informação.",
    features: [
      "Integrações entre sistemas",
      "APIs REST",
      "Webhooks",
      "Automações com n8n",
      "Processamento e sincronização de dados",
    ],
    mockup: "automation",
  },
};

export const leadFormShared = {
  cta: "Solicitar diagnóstico gratuito pelo WhatsApp",
  privacyNote:
    "Suas respostas são usadas apenas para montar a mensagem no WhatsApp. Nada é armazenado nesta página.",
  nextSteps: [
    "Você envia a mensagem pelo WhatsApp, já organizada com suas respostas.",
    "Um especialista entende o contexto e os sistemas envolvidos.",
    "Avaliamos a viabilidade técnica e indicamos o melhor caminho.",
  ],
};

export const processSteps = [
  { title: "Diagnóstico gratuito", text: "Entendemos sua operação, os sistemas envolvidos e o que precisa ser resolvido." },
  { title: "Proposta", text: "Avaliamos a viabilidade técnica e apresentamos escopo, prazo e investimento." },
  { title: "Desenvolvimento", text: "Construímos e testamos a solução, validando cada etapa com você." },
  { title: "Implantação", text: "Colocamos a solução em funcionamento e acompanhamos os primeiros resultados." },
];

/* ------------------------------------------------------------------ */
/* Página inicial                                                      */
/* ------------------------------------------------------------------ */

export const hero: HeroContent = {
  eyebrow: "Desenvolvimento de software e integrações empresariais",
  title: "Integramos seus sistemas.",
  titleHighlight: "Automatizamos seus processos.",
  subtitle:
    "Desenvolvemos integrações e softwares personalizados para conectar ERPs, APIs, bancos de dados e ferramentas empresariais, eliminando processos manuais e retrabalho.",
  primaryCta: "Solicitar diagnóstico gratuito",
  secondaryCta: "Conhecer nossas soluções",
  assurances: sharedAssurances,
  whatsappMessage: whatsappMessages.hero,
};

export const pains: PainsContent = {
  eyebrow: "Diagnóstico",
  title: "Sua empresa ainda depende de processos manuais e sistemas que não se comunicam?",
  items: [
    {
      icon: Unplug,
      title: "Sistemas isolados",
      text: "ERP, loja virtual, CRM e WhatsApp funcionando sem trocar informações entre si.",
    },
    {
      icon: ArrowLeftRight,
      title: "Digitação duplicada",
      text: "Equipe transferindo dados manualmente de um sistema para outro.",
    },
    {
      icon: FileSpreadsheet,
      title: "Planilhas paralelas",
      text: "Controles importantes mantidos fora do sistema, sujeitos a erros e versões diferentes.",
    },
    {
      icon: Repeat,
      title: "Trabalho repetitivo",
      text: "Tarefas operacionais que poderiam ser executadas automaticamente.",
    },
    {
      icon: PackagePlus,
      title: "Funcionalidades ausentes",
      text: "Recursos de que a operação precisa e que o sistema atual não oferece.",
    },
    {
      icon: Database,
      title: "Dados sem leitura",
      text: "As informações existem, mas são difíceis de consultar e analisar.",
    },
  ],
  closing:
    "Não é preciso trocar tudo para resolver esses problemas. Integramos o que já funciona e desenvolvemos o que falta.",
};

export const solutions: SolutionsContent = {
  eyebrow: "Soluções",
  title: "Tecnologia sob medida para a operação e a gestão da sua empresa.",
  subtitle:
    "Integrações, sistemas e automações construídos sobre o que sua equipe já usa, com experiência em ERPs e bancos de dados empresariais.",
  items: [
    {
      id: "integracao",
      icon: Network,
      title: "Integração de sistemas",
      description:
        "Conectamos ERPs, APIs, bancos de dados e plataformas empresariais, permitindo a comunicação automatizada entre diferentes sistemas.",
      benefits: ["Informação atualizada em todos os sistemas", "Fim da redigitação entre plataformas"],
      href: routes.integracao,
    },
    {
      id: "desenvolvimento",
      icon: Code,
      title: "Desenvolvimento de software sob medida",
      description:
        "Desenvolvemos sistemas personalizados de acordo com os processos e necessidades específicas da sua empresa.",
      benefits: ["Funcionalidades pensadas para o seu processo", "Integração com os sistemas que você já usa"],
      href: routes.desenvolvimento,
    },
    {
      id: "automacao",
      icon: Workflow,
      title: "Automação de processos",
      description:
        "Eliminamos tarefas repetitivas, transferências manuais de informações e retrabalho por meio de automações inteligentes.",
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      title: "Integração com WhatsApp",
      description:
        "Automatizamos notificações, campanhas, cobranças e relacionamento com clientes utilizando dados dos sistemas empresariais.",
    },
    {
      id: "dashboards",
      icon: BarChart3,
      title: "Dashboards e inteligência de dados",
      description: "Transformamos informações dispersas em indicadores comerciais, financeiros e operacionais.",
    },
    {
      id: "cashback",
      icon: Gift,
      title: "Cashback e fidelização",
      description:
        "Desenvolvemos soluções de relacionamento e incentivo à recompra integradas aos sistemas existentes.",
    },
    {
      id: "ia",
      icon: Bot,
      title: "Inteligência artificial aplicada a empresas",
      description:
        "Implementamos soluções de inteligência artificial para consultas de dados, automações e apoio à tomada de decisão.",
    },
  ],
  cta: {
    title: "Tem uma necessidade diferente?",
    text: "Conte o que precisa e avaliamos a melhor solução para o seu caso.",
    label: "Solicitar orçamento",
  },
};

export const projects: ProjectsContent = {
  eyebrow: "Portfólio",
  title: "Soluções que desenvolvemos",
  subtitle:
    "Tipos de projeto que entregamos para a operação de empresas. As interfaces exibidas são demonstrações ilustrativas, não telas de clientes.",
  ids: ["cashback", "dashboard", "automation"],
  cta: {
    title: "Sua empresa tem um processo parecido?",
    text: "Mostre como funciona hoje e avaliamos o que pode ser integrado ou automatizado.",
    label: "Avaliar minha integração",
    whatsappMessage: whatsappMessages.projects,
  },
};

export const howItWorks: ProcessContent = {
  eyebrow: "Como funciona",
  title: "Um processo claro, do diagnóstico à implantação",
  subtitle: "Cada etapa é validada com você antes de seguirmos para a próxima.",
  steps: processSteps,
};

export const leadForm: LeadContent = {
  title: "Qual problema podemos resolver para sua empresa?",
  subtitle: "Conte-nos sua necessidade e avaliaremos a melhor solução para o seu negócio.",
  category: "geral",
  needPlaceholder:
    "Ex.: queremos que os pedidos da loja virtual entrem automaticamente no ERP, sem redigitação.",
};

export const faq: FaqContent = {
  title: "Perguntas frequentes",
  subtitle: "Cada projeto passa por avaliação técnica antes de qualquer proposta.",
  items: [
    {
      q: "Vocês desenvolvem sistemas sob medida ou apenas integrações?",
      a: "Os dois. Desenvolvemos sistemas, módulos e APIs personalizados e também integramos sistemas existentes. Nosso foco é tecnologia aplicada à operação e à gestão de empresas.",
    },
    {
      q: "Preciso trocar meu ERP?",
      a: "Não. Nosso trabalho é complementar o sistema que sua empresa já utiliza, com integrações, automações e novas funcionalidades desenvolvidas em torno dele.",
    },
    {
      q: "Vocês desenvolvem e integram APIs?",
      a: "Sim. Desenvolvemos APIs para expor dados e funções do seu sistema e integramos APIs de plataformas externas, como lojas virtuais, CRMs e serviços de mensagem.",
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
      q: "Quanto custa um projeto?",
      a: "O investimento depende do escopo, da complexidade e da forma de acesso aos sistemas. Após o diagnóstico gratuito, apresentamos uma proposta com o escopo definido.",
    },
    {
      q: "Qual o prazo de desenvolvimento?",
      a: "O prazo é definido na proposta, depois de entendermos a necessidade e as condições técnicas do seu ambiente.",
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

export const finalCta: FinalCtaContent = {
  title: "Vamos conectar seus sistemas e automatizar sua operação?",
  subtitle: "Conte qual processo você precisa automatizar ou qual sistema precisa desenvolver.",
  cta: "Conversar com um especialista",
};

/* ------------------------------------------------------------------ */
/* Parcerias com fornecedores de ERP (página inicial)                  */
/* ------------------------------------------------------------------ */

export const softwareHouses = {
  eyebrow: "Para fornecedores de ERP",
  title: "Amplie o que seu ERP pode oferecer aos clientes.",
  description:
    "A THD Solutions atua como parceira tecnológica de empresas fornecedoras de ERP, desenvolvendo módulos complementares, integrações e funcionalidades personalizadas sem a necessidade de ampliar sua equipe interna.",
  highlights: [
    { icon: Layers, text: "Desenvolvimento de módulos complementares" },
    { icon: Network, text: "Integrações com plataformas externas" },
    { icon: Tag, text: "Possibilidade de soluções white label" },
    { icon: Handshake, text: "Terceirização de demandas específicas" },
    { icon: TrendingUp, text: "Ampliação do portfólio comercial" },
  ] satisfies { icon: LucideIcon; text: string }[],
  cta: "Conversar sobre uma parceria tecnológica",
};

/* ------------------------------------------------------------------ */
/* Tecnologias                                                         */
/* ------------------------------------------------------------------ */

export const technologies = {
  title: "Tecnologias e compatibilidade",
  items: ["Firebird", "PostgreSQL", "SQL Server", "APIs REST", "Webhooks", "WhatsApp", "Node.js", "Python", "n8n"],
  note: "Trabalhamos com diferentes arquiteturas e tecnologias. A viabilidade de cada integração é avaliada individualmente, conforme as possibilidades de acesso aos seus sistemas.",
};
