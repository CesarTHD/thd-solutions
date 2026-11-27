"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { WhatsAppCta } from "@/components/cta/WhatsAppCta";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

/**
 * @param anchorsOnPage  true quando a página contém as seções do menu (início e páginas de serviço).
 *                       Nas demais, os links apontam para as seções da página inicial.
 */
export function Header({ anchorsOnPage = true }: { anchorsOnPage?: boolean }) {
  const [open, setOpen] = useState(false);
  const nav = siteConfig.nav.map((item) => ({ ...item, href: anchorsOnPage ? item.href : `/${item.href}` }));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow"
      >
        Pular para o conteúdo
      </a>
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-navy-900"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <WhatsAppCta origin="header" location="header" buttonId="header_diagnostico" className="btn btn-navy btn-sm">
            Solicitar diagnóstico gratuito
          </WhatsAppCta>
        </div>

        <button
          type="button"
          className="-mr-2 inline-flex size-10 items-center justify-center rounded-md text-navy-900 hover:bg-slate-100 lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open ? (
        <div id="menu-mobile" className="border-t border-slate-200 bg-white lg:hidden">
          <Container className="flex h-[calc(100dvh-4rem)] flex-col py-4">
            <nav aria-label="Menu mobile">
              <ul className="divide-y divide-slate-100">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-base font-medium text-navy-900"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6">
              <WhatsAppCta
                origin="header"
                location="header_mobile"
                buttonId="header_mobile_diagnostico"
                className="btn btn-navy w-full"
              >
                Solicitar diagnóstico gratuito
              </WhatsAppCta>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
