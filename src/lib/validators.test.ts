import { describe, it, expect } from 'vitest';
import {
  validateWorker,
  validateEmployer,
  validateProblem,
  isValidIsoDate,
  CURP_REGEX,
  RFC_REGEX,
} from './validators';
import type { WorkerData, EmployerData, ProblemData } from '../types/flow';

function worker(overrides: Partial<WorkerData> = {}): WorkerData {
  return {
    name: 'Juan',
    primerApellido: 'Pérez',
    segundoApellido: 'García',
    curp: 'PEGJ950101HDFRRN02',
    fechaNacimiento: '1995-01-01',
    genero: 'MASCULINO',
    phone: '8441234567',
    email: 'juan@example.com',
    state: 'Coahuila',
    tipoVialidad: 'CALLE',
    nombreVialidad: 'Reforma',
    numeroExterior: '123',
    colonia: 'Centro',
    municipio: 'Saltillo',
    codigoPostal: '25000',
    ...overrides,
  };
}

function employer(overrides: Partial<EmployerData> = {}): EmployerData {
  return {
    tipoPersonaCitado: 'Moral',
    companyName: 'Empresa SA de CV',
    rfc: 'EMP140101AA1',
    role: 'Ayudante General',
    startDate: '2020-06-01',
    endDate: '2024-12-31',
    salary: '8000',
    benefits: 'IMSS, Infonavit',
    employerState: 'Coahuila',
    employerMunicipio: 'Saltillo',
    employerColonia: 'Industrial',
    employerCalle: 'Av. Industria 456',
    employerNumero: '',
    ...overrides,
  };
}

function problem(overrides: Partial<ProblemData> = {}): ProblemData {
  return {
    problemType: 'despido',
    description: 'Me despidieron sin causa',
    fechaConflicto: '2025-01-15',
    industria: 'Automotriz',
    objetoSolicitud: 'Despido',
    ...overrides,
  };
}

describe('isValidIsoDate', () => {
  it('accepts valid dates', () => {
    expect(isValidIsoDate('1995-01-01')).toBe(true);
    expect(isValidIsoDate('2024-02-29')).toBe(true); // leap year
  });

  it('rejects invalid dates and formats', () => {
    expect(isValidIsoDate('2023-02-31')).toBe(false);
    expect(isValidIsoDate('1995-13-01')).toBe(false);
    expect(isValidIsoDate('01-01-1995')).toBe(false);
    expect(isValidIsoDate('')).toBe(false);
    expect(isValidIsoDate('1995-1-1')).toBe(false);
  });
});

describe('CURP_REGEX', () => {
  it('matches the official 18-character CURP shape', () => {
    expect(CURP_REGEX.test('PEGJ950101HDFRRN02')).toBe(true);
    expect(CURP_REGEX.test('MABC890101MDFLDR01')).toBe(true);
  });

  it('rejects wrong lengths and invalid patterns', () => {
    expect(CURP_REGEX.test('PEGJ950101HDFRRN0')).toBe(false); // 17 chars
    expect(CURP_REGEX.test('PEGJ950101HDFRRN022')).toBe(false); // 19 chars
    expect(CURP_REGEX.test('1ABC950101HDFRRN02')).toBe(false); // starts with a digit
    expect(CURP_REGEX.test('PEGJ950101HXXRRN02')).toBe(false); // invalid state code
    expect(CURP_REGEX.test('PEGJ950132HDFRRN02')).toBe(false); // invalid month 32
  });
});

describe('RFC_REGEX', () => {
  it('matches 12- and 13-character RFCs', () => {
    expect(RFC_REGEX.test('PEGJ950101AA1')).toBe(true); // 13 chars (persona física)
    expect(RFC_REGEX.test('EMP140101AA1')).toBe(true); // 12 chars (persona moral)
    expect(RFC_REGEX.test('XAXX010101000')).toBe(true);
  });

  it('rejects invalid RFCs', () => {
    expect(RFC_REGEX.test('EMP140101')).toBe(false);
    expect(RFC_REGEX.test('EMP140101AA11')).toBe(false);
    expect(RFC_REGEX.test('abc123456789')).toBe(false);
  });
});

