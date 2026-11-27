/**
 * Conteúdo das páginas de destino do Google Ads.
 * Cada página atende a uma intenção de pesquisa e reutiliza as seções da página inicial.
 */
import {
  AppWindow,
  ArrowLeftRight,
  Archive,
  BarChart3,
  Blocks,
  Braces,
  Cable,
  Database,
  EyeOff,
  FileSpreadsheet,
  Network,
  PackagePlus,
  Plug,
  Puzzle,
  Repeat,
  Unplug,
  Users,
  Workflow,
} from "lucide-react";
import type { PageType } from "@/config/pages";
import { routes } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { processSteps, sharedAssurances } from "./landing";
import type {
  FaqContent,
  FinalCtaContent,
  HeroContent,
  LeadContent,
  PainsContent,
  ProcessContent,
  ProjectsContent,
  SolutionsContent,
} from "./types";

export interface ServicePageContent {
  path: string;
  pageType: PageType;
  /** Nome do serviço (dados estruturados). */
  serviceName: string;
  metadata: { title: string; description: string };
  hero: HeroContent;
  pains: PainsContent;
  solutions: SolutionsContent;
  projects: ProjectsContent;
  process: ProcessContent;
  faq: FaqContent;
  lead: LeadContent;
  finalCta: FinalCtaContent;
}

const brand = siteConfig.name;

const process: ProcessContent = {
  eyebrow: "Processo de contratação",
  title: "Do diagnóstico gratuito à solução funcionando",
  subtitle: "Você sabe o que será entregue, em quanto tempo e por qual investimento antes de começarmos.",
  steps: processSteps,
};

const leadBase = {
  title: "Qual problema podemos resolver para sua empresa?",
  subtitle: "Conte-nos sua necessidade e avaliaremos a melhor solução para o seu negócio.",
};

/* ------------------------------------------------------------------ */
/* /integracao-de-sistemas                                             */
/* ------------------------------------------------------------------ */

