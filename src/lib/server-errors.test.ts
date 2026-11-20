import { describe, it, expect } from 'vitest';
import { mapFieldToStep, parseFieldErrors, translateMessage, fieldLabel } from './server-errors';

describe('mapFieldToStep', () => {
  it('maps dotted paths to their step', () => {
    expect(mapFieldToStep('worker.curp')).toBe(1);
    expect(mapFieldToStep('employer.employerCalle')).toBe(2);
    expect(mapFieldToStep('problem.fechaConflicto')).toBe(3);
  });

  it('maps bare top-level sections sent by the CRM 422', () => {
    expect(mapFieldToStep('worker')).toBe(1);
    expect(mapFieldToStep('employer')).toBe(2);
    expect(mapFieldToStep('problem')).toBe(3);
  });

  it('returns 0 for unknown paths', () => {
    expect(mapFieldToStep('')).toBe(0);
    expect(mapFieldToStep('caseNumber')).toBe(0);
    expect(mapFieldToStep('workers.name')).toBe(0);
  });
});

describe('parseFieldErrors', () => {
  it('parses the server 400 array shape [{path, message}]', () => {
    const errors = parseFieldErrors([
      { path: 'worker.curp', message: 'CURP must be exactly 18 characters' },
      { path: 'employer.startDate', message: 'must be YYYY-MM-DD' },
      { path: 'problem.industria', message: 'required' },
    ]);
    expect(errors).toEqual([
      { field: 'worker.curp', label: 'CURP', message: 'Debe tener exactamente 18 caracteres.', step: 1 },
      { field: 'employer.startDate', label: 'Fecha de ingreso', message: 'Ingresa una fecha válida.', step: 2 },
      { field: 'problem.industria', label: 'Industria', message: 'Este dato es obligatorio.', step: 3 },
    ]);
  });

  it('parses the CRM 422 object shape {section: [messages]}', () => {
    const errors = parseFieldErrors({ worker: ['Invalid email'], problem: ['Required'] });
    expect(errors).toEqual([
      { field: 'worker', label: 'Datos del trabajador', message: 'Ingresa un correo electrónico válido.', step: 1 },
      { field: 'problem', label: 'Tipo de problema', message: 'Este dato es obligatorio.', step: 3 },
    ]);
  });

  it('accepts an object with a single string message', () => {
    expect(parseFieldErrors({ 'employer.salary': 'Salary is required' })).toEqual([
      { field: 'employer.salary', label: 'Salario', message: 'Este dato es obligatorio.', step: 2 },
    ]);
  });

  it('merges duplicate paths into one entry with deduplicated messages', () => {
    const errors = parseFieldErrors([
      { path: 'worker.phone', message: 'required' },
      { path: 'worker.phone', message: 'Phone must be at least 10 characters' },
      { path: 'worker.phone', message: 'required' },
    ]);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatchObject({
      field: 'worker.phone',
      message: 'Este dato es obligatorio. Debe tener al menos 10 dígitos.',
      step: 1,
    });
  });

  it('accepts array paths and falls back to a generic Spanish message', () => {
    expect(parseFieldErrors([{ path: ['worker', 'colonia'], message: 'something unexpected' }])).toEqual([
      { field: 'worker.colonia', label: 'Colonia', message: 'Revisa este dato.', step: 1 },
    ]);
  });

  it('never leaks "[object Object]" or array indexes as field names', () => {
    const errors = parseFieldErrors([{ path: 'worker.email', message: 'Invalid email' }]);
    expect(errors.map((e) => e.field)).not.toContain('0');
    expect(errors.map((e) => e.message).join(' ')).not.toContain('[object Object]');
  });

  it('returns an empty list for missing or malformed details', () => {
    expect(parseFieldErrors(undefined)).toEqual([]);
    expect(parseFieldErrors(null)).toEqual([]);
    expect(parseFieldErrors('oops')).toEqual([]);
    expect(parseFieldErrors([])).toEqual([]);
    expect(parseFieldErrors({})).toEqual([]);
    expect(parseFieldErrors([null, 42])).toEqual([]);
  });
});

describe('translateMessage', () => {
  it.each([
    ['unknown Mexican state', 'Selecciona un estado válido.'],
    ['unknown genero (expected one of MASCULINO, FEMENINO)', 'Selecciona un género válido.'],
    ['unknown objetoSolicitud (expected one of a | b)', 'Selecciona un objeto de solicitud válido.'],
    ['horasSemanales must be digits', 'Debe ser un número entero.'],
    ['Invalid option: expected one of "Física"|"Moral"', 'Selecciona una opción válida.'],
    ['fechaConflicto must be YYYY-MM-DD', 'Ingresa una fecha válida.'],
  ])('translates %s', (input, expected) => {
    expect(translateMessage(input)).toBe(expected);
  });
});

describe('fieldLabel', () => {
  it('falls back to section and generic labels', () => {
    expect(fieldLabel('employer.unknownField')).toBe('Datos del empleador');
    expect(fieldLabel('')).toBe('Solicitud');
  });
});
