import { Info } from "lucide-react";
import { technologies } from "@/content/landing";
import { Container } from "@/components/ui/Container";

export function Technologies() {
  return (
    <section aria-labelledby="tecnologias-title" className="border-y border-slate-200 bg-paper py-16 sm:py-20">
      <Container className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <div data-reveal>
          <h2 id="tecnologias-title" className="text-xl font-semibold tracking-tight sm:text-2xl">
            {technologies.title}
          </h2>
          <p className="mt-3 flex gap-2.5 text-[0.9375rem] leading-relaxed text-slate-600">
            <Info className="mt-0.5 size-4 shrink-0 text-slate-400" aria-hidden="true" />
            {technologies.note}
          </p>
        </div>
        <ul data-reveal className="flex flex-wrap gap-2.5 [--reveal-delay:100ms]" aria-label="Tecnologias utilizadas">
          {technologies.items.map((t) => (
            <li
              key={t}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-mono text-[13px] font-medium text-navy-700"
            >
              {t}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
