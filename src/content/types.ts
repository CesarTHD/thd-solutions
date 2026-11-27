/**
 * Formato do conteúdo das seções. A página inicial e as páginas de serviço
 * usam os mesmos componentes, cada uma com seu próprio conteúdo.
 */
import type { LucideIcon } from "lucide-react";
import type { ProjectId } from "@/config/project-media";

export interface HeroContent {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  assurances: string[];
  /** Mensagem inicial do WhatsApp no CTA principal. */
  whatsappMessage: string;
}

export interface PainsContent {
  eyebrow: string;
  title: string;
  items: { icon: LucideIcon; title: string; text: string }[];
  closing: string;
}

export interface Solution {
  /** Identificador usado como solution_category nos eventos. */
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Exibidos apenas nos cards em destaque. */
  benefits?: string[];
  /** Página com mais detalhes sobre a solução (link interno). */
  href?: string;
}

export interface SolutionsContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Solution[];
  /** Quantos cards iniciais aparecem em destaque (padrão: 2). */
  featured?: number;
  /** Bloco de CTA exibido ao final da grade. */
  cta: { title: string; text: string; label: string };
}

export type ProjectMockup = "loyalty" | "dashboard" | "automation";

export interface Project {
  id: ProjectId;
  tag: string;
  title: string;
  description: string;
  features: string[];
  mockup: ProjectMockup;
}

export interface ProjectsContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Projetos exibidos, na ordem desejada. */
  ids: ProjectId[];
  cta: { title: string; text: string; label: string; whatsappMessage: string };
}

export interface ProcessContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: { title: string; text: string }[];
}

export interface FaqContent {
  title: string;
  subtitle: string;
  items: { q: string; a: string }[];
}

export interface LeadContent {
  title: string;
  subtitle: string;
  /** solution_category enviada no evento lead_form_submit. */
  category: string;
  needPlaceholder: string;
}

export interface FinalCtaContent {
  title: string;
  subtitle: string;
  cta: string;
}
