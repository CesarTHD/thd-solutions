import type { ProcessContent } from "@/content/types";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks({ content }: { content: ProcessContent }) {
  return (
    <section id="como-funciona" aria-labelledby="como-funciona-title" className="section bg-white">
      <Container>
        <SectionHeading
          id="como-funciona-title"
          eyebrow={content.eyebrow}
          title={content.title}
          subtitle={content.subtitle}
        />

        <ol className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <span
            aria-hidden="true"
            className="absolute top-5 right-[12.5%] left-[12.5%] hidden h-px bg-gradient-to-r from-electric-200 via-slate-200 to-electric-200 lg:block"
          />
          {content.steps.map((step, i) => (
            <li key={step.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
              <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-electric-200 bg-white font-mono text-sm font-semibold text-electric-700 ring-8 ring-white">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-semibold lg:mt-5">{step.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-slate-600 lg:mx-auto lg:max-w-[15rem]">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
