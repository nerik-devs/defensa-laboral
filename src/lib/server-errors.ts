/**
 * Parsing of field-level validation errors returned by the SINACOL server.
 *
 * The server answers with two different `details` shapes:
 * - 400 (server-side Zod / catalog validation): an array of `{ path, message }`,
 *   where `path` is dotted, e.g. `worker.curp`.
 * - 422 (CRM rejected the lead): the CRM's Zod `flatten().fieldErrors`, an object
 *   keyed by top-level section (`worker`, `employer`, `problem`) whose values are
 *   arrays of messages.
 *
 * Server messages are English and technical, so they are translated to readable
 * Spanish here; the original text never reaches the user.
 */

export interface FieldError {
  /** Field path as reported by the server, e.g. worker.curp or employer. */
  field: string;
  /** Human-readable Spanish field name. */
  label: string;
  /** Human-readable Spanish message. */
  message: string;
  /** Flow step that owns this field (1 = worker, 2 = employer, 3 = problem); 0 when unknown. */
  step: number;
}

const SECTION_STEPS: Record<string, number> = {
  worker: 1,
  employer: 2,
  problem: 3,
};

const SECTION_LABELS: Record<string, string> = {
  worker: 'Datos del trabajador',
  employer: 'Datos del empleador',
  problem: 'Tipo de problema',
};

const FIELD_LABELS: Record<string, string> = {
  'worker.name': 'Nombre',
  'worker.primerApellido': 'Primer apellido',
  'worker.segundoApellido': 'Segundo apellido',
  'worker.curp': 'CURP',
  'worker.fechaNacimiento': 'Fecha de nacimiento',
  'worker.genero': 'Género',
  'worker.phone': 'Teléfono',
  'worker.email': 'Correo electrónico',
  'worker.state': 'Estado',
  'worker.tipoVialidad': 'Tipo de vialidad',
  'worker.nombreVialidad': 'Nombre de la vialidad',
  'worker.numeroExterior': 'Número exterior',
  'worker.colonia': 'Colonia',
  'worker.municipio': 'Municipio',
  'worker.codigoPostal': 'Código postal',
  'employer.tipoPersonaCitado': 'Tipo de persona',
  'employer.companyName': 'Nombre de la empresa o patrón',
  'employer.rfc': 'RFC',
  'employer.role': 'Puesto',
  'employer.startDate': 'Fecha de ingreso',
  'employer.endDate': 'Fecha de salida',
  'employer.salary': 'Salario',
  'employer.benefits': 'Prestaciones',
  'employer.employerState': 'Estado del centro de trabajo',
  'employer.employerMunicipio': 'Municipio del centro de trabajo',
  'employer.employerColonia': 'Colonia del centro de trabajo',
  'employer.employerCalle': 'Calle del centro de trabajo',
  'employer.employerNumero': 'Número del centro de trabajo',
  'employer.employerCodigoPostal': 'Código postal del centro de trabajo',
  'employer.periodicidad': 'Periodicidad de pago',
  'employer.horasSemanales': 'Horas semanales',
  'employer.jornada': 'Jornada',
  'problem.problemType': 'Tipo de problema',
  'problem.description': 'Descripción',
  'problem.fechaConflicto': 'Fecha del conflicto',
  'problem.industria': 'Industria',
  'problem.objetoSolicitud': 'Objeto de la solicitud',
};

const GENERIC_MESSAGE = 'Revisa este dato.';

/** Ordered translation rules: the first matching pattern wins. */
const MESSAGE_RULES: ReadonlyArray<readonly [RegExp, string]> = [
  [/18 char/i, 'Debe tener exactamente 18 caracteres.'],
  [/YYYY-MM-DD|invalid date/i, 'Ingresa una fecha válida.'],
  [/email/i, 'Ingresa un correo electrónico válido.'],
  [/at least 10/i, 'Debe tener al menos 10 dígitos.'],
  [/unknown mexican state/i, 'Selecciona un estado válido.'],
  [/unknown genero/i, 'Selecciona un género válido.'],
  [/unknown objetoSolicitud/i, 'Selecciona un objeto de solicitud válido.'],
  [/digits|whole number/i, 'Debe ser un número entero.'],
  [/invalid (option|enum)|expected one of/i, 'Selecciona una opción válida.'],
  [/required|expected string, received undefined/i, 'Este dato es obligatorio.'],
  [/too (big|long)|at most/i, 'El texto es demasiado largo.'],
];

/**
 * Maps a server field path to the flow step that owns it. Accepts dotted paths
 * (`worker.curp`) and bare top-level sections (`worker`, as sent by the CRM).
 */
export function mapFieldToStep(field: string): number {
  const section = field.split('.')[0];
  return SECTION_STEPS[section] ?? 0;
}

/** Spanish label for a field path; falls back to the section label or a generic one. */
export function fieldLabel(field: string): string {
  return FIELD_LABELS[field] ?? SECTION_LABELS[field.split('.')[0]] ?? 'Solicitud';
}

/** Translates a server (English) validation message into readable Spanish. */
export function translateMessage(message: string): string {
  for (const [pattern, spanish] of MESSAGE_RULES) {
    if (pattern.test(message)) return spanish;
  }
  return GENERIC_MESSAGE;
}

function toMessages(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((m): m is string => typeof m === 'string');
  if (typeof value === 'string') return [value];
  return [];
}

/**
 * Normalizes `details` from a 400/422 response into one FieldError per field.
 * Returns an empty array when `details` has an unknown or empty shape.
 */
export function parseFieldErrors(details: unknown): FieldError[] {
  const raw: Array<{ field: string; message: string }> = [];

  if (Array.isArray(details)) {
    for (const issue of details) {
      if (!issue || typeof issue !== 'object') continue;
      const { path, message } = issue as { path?: unknown; message?: unknown };
      const field = Array.isArray(path) ? path.map(String).join('.') : typeof path === 'string' ? path : '';
      raw.push({ field, message: typeof message === 'string' ? message : '' });
    }
  } else if (details && typeof details === 'object') {
    for (const [field, value] of Object.entries(details as Record<string, unknown>)) {
      const messages = toMessages(value);
      if (messages.length === 0) raw.push({ field, message: '' });
      for (const message of messages) raw.push({ field, message });
    }
  }

  // One entry per field: dedupe translated messages and join them.
  const byField = new Map<string, Set<string>>();
  for (const { field, message } of raw) {
    const set = byField.get(field) ?? new Set<string>();
    set.add(translateMessage(message));
    byField.set(field, set);
  }

  return Array.from(byField, ([field, messages]) => ({
    field,
    label: fieldLabel(field),
    message: Array.from(messages).join(' '),
    step: mapFieldToStep(field),
  }));
}
