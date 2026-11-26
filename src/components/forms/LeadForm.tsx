"use client";

import { ArrowRight, CheckCircle2, ChevronDown, Lock } from "lucide-react";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { trackingConfig } from "@/config/tracking";
import { leadForm } from "@/content/landing";
import { DESCRIPTION_MAX, maskPhone, validateLead, type LeadFormErrors, type LeadFormValues } from "@/lib/lead-validation";
import { getAttributionReference } from "@/lib/tracking/attribution";
import { trackEvent } from "@/lib/tracking/events";
import { buildLeadMessage, buildWhatsAppUrl, withReference } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const INITIAL: LeadFormValues = { name: "", company: "", whatsapp: "", erp: "", solution: "", description: "" };
const FIELD_ORDER: (keyof LeadFormValues)[] = ["name", "company", "whatsapp", "erp", "solution", "description"];

export function LeadForm() {
  const [values, setValues] = useState<LeadFormValues>(INITIAL);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function update(field: keyof LeadFormValues) {
    return (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const raw = e.target.value;
      const value = field === "whatsapp" ? maskPhone(raw) : raw;
      const next = { ...values, [field]: value } as LeadFormValues;
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

    const option = leadForm.solutionOptions.find((o) => o.value === values.solution)!;
    let message = buildLeadMessage({
      name: values.name.trim(),
      company: values.company.trim(),
      whatsapp: values.whatsapp,
      erp: values.erp.trim(),
      solutionLabel: option.label,
      description: values.description,
    });
    if (trackingConfig.whatsappIncludeAttribution) {
      message = withReference(message, getAttributionReference());
    }
    const url = buildWhatsAppUrl(message);

    // Apenas dados não pessoais seguem para o rastreamento.
    trackEvent("lead_form_submit", {
      section: "formulario",
      button_id: "form_diagnostico",
      solution_category: option.value,
      lead_type: option.leadType,
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
      <div className="flex flex-col items-start rounded-2xl border border-slate-200 bg-white p-7 shadow-lifted sm:p-9" role="status">
        <CheckCircle2 className="size-8 text-whatsapp-600" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold">Tudo certo! Continue pelo WhatsApp.</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate-600">
          Abrimos uma conversa com a sua mensagem já preenchida. Basta enviá-la para falar com nossa equipe. Se o
          WhatsApp não abriu, use o botão abaixo.
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

  const fieldProps = (field: keyof LeadFormValues) => ({
    id: `lead-${field}`,
    name: field,
    value: values[field],
    onChange: update(field),
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `lead-${field}-error` : undefined,
  });

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lifted sm:p-8"
      aria-label="Formulário de diagnóstico"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nome" field="name" error={errors.name}>
          <input type="text" autoComplete="name" maxLength={80} className="field-input" {...fieldProps("name")} />
        </Field>
        <Field label="Empresa" field="company" error={errors.company}>
          <input type="text" autoComplete="organization" maxLength={100} className="field-input" {...fieldProps("company")} />
        </Field>
        <Field label="WhatsApp" field="whatsapp" error={errors.whatsapp}>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="(00) 00000-0000"
            className="field-input"
            {...fieldProps("whatsapp")}
          />
        </Field>
        <Field label="Qual ERP sua empresa utiliza?" field="erp" error={errors.erp}>
          <input type="text" maxLength={80} placeholder="Nome do sistema" className="field-input" {...fieldProps("erp")} />
        </Field>
        <Field label="Qual solução você procura?" field="solution" error={errors.solution} className="sm:col-span-2">
          <div className="relative">
            <select className="field-input appearance-none pr-10" {...fieldProps("solution")}>
            <option value="" disabled>
              Selecione uma opção
            </option>
            {leadForm.solutionOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          </div>
        </Field>
        <Field
          label="Descreva o problema"
          optional
          field="description"
          error={errors.description}
          className="sm:col-span-2"
        >
          <textarea
            rows={4}
            maxLength={DESCRIPTION_MAX}
            placeholder="Ex.: queremos enviar automaticamente pelo WhatsApp os boletos gerados no ERP."
            className="field-input resize-y"
            {...fieldProps("description")}
          />
        </Field>
      </div>

      <button type="submit" className="btn btn-whatsapp btn-lg mt-7 w-full">
        {leadForm.cta}
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-slate-500">
        <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        {leadForm.privacyNote}
      </p>
    </form>
  );
}

function Field({
  label,
  field,
  error,
  optional,
  className = "",
  children,
}: {
  label: string;
  field: keyof LeadFormValues;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={`lead-${field}`} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-navy-900">
        {label}
        {optional ? <span className="text-xs font-normal text-slate-500">Opcional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`lead-${field}-error`} className="mt-1.5 text-[13px] text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
