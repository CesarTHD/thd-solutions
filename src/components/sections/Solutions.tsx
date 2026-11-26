import { ArrowUpRight, Check } from "lucide-react";
import { solutions } from "@/content/landing";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Solutions() {
  return (
    <section id="solucoes" aria-labelledby="solucoes-title" className="section bg-paper">
      <Container>
        <SectionHeading id="solucoes-title" eyebrow="Soluções" title={solutions.title} subtitle={solutions.subtitle} />

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.items.map(({ id, icon: Icon, title, description, benefits, whatsappOrigin }) => (
            <li
              key={id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 transition-shadow duration-200 hover:shadow-lifted"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-navy-900 text-white">
                <Icon className="size-5" aria-hidden="true" strokeWidth={1.75} />
              </span>
              <h3 className="mt-6 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-600">{description}</p>

              <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-navy-800">
                    <Check className="mt-0.5 size-4 shrink-0 text-electric-600" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-6">
                <WhatsAppCta
                  origin={whatsappOrigin}
                  event="solution_click"
                  section="solucoes"
                  buttonId={`solucao_${id}`}
                  solutionCategory={id}
                  leadType="empresa"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-electric-600 transition-colors hover:text-electric-800"
                  aria-label={`Falar sobre ${title} pelo WhatsApp`}
                >
                  Falar sobre esta solução
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </WhatsAppCta>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
