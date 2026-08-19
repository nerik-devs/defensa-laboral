export interface WorkerData {
  name: string;
  primerApellido: string;
  segundoApellido: string;
  curp: string;
  fechaNacimiento: string;
  genero: 'MASCULINO' | 'FEMENINO' | 'OTRO' | 'NO BINARIO' | '';
  phone: string;
  email: string;
  state: string;
  tipoVialidad: string;
  nombreVialidad: string;
  numeroExterior: string;
  colonia: string;
  municipio: string;
  codigoPostal: string;
}

export interface EmployerData {
  tipoPersonaCitado: 'Física' | 'Moral' | '';
  companyName: string;
  rfc: string;
  role: string;
  startDate: string;
  endDate: string;
  salary: string;
  benefits: string;
  employerState: string;
  employerMunicipio: string;
  employerColonia: string;
  employerCalle: string;
  employerNumero: string;
}

export interface ProblemData {
  problemType: 'despido' | 'renuncia_forzada' | 'falta_pago' | 'acoso' | 'otro' | '';
  description: string;
  fechaConflicto: string;
  industria: string;
  objetoSolicitud: string;
}

export interface FlowState {
  worker: WorkerData;
  employer: EmployerData;
  problem: ProblemData;
  /** Honeypot field — must stay empty for humans; a non-empty value marks a bot. */
  website: string;
}

export const initialFlowState: FlowState = {
  website: '',
  worker: {
    name: '',
    primerApellido: '',
    segundoApellido: '',
    curp: '',
    fechaNacimiento: '',
    genero: '',
    phone: '',
    email: '',
    state: '',
    tipoVialidad: '',
    nombreVialidad: '',
    numeroExterior: '',
    colonia: '',
    municipio: '',
    codigoPostal: '',
  },
  employer: {
    tipoPersonaCitado: '',
    companyName: '',
    rfc: '',
    role: '',
    startDate: '',
    endDate: '',
    salary: '',
    benefits: '',
    employerState: '',
    employerMunicipio: '',
    employerColonia: '',
    employerCalle: '',
    employerNumero: '',
  },
  problem: {
    problemType: '',
    description: '',
    fechaConflicto: '',
    industria: 'Ninguna de las anteriores',
    objetoSolicitud: '',
  },
};

export const MEXICAN_STATES = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
  'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo',
  'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán',
  'Zacatecas',
];

export const TIPOS_VIALIDAD = [
  'AVENIDA', 'BOULEVARD', 'CALLEJÓN', 'CALZADA', 'CAMINO', 'CALLE',
  'CARRETERA', 'CIRCUITO', 'CIRCUNVALACIÓN', 'CORREDOR', 'DIAGONAL',
  'EJE VIAL', 'PASAJE', 'PEATONAL', 'PERIFÉRICO', 'PRIVADA',
  'PROLONGACIÓN', 'RETORNO', 'VIADUCTO',
];

export const SINACOL_INDUSTRIAS = [
  'Aceites y grasas vegetales',
  'Automotriz',
  'Azucarera',
  'Calera',
  'Celulosa y papel',
  'Cementera',
  'Cinematográfica',
  'Elaboradora de bebidas',
  'Eléctrica',
  'Empresas administradas',
  'Empresas con contrato/concesión federal',
  'Empresas en zonas federales',
  'Ferrocarrilera',
  'Hidrocarburos',
  'Hulera',
  'Maderera',
  'Metalúrgica y siderúrgica',
  'Minera',
  'Petroquímica',
  'Productora de alimentos',
  'Química',
  'Servicios de banca y crédito',
  'Tabacalera',
  'Textil',
  'Vidriera',
  'Ninguna de las anteriores',
];

export const SINACOL_OBJETO_MAP: Record<string, string> = {
  despido: 'Despido',
  renuncia_forzada: 'Rescisión de la relación de trabajo',
  falta_pago: 'Pago de prestaciones',
  acoso: 'Terminación voluntaria de la relación de trabajo',
  otro: '',
};