export const integracaoPage: ServicePageContent = {
  path: routes.integracao,
  pageType: "lp_integracao",
  serviceName: "Integração de sistemas",
  metadata: {
    title: "Integração de Sistemas e ERP para Empresas",
    description:
      "Integração de sistemas, ERP, APIs e bancos de dados para eliminar redigitação e processos manuais. Integramos inclusive sistemas legados. Solicite um diagnóstico gratuito.",
  },
  hero: {
    eyebrow: "Integração de sistemas, ERP e APIs",
    title: "Integração de sistemas",
    titleHighlight: "para empresas",
    subtitle:
      "Conectamos ERPs, APIs, bancos de dados e plataformas empresariais para eliminar processos manuais e melhorar sua operação.",
    primaryCta: "Solicitar diagnóstico gratuito",
    secondaryCta: "Conhecer nossas soluções",
    assurances: sharedAssurances,
    whatsappMessage: `Olá! Vim pelo site da ${brand} e gostaria de um diagnóstico gratuito para integrar os sistemas da minha empresa.`,
  },
  pains: {
    eyebrow: "Diagnóstico",
    title: "Seus sistemas não conversam entre si?",
    items: [
      {
        icon: ArrowLeftRight,
        title: "Redigitação entre sistemas",
        text: "Pedidos, clientes e produtos cadastrados mais de uma vez, em plataformas diferentes.",
      },
      {
        icon: Unplug,
        title: "ERP isolado",
        text: "O sistema de gestão não troca informações com a loja virtual, o CRM ou o WhatsApp.",
      },
      {
        icon: Archive,
        title: "Sistema legado sem API",
        text: "Um sistema antigo que funciona, mas não oferece uma forma simples de integração.",
      },
      {
        icon: FileSpreadsheet,
        title: "Planilhas como ponte",
        text: "Exportações e importações manuais para levar dados de um lugar para outro.",
      },
      {
        icon: EyeOff,
        title: "Informações desencontradas",
        text: "Estoque, preços e status diferentes em cada sistema, gerando erros e retrabalho.",
      },
      {
        icon: Repeat,
        title: "Processos dependentes de pessoas",
        text: "Rotinas que param quando quem sabe fazer a transferência de dados não está disponível.",
      },
    ],
    closing:
      "Com a integração certa, cada informação é registrada uma única vez e chega automaticamente aonde precisa.",
  },
  solutions: {
    eyebrow: "Soluções",
    title: "Integrações que desenvolvemos",
    subtitle:
      "Avaliamos como cada sistema pode trocar informações e construímos a integração mais segura e estável para o seu cenário.",
    items: [
      {
        id: "integracao_erp",
        icon: Database,
        title: "Integração com ERP",
        description:
          "Conectamos seu ERP a lojas virtuais, CRMs, WhatsApp e outros sistemas, com experiência em bancos Firebird, PostgreSQL e SQL Server.",
        benefits: ["Sem precisar trocar o ERP", "Dados atualizados automaticamente"],
      },
      {
        id: "integracao_api",
        icon: Plug,
        title: "Integração de API",
        description:
          "Integramos APIs REST e webhooks de plataformas externas aos seus sistemas, com tratamento de erros e reprocessamento.",
        benefits: ["Comunicação automática entre plataformas", "Monitoramento das integrações"],
      },
      {
        id: "integracao_software",
        icon: Network,
        title: "Integração de software",
        description: "Fazemos sistemas diferentes funcionarem como uma operação única, sem redigitação.",
      },
      {
        id: "integracao_banco",
        icon: Cable,
        title: "Integração de bancos de dados",
        description: "Sincronizamos dados entre bancos e sistemas, com regras de transformação e validação.",
      },
      {
        id: "sistemas_legados",
        icon: Archive,
        title: "Sistemas legados",
        description:
          "Integramos sistemas antigos por acesso ao banco, arquivos ou serviços intermediários, quando não há API.",
      },
      {
        id: "automacao",
        icon: Workflow,
        title: "Automação de processos",
        description: "Fluxos automáticos disparados por eventos dos sistemas, com n8n, APIs e webhooks.",
      },
    ],
    cta: {
      title: "Não sabe se seu sistema pode ser integrado?",
      text: "Descreva o cenário e avaliamos a viabilidade técnica sem custo.",
      label: "Avaliar minha integração",
    },
  },
  projects: {
    eyebrow: "Portfólio",
    title: "Integrações em projetos reais",
    subtitle:
      "Tipos de projeto que entregamos conectando sistemas empresariais. As interfaces exibidas são demonstrações ilustrativas, não telas de clientes.",
    ids: ["automation", "cashback", "dashboard"],
    cta: {
      title: "Quer integrar sistemas na sua empresa?",
      text: "Conte quais sistemas precisam conversar e indicamos o melhor caminho.",
      label: "Avaliar minha integração",
      whatsappMessage: `Olá! Vim pelo site da ${brand} e gostaria de avaliar uma integração entre os sistemas da minha empresa.`,
    },
  },
  process,
  faq: {
    title: "Perguntas frequentes sobre integração de sistemas",
    subtitle: "A viabilidade de cada integração é avaliada no diagnóstico gratuito.",
    items: [
      {
        q: "Quais sistemas vocês conseguem integrar?",
        a: "ERPs, lojas virtuais, CRMs, plataformas de mensagem e sistemas internos, por meio de APIs REST, webhooks ou acesso a bancos de dados como Firebird, PostgreSQL e SQL Server. Cada cenário é avaliado individualmente.",
      },
      {
        q: "É possível integrar sistemas que não possuem API?",
        a: "Em muitos casos, sim — por acesso ao banco de dados, arquivos de exportação ou serviços intermediários. Isso depende do sistema e das permissões disponíveis.",
      },
      {
        q: "Preciso trocar meu ERP para integrar com outras plataformas?",
        a: "Não. A integração é construída em torno do sistema que sua empresa já utiliza.",
      },
      {
        q: "A integração funciona em tempo real?",
        a: "Depende dos sistemas envolvidos. Quando há webhooks ou APIs, a troca pode ser imediata. Em outros casos, usamos sincronizações programadas. A frequência é definida no diagnóstico.",
      },
      {
        q: "Vocês também desenvolvem APIs para o nosso sistema?",
        a: "Sim. Podemos desenvolver uma API para expor dados e funções do seu sistema de forma controlada, facilitando integrações futuras.",
      },
      {
        q: "Quanto custa uma integração?",
        a: "O investimento depende do escopo, da complexidade e da forma de acesso aos sistemas. Após o diagnóstico gratuito, apresentamos uma proposta com o escopo definido.",
      },
    ],
  },
  lead: {
    ...leadBase,
    category: "integracao",
    needPlaceholder: "Ex.: quero que os pedidos da loja virtual entrem automaticamente no ERP.",
  },
  finalCta: {
    title: "Pronto para integrar os sistemas da sua empresa?",
    subtitle: "Fale com um especialista e descubra como conectar suas ferramentas sem trocar o que já funciona.",
    cta: "Conversar com um especialista",
  },
};

