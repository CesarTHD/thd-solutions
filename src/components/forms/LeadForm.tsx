"use client";

import { CheckCircle2, Lock } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { trackingConfig } from "@/config/tracking";
import { leadFormShared } from "@/content/landing";
import {
  NAME_MAX,
  NEED_MAX,
  SYSTEM_MAX,
  validateLead,
  type LeadFormErrors,
  type LeadFormValues,
} from "@/lib/lead-validation";
import { getAttributionReference } from "@/lib/tracking/attribution";
import { trackEvent } from "@/lib/tracking/events";
import { buildLeadMessage, buildWhatsAppUrl, withReference } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const INITIAL: LeadFormValues = { name: "", system: "", need: "" };
const FIELD_ORDER: (keyof LeadFormValues)[] = ["name", "system", "need"];

interface LeadFormProps {
  /** solution_category enviada no evento (ex.: geral, integracao, desenvolvimento). */
  category: string;
  needPlaceholder: string;
}

export function LeadForm({ category, needPlaceholder }: LeadFormProps) {
  const [values, setValues] = useState<LeadFormValues>(INITIAL);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function update(field: keyof LeadFormValues) {
    return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [field]: e.target.value };
      setValues(next);
      if (submitted) setErrors(validateLead(next));
    };
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const found = validateLead(values);
    setErrors(found);

    const firstInvalid = FIELD_ORDER.find((f) => found[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    let message = buildLeadMessage(values);
    if (trackingConfig.whatsappIncludeAttribution) {
      message = withReference(message, getAttributionReference());
    }
    const url = buildWhatsAppUrl(message);

    // Apenas dados não pessoais seguem para o rastreamento.
    trackEvent("lead_form_submit", {
      button_location: "formulario",
      button_id: "form_diagnostico",
      solution_category: category,
      lead_type: "empresa",
    });

    setRedirectUrl(url);
    // Abertura síncrona (dentro do gesto do usuário) para não ser bloqueada.
    // (Com "noopener", window.open sempre retorna null; por isso o opener é anulado manualmente.)
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
  }

  if (redirectUrl) {
    return (
      <div
        className="flex flex-col items-start rounded-2xl border border-slate-200 bg-white p-7 shadow-lifted sm:p-9"
        role="status"
      >
        <CheckCircle2 className="size-8 text-whatsapp-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold">Falta só um passo: envie a mensagem no WhatsApp.</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-600">
          Abrimos uma conversa com a sua mensagem já preenchida. Basta tocar em enviar para falar com nossa equipe. Se
          o WhatsApp não abriu, use o botão abaixo.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={redirectUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon className="size-5" />
            Abrir WhatsApp
          </a>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setRedirectUrl(null);
              setValues(INITIAL);
              setSubmitted(false);
              setErrors({});
            }}
          >
            Preencher novamente
          </button>
        </div>
      </div>
    );
  }

  const fieldProps = (field: keyof LeadFormValues, required: boolean) => ({
    id: `lead-${field}`,
    name: field,
    value: values[field],
    onChange: update(field),
    "aria-required": required || undefined,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `lead-${field}-error` : undefined,
  });

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lifted sm:p-8"
      aria-label="Formulário de diagnóstico gratuito"
    >
      <div className="grid gap-5">
        <Field label="Nome" field="name" error={errors.name}>
          <input
            type="text"
            autoComplete="name"
            maxLength={NAME_MAX}
            className="field-input"
            {...fieldProps("name", true)}
          />
        </Field>
        <Field label="Qual sistema ou ERP sua empresa utiliza?" optional field="system" error={errors.system}>
          <input
            type="text"
            maxLength={SYSTEM_MAX}
            placeholder="Nome do sistema, se houver"
            className="field-input"
            {...fieldProps("system", false)}
          />
        </Field>
        <Field label="O que você precisa desenvolver ou automatizar?" field="need" error={errors.need}>
          <textarea
            rows={4}
            maxLength={NEED_MAX}
            placeholder={needPlaceholder}
            className="field-input resize-y"
            {...fieldProps("need", true)}
          />
        </Field>
      </div>

      <button type="submit" className="btn btn-whatsapp btn-lg mt-7 w-full whitespace-normal text-center">
        <WhatsAppIcon className="size-5 shrink-0" />
        {leadFormShared.cta}
      </button>
      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
        <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        {leadFormShared.privacyNote}
      </p>
    </form>
  );
}

function Field({
  label,
  field,
  error,
  optional,
  children,
}: {
  label: string;
  field: keyof LeadFormValues;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={`lead-${field}`}
        className="mb-1.5 flex items-baseline justify-between gap-3 text-sm font-medium text-navy-900"
      >
        {label}
        {optional ? <span className="shrink-0 text-xs font-normal text-slate-500">Opcional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`lead-${field}-error`} role="alert" className="mt-1.5 text-[13px] text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
