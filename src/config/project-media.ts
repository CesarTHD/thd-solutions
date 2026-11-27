/**
 * Mídia real dos projetos (screenshots e vídeos).
 *
 * COMO ADICIONAR:
 * 1. Coloque os arquivos na pasta do projeto:
 *      public/projects/cashback/     → Plataforma de relacionamento e fidelização
 *      public/projects/dashboard/    → Dashboard de inteligência empresarial
 *      public/projects/automation/   → Automação de processos empresariais
 * 2. Registre cada arquivo abaixo, com largura e altura reais em pixels
 *    (o next/image precisa delas para evitar saltos de layout).
 * 3. Gere um novo build.
 *
 * Enquanto a lista de um projeto estiver vazia, a página mostra a
 * demonstração ilustrativa, identificada como tal.
 *
 * Use apenas telas reais. Oculte ou anonimize nomes de clientes, valores
 * e qualquer dado pessoal antes de publicar.
 *
 * Exemplo:
 *   cashback: {
 *     screenshots: [
 *       { src: "/projects/cashback/clientes.png", alt: "Tela de segmentação de clientes", width: 1600, height: 1000 },
 *     ],
 *     video: { src: "/projects/cashback/demo.mp4", poster: "/projects/cashback/demo-poster.jpg", title: "Demonstração do cashback" },
 *   },
 */

export type ProjectId = "cashback" | "dashboard" | "automation";

export interface ProjectScreenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProjectVideo {
  src: string;
  /** Imagem exibida antes do play (recomendado). */
  poster?: string;
  /** Descrição acessível do vídeo. */
  title: string;
}

export interface ProjectMedia {
  screenshots: ProjectScreenshot[];
  video?: ProjectVideo;
}

export const projectMedia: Record<ProjectId, ProjectMedia> = {
  cashback: { screenshots: [] },
  dashboard: { screenshots: [] },
  automation: { screenshots: [] },
};
