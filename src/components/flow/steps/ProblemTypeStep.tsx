import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, LogOut, DollarSign, HandMetal, HelpCircle, ChevronLeft, ChevronRight, Calendar, Factory } from 'lucide-react';
import type { StepProps } from '../LaboralFlowModal';
import type { ProblemData } from '../../../types/flow';
import { SINACOL_INDUSTRIAS, SINACOL_OBJETO_MAP } from '../../../types/flow';
import { validateProblem } from '../../../lib/validators';
import type { FieldErrors } from '../../../lib/validators';

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
  const [fechaConflicto, setFechaConflicto] = useState(data.problem.fechaConflicto || '');
  const [industria, setIndustria] = useState(data.problem.industria || 'Ninguna de las anteriores');
  const [objetoSolicitud, setObjetoSolicitud] = useState(data.problem.objetoSolicitud || '');
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resolvedObjeto = problemType !== 'otro'
      ? SINACOL_OBJETO_MAP[problemType] ?? ''
      : objetoSolicitud;

    const nextErrors = validateProblem({
      problemType,
      description,
      fechaConflicto,
      industria,
      objetoSolicitud: resolvedObjeto,
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    updateData('problem', { problemType, description, fechaConflicto, industria, objetoSolicitud: resolvedObjeto });
    onNext();
  };

  const clearError = (name: string) => {
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const fieldError = (name: string) =>
    errors[name] ? <p className="text-xs text-red-600 mt-1" role="alert">{errors[name]}</p> : null;

  const inputClass = (name: string, extra = '') =>
    `block w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
      errors[name] ? 'border-red-400' : 'border-gray-300'
    } ${extra}`;

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

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col" noValidate>
        <div className="space-y-4 mb-6 overflow-y-auto pr-1">

          {/* Fecha del conflicto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              Fecha del conflicto / despido *
            </label>
            <input
              type="date"
              value={fechaConflicto}
              onChange={e => { setFechaConflicto(e.target.value); clearError('fechaConflicto'); }}
              aria-invalid={Boolean(errors.fechaConflicto)}
              className={inputClass('fechaConflicto')}
            />
            {fieldError('fechaConflicto')}
          </div>

          {/* Tipo de problema */}
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
                    onChange={(e) => { setProblemType(e.target.value as ProblemData['problemType']); clearError('problemType'); }}
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
            {fieldError('problemType')}
          </div>

          {/* Objeto de solicitud para "otro" */}
          {problemType === 'otro' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Especifica el objeto de la solicitud SINACOL *
              </label>
              <select
                value={objetoSolicitud}
                onChange={e => { setObjetoSolicitud(e.target.value); clearError('objetoSolicitud'); }}
                aria-invalid={Boolean(errors.objetoSolicitud)}
                className={inputClass('objetoSolicitud')}
              >
                <option value="">Selecciona...</option>
                <option value="Pago de prestaciones">Pago de prestaciones</option>
                <option value="Derecho de preferencia">Derecho de preferencia</option>
                <option value="Derecho de antigüedad">Derecho de antigüedad</option>
                <option value="Derecho de ascenso">Derecho de ascenso</option>
              </select>
              {fieldError('objetoSolicitud')}
            </div>
          )}

          {/* Industria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              <Factory className="w-4 h-4 text-gray-400" />
              Giro o industria de la empresa
            </label>
            <select
              value={industria}
              onChange={e => { setIndustria(e.target.value); clearError('industria'); }}
              aria-invalid={Boolean(errors.industria)}
              className={inputClass('industria')}
            >
              {SINACOL_INDUSTRIAS.map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-1">Determina la jurisdicción (federal o local) en SINACOL.</p>
            {fieldError('industria')}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción de los hechos (Opcional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows={3}
              placeholder="Describe brevemente lo que ocurrió. Esta descripción se usará en la solicitud SINACOL."
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
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
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