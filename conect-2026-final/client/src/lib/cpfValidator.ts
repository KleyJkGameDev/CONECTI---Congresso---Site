/**
 * Utilitário para validação de CPF
 * Valida formato e dígitos verificadores
 */

export function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');

  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return false;
  }

  // Calcula primeiro dígito verificador
  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCPF.substring(9, 10))) {
    return false;
  }

  // Calcula segundo dígito verificador
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCPF.substring(10, 11))) {
    return false;
  }

  return true;
}

export function formatCPF(cpf: string): string {
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF
    .slice(0, 3)
    .concat('.')
    .concat(cleanCPF.slice(3, 6))
    .concat('.')
    .concat(cleanCPF.slice(6, 9))
    .concat('-')
    .concat(cleanCPF.slice(9, 11));
}