describe('validateWorker', () => {
  it('returns no errors for a valid worker', () => {
    expect(validateWorker(worker())).toEqual({});
  });

  it('requires name and primerApellido', () => {
    const errors = validateWorker(worker({ name: '', primerApellido: '  ' }));
    expect(errors.name).toBeTruthy();
    expect(errors.primerApellido).toBeTruthy();
  });

  it('requires CURP to be exactly 18 chars and match the regex', () => {
    expect(validateWorker(worker({ curp: 'SHORT' })).curp).toContain('18 caracteres');
    expect(validateWorker(worker({ curp: 'PEGJ950101HXXRRN02' })).curp).toContain('no es válida');
    expect(validateWorker(worker({ curp: 'PEGJ950101HDFRRN02' })).curp).toBeUndefined();
  });

  it('requires fechaNacimiento and genero', () => {
    expect(validateWorker(worker({ fechaNacimiento: '' })).fechaNacimiento).toBeTruthy();
    expect(validateWorker(worker({ fechaNacimiento: '2023-02-31' })).fechaNacimiento).toContain('formato');
    expect(validateWorker(worker({ genero: '' })).genero).toBeTruthy();
    expect(validateWorker(worker({ genero: 'MASCULINO' })).genero).toBeUndefined();
  });

  it('validates phone and email formats', () => {
    expect(validateWorker(worker({ phone: '12345' })).phone).toContain('10 dígitos');
    expect(validateWorker(worker({ phone: '844-123-4567' })).phone).toBeUndefined();
    expect(validateWorker(worker({ email: 'not-an-email' })).email).toContain('no es válido');
  });

  it('validates codigoPostal only when provided', () => {
    expect(validateWorker(worker({ codigoPostal: '' })).codigoPostal).toBeUndefined();
    expect(validateWorker(worker({ codigoPostal: '2500' })).codigoPostal).toContain('5 dígitos');
    expect(validateWorker(worker({ codigoPostal: '25000' })).codigoPostal).toBeUndefined();
  });

  it('requires address fields the CRM requires', () => {
    const errors = validateWorker(
      worker({ state: '', tipoVialidad: '', nombreVialidad: '', numeroExterior: '', municipio: '' }),
    );
    expect(errors.state).toBeTruthy();
    expect(errors.tipoVialidad).toBeTruthy();
    expect(errors.nombreVialidad).toBeTruthy();
    expect(errors.numeroExterior).toBeTruthy();
    expect(errors.municipio).toBeTruthy();
  });
});

describe('validateEmployer', () => {
  it('returns no errors for a valid employer', () => {
    expect(validateEmployer(employer())).toEqual({});
  });

  it('requires tipoPersonaCitado, companyName, role, salary and dates', () => {
    const errors = validateEmployer(
      employer({ tipoPersonaCitado: '', companyName: '', role: '', salary: '', startDate: '' }),
    );
    expect(errors.tipoPersonaCitado).toBeTruthy();
    expect(errors.companyName).toBeTruthy();
    expect(errors.role).toBeTruthy();
    expect(errors.salary).toBeTruthy();
    expect(errors.startDate).toBeTruthy();
  });

  it('validates salary as a positive number', () => {
    expect(validateEmployer(employer({ salary: '-5' })).salary).toContain('mayor a 0');
    expect(validateEmployer(employer({ salary: 'abc' })).salary).toContain('mayor a 0');
    expect(validateEmployer(employer({ salary: '8000.50' })).salary).toBeUndefined();
  });

  it('validates RFC only when provided', () => {
    expect(validateEmployer(employer({ rfc: '' })).rfc).toBeUndefined();
    expect(validateEmployer(employer({ rfc: 'BADRFC' })).rfc).toContain('12 o 13');
    expect(validateEmployer(employer({ rfc: 'EMP140101AA1' })).rfc).toBeUndefined();
  });

  it('requires employerCalle', () => {
    expect(validateEmployer(employer({ employerCalle: '' })).employerCalle).toBeTruthy();
  });

  it('validates optional endDate format', () => {
    expect(validateEmployer(employer({ endDate: '2024-13-01' })).endDate).toContain('formato');
    expect(validateEmployer(employer({ endDate: '' })).endDate).toBeUndefined();
  });
});

describe('validateProblem', () => {
  it('returns no errors for a valid problem', () => {
    expect(validateProblem(problem())).toEqual({});
  });

  it('requires problemType and fechaConflicto', () => {
    const errors = validateProblem(problem({ problemType: '', fechaConflicto: '' }));
    expect(errors.problemType).toBeTruthy();
    expect(errors.fechaConflicto).toBeTruthy();
  });

  it('validates fechaConflicto format', () => {
    expect(validateProblem(problem({ fechaConflicto: '2025-02-30' })).fechaConflicto).toContain('formato');
  });

  it('requires industria and objetoSolicitud', () => {
    const errors = validateProblem(problem({ industria: '', objetoSolicitud: '' }));
    expect(errors.industria).toBeTruthy();
    expect(errors.objetoSolicitud).toBeTruthy();
  });
});