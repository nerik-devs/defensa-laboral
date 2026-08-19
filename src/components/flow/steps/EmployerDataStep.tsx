import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Briefcase, MapPin, Calendar, DollarSign, Award, ChevronLeft, ChevronRight, FileDigit, Users } from 'lucide-react';
import type { StepProps } from '../LaboralFlowModal';
import { MEXICAN_STATES } from '../../../types/flow';
import { validateEmployer, PERIODICIDAD, JORNADA } from '../../../lib/validators';
import type { FieldErrors } from '../../../lib/validators';

const EmployerDataStep: React.FC<StepProps> = ({ onNext, onBack, data, updateData }) => {
  const [localData, setLocalData] = useState(data.employer);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateEmployer(localData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    updateData('employer', localData);
    onNext();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
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

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col" noValidate>
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
            {fieldError('tipoPersonaCitado')}
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
                value={localData.companyName}
                onChange={handleChange}
                aria-invalid={Boolean(errors.companyName)}
                className={`block w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.companyName ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder={isMoral ? 'Razón Social o nombre comercial' : 'Nombre completo del empleador'}
              />
            </div>
            {fieldError('companyName')}
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
                  aria-invalid={Boolean(errors.rfc)}
                  className={`block w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm uppercase ${
                    errors.rfc ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="12 o 13 caracteres"
                />
              </div>
              {fieldError('rfc')}
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
                  value={localData.role}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.role)}
                  className={`block w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.role ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="Ej. Ayudante General"
                />
              </div>
              {fieldError('role')}
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
                  value={localData.startDate}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.startDate)}
                  className={`block w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.startDate ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
              </div>
              {fieldError('startDate')}
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
              {fieldError('endDate')}
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
                  min="0"
                  step="0.01"
                  value={localData.salary}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.salary)}
                  className={`block w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.salary ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="Ej. 8000"
                />
              </div>
              {fieldError('salary')}
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

          {/* Periodicidad, jornada y horas semanales */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="periodicidad" className="block text-sm font-medium text-gray-700 mb-1">
                Periodicidad de Pago
              </label>
              <select
                id="periodicidad"
                name="periodicidad"
                value={localData.periodicidad}
                onChange={handleChange}
                aria-invalid={Boolean(errors.periodicidad)}
                className={`block w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.periodicidad ? 'border-red-400' : 'border-gray-300'
                }`}
              >
                {PERIODICIDAD.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              {fieldError('periodicidad')}
            </div>
            <div>
              <label htmlFor="jornada" className="block text-sm font-medium text-gray-700 mb-1">
                Jornada
              </label>
              <select
                id="jornada"
                name="jornada"
                value={localData.jornada}
                onChange={handleChange}
                aria-invalid={Boolean(errors.jornada)}
                className={`block w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.jornada ? 'border-red-400' : 'border-gray-300'
                }`}
              >
                {JORNADA.map(j => (
                  <option key={j} value={j}>{j}</option>
                ))}
              </select>
              {fieldError('jornada')}
            </div>
            <div>
              <label htmlFor="horasSemanales" className="block text-sm font-medium text-gray-700 mb-1">
                Horas Semanales
              </label>
              <input
                type="number"
                id="horasSemanales"
                name="horasSemanales"
                min="1"
                max="84"
                value={localData.horasSemanales}
                onChange={handleChange}
                aria-invalid={Boolean(errors.horasSemanales)}
                className={`block w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.horasSemanales ? 'border-red-400' : 'border-gray-300'
                }`}
                placeholder="Ej. 48"
              />
              {fieldError('horasSemanales')}
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
                    value={localData.employerState}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.employerState)}
                    className={`block w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm ${
                      errors.employerState ? 'border-red-400' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona...</option>
                    {MEXICAN_STATES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {fieldError('employerState')}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Municipio *</label>
                  <input
                    type="text"
                    name="employerMunicipio"
                    value={localData.employerMunicipio}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.employerMunicipio)}
                    className={inputClass('employerMunicipio')}
                    placeholder="Ej. Saltillo"
                  />
                  {fieldError('employerMunicipio')}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Calle y número *</label>
                <input
                  type="text"
                  name="employerCalle"
                  value={localData.employerCalle}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.employerCalle)}
                  className={inputClass('employerCalle')}
                  placeholder="Ej. Av. Industria 456"
                />
                {fieldError('employerCalle')}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <div>
                  <label htmlFor="employerCodigoPostal" className="block text-xs font-medium text-gray-600 mb-1">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    id="employerCodigoPostal"
                    name="employerCodigoPostal"
                    value={localData.employerCodigoPostal}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.employerCodigoPostal)}
                    className={inputClass('employerCodigoPostal')}
                    placeholder="Ej. 25280"
                    inputMode="numeric"
                    maxLength={5}
                  />
                  {fieldError('employerCodigoPostal')}
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