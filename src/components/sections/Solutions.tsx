import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import type { Solution, SolutionsContent } from "@/content/types";
import { solutionMessage } from "@/lib/whatsapp";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Largura do bloco de CTA para completar a última linha da grade (6 colunas no desktop). */
const CTA_SPAN: Record<number, string> = { 2: "lg:col-span-2", 4: "lg:col-span-4", 6: "lg:col-span-6" };

export function Solutions({ content }: { content: SolutionsContent }) {
  const featuredCount = Math.min(content.featured ?? 2, content.items.length) >= 2 ? 2 : 0;
  const regularCount = content.items.length - featuredCount;
  const remainder = regularCount % 3;
  const ctaLgSpan = remainder === 0 ? 6 : (3 - remainder) * 2;
  const ctaMdFull = (content.items.length + 1) % 2 === 1;
  const ctaWide = ctaLgSpan >= 4;

  return (
    <section id="solucoes" aria-labelledby="solucoes-title" className="section bg-paper">
      <Container>
        <SectionHeading id="solucoes-title" eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} />

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {content.items.map((item, i) => (
            <SolutionCard key={item.id} item={item} featured={i < featuredCount} />
          ))}

          <li
            className={`flex flex-col justify-between gap-6 rounded-2xl bg-navy-900 p-7 ${CTA_SPAN[ctaLgSpan]} ${
              ctaMdFull ? "md:col-span-2" : ""
            } ${ctaWide ? "lg:flex-row lg:items-center lg:p-8" : ""}`}
          >
            <div>
              <p className="text-lg font-semibold text-white">{content.cta.title}</p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-200">{content.cta.text}</p>
            </div>
            <a href="#diagnostico" className="btn btn-primary self-start lg:self-auto">
              {content.cta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </Container>
    </section>
  );
}

function SolutionCard({ item, featured }: { item: Solution; featured: boolean }) {
  const { id, icon: Icon, title, description, benefits, href } = item;
  return (
    <li
      className={`group flex flex-col rounded-2xl border border-slate-200 bg-white transition-shadow duration-200 hover:shadow-lifted ${
        featured ? "p-7 sm:p-8 lg:col-span-3" : "p-7 lg:col-span-2"
      }`}
    >
      <span
        className={`flex items-center justify-center rounded-xl text-white ${
          featured ? "size-12 bg-electric-600" : "size-11 bg-navy-900"
        }`}
      >
        <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
      </span>
      <h3 className={`mt-6 font-semibold ${featured ? "text-xl" : "text-lg"}`}>{title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-600">{description}</p>

      {featured && benefits?.length ? (
        <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-navy-800">
              <Check className="mt-0.5 size-4 shrink-0 text-electric-600" aria-hidden="true" />
              {b}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
        <WhatsAppCta
          message={solutionMessage(title)}
          event="solution_click"
          location="solucoes"
          buttonId={`solucao_${id}`}
          solutionCategory={id}
          leadType="empresa"
          className="inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-electric-600 transition-colors hover:text-electric-800"
          aria-label={`Falar sobre ${title} pelo WhatsApp`}
        >
          Falar sobre esta solução
          <ArrowUpRight
            className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </WhatsAppCta>
        {href ? (
          <Link
            href={href}
            className="py-1 text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-navy-900"
          >
            Saiba mais<span className="sr-only"> sobre {title.toLowerCase()}</span>
          </Link>
        ) : null}
      </div>
    </li>
  );
}
