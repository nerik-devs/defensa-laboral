import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Briefcase, MapPin, Calendar, DollarSign, Award, ChevronLeft, ChevronRight, FileDigit, Users } from 'lucide-react';
import type { StepProps } from '../LaboralFlowModal';
import { MEXICAN_STATES } from '../../../types/flow';

const EmployerDataStep: React.FC<StepProps> = ({ onNext, onBack, data, updateData }) => {
  const [localData, setLocalData] = useState(data.employer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData('employer', localData);
    onNext();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  const isMoral = localData.tipoPersonaCitado === 'Moral';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Datos del Empleador</h2>
        <p className="text-gray-500 mt-1">Información sobre la empresa o persona para la que trabajabas.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-4 mb-8 overflow-y-auto pr-1">

          {/* Tipo de persona */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de empleador *</label>
            <div className="flex gap-3">
              {(['Moral', 'Física'] as const).map((tipo) => (
                <label
                  key={tipo}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    localData.tipoPersonaCitado === tipo
                      ? 'border-blue-600 bg-blue-50 text-blue-800 font-medium'
                      : 'border-gray-200 text-gray-600 hover:border-blue-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="tipoPersonaCitado"
                    className="sr-only"
                    value={tipo}
                    checked={localData.tipoPersonaCitado === tipo}
                    onChange={handleChange}
                  />
                  <Users className="w-4 h-4" />
                  {tipo === 'Moral' ? 'Empresa (Persona Moral)' : 'Persona Física'}
                </label>
              ))}
            </div>
          </div>

          {/* Nombre / Razón Social */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isMoral ? 'Razón Social *' : 'Nombre del Empleador *'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                name="companyName"
                required
                value={localData.companyName}
                onChange={handleChange}
                className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder={isMoral ? 'Razón Social o nombre comercial' : 'Nombre completo del empleador'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RFC (Opcional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FileDigit className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="rfc"
                  value={localData.rfc}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm uppercase"
                  placeholder="12 o 13 caracteres"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Puesto que desempeñabas *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="role"
                  required
                  value={localData.role}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Ej. Ayudante General"
                />
              </div>
            </div>
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Ingreso *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="startDate"
                  required
                  value={localData.startDate}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Salida / Despido</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="endDate"
                  value={localData.endDate}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Salario y Prestaciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salario (Mensual) *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="number"
                  name="salary"
                  required
                  min="0"
                  step="0.01"
                  value={localData.salary}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Ej. 8000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">¿Tenías Prestaciones?</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Award className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="benefits"
                  value={localData.benefits}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="IMSS, Infonavit, Aguinaldo..."
                />
              </div>
            </div>
          </div>

          {/* Domicilio del empleador */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Domicilio del Centro de Trabajo
            </p>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Estado *</label>
                  <select
                    name="employerState"
                    required
                    value={localData.employerState}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="">Selecciona...</option>
                    {MEXICAN_STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Municipio *</label>
                  <input
                    type="text"
                    name="employerMunicipio"
                    required
                    value={localData.employerMunicipio}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Ej. Saltillo"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Calle y número</label>
                  <input
                    type="text"
                    name="employerCalle"
                    value={localData.employerCalle}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Ej. Av. Industria 456"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Colonia</label>
                  <input
                    type="text"
                    name="employerColonia"
                    value={localData.employerColonia}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Ej. Industrial"
                  />
                </div>
              </div>
            </div>
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
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EmployerDataStep;
