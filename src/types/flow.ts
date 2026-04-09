export interface WorkerData {
  name: string;
  curp: string;
  phone: string;
  email: string;
  address: string;
  state: string;
}

export interface EmployerData {
  companyName: string;
  rfc: string;
  address: string;
  role: string;
  startDate: string;
  endDate: string;
  salary: string;
  benefits: string;
}

export interface ProblemData {
  problemType: 'despido' | 'renuncia_forzada' | 'falta_pago' | 'acoso' | 'otro' | '';
  description?: string;
}

export interface FlowState {
  worker: WorkerData;
  employer: EmployerData;
  problem: ProblemData;
}

export const initialFlowState: FlowState = {
  worker: {
    name: '',
    curp: '',
    phone: '',
    email: '',
    address: '',
    state: '',
  },
  employer: {
    companyName: '',
    rfc: '',
    address: '',
    role: '',
    startDate: '',
    endDate: '',
    salary: '',
    benefits: '',
  },
  problem: {
    problemType: '',
    description: '',
  }
};
