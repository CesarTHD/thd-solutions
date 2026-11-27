import type { FinalCtaContent } from "@/content/types";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

export function FinalCta({ content: finalCta }: { content: FinalCtaContent }) {
  return (
    <section aria-labelledby="cta-final-title" className="bg-white pb-20 sm:pb-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-electric-700 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 id="cta-final-title" className="text-3xl font-semibold tracking-tight text-white sm:text-4xl sm:leading-[1.15]">
              {finalCta.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-electric-100">{finalCta.subtitle}</p>
            <div className="mt-9 flex justify-center">
              <WhatsAppCta origin="final_cta" location="cta_final" buttonId="cta_final_especialista" className="btn btn-whatsapp btn-lg">
                <WhatsAppIcon className="size-5" />
                {finalCta.cta}
              </WhatsAppCta>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
