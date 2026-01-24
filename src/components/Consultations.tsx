import { motion } from 'framer-motion';
import { Check, Star, Sparkles, ArrowRight } from 'lucide-react';

const consultations = [
  {
    title: 'Consulta General',
    price: '$400',
    priceNote: 'MXN',
    description: '¿Necesitas orientación sobre tus derechos laborales? Ideal para cualquier situación que no sea despido.',
    featured: false,
    benefits: [
      'Diagnóstico profesional de tu caso',
      'Revisión de documentación laboral',
      'Identificación de violaciones a tus derechos',
      'Estrategia legal personalizada',
      'Presupuesto transparente si decides continuar',
    ],
    topics: [
      'Acoso laboral y hostigamiento',
      'Reducción de salario o prestaciones',
      'Cambios en condiciones de trabajo',
      'Incapacidades médicas y derechos',
      'Derechos de seguridad social',
      'Constitución de sindicatos',
      'Riesgos de trabajo',
      'Pensiones por invalidez, viudez, orfandad',
    ],
    cta: 'Agendar Consulta',
    ctaLink: '#contacto',
  },
  {
    title: 'Consulta por Despido',
    price: 'GRATIS',
    priceNote: 'Sin costo',
    description: '¿Te despidieron o quieren que renuncies? Evaluación completa de tu situación SIN COSTO.',
    featured: true,
    benefits: [
      'Diagnóstico experto de tu despido',
      'Cálculo exacto de tu indemnización legal',
      'Análisis de tu finiquito ofrecido',
      'Identificación de irregularidades patronales',
      'Plan de acción claro y concreto',
    ],
    topics: [],
    note: 'Creemos que todo trabajador merece saber si sus derechos fueron vulnerados, sin costo alguno. Si tu caso procede, trabajamos con honorarios basados en resultados.',
    cta: 'Obtener Consulta Gratis',
    ctaLink: '#contacto',
  },
];

export default function Consultations() {
  return (
    <section id="consultas" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-600 text-sm font-semibold rounded-full mb-4">
            Tipos de Consulta
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            ¿Desea consultar su caso laboral{' '}
            <span className="text-accent-500">con un abogado?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elige el tipo de consulta que mejor se adapte a tu situación.
            Tu primera defensa comienza con información.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {consultations.map((consultation, index) => (
            <motion.div
              key={consultation.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl overflow-hidden ${consultation.featured
                  ? 'bg-gradient-to-br from-primary-600 to-primary-800 text-white shadow-2xl shadow-primary-600/30 scale-[1.02]'
                  : 'bg-white border-2 border-gray-100 shadow-lg'
                }`}
            >
              {/* Featured Badge */}
              {consultation.featured && (
                <div className="absolute top-6 right-6">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span className="text-sm font-semibold text-white">Recomendado</span>
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                  <h3
                    className={`text-2xl font-bold mb-2 ${consultation.featured ? 'text-white' : 'text-gray-900'
                      }`}
                  >
                    {consultation.title}
                  </h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span
                      className={`text-5xl font-bold ${consultation.featured ? 'text-white' : 'text-primary-600'
                        }`}
                    >
                      {consultation.price}
                    </span>
                    <span
                      className={`text-sm ${consultation.featured ? 'text-white/70' : 'text-gray-500'
                        }`}
                    >
                      {consultation.priceNote}
                    </span>
                  </div>
                  <p
                    className={`${consultation.featured ? 'text-white/80' : 'text-gray-600'
                      }`}
                  >
                    {consultation.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h4
                    className={`text-sm font-semibold uppercase tracking-wider mb-4 ${consultation.featured ? 'text-white/70' : 'text-gray-500'
                      }`}
                  >
                    Esta consulta te ofrece:
                  </h4>
                  <ul className="space-y-3">
                    {consultation.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${consultation.featured
                              ? 'bg-white/20'
                              : 'bg-green-100'
                            }`}
                        >
                          <Check
                            className={`w-3 h-3 ${consultation.featured
                                ? 'text-white'
                                : 'text-green-600'
                              }`}
                          />
                        </div>
                        <span
                          className={`text-sm ${consultation.featured ? 'text-white/90' : 'text-gray-700'
                            }`}
                        >
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Topics (for General consultation) */}
                {consultation.topics.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-500">
                      Temas que atendemos:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {consultation.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Note (for Despido consultation) */}
                {consultation.note && (
                  <div className="mb-8 p-4 bg-white/10 rounded-xl">
                    <p className="text-sm text-white/80 italic">
                      "{consultation.note}"
                    </p>
                  </div>
                )}

                {/* CTA */}
                <motion.a
                  href={consultation.ctaLink}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-lg transition-all ${consultation.featured
                      ? 'bg-white text-primary-700 hover:bg-gray-100'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {consultation.featured && <Star className="w-5 h-5" />}
                  {consultation.cta}
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
