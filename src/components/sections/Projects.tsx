import Image from "next/image";
import { projects } from "@/content/landing";
import { ProjectMockupView } from "@/components/mockups/Mockups";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects() {
  return (
    <section id="projetos" aria-labelledby="projetos-title" className="section bg-white">
      <Container>
        <SectionHeading id="projetos-title" eyebrow="Projetos" title={projects.title} subtitle={projects.subtitle} />

        <div className="mt-16 space-y-20 lg:space-y-28">
          {projects.items.map((p, i) => (
            <article
              key={p.id}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              aria-labelledby={`projeto-${p.id}`}
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-navy-700">
                  {p.tag}
                </span>
                <h3 id={`projeto-${p.id}`} className="mt-4 text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
                  {p.title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">{p.description}</p>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[0.9375rem] text-navy-800">
                      <span className="size-1.5 rounded-full bg-electric-600" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`relative ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="absolute -inset-4 -z-0 rounded-3xl bg-paper sm:-inset-6" aria-hidden="true" />
                <div className="relative">
                  {p.image ? (
                    <Image
                      src={p.image.src}
                      alt={p.image.alt}
                      width={p.image.width}
                      height={p.image.height}
                      loading="lazy"
                      sizes="(min-width: 1024px) 540px, 100vw"
                      className="rounded-xl border border-slate-200 shadow-lifted"
                    />
                  ) : (
                    <>
                      <div aria-hidden="true">
                        <ProjectMockupView type={p.mockup} />
                      </div>
                      <p className="mt-3 text-center text-xs text-slate-500">Interface ilustrativa</p>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
