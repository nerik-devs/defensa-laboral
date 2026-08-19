import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FileText, CalendarCheck, HelpCircle, Loader2, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import type { StepProps } from '../LaboralFlowModal';

type SinacolStatus = 'loading' | 'success' | 'error';

interface FieldError {
  /** CRM field path, e.g. worker.curp, employer.employerCalle, problem.problemType. */
  field: string;
  message: string;
  /** Flow step index that owns this field (1 = worker, 2 = employer, 3 = problem); 0 when unknown. */
  step: number;
}

const WHATSAPP_NUMBER = '528717795509';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const STEP_LABELS: Record<number, string> = {
  1: 'Datos del trabajador',
  2: 'Datos del empleador',
  3: 'Tipo de problema',
};

/**
 * Maps a CRM field path to the flow step that owns it.
 * worker.* -> WorkerDataStep (1), employer.* -> EmployerDataStep (2), problem.* -> ProblemTypeStep (3).
 */
function mapFieldToStep(field: string): number {
  if (field.startsWith('worker.')) return 1;
  if (field.startsWith('employer.')) return 2;
  if (field.startsWith('problem.')) return 3;
  return 0;
}

/**
 * Resolves the SINACOL server base URL.
 * In production the VITE_SINACOL_SERVER_URL build variable is mandatory;
 * the localhost fallback exists for development only.
 */
function getServerUrl(): string | null {
  const configured = import.meta.env.VITE_SINACOL_SERVER_URL;
  if (configured) return configured.replace(/\/$/, '');
  if (import.meta.env.DEV) return 'http://localhost:3001';
  return null;
}

