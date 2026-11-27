"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Revela com transição suave os elementos `[data-reveal]` quando entram na tela.
 * Cada elemento anima uma única vez. Roda de novo a cada navegação client-side.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (root.getAttribute("data-motion") !== "on") return;

    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));
    if (pending.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-revealed", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    pending.forEach((el) => observer.observe(el));

    // Âncoras (#diagnostico, #faq…) e saltos longos: revela o que já passou da tela.
    const revealPassed = () => {
      for (const el of pending) {
        if (!el.hasAttribute("data-revealed") && el.getBoundingClientRect().bottom < 0) {
          el.setAttribute("data-revealed", "");
          observer.unobserve(el);
        }
      }
    };
    window.addEventListener("hashchange", revealPassed);
    revealPassed();

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", revealPassed);
    };
  }, [pathname]);

  return null;
}
