import { ArrowRight, Info } from "lucide-react";
import { projectMedia } from "@/config/project-media";
import { projectCatalog } from "@/content/landing";
import type { Project, ProjectsContent } from "@/content/types";
import { TrackOnView } from "@/components/analytics/TrackOnView";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { ProjectMockupView } from "@/components/mockups/Mockups";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Projects({ content }: { content: ProjectsContent }) {
  const items = content.ids.map((id) => projectCatalog[id]);

  return (
    <section id="projetos" aria-labelledby="projetos-title" className="section bg-white">
      <Container>
        <SectionHeading id="projetos-title" eyebrow={content.eyebrow} title={content.title} subtitle={content.subtitle} />

        <div className="mt-16 space-y-20 lg:space-y-28">
          {items.map((p, i) => (
            <TrackOnView
              key={p.id}
              params={{ button_location: "portfolio", button_id: `projeto_${p.id}`, solution_category: p.id }}
            >
              <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16" aria-labelledby={`projeto-${p.id}`}>
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
                        <span className="size-1.5 shrink-0 rounded-full bg-electric-600" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`relative ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="absolute -inset-4 rounded-3xl bg-paper sm:-inset-6" aria-hidden="true" />
                  <div className="relative">
                    <ProjectMedia project={p} />
                  </div>
                </div>
              </article>
            </TrackOnView>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-6 rounded-2xl border border-slate-200 bg-paper p-7 sm:p-9 lg:mt-28 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{content.cta.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-600">{content.cta.text}</p>
          </div>
          <WhatsAppCta
            origin="projects"
            message={content.cta.whatsappMessage}
            location="portfolio"
            buttonId="portfolio_cta"
            className="btn btn-primary btn-lg self-start lg:self-auto"
          >
            {content.cta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </WhatsAppCta>
        </div>
      </Container>
    </section>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const media = projectMedia[project.id];
  const hasScreens = media.screenshots.length > 0;

  if (!hasScreens && !media.video) {
    return (
      <>
        <div aria-hidden="true">
          <ProjectMockupView type={project.mockup} />
        </div>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
          <Info className="size-3.5 shrink-0" aria-hidden="true" />
          Demonstração ilustrativa · não representa a tela de um cliente
        </p>
      </>
    );
  }

  return (
    <div className="space-y-5">
      {hasScreens ? <ProjectGallery title={project.title} screenshots={media.screenshots} /> : null}
      {media.video ? (
        <video
          controls
          preload="none"
          playsInline
          poster={media.video.poster}
          aria-label={media.video.title}
          className="w-full rounded-xl border border-slate-200 bg-navy-950 shadow-lifted"
        >
          <source src={media.video.src} />
        </video>
      ) : null}
    </div>
  );
}
