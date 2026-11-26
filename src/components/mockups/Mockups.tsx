/**
 * Mockups ilustrativos de interfaces (HTML/CSS puro).
 * Usam blocos neutros no lugar de valores para não sugerir métricas reais.
 * Substitua por screenshots reais via campo `image` em src/content/landing.ts.
 */
import { BarChart3, Database, Gift, LayoutDashboard, MessageCircle, Settings, Users, Workflow } from "lucide-react";
import type { ReactNode } from "react";
import type { ProjectMockup } from "@/content/landing";

function Bar({ w, className = "bg-slate-200" }: { w: string; className?: string }) {
  return <span className={`block h-2 rounded-full ${className}`} style={{ width: w }} />;
}

function BrowserFrame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lifted">
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-slate-300" />
          <span className="size-2.5 rounded-full bg-slate-300" />
          <span className="size-2.5 rounded-full bg-slate-300" />
        </div>
        <span className="mx-auto truncate rounded-md bg-white px-3 py-0.5 text-[11px] text-slate-500 ring-1 ring-slate-200">
          {title}
        </span>
        <span className="w-10" />
      </div>
      <div className="flex min-h-[260px]">{children}</div>
    </div>
  );
}

function Sidebar({ items, active }: { items: typeof LayoutDashboard[]; active: number }) {
  return (
    <div className="hidden w-12 shrink-0 flex-col items-center gap-2 border-r border-slate-100 bg-navy-950 py-3 sm:flex">
      {items.map((Icon, i) => (
        <span
          key={i}
          className={`flex size-8 items-center justify-center rounded-lg ${
            i === active ? "bg-white/10 text-white" : "text-navy-400"
          }`}
        >
          <Icon className="size-4" />
        </span>
      ))}
    </div>
  );
}

function LoyaltyMockup() {
  const rows = [
    { seg: "Recorrentes", tone: "bg-electric-50 text-electric-700", w: "62%" },
    { seg: "Inativos 90d", tone: "bg-amber-50 text-amber-700", w: "48%" },
    { seg: "Novos", tone: "bg-emerald-50 text-emerald-700", w: "55%" },
    { seg: "Recorrentes", tone: "bg-electric-50 text-electric-700", w: "40%" },
  ];
  return (
    <BrowserFrame title="Relacionamento · Clientes">
      <Sidebar items={[LayoutDashboard, Users, Gift, MessageCircle, Settings]} active={1} />
      <div className="flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-navy-900">Segmentação de clientes</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-whatsapp-600 px-2 py-1 text-[10px] font-semibold text-white">
            <MessageCircle className="size-3" /> Nova campanha
          </span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Segmentos", "Cashback ativo", "Campanhas"].map((l) => (
            <div key={l} className="rounded-lg border border-slate-200 p-2.5">
              <span className="block text-[10px] text-slate-500">{l}</span>
              <Bar w="55%" className="mt-2 h-2.5 bg-navy-100" />
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
          {rows.map((r, i) => (
            <div key={i} className="flex items-center gap-3 border-b border-slate-100 px-3 py-2.5 last:border-0">
              <span className="size-6 shrink-0 rounded-full bg-slate-200" />
              <span className="flex-1">
                <Bar w={r.w} />
              </span>
              <span className={`rounded px-1.5 py-0.5 text-[9.5px] font-medium ${r.tone}`}>{r.seg}</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

function DashboardMockup() {
  const bars = [38, 52, 45, 64, 58, 72, 66, 80, 74, 88, 70, 92];
  return (
    <BrowserFrame title="Painel · Indicadores">
      <Sidebar items={[LayoutDashboard, BarChart3, Database, Settings]} active={0} />
      <div className="flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-navy-900">Visão comercial</span>
          <span className="rounded-md border border-slate-200 px-2 py-1 text-[10px] text-slate-500">Período</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {["Faturamento", "Ticket médio", "Pedidos"].map((l) => (
            <div key={l} className="rounded-lg border border-slate-200 p-2.5">
              <span className="block text-[10px] text-slate-500">{l}</span>
              <Bar w="60%" className="mt-2 h-2.5 bg-navy-200" />
              <Bar w="35%" className="mt-1.5 h-1.5 bg-emerald-200" />
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-slate-200 p-3">
          <span className="text-[10px] text-slate-500">Vendas por mês</span>
          <div className="mt-3 flex h-24 items-end gap-1.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className={`flex-1 rounded-t-sm ${i === bars.length - 1 ? "bg-electric-500" : "bg-electric-200"}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function AutomationMockup() {
  const steps = [
    { icon: Database, label: "Pedido faturado no ERP", tone: "bg-navy-900 text-white" },
    { icon: Workflow, label: "Regras e transformação", tone: "bg-electric-50 text-electric-700" },
    { icon: Users, label: "Atualiza CRM", tone: "bg-slate-100 text-navy-700" },
    { icon: MessageCircle, label: "Notifica cliente", tone: "bg-emerald-50 text-whatsapp-700" },
  ];
  return (
    <BrowserFrame title="Automação · Fluxos">
      <Sidebar items={[LayoutDashboard, Workflow, Database, Settings]} active={1} />
      <div className="flex-1 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-navy-900">Fluxo: pós-venda</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
            <span className="size-1.5 rounded-full bg-emerald-500" /> Ativo
          </span>
        </div>
        <ol className="relative mt-5 space-y-3 pl-1">
          <span className="absolute top-4 bottom-4 left-[18px] w-px bg-slate-200" aria-hidden="true" />
          {steps.map(({ icon: Icon, label, tone }) => (
            <li key={label} className="relative flex items-center gap-3">
              <span className={`relative z-10 flex size-[30px] items-center justify-center rounded-lg ring-4 ring-white ${tone}`}>
                <Icon className="size-3.5" />
              </span>
              <span className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-medium text-navy-800">
                {label}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </BrowserFrame>
  );
}

export function ProjectMockupView({ type }: { type: ProjectMockup }) {
  switch (type) {
    case "loyalty":
      return <LoyaltyMockup />;
    case "dashboard":
      return <DashboardMockup />;
    case "automation":
      return <AutomationMockup />;
  }
}
