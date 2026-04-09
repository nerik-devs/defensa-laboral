import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, AlertCircle, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import type { StepProps } from '../LaboralFlowModal';

const EstimationStep: React.FC<StepProps> = ({ onNext, onBack, data }) => {
  const [isCalculating, setIsCalculating] = useState(true);
  const [estimate, setEstimate] = useState(0);

  useEffect(() => {
    // Simulate calculation time
    const timer = setTimeout(() => {
      // Mock calculation based on salary (very simplified for demo purposes)
      const salary = parseFloat(data.employer.salary) || 8000;
      // 3 months salary (90 days) + some proportional days
      const mockSettlement = (salary / 30) * 90 * 1.5; 
      setEstimate(mockSettlement);
      setIsCalculating(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [data.employer.salary]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full items-center justify-center text-center py-8"
    >
      {isCalculating ? (
        <div className="flex flex-col items-center justify-center space-y-6 flex-1 w-full">
          <div className="relative w-20 h-20">
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-blue-100"
            />
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Calculator className="w-8 h-8 text-blue-600 animate-pulse" />
            </motion.div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Calculando Estimación Preliminar</h3>
            <p className="text-gray-500">Analizando años de servicio, salario y tipo de problema...</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-1 w-full translate-y-[-20px]">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Estimación Preliminar</h3>
          <p className="text-gray-500 mb-8">Esta es una estimación de lo que te correspondería legalmente.</p>
          
          <div className="w-full max-w-sm bg-white border-2 border-green-100 rounded-2xl p-6 shadow-sm mb-8 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-green-500" />
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Total Estimado</p>
            <p className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(estimate)}
            </p>
            <p className="text-sm text-green-600 font-medium mt-3">Monto antes de impuestos y deducciones</p>
          </div>

          <div className="w-full max-w-md bg-amber-50 rounded-xl p-4 flex gap-3 text-sm text-amber-800 text-left">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
            <p><strong>Aviso importante:</strong> Este cálculo es referencial y no constituye un acuerdo legal vinculante. El monto final dependerá de la conciliación o dictamen oficial.</p>
          </div>
        </div>
      )}

      {/* Buttons anchored to bottom */}
      <div className="w-full mt-auto flex justify-between pt-4 border-t border-gray-100">
        <button
          onClick={onBack}
          disabled={isCalculating}
          className="px-6 py-2.5 text-gray-600 hover:bg-gray-100 font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Regresar
        </button>
        <button
          onClick={onNext}
          disabled={isCalculating}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          Revisar Información
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default EstimationStep;