/* ------------------------------------------------------------------ */
/* /desenvolvimento-de-software                                        */
/* ------------------------------------------------------------------ */

export const desenvolvimentoPage: ServicePageContent = {
  path: routes.desenvolvimento,
  pageType: "lp_desenvolvimento",
  serviceName: "Desenvolvimento de software sob medida",
  metadata: {
    title: "Desenvolvimento de Software Sob Medida",
    description:
      "Empresa de desenvolvimento de software e sistemas sob medida: sistemas empresariais, módulos, APIs, aplicações web, automações e dashboards. Solicite um diagnóstico gratuito.",
  },
  hero: {
    eyebrow: "Desenvolvimento de software sob medida",
    title: "Desenvolvimento de software sob medida",
    titleHighlight: "para empresas",
    subtitle:
      "Criamos sistemas personalizados, integrações e soluções tecnológicas de acordo com as necessidades reais da sua operação.",
    primaryCta: "Solicitar diagnóstico gratuito",
    secondaryCta: "Conhecer nossas soluções",
    assurances: ["Sistemas para operação e gestão", "Integração com seu ERP", "Atendimento em todo o Brasil"],
    whatsappMessage: `Olá! Vim pelo site da ${brand} e gostaria de um diagnóstico gratuito para desenvolver um sistema para minha empresa.`,
  },
  pains: {
    eyebrow: "Diagnóstico",
    title: "Os sistemas atuais não acompanham a sua operação?",
    items: [
      {
        icon: FileSpreadsheet,
        title: "Planilhas no lugar de sistema",
        text: "Processos importantes controlados em planilhas que ninguém mais consegue manter.",
      },
      {
        icon: PackagePlus,
        title: "Funcionalidades ausentes",
        text: "O sistema atual não oferece o que a operação precisa, e o fornecedor não prevê a mudança.",
      },
      {
        icon: Puzzle,
        title: "Ferramentas que não se adaptam",
        text: "Softwares prontos que obrigam a empresa a mudar seu processo para caber no sistema.",
      },
      {
        icon: Repeat,
        title: "Retrabalho e controles manuais",
        text: "Etapas repetidas à mão porque não existe uma ferramenta para elas.",
      },
      {
        icon: Unplug,
        title: "Sistemas desconectados",
        text: "Cada área usa uma ferramenta diferente, sem troca automática de informações.",
      },
      {
        icon: EyeOff,
        title: "Pouca visibilidade",
        text: "Falta de indicadores confiáveis para acompanhar a operação e tomar decisões.",
      },
    ],
    closing:
      "Um sistema sob medida segue o seu processo, se integra ao que você já usa e cresce junto com a empresa.",
  },
  solutions: {
    eyebrow: "Soluções",
    title: "O que desenvolvemos",
    subtitle:
      "Somos especializados em software para operação e gestão empresarial: sistemas que se conectam ao ERP e resolvem problemas reais do dia a dia.",
    items: [
      {
        id: "sistemas_personalizados",
        icon: Users,
        title: "Sistemas empresariais personalizados",
        description:
          "Sistemas web desenvolvidos a partir dos seus processos, com regras de negócio, perfis de acesso e relatórios.",
        benefits: ["Construído em torno da sua operação", "Integração com ERP e outras ferramentas"],
      },
      {
        id: "modulos",
        icon: Blocks,
        title: "Desenvolvimento de módulos",
        description:
          "Funcionalidades complementares para sistemas existentes, cobrindo o que o ERP não oferece.",
        benefits: ["Sem substituir o sistema atual", "Equipe trabalhando no ambiente que já conhece"],
      },
      {
        id: "desenvolvimento_api",
        icon: Braces,
        title: "Desenvolvimento de APIs",
        description: "APIs REST seguras para expor dados e funções e permitir integrações entre sistemas.",
      },
      {
        id: "aplicacoes_web",
        icon: AppWindow,
        title: "Aplicações web",
        description: "Portais, painéis e ferramentas internas acessíveis pelo navegador, no computador ou no celular.",
      },
      {
        id: "automacao",
        icon: Workflow,
        title: "Automações",
        description: "Rotinas automáticas que eliminam tarefas repetitivas e transferências manuais de dados.",
      },
      {
        id: "dashboards",
        icon: BarChart3,
        title: "Dashboards empresariais",
        description: "Indicadores comerciais, financeiros e operacionais reunidos em um só lugar.",
      },
    ],
    cta: {
      title: "Tem um sistema em mente?",
      text: "Descreva a ideia e ajudamos a definir o escopo da primeira versão.",
      label: "Solicitar orçamento",
    },
  },
  projects: {
    eyebrow: "Portfólio",
    title: "Sistemas que desenvolvemos",
    subtitle:
      "Tipos de projeto que entregamos para a operação de empresas. As interfaces exibidas são demonstrações ilustrativas, não telas de clientes.",
    ids: ["cashback", "dashboard", "automation"],
    cta: {
      title: "Precisa de um sistema parecido?",
      text: "Conte o que sua empresa precisa e avaliamos a melhor forma de desenvolver.",
      label: "Solicitar orçamento",
      whatsappMessage: `Olá! Vim pelo site da ${brand} e gostaria de solicitar um orçamento para desenvolver um sistema.`,
    },
  },
  process,
  faq: {
    title: "Perguntas frequentes sobre desenvolvimento de software",
    subtitle: "O escopo, o prazo e o investimento são definidos depois do diagnóstico gratuito.",
    items: [
      {
        q: "Que tipo de software vocês desenvolvem?",
        a: "Sistemas para operação e gestão de empresas: sistemas web personalizados, módulos complementares para ERPs, APIs, automações e dashboards.",
      },
      {
        q: "O sistema pode ser integrado ao ERP que já usamos?",
        a: "Sim, essa é uma das nossas especialidades. A forma de integração é definida no diagnóstico, conforme o acesso disponível ao seu ERP.",
      },
      {
        q: "Como são definidos escopo e investimento?",
        a: "No diagnóstico gratuito entendemos a necessidade. Em seguida, apresentamos uma proposta com escopo, prazo e investimento. Projetos maiores podem ser divididos em etapas.",
      },
      {
        q: "É possível começar com uma versão menor?",
        a: "Sim. Recomendamos começar pelas funções que resolvem o problema principal e evoluir o sistema a partir do uso real.",
      },
      {
        q: "Vocês oferecem suporte após a entrega?",
        a: "Sim. Após a implantação, acompanhamos o funcionamento da solução. As condições de suporte e manutenção são combinadas em cada projeto.",
      },
      {
        q: "Atendem empresas de outras cidades?",
        a: "Sim. Atendemos empresas de todo o Brasil, com reuniões e implantação realizadas de forma remota.",
      },
    ],
  },
  lead: {
    ...leadBase,
    category: "desenvolvimento",
    needPlaceholder: "Ex.: precisamos de um sistema para controlar as ordens de serviço, integrado ao ERP.",
  },
  finalCta: {
    title: "Vamos tirar seu sistema do papel?",
    subtitle: "Fale com um especialista e receba uma avaliação da sua necessidade sem compromisso.",
    cta: "Conversar com um especialista",
  },
};