const ResultStep: React.FC<StepProps> = ({ onClose, data, goToStep }) => {
  const [status, setStatus] = useState<SinacolStatus>('loading');
  const [caseNumber, setCaseNumber] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldError[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    void handlePrepareSinacol();
    // The request runs once when the step mounts; disabling is intentional.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePrepareSinacol = async () => {
    setStatus('loading');
    setFieldErrors([]);
    setErrorMessage(null);
    setConfigError(false);

    const serverUrl = getServerUrl();
    if (serverUrl === null) {
      setConfigError(true);
      setStatus('error');
      return;
    }

    if (import.meta.env.DEV) {
      console.log('[SINACOL] Conectando a:', serverUrl);
    }

    try {
      const res = await fetch(`${serverUrl}/api/sinacol-fill`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, website: data.website }),
      });
      const body = await res.json().catch(() => null);

      // 422 (CRM rejected the data) and 400 (validation errors) render the same way:
      // field-level errors that let the user go back to the step that owns each field.
      if (res.status === 422 || res.status === 400) {
        const details = body?.details as Record<string, string[]> | undefined;
        if (details && typeof details === 'object') {
          const errors: FieldError[] = [];
          for (const [path, messages] of Object.entries(details)) {
            const step = mapFieldToStep(path);
            const text = Array.isArray(messages) ? messages.join(' · ') : String(messages ?? '');
            errors.push({ field: path, message: text, step });
          }
          setFieldErrors(errors);
        } else {
          setErrorMessage(body?.error || 'Los datos no pasaron la validación.');
        }
        setStatus('error');
        return;
      }

      if (res.status === 403) {
        // Origin not allowed — generic, no internals leaked.
        setErrorMessage('No se pudo procesar tu solicitud en este momento. Intenta más tarde o contáctanos por WhatsApp.');
        setStatus('error');
        return;
      }

      if (res.status === 429) {
        setErrorMessage(
          body?.error === 'rate_limited'
            ? 'Demasiados intentos, espera unos minutos.'
            : 'Hay demasiadas solicitudes en este momento. Intenta más tarde.',
        );
        setStatus('error');
        return;
      }

      if (!res.ok || !body?.ok) throw new Error(body?.error || 'Respuesta no exitosa del servidor');

      setCaseNumber(body.caseNumber ?? null);
      setStatus('success');
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error('[SINACOL] Error:', e);
      }
      setErrorMessage('No pudimos conectar con el servicio. Intenta de nuevo en unos minutos o escríbenos por WhatsApp para ayudarte.');
      setStatus('error');
    }
  };

  const handleDownload = () => {
    if (!caseNumber) return;
    const element = document.createElement('a');
    const file = new Blob([
      `Formato Oficial de Solicitud de Audiencia - Centro Federal de Conciliación\n\n`,
      `Expediente: ${caseNumber}\n`,
      `Trabajador: ${data.worker.name} ${data.worker.primerApellido} ${data.worker.segundoApellido}\n`,
      `CURP: ${data.worker.curp}\n`,
      `Empleador: ${data.employer.companyName}\n`,
      `Tipo: ${data.employer.tipoPersonaCitado}\n`,
      `Problema: ${data.problem.problemType}\n`,
      `Fecha de conflicto: ${data.problem.fechaConflicto}\n`,
      `Descripción: ${data.problem.description}\n`,
    ], { type: 'text/plain' });

    element.href = URL.createObjectURL(file);
    element.download = `Solicitud_Conciliacion_${caseNumber}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col h-full items-center justify-center text-center py-8"
    >
      {status === 'loading' && (
        <div className="flex flex-col items-center justify-center space-y-6 flex-1 w-full">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Enviando tu solicitud...</h3>
            <p className="text-gray-500">Estamos registrando tus datos de forma segura.</p>
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="flex flex-col items-center flex-1 w-full">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud Registrada!</h2>
          <p className="text-gray-500 mb-6 max-w-md">
            Los datos del cliente han sido registrados. Un abogado de Defensa Laboral PRO dará seguimiento.
          </p>

          {caseNumber && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 w-full max-w-sm mb-6">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Número de Expediente</p>
              <p className="text-3xl font-mono font-bold text-blue-800 tracking-tight">{caseNumber}</p>
            </div>
          )}

          {caseNumber && (
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm justify-center">
              <button
                onClick={handleDownload}
                className="flex-1 px-5 py-2.5 bg-white border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Descargar Formato Oficial
              </button>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex-1 px-5 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200"
              >
                <CalendarCheck className="w-4 h-4" />
                Agendar Cita
              </a>
            </div>
          )}

          {!caseNumber && (
            <p className="mt-2 text-xs text-gray-500 text-center max-w-sm">
              Tu solicitud quedó registrada. Un abogado se pondrá en contacto contigo en las próximas 24 horas.
            </p>
          )}

          <p className="mt-6 text-sm text-gray-400 flex items-center gap-1">
            <HelpCircle className="w-4 h-4" />
            Un abogado de Defensa Laboral PRO se pondrá en contacto en las próximas 24h.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="flex flex-col items-center flex-1 w-full">
          <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No pudimos enviar tu solicitud</h2>

          {configError && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 w-full max-w-md mb-6">
              <p className="text-sm text-gray-700">
                El servicio de registro no está configurado en este sitio. Por favor contacta a soporte para reportarlo.
              </p>
            </div>
          )}

          {!configError && fieldErrors.length > 0 && (
            <div className="w-full max-w-md mb-6 text-left">
              <p className="text-sm text-red-700 mb-3">
                Hay datos que necesitan corrección. Regresa al paso correspondiente para ajustarlos:
              </p>
              <ul className="space-y-2">
                {fieldErrors.map((err) => (
                  <li
                    key={err.field}
                    className="bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-xs text-red-700"
                  >
                    <span className="uppercase text-[10px] text-red-500 block">{err.field}</span>
                    {err.message}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {Array.from(new Set(fieldErrors.map((err) => err.step)))
                  .filter((step) => step > 0)
                  .map((step) => (
                    <button
                      key={step}
                      type="button"
                      onClick={() => goToStep(step)}
                      className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Ir a {STEP_LABELS[step]}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {!configError && fieldErrors.length === 0 && errorMessage && (
            <div className="w-full max-w-md mb-6">
              <p className="text-sm text-red-700">{errorMessage}</p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-xl transition-colors shadow-lg shadow-green-200"
              >
                <CalendarCheck className="w-4 h-4" />
                Escríbenos por WhatsApp
              </a>
              <button
                type="button"
                onClick={handlePrepareSinacol}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Reintentar
              </button>
            </div>
          )}
        </div>
      )}

      <div className="w-full mt-auto flex justify-center pt-8 border-t border-gray-100">
        <button
          onClick={onClose}
          className="px-8 py-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-medium rounded-lg transition-colors"
        >
          Cerrar y Volver al Inicio
        </button>
      </div>
    </motion.div>
  );
};

export default ResultStep;