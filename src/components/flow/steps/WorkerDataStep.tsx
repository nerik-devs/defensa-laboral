import React, { useState } from 'react';
import { User, CreditCard, Phone, Mail, MapPin, Building, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import type { StepProps } from '../LaboralFlowModal';
import { MEXICAN_STATES, TIPOS_VIALIDAD } from '../../../types/flow';
import { validateWorker } from '../../../lib/validators';
import type { FieldErrors } from '../../../lib/validators';

const WorkerDataStep: React.FC<StepProps> = ({ onNext, onBack, data, updateData }) => {
  const [localData, setLocalData] = useState(data.worker);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateWorker(localData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    updateData('worker', localData);
    onNext();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  return (
    <div
      className="flow-step-enter flex flex-col h-full"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Datos del Trabajador</h2>
        <p className="text-gray-500 mt-1">Por favor, ingresa tu información personal.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col" noValidate>
        <div className="space-y-4 mb-8 overflow-y-auto pr-1">

          {/* Nombre */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre(s) *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={localData.name}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.name)}
                  className={`block w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.name ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="Ej. Juan Carlos"
                />
              </div>
              {fieldError('name')}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primer Apellido *</label>
              <input
                type="text"
                name="primerApellido"
                value={localData.primerApellido}
                onChange={handleChange}
                aria-invalid={Boolean(errors.primerApellido)}
                className={inputClass('primerApellido')}
                placeholder="Ej. Pérez"
              />
              {fieldError('primerApellido')}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Segundo Apellido</label>
              <input
                type="text"
                name="segundoApellido"
                value={localData.segundoApellido}
                onChange={handleChange}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Ej. García"
              />
            </div>
          </div>

          {/* CURP y Fecha de Nacimiento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CURP *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="curp"
                  maxLength={18}
                  value={localData.curp}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.curp)}
                  className={`block w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm uppercase ${
                    errors.curp ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="18 caracteres"
                />
              </div>
              {fieldError('curp')}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={localData.fechaNacimiento}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.fechaNacimiento)}
                  className={`block w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.fechaNacimiento ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
              </div>
              {fieldError('fechaNacimiento')}
            </div>
          </div>

          {/* Género */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Género *</label>
            <select
              name="genero"
              value={localData.genero}
              onChange={handleChange}
              aria-invalid={Boolean(errors.genero)}
              className={`block w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                errors.genero ? 'border-red-400' : 'border-gray-300'
              }`}
            >
              <option value="">Selecciona...</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMENINO">Femenino</option>
              <option value="NO BINARIO">No binario</option>
              <option value="OTRO">Otro</option>
            </select>
            {fieldError('genero')}
          </div>

          {/* Teléfono y Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={localData.phone}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.phone)}
                  className={`block w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.phone ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="10 dígitos"
                />
              </div>
              {fieldError('phone')}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={localData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  className={`block w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                    errors.email ? 'border-red-400' : 'border-gray-300'
                  }`}
                  placeholder="correo@ejemplo.com"
                />
              </div>
              {fieldError('email')}
            </div>
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado de residencia *</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-4 w-4 text-gray-400" />
              </div>
              <select
                name="state"
                value={localData.state}
                onChange={handleChange}
                aria-invalid={Boolean(errors.state)}
                className={`block w-full pl-9 pr-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.state ? 'border-red-400' : 'border-gray-300'
                }`}
              >
                <option value="">Selecciona un estado</option>
                {MEXICAN_STATES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            {fieldError('state')}
          </div>

          {/* Dirección estructurada */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Domicilio
            </p>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tipo de vialidad *</label>
                  <select
                    name="tipoVialidad"
                    value={localData.tipoVialidad}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.tipoVialidad)}
                    className={`block w-full px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm ${
                      errors.tipoVialidad ? 'border-red-400' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Selecciona...</option>
                    {TIPOS_VIALIDAD.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {fieldError('tipoVialidad')}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nombre de la vialidad *</label>
                  <input
                    type="text"
                    name="nombreVialidad"
                    value={localData.nombreVialidad}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.nombreVialidad)}
                    className={inputClass('nombreVialidad')}
                    placeholder="Ej. Reforma"
                  />
                  {fieldError('nombreVialidad')}
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Núm. exterior *</label>
                  <input
                    type="text"
                    name="numeroExterior"
                    value={localData.numeroExterior}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.numeroExterior)}
                    className={inputClass('numeroExterior')}
                    placeholder="123"
                  />
                  {fieldError('numeroExterior')}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">C.P.</label>
                  <input
                    type="text"
                    name="codigoPostal"
                    maxLength={5}
                    value={localData.codigoPostal}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.codigoPostal)}
                    className={inputClass('codigoPostal')}
                    placeholder="25000"
                  />
                  {fieldError('codigoPostal')}
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Colonia</label>
                  <input
                    type="text"
                    name="colonia"
                    value={localData.colonia}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Ej. Centro"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Municipio *</label>
                <input
                  type="text"
                  name="municipio"
                  value={localData.municipio}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.municipio)}
                  className={inputClass('municipio')}
                  placeholder="Ej. Saltillo"
                />
                {fieldError('municipio')}
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
    </div>
  );
};

export default WorkerDataStep;