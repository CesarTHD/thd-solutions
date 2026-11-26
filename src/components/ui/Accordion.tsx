"use client";

import { Plus } from "lucide-react";
import { useId, useState } from "react";

interface AccordionItem {
  title: string;
  content: string;
}

/** Accordion acessível (WAI-ARIA): botões com aria-expanded e regiões rotuladas. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-slate-200 border-y border-slate-200">
      {items.map((item, i) => {
        const open = openIndex === i;
        const buttonId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.title}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold text-navy-900 transition-colors hover:text-electric-700"
              >
                {item.title}
                <Plus
                  aria-hidden="true"
                  className={`size-5 shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden" inert={!open}>
                <p className="pb-5 pr-10 text-[0.9375rem] leading-relaxed text-slate-600">{item.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
