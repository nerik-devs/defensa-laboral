import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefono',
    content: '55-1234-5678',
    link: 'tel:+525512345678',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    content: '55-1234-5678',
    link: 'https://wa.me/525512345678',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'contacto@defensalaboralpro.mx',
    link: 'mailto:contacto@defensalaboralpro.mx',
  },
  {
    icon: MapPin,
    title: 'Oficina',
    content: 'Ciudad de Mexico, CDMX',
    link: '#',
  },
];

const caseTypes = [
  'Despido Injustificado',
  'Acoso Laboral',
  'Reduccion de Salario',
  'Incapacidad Medica',
  'Pension',
  'Otro',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    caseType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contacto" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Tu Primera Consulta es{' '}
            <span className="text-primary-600">Gratuita</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cuentanos tu situacion y un abogado especialista te contactara en
            menos de 24 horas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informacion de Contacto
              </h3>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item) => (
                  <a
                    key={item.title}
                    href={item.link}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                      <item.icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{item.title}</div>
                      <div className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                        {item.content}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Hours */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-primary-600" />
                  <h4 className="font-semibold text-gray-900">
                    Horario de Atencion
                  </h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lunes - Viernes</span>
                    <span className="font-medium text-gray-900">9:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sabado</span>
                    <span className="font-medium text-gray-900">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Urgencias 24/7</span>
                    <span className="font-medium text-primary-600">Disponible</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    ¡Mensaje Enviado!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Un abogado especialista te contactara en menos de 24 horas.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-primary-600 font-semibold hover:text-primary-700"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Telefono *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                        placeholder="55-1234-5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Correo Electronico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="caseType"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Tipo de Caso *
                    </label>
                    <select
                      id="caseType"
                      name="caseType"
                      required
                      value={formData.caseType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none bg-white"
                    >
                      <option value="">Selecciona una opcion</option>
                      {caseTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Describe tu Situacion *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none resize-none"
                      placeholder="Cuentanos brevemente que sucedio..."
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="mt-1 w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                    />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      Acepto la politica de privacidad y autorizo el uso de mis datos
                      para recibir atencion legal.
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary-600 text-white font-bold text-lg rounded-xl hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors shadow-lg shadow-primary-600/30"
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Solicitar Consulta Gratuita
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
