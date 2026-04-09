import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Server, CheckCircle, FileText, CalendarCheck, HelpCircle } from 'lucide-react';
import type { StepProps } from '../LaboralFlowModal';

const ResultStep: React.FC<StepProps> = ({ onClose, data }) => {
  const [isSending, setIsSending] = useState(true);
  const [internalId, setInternalId] = useState('');

  useEffect(() => {
    // Simulate sending to Web Service
    const timer = setTimeout(() => {
      // Generate mock Internal ID
      const randomId = `EXP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setInternalId(randomId);
      setIsSending(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    // MOCK PDF DOWNLOAD: Create a blank Blob and download it
    // In a real app, this would be a blob URL from the server response
    const element = document.createElement("a");
    const file = new Blob([
      `Formato Oficial de Solicitud de Audiencia - Centro Federal de Conciliación\n\n`,
      `Expediente: ${internalId}\n`,
      `Trabajador: ${data.worker.name}\n`,
      `Empleador: ${data.employer.companyName}\n`,
      `Problema: ${data.problem.problemType}\n`
    ], { type: 'text/plain' });
    
    element.href = URL.createObjectURL(file);
    element.download = `Solicitud_Conciliacion_${internalId}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col h-full items-center justify-center text-center py-8"
    >
      {isSending ? (
        <div className="flex flex-col items-center justify-center space-y-6 flex-1 w-full">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <motion.svg
              className="absolute inset-0 w-full h-full text-blue-200"
              viewBox="0 0 100 100"
            >
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" />
            </motion.svg>
            <motion.svg
              className="absolute inset-0 w-full h-full text-blue-600"
              viewBox="0 0 100 100"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.8, ease: "easeInOut" }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="283"
                transform="rotate(-90 50 50)"
              />
            </motion.svg>
            <Server className="w-10 h-10 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Conectando con el Centro Federal...</h3>
            <p className="text-gray-500">Generando expediente y asegurando tus datos.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center flex-1 w-full">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Expediente Generado con Éxito!</h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Tu información ha sido registrada. Hemos enviado una copia al Centro Federal de Conciliación.
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 w-full max-w-sm mb-8">
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">ID de Expediente</p>
            <p className="text-3xl font-mono font-bold text-blue-800 tracking-tight">{internalId}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Descargar Solicitud
            </button>
            <a
              href="https://wa.me/1234567890" target="_blank" rel="noreferrer"
              className="px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200"
            >
              <CalendarCheck className="w-5 h-5" />
              Agendar con Abogado
            </a>
          </div>

          <p className="mt-8 text-sm text-gray-400 flex items-center gap-1">
            <HelpCircle className="w-4 h-4" />
            Un abogado de Defensa Laboral PRO se pondrá en contacto en las próximas 24h.
          </p>
        </div>
      )}

      {!isSending && (
        <div className="w-full mt-auto flex justify-center pt-8 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-8 py-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-medium rounded-lg transition-colors"
          >
            Cerrar Modal y Volver al Inicio
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ResultStep;
