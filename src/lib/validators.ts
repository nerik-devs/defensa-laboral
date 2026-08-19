import type { WorkerData, EmployerData, ProblemData } from '../types/flow';

/**
 * Client-side validators that mirror the rules the CRM enforces
 * (crm-aboga/src/modules/integrations/integrations.schemas.ts).
 * Pure functions: no React, no side effects, unit-testable with vitest.
 * Error messages are user-facing UI copy, so they stay in Spanish.
 */

export const CURP_REGEX =
  /^[A-Z][AEIOUX][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CH|CL|CM|CS|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QR|SP|SL|SR|TC|TS|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d]\d$/;

export const RFC_REGEX = /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/;

export const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

/** Phone: at least 10 digits, allowing +, spaces, dashes and parentheses. */
export const PHONE_REGEX = /^\+?[0-9\s()-]+$/;

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CODIGO_POSTAL_REGEX = /^\d{5}$/;

export const GENEROS = ['MASCULINO', 'FEMENINO', 'OTRO', 'NO BINARIO'] as const;

export const TIPO_PERSONA = ['Física', 'Moral'] as const;

export const PROBLEM_TYPES = ['despido', 'renuncia_forzada', 'falta_pago', 'acoso', 'otro'] as const;

const REQUIRED_MESSAGE = 'Este campo es obligatorio.';

/** Validates an ISO date string (YYYY-MM-DD) including calendar validity (e.g. rejects 2023-02-31). */
export function isValidIsoDate(value: string): boolean {
  if (!ISO_DATE_REGEX.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  if (year < 1000 || year > 9999) return false;
  if (month < 1 || month > 12) return false;
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return day >= 1 && day <= daysInMonth;
}

function required(value: string): string | undefined {
  if (!value || value.trim().length === 0) return REQUIRED_MESSAGE;
  return undefined;
}

export type FieldErrors = Record<string, string>;

export function validateWorker(data: WorkerData): FieldErrors {
  const errors: FieldErrors = {};

  const nameError = required(data.name);
  if (nameError) errors.name = nameError;

  const primerApellidoError = required(data.primerApellido);
  if (primerApellidoError) errors.primerApellido = primerApellidoError;

  if (!data.curp) {
    errors.curp = REQUIRED_MESSAGE;
  } else if (data.curp.length !== 18) {
    errors.curp = 'La CURP debe tener exactamente 18 caracteres.';
  } else if (!CURP_REGEX.test(data.curp)) {
    errors.curp = 'La CURP no es válida. Verifica que sea un CURP oficial.';
  }

  if (!data.fechaNacimiento) {
    errors.fechaNacimiento = REQUIRED_MESSAGE;
  } else if (!isValidIsoDate(data.fechaNacimiento)) {
    errors.fechaNacimiento = 'La fecha de nacimiento debe tener formato YYYY-MM-DD.';
  }

  if (!data.genero) {
    errors.genero = REQUIRED_MESSAGE;
  } else if (!(GENEROS as readonly string[]).includes(data.genero)) {
    errors.genero = 'Selecciona un género válido.';
  }

  if (!data.phone) {
    errors.phone = REQUIRED_MESSAGE;
  } else {
    const digits = data.phone.replace(/\D/g, '');
    if (!PHONE_REGEX.test(data.phone) || digits.length < 10) {
      errors.phone = 'El teléfono debe tener al menos 10 dígitos.';
    }
  }

  if (!data.email) {
    errors.email = REQUIRED_MESSAGE;
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = 'El correo electrónico no es válido.';
  }

  const stateError = required(data.state);
  if (stateError) errors.state = stateError;

  const tipoVialidadError = required(data.tipoVialidad);
  if (tipoVialidadError) errors.tipoVialidad = tipoVialidadError;

  const nombreVialidadError = required(data.nombreVialidad);
  if (nombreVialidadError) errors.nombreVialidad = nombreVialidadError;

  const numeroExteriorError = required(data.numeroExterior);
  if (numeroExteriorError) errors.numeroExterior = numeroExteriorError;

  const municipioError = required(data.municipio);
  if (municipioError) errors.municipio = municipioError;

  if (data.codigoPostal && !CODIGO_POSTAL_REGEX.test(data.codigoPostal)) {
    errors.codigoPostal = 'El código postal debe tener 5 dígitos.';
  }

  return errors;
}

export function validateEmployer(data: EmployerData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.tipoPersonaCitado) {
    errors.tipoPersonaCitado = REQUIRED_MESSAGE;
  } else if (!(TIPO_PERSONA as readonly string[]).includes(data.tipoPersonaCitado)) {
    errors.tipoPersonaCitado = 'Selecciona un tipo de empleador válido.';
  }

  const companyNameError = required(data.companyName);
  if (companyNameError) errors.companyName = companyNameError;

  if (data.rfc && !RFC_REGEX.test(data.rfc)) {
    errors.rfc = 'El RFC debe tener 12 o 13 caracteres con formato válido.';
  }

  const roleError = required(data.role);
  if (roleError) errors.role = roleError;

  if (!data.startDate) {
    errors.startDate = REQUIRED_MESSAGE;
  } else if (!isValidIsoDate(data.startDate)) {
    errors.startDate = 'La fecha de ingreso debe tener formato YYYY-MM-DD.';
  }

  if (data.endDate && !isValidIsoDate(data.endDate)) {
    errors.endDate = 'La fecha de salida debe tener formato YYYY-MM-DD.';
  }

  if (!data.salary) {
    errors.salary = REQUIRED_MESSAGE;
  } else if (Number.isNaN(Number(data.salary)) || Number(data.salary) <= 0) {
    errors.salary = 'El salario debe ser un número mayor a 0.';
  }

  const employerStateError = required(data.employerState);
  if (employerStateError) errors.employerState = employerStateError;

  const employerMunicipioError = required(data.employerMunicipio);
  if (employerMunicipioError) errors.employerMunicipio = employerMunicipioError;

  const employerCalleError = required(data.employerCalle);
  if (employerCalleError) errors.employerCalle = employerCalleError;

  return errors;
}

export function validateProblem(data: ProblemData): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.problemType) {
    errors.problemType = REQUIRED_MESSAGE;
  } else if (!(PROBLEM_TYPES as readonly string[]).includes(data.problemType)) {
    errors.problemType = 'Selecciona un tipo de problema válido.';
  }

  if (!data.fechaConflicto) {
    errors.fechaConflicto = REQUIRED_MESSAGE;
  } else if (!isValidIsoDate(data.fechaConflicto)) {
    errors.fechaConflicto = 'La fecha del conflicto debe tener formato YYYY-MM-DD.';
  }

  const industriaError = required(data.industria);
  if (industriaError) errors.industria = industriaError;

  const objetoSolicitudError = required(data.objetoSolicitud);
  if (objetoSolicitudError) errors.objetoSolicitud = objetoSolicitudError;

  return errors;
}

/** Runs the validator for a whole section and reports whether it is valid. */
export function isSectionValid(errors: FieldErrors): boolean {
  return Object.keys(errors).length === 0;
}