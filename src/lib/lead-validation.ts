export interface LeadFormValues {
  name: string;
  system: string;
  need: string;
}

export type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

export const NAME_MAX = 80;
export const SYSTEM_MAX = 80;
export const NEED_MIN = 10;
export const NEED_MAX = 800;

export function validateLead(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {};

  const name = values.name.trim();
  if (name.length < 2) errors.name = "Informe seu nome.";
  else if (name.length > NAME_MAX) errors.name = `Use no máximo ${NAME_MAX} caracteres.`;

  if (values.system.trim().length > SYSTEM_MAX) errors.system = `Use no máximo ${SYSTEM_MAX} caracteres.`;

  const need = values.need.trim();
  if (!need) errors.need = "Descreva o que você precisa desenvolver ou automatizar.";
  else if (need.length < NEED_MIN) errors.need = `Conte um pouco mais (mínimo de ${NEED_MIN} caracteres).`;
  else if (need.length > NEED_MAX) errors.need = `Use no máximo ${NEED_MAX} caracteres.`;

  return errors;
}
