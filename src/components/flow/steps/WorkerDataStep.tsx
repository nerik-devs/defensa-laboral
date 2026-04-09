import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Phone, Mail, MapPin, Building, ChevronLeft, ChevronRight } from 'lucide-react';
import type { StepProps } from '../LaboralFlowModal';

const WorkerDataStep: React.FC<StepProps> = ({ onNext, onBack, data, updateData }) => {
  const [localData, setLocalData] = useState(data.worker);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateData('worker', localData);
    onNext();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Datos del Trabajador</h2>
        <p className="text-gray-500 mt-1">Por favor, ingresa tu información personal.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                required
                value={localData.name}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Ej. Juan Pérez García"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CURP</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="curp"
                required
                maxLength={18}
                value={localData.curp}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm uppercase"
                placeholder="18 caracteres"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={localData.phone}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="10 dígitos"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={localData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Domicilio</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="address"
                required
                value={localData.address}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Calle, Número, Colonia, Código Postal"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado donde laboraba</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="state"
                required
                value={localData.state}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Selecciona un estado</option>
                <option value="CDMX">Ciudad de México</option>
                <option value="Jalisco">Jalisco</option>
                <option value="Nuevo León">Nuevo León</option>
                <option value="Edomex">Estado de México</option>
                <option value="Otro">Otro Estado...</option>
              </select>
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

export default WorkerDataStep;
