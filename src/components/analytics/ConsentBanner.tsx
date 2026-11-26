"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { readConsent, saveConsent, subscribeConsent, type ConsentState } from "@/lib/tracking/consent";

type Snapshot = ConsentState | null | "server";

function getServerSnapshot(): Snapshot {
  return "server";
}

export function ConsentBanner() {
  const consent = useSyncExternalStore<Snapshot>(subscribeConsent, readConsent, getServerSnapshot);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [ads, setAds] = useState(true);

  if (consent === "server" || consent !== null) return null;

  return (
    <div
      role="region"
      aria-label="Preferências de cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-xl border border-slate-200 bg-white p-4 shadow-[0_12px_40px_-12px_rgba(11,31,58,0.25)] sm:inset-x-auto sm:left-6 sm:bottom-6"
    >
      <p className="text-sm font-semibold text-navy-900">Sua privacidade</p>
      <p className="mt-1 text-[13px] leading-relaxed text-slate-600 sm:text-sm">
        Usamos cookies para medir o desempenho da página e das campanhas. Saiba mais na{" "}
        <Link href="/privacidade" className="font-medium text-electric-600 underline underline-offset-2">
          Política de Privacidade
        </Link>
        .
      </p>

      {customizing ? (
        <fieldset className="mt-4 space-y-3">
          <legend className="sr-only">Categorias de cookies</legend>
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-0.5 size-4 accent-electric-600"
            />
            <span>
              <span className="font-medium text-navy-900">Análise</span> — estatísticas de uso da página.
            </span>
          </label>
          <label className="flex items-start gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={ads}
              onChange={(e) => setAds(e.target.checked)}
              className="mt-0.5 size-4 accent-electric-600"
            />
            <span>
              <span className="font-medium text-navy-900">Publicidade</span> — medição de campanhas e
              atribuição de origem.
            </span>
          </label>
        </fieldset>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {customizing ? (
          <button
            type="button"
            onClick={() => saveConsent(analytics ? "granted" : "denied", ads ? "granted" : "denied")}
            className="btn btn-primary btn-sm"
          >
            Salvar preferências
          </button>
        ) : (
          <>
            <button type="button" onClick={() => saveConsent("granted", "granted")} className="btn btn-primary btn-sm">
              Aceitar
            </button>
            <button type="button" onClick={() => saveConsent("denied", "denied")} className="btn btn-outline btn-sm">
              Recusar
            </button>
            <button
              type="button"
              onClick={() => setCustomizing(true)}
              className="btn btn-ghost btn-sm"
            >
              Personalizar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
