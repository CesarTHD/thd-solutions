"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { trackEvent, type TrackEventParams } from "@/lib/tracking/events";

const fired = new Set<string>();

/**
 * Dispara `project_view` uma única vez por carregamento de página, quando
 * pelo menos metade do bloco fica visível na tela.
 */
export function TrackOnView({
  params,
  className,
  children,
}: {
  params: TrackEventParams;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { button_location, button_id, solution_category, lead_type } = params;

  useEffect(() => {
    const el = ref.current;
    const key = `${window.location.pathname}:${button_id}`;
    if (!el || fired.has(key) || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          fired.add(key);
          trackEvent("project_view", { button_location, button_id, solution_category, lead_type });
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [button_location, button_id, solution_category, lead_type]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
