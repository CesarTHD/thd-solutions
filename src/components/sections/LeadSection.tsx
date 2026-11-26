import { leadForm } from "@/content/landing";
import { LeadForm } from "@/components/forms/LeadForm";
import { Container } from "@/components/ui/Container";

const NEXT_STEPS = [
  "Você envia a mensagem pelo WhatsApp, já organizada com suas respostas.",
  "Um especialista entende o contexto e o ERP utilizado.",
  "Agendamos o diagnóstico para avaliar a viabilidade técnica.",
];

export function LeadSection() {
  return (
    <section id="diagnostico" aria-labelledby="diagnostico-title" className="section bg-paper">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:pt-4">
          <p className="eyebrow">Diagnóstico gratuito</p>
          <h2 id="diagnostico-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl sm:leading-[1.15]">
            {leadForm.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{leadForm.subtitle}</p>

          <div className="mt-10">
            <h3 className="text-sm font-semibold text-navy-900">O que acontece depois</h3>
            <ol className="mt-4 space-y-4">
              {NEXT_STEPS.map((s, i) => (
                <li key={s} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-slate-600">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-navy-900 font-mono text-[11px] font-semibold text-white">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <LeadForm />
      </Container>
    </section>
  );
}
