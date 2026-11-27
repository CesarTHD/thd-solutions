import type { PainsContent } from "@/content/types";
import { Container } from "@/components/ui/Container";

export function Pains({ content }: { content: PainsContent }) {
  return (
    <section aria-labelledby="dores-title" className="section border-t border-slate-200 bg-white">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="dores-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl sm:leading-[1.15]">
            {content.title}
          </h2>
          <p className="mt-8 border-l-2 border-electric-600 pl-5 text-lg leading-relaxed font-medium text-navy-800">
            {content.closing}
          </p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
          {content.items.map(({ icon: Icon, title, text }) => (
            <li key={title} className="bg-white p-6 sm:p-7">
              <Icon className="size-5 text-navy-500" aria-hidden="true" strokeWidth={1.75} />
              <h3 className="mt-4 text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate-600">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
