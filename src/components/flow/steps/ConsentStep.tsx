import React from 'react';
import { Shield, AlertCircle, X, ChevronRight } from 'lucide-react';
import type { StepProps } from '../LaboralFlowModal';

const ConsentStep: React.FC<StepProps> = ({ onNext, onClose }) => {
  return (
    <div
      className="flow-step-enter flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Primeros Auxilios Laborales</h2>
          <p className="text-gray-500 mt-1">Evaluación rápida de tu situación</p>
        </div>
        <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6 text-sm text-blue-800 flex gap-4 items-start">
        <Shield className="w-6 h-6 shrink-0 text-blue-600 mt-0.5" />
        <div>
          <p className="font-semibold text-blue-900 mb-1">Aviso de Privacidad y Consentimiento</p>
          <p className="mb-2">La información que proporcionas es estrictamente confidencial y está protegida por el secreto profesional. Ningún dato será compartido con tu empleador.</p>
          <p>Al continuar, aceptas que utilicemos estos datos únicamente para evaluar tu caso, calcular estimaciones preliminares y, de ser necesario, iniciar el proceso ante el Centro Federal de Conciliación.</p>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-5 mb-8 flex gap-4 text-sm text-amber-800">
        <AlertCircle className="w-6 h-6 shrink-0 text-amber-600" />
        <p>Este proceso toma aproximadamente <strong>5 minutos</strong>. Ten a la mano información sobre tu salario y fechas de ingreso/salida.</p>
      </div>

      <div className="mt-auto flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          onClick={onClose}
          className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 font-medium rounded-lg transition-colors"
        >
          No acepto
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          Acepto y continuar
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ConsentStep;
