import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, LogOut, DollarSign, HandMetal, HelpCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import type { StepProps } from '../LaboralFlowModal';

const PROBLEM_TYPES = [
  { id: 'despido', label: 'Despido Injustificado', icon: LogOut, desc: 'Te despidieron sin causa justificada y sin liquidación al 100%.' },
  { id: 'renuncia_forzada', label: 'Renuncia Forzada', icon: ShieldAlert, desc: 'Te obligaron a firmar una renuncia contra tu voluntad.' },
  { id: 'falta_pago', label: 'Falta de Pago', icon: DollarSign, desc: 'No te han pagado tu salario, aguinaldo, u otras prestaciones.' },
  { id: 'acoso', label: 'Acoso o Discriminación', icon: HandMetal, desc: 'Sufriste acoso laboral, sexual o discriminación en el trabajo.' },
  { id: 'otro', label: 'Otro Problema', icon: HelpCircle, desc: 'Otra situación laboral no mencionada arriba.' },
];

const ProblemTypeStep: React.FC<StepProps> = ({ onNext, onBack, data, updateData }) => {
  const [problemType, setProblemType] = useState(data.problem.problemType);
  const [description, setDescription] = useState(data.problem.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemType) {
      alert("Por favor selecciona un tipo de problema.");
      return;
    }
    updateData('problem', { problemType, description });
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tipo de Problema</h2>
        <p className="text-gray-500 mt-1">Selecciona la situación que mejor describa tu caso.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 gap-3">
            {PROBLEM_TYPES.map((type) => {
              const Icon = type.icon;
              const isSelected = problemType === type.id;
              return (
                <label
                  key={type.id}
                  className={`relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50'
                      : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="problemType"
                    className="sr-only"
                    value={type.id}
                    checked={isSelected}
                    onChange={(e) => setProblemType(e.target.value as any)}
                  />
                  <div className={`p-2 rounded-lg mr-4 ${isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 text-left">
                    <span className={`block font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                      {type.label}
                    </span>
                    <span className="block text-sm text-gray-500 mt-0.5">
                      {type.desc}
                    </span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />}
                  </div>
                </label>
              );
            })}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Breve descripción (Opcional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows={3}
              placeholder="Añade cualquier detalle adicional que consideres importante..."
            />
          </div>
        </div>

        <div className="mt-auto flex justify-between pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Regresar
          </button>
          <button
            type="submit"
            disabled={!problemType}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            Estimar Liquidación
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProblemTypeStep;
