import { leadForm, type SolutionOptionValue } from "@/content/landing";

export interface LeadFormValues {
  name: string;
  company: string;
  whatsapp: string;
  erp: string;
  solution: SolutionOptionValue | "";
  description: string;
}

export type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

export const DESCRIPTION_MAX = 800;

/** Máscara de telefone brasileiro: (11) 91234-5678 / (11) 1234-5678 */
export function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function isValidBrazilianPhone(value: string): boolean {
  const d = value.replace(/\D/g, "");
  if (d.length !== 10 && d.length !== 11) return false;
  const ddd = Number(d.slice(0, 2));
  if (ddd < 11 || ddd > 99) return false;
  if (d.length === 11 && d[2] !== "9") return false;
  return !/^(\d)\1+$/.test(d);
}

export function validateLead(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {};
  const name = values.name.trim();
  if (name.length < 2) errors.name = "Informe seu nome.";
  else if (name.length > 80) errors.name = "Use no máximo 80 caracteres.";

  const company = values.company.trim();
  if (company.length < 2) errors.company = "Informe o nome da empresa.";
  else if (company.length > 100) errors.company = "Use no máximo 100 caracteres.";

  if (!values.whatsapp.trim()) errors.whatsapp = "Informe seu WhatsApp com DDD.";
  else if (!isValidBrazilianPhone(values.whatsapp)) errors.whatsapp = "Número inválido. Use DDD + número, ex.: (11) 91234-5678.";

  const erp = values.erp.trim();
  if (erp.length < 2) errors.erp = "Informe o ERP utilizado (ou “Não sei”).";
  else if (erp.length > 80) errors.erp = "Use no máximo 80 caracteres.";

  if (!leadForm.solutionOptions.some((o) => o.value === values.solution)) {
    errors.solution = "Selecione a solução que você procura.";
  }

  if (values.description.length > DESCRIPTION_MAX) {
    errors.description = `Use no máximo ${DESCRIPTION_MAX} caracteres.`;
  }
  return errors;
}
