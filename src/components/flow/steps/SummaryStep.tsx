import React from 'react';
import { motion } from 'framer-motion';
import { User, Building, ShieldAlert, ChevronLeft, Send } from 'lucide-react';
import type { StepProps } from '../LaboralFlowModal';

const SummaryStep: React.FC<StepProps> = ({ onNext, onBack, data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Revisión de Datos</h2>
        <p className="text-gray-500 mt-1">Por favor verifica que la información sea correcta antes de enviarla.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-6 mb-6 custom-scrollbar">
        {/* Worker Data */}
        <section className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 text-blue-800 font-semibold mb-3 border-b border-gray-200 pb-2">
            <User className="w-5 h-5" />
            <h3>Datos del Trabajador</h3>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <dt className="text-gray-500">Nombre</dt>
              <dd className="font-medium text-gray-900">{data.worker.name}</dd>
            </div>
            <div>
              <dt className="text-gray-500">CURP</dt>
              <dd className="font-medium text-gray-900 uppercase">{data.worker.curp}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Contacto</dt>
              <dd className="font-medium text-gray-900">{data.worker.phone} • {data.worker.email}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Estado</dt>
              <dd className="font-medium text-gray-900">{data.worker.state}</dd>
            </div>
          </dl>
        </section>

        {/* Employer Data */}
        <section className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 text-blue-800 font-semibold mb-3 border-b border-gray-200 pb-2">
            <Building className="w-5 h-5" />
            <h3>Datos del Empleador</h3>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div>
              <dt className="text-gray-500">Empresa</dt>
              <dd className="font-medium text-gray-900">{data.employer.companyName}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Puesto</dt>
              <dd className="font-medium text-gray-900">{data.employer.role}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Periodo</dt>
              <dd className="font-medium text-gray-900">{data.employer.startDate} al {data.employer.endDate}</dd>
            </div>
            <div>
              <dt className="text-gray-500">Salario Mensual</dt>
              <dd className="font-medium text-gray-900">
                {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(parseFloat(data.employer.salary) || 0)}
              </dd>
            </div>
          </dl>
        </section>

        {/* Problem Type */}
        <section className="bg-gray-50 rounded-xl p-5 border border-gray-100">
          <div className="flex items-center gap-2 text-blue-800 font-semibold mb-3 border-b border-gray-200 pb-2">
            <ShieldAlert className="w-5 h-5" />
            <h3>Tipo de Problema</h3>
          </div>
          <dl className="text-sm">
            <div>
              <dt className="text-gray-500 mb-1">Causa principal</dt>
              <dd className="font-medium text-gray-900 bg-white inline-block px-3 py-1 rounded-md border border-gray-200 uppercase tracking-wide text-xs">
                {data.problem.problemType.replace('_', ' ')}
              </dd>
            </div>
            {data.problem.description && (
              <div className="mt-3">
                <dt className="text-gray-500 mb-1">Descripción</dt>
                <dd className="font-medium text-gray-900 p-3 bg-white border border-gray-200 rounded-lg whitespace-pre-wrap">
                  {data.problem.description}
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>

      <div className="mt-auto flex justify-between pt-4 border-t border-gray-100">
        <button
          onClick={onBack}
          className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Editar Datos
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-blue-200"
        >
          Confirmar y Enviar
          <Send className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default SummaryStep;
