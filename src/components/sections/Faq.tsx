import { faq } from "@/content/landing";
import { Accordion } from "@/components/ui/Accordion";
import { Container } from "@/components/ui/Container";

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="section bg-white">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow">Dúvidas</p>
          <h2 id="faq-title" className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            {faq.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Cada projeto passa por avaliação técnica antes de qualquer proposta.
          </p>
        </div>
        <Accordion items={faq.items.map((i) => ({ title: i.q, content: i.a }))} />
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
