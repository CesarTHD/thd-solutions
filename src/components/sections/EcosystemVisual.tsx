import { BarChart3, Bot, Database, Gift, Plug, Users, type LucideIcon } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface Node {
  label: string;
  detail: string;
  x: number;
  y: number;
  icon: LucideIcon | "whatsapp";
  tint: string;
}

const NODES: Node[] = [
  { label: "WhatsApp", detail: "Mensagens", x: 27, y: 15, icon: "whatsapp", tint: "text-whatsapp-600 bg-emerald-50" },
  { label: "CRM", detail: "Clientes", x: 73, y: 15, icon: Users, tint: "text-electric-600 bg-electric-50" },
  { label: "Dashboards", detail: "Indicadores", x: 84, y: 50, icon: BarChart3, tint: "text-electric-600 bg-electric-50" },
  { label: "Cashback", detail: "Fidelização", x: 73, y: 85, icon: Gift, tint: "text-amber-600 bg-amber-50" },
  { label: "IA", detail: "Consultas", x: 27, y: 85, icon: Bot, tint: "text-violet-600 bg-violet-50" },
  { label: "APIs", detail: "Sistemas externos", x: 16, y: 50, icon: Plug, tint: "text-navy-600 bg-navy-50" },
];

/**
 * Representação do ERP como centro de um ecossistema conectado.
 * Construída com HTML/SVG; puramente ilustrativa (aria-hidden + descrição textual).
 * A animação do fluxo roda só em telas grandes: no mobile, ela repintava o SVG
 * a cada frame e pesava na thread principal.
 */
export function EcosystemVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-[540px]">
      <figcaption className="sr-only">
        Ilustração: o ERP da empresa ao centro, integrado a WhatsApp, CRM, dashboards, cashback,
        inteligência artificial e APIs de sistemas externos.
      </figcaption>

      <div
        aria-hidden="true"
        className="relative aspect-[1/1.02] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lifted sm:aspect-square"
      >
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />

        {/* Conexões */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
          {NODES.map((n) => (
            <g key={n.label}>
              <line
                x1="50"
                y1="50"
                x2={n.x}
                y2={n.y}
                stroke="#b4c3dc"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1="50"
                y1="50"
                x2={n.x}
                y2={n.y}
                stroke="#3866ff"
                strokeWidth="1.5"
                strokeDasharray="3 21"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="lg:animate-flow"
              />
            </g>
          ))}
        </svg>

        {/* Núcleo: ERP */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 animate-pulse-soft rounded-2xl bg-electric-400/40" />
          <div className="relative flex w-[8.5rem] flex-col items-center rounded-2xl bg-navy-900 px-4 py-4 text-center shadow-[0_18px_40px_-14px_rgba(9,19,39,0.65)] ring-1 ring-white/10 sm:w-48 sm:py-5">
            <span className="flex size-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 sm:size-11">
              <Database className="size-5 text-electric-300" />
            </span>
            <span className="mt-2.5 text-sm font-semibold text-white sm:text-base">Seu ERP</span>
            <span className="mt-0.5 text-[10px] leading-tight text-navy-300 sm:text-[11px]">
              Firebird · PostgreSQL · SQL&nbsp;Server
            </span>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-navy-100">
              <span className="size-1.5 rounded-full bg-emerald-400" />
              Conectado
            </span>
          </div>
        </div>

        {/* Satélites */}
        {NODES.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 pr-2.5 shadow-soft sm:gap-2.5 sm:p-2 sm:pr-3">
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg sm:size-8 ${n.tint}`}>
                  {Icon === "whatsapp" ? <WhatsAppIcon className="size-4" /> : <Icon className="size-4" />}
                </span>
                <span className="flex flex-col">
                  <span className="text-xs font-semibold text-navy-900 sm:text-[13px]">{n.label}</span>
                  <span className="hidden whitespace-nowrap text-[10.5px] text-slate-500 sm:block">
                    {n.detail}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legenda inferior */}
      <div
        aria-hidden="true"
        className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium whitespace-nowrap text-slate-600 shadow-soft"
      >
        <span className="size-1.5 rounded-full bg-electric-500" />
        Dados fluindo entre sistemas, sem redigitação
      </div>
    </figure>
  );
}
