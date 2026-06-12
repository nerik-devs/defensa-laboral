import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Server, CheckCircle, FileText, CalendarCheck, HelpCircle, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import type { StepProps } from '../LaboralFlowModal';

type SinacolStatus = 'idle' | 'loading' | 'success' | 'error';

const ResultStep: React.FC<StepProps> = ({ onClose, data }) => {
  const [isSending, setIsSending] = useState(true);
  const [internalId, setInternalId] = useState('');
  const [sinacolStatus, setSinacolStatus] = useState<SinacolStatus>('idle');
  const [caseNumber, setCaseNumber] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomId = `EXP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      setInternalId(randomId);
      setIsSending(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([
      `Formato Oficial de Solicitud de Audiencia - Centro Federal de Conciliación\n\n`,
      `Expediente: ${internalId}\n`,
      `Trabajador: ${data.worker.name} ${data.worker.primerApellido} ${data.worker.segundoApellido}\n`,
      `CURP: ${data.worker.curp}\n`,
      `Empleador: ${data.employer.companyName}\n`,
      `Tipo: ${data.employer.tipoPersonaCitado}\n`,
      `Problema: ${data.problem.problemType}\n`,
      `Fecha de conflicto: ${data.problem.fechaConflicto}\n`,
      `Descripción: ${data.problem.description}\n`,
    ], { type: 'text/plain' });

    element.href = URL.createObjectURL(file);
    element.download = `Solicitud_Conciliacion_${internalId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  function getServerUrl(): string {
    const { hostname, protocol } = window.location;
    // Detecta patrón de devtunnel: abc123-5173.use.devtunnels.ms
    const tunnelMatch = hostname.match(/^(.+?)-\d+\.(use\.devtunnels\.ms)$/);
    if (tunnelMatch) {
      return `https://${tunnelMatch[1]}-3001.${tunnelMatch[2]}`;
    }
    return 'http://localhost:3001';
  }

  const handlePrepareSinacol = async () => {
    setSinacolStatus('loading');
    setValidationError(null);
    try {
      const serverUrl = getServerUrl();
      console.log('[SINACOL] Conectando a:', serverUrl);
      const res = await fetch(`${serverUrl}/api/sinacol-fill`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => null);

      if (res.status === 422) {
        // El CRM rechazó los datos (CURP/RFC inválidos, campos faltantes)
        const details = body?.details as Record<string, string[]> | undefined;
        const fields = details ? Object.values(details).flat().join(' · ') : '';
        setValidationError(fields || body?.error || 'Los datos no pasaron la validación.');
        setSinacolStatus('error');
        return;
      }
      if (!res.ok || !body?.ok) throw new Error(body?.error || 'Respuesta no exitosa del servidor');

      if (body.caseNumber) {
        setCaseNumber(body.caseNumber);
        setInternalId(body.caseNumber);
      }
      setSinacolStatus('success');
    } catch (e) {
      console.error('[SINACOL] Error:', e);
      setSinacolStatus('error');
    }
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
              transition={{ duration: 2.8, ease: 'easeInOut' }}
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
          <p className="text-gray-500 mb-6 max-w-md">
            Los datos del cliente han sido registrados. Ahora puedes preparar la solicitud automáticamente en SINACOL.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 w-full max-w-sm mb-6">
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">ID de Expediente</p>
            <p className="text-3xl font-mono font-bold text-blue-800 tracking-tight">{internalId}</p>
          </div>

          {/* Botón SINACOL */}
          <div className="w-full max-w-sm mb-4">
            <button
              onClick={handlePrepareSinacol}
              disabled={sinacolStatus === 'loading' || sinacolStatus === 'success'}
              className={`w-full px-6 py-3 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-md ${
                sinacolStatus === 'success'
                  ? 'bg-green-600 text-white cursor-default'
                  : sinacolStatus === 'error'
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : sinacolStatus === 'loading'
                  ? 'bg-indigo-400 text-white cursor-not-allowed'
                  : 'bg-indigo-700 hover:bg-indigo-800 text-white shadow-indigo-200'
              }`}
            >
              {sinacolStatus === 'loading' && <Loader2 className="w-5 h-5 animate-spin" />}
              {sinacolStatus === 'success' && <CheckCircle className="w-5 h-5" />}
              {sinacolStatus === 'error' && <AlertCircle className="w-5 h-5" />}
              {sinacolStatus === 'idle' && <ExternalLink className="w-5 h-5" />}

              {sinacolStatus === 'idle' && 'Preparar Formulario SINACOL'}
              {sinacolStatus === 'loading' && 'Abriendo navegador...'}
              {sinacolStatus === 'success' && '¡Listo! Revisa el navegador'}
              {sinacolStatus === 'error' && 'Reintentar SINACOL'}
            </button>

            {sinacolStatus === 'error' && validationError && (
              <p className="mt-2 text-xs text-red-600 text-center">
                Hay datos que necesitan corrección: <strong>{validationError}</strong>. Regresa a los pasos anteriores para corregirlos.
              </p>
            )}
            {sinacolStatus === 'error' && !validationError && (
              <p className="mt-2 text-xs text-red-600 text-center">
                No se pudo conectar al servidor. Verifica: 1) que <code className="bg-red-50 px-1 rounded">iniciar-servidor-sinacol.bat</code> esté corriendo, y 2) que el puerto <strong>3001</strong> también esté expuesto en el túnel de VS Code.
              </p>
            )}
            {sinacolStatus === 'success' && caseNumber && (
              <p className="mt-2 text-xs text-green-700 text-center">
                Tu caso <strong>{caseNumber}</strong> quedó registrado y la solicitud SINACOL se está procesando automáticamente. Un abogado dará seguimiento.
              </p>
            )}
            {sinacolStatus === 'success' && !caseNumber && (
              <p className="mt-2 text-xs text-green-700 text-center">
                El formulario SINACOL está pre-llenado. Revisa cada paso en el navegador y haz clic en <strong>Enviar</strong> cuando estés listo.
              </p>
            )}
            {sinacolStatus === 'idle' && (
              <p className="mt-2 text-xs text-gray-400 text-center">
                Abre el navegador con el formulario SINACOL pre-llenado con los datos del cliente.
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
            <button
              onClick={handleDownload}
              className="flex-1 px-5 py-2.5 bg-white border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Descargar Resumen
            </button>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noreferrer"
              className="flex-1 px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200"
            >
              <CalendarCheck className="w-4 h-4" />
              Agendar Cita
            </a>
          </div>

          <p className="mt-6 text-sm text-gray-400 flex items-center gap-1">
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
            Cerrar y Volver al Inicio
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ResultStep;
