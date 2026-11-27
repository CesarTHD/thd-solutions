"use client";

import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { ProjectScreenshot } from "@/config/project-media";

/**
 * Screenshots reais de um projeto, com ampliação em modal responsivo.
 * Usa o <dialog> nativo: foco preso no modal, Esc fecha e o fundo fica inerte.
 */
export function ProjectGallery({ title, screenshots }: { title: string; screenshots: ProjectScreenshot[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(0);
  const current = screenshots[index];
  const many = screenshots.length > 1;

  function open(i: number) {
    setIndex(i);
    dialogRef.current?.showModal();
  }

  function step(delta: number) {
    setIndex((i) => (i + delta + screenshots.length) % screenshots.length);
  }

  const main = screenshots[active];

  return (
    <div>
      <button
        type="button"
        onClick={() => open(active)}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lifted"
        aria-label={`Ampliar imagem: ${main.alt}`}
      >
        <Image
          src={main.src}
          alt={main.alt}
          width={main.width}
          height={main.height}
          sizes="(min-width: 1024px) 540px, 100vw"
          className="h-auto w-full"
        />
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md bg-navy-950/80 px-2.5 py-1.5 text-xs font-medium text-white opacity-90 transition-opacity group-hover:opacity-100">
          <ZoomIn className="size-3.5" aria-hidden="true" />
          Ampliar
        </span>
      </button>

      {many ? (
        <ul className="mt-3 grid grid-cols-4 gap-2" aria-label={`Outras telas de ${title}`}>
          {screenshots.map((s, i) => (
            <li key={s.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={`Exibir: ${s.alt}`}
                className={`block w-full overflow-hidden rounded-md border-2 transition-colors ${
                  i === active ? "border-electric-600" : "border-transparent hover:border-slate-300"
                }`}
              >
                <Image src={s.src} alt="" width={s.width} height={s.height} sizes="120px" className="h-auto w-full" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <dialog
        ref={dialogRef}
        aria-label={`${title}: imagem ampliada`}
        onClick={(e) => e.target === e.currentTarget && dialogRef.current?.close()}
        onKeyDown={(e) => {
          if (!many) return;
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-[92dvh] w-[min(92vw,1200px)] max-w-none overflow-visible bg-transparent p-0 backdrop:bg-navy-950/85"
      >
        <figure className="relative">
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="92vw"
            className="mx-auto h-auto max-h-[82dvh] w-auto rounded-lg object-contain"
          />
          <figcaption className="mt-3 text-center text-sm text-navy-100">
            {current.alt}
            {many ? <span className="text-navy-300"> · {index + 1} de {screenshots.length}</span> : null}
          </figcaption>
          {many ? (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Imagem anterior"
                className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow hover:bg-white"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Próxima imagem"
                className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-900 shadow hover:bg-white"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </>
          ) : null}
        </figure>
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label="Fechar"
          autoFocus
          className="fixed top-4 right-4 flex size-11 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg hover:bg-slate-100"
        >
          <X className="size-5" aria-hidden="true" />
        </button>
      </dialog>
    </div>
  );
}
