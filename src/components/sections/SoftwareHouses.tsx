import { ArrowRight } from "lucide-react";
import { softwareHouses } from "@/content/landing";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { Container } from "@/components/ui/Container";

export function SoftwareHouses() {
  return (
    <section id="parcerias" aria-labelledby="parcerias-title" className="relative overflow-hidden bg-navy-950 py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
      />
      <Container className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
        <div>
          <p className="eyebrow text-electric-300">{softwareHouses.eyebrow}</p>
          <h2 id="parcerias-title" className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl sm:leading-[1.15]">
            {softwareHouses.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-navy-200">{softwareHouses.description}</p>
          <div className="mt-9">
            <WhatsAppCta
              origin="partnership"
              event="partnership_click"
              location="parcerias"
              buttonId="parceria_conversar"
              leadType="software_house"
              className="btn btn-lg whitespace-normal bg-white text-center text-navy-900 hover:bg-navy-50"
            >
              {softwareHouses.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </WhatsAppCta>
          </div>
        </div>

        <ul className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
          {softwareHouses.highlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-4 px-6 py-4.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-electric-500/15 text-electric-300 ring-1 ring-electric-400/20">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <span className="text-[0.9375rem] font-medium text-white">{text}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
