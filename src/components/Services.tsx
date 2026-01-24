import { motion } from 'framer-motion';
import {
  UserX,
  AlertTriangle,
  TrendingDown,
  HeartPulse,
  Shield,
  Users,
  HardHat,
  Wallet,
} from 'lucide-react';

const services = [
  {
    icon: UserX,
    title: 'Despido Injustificado',
    description: 'Defendemos tus derechos cuando te despiden sin causa justificada. Calculamos y exigimos tu indemnizacion completa.',
    color: 'from-red-500 to-rose-600',
  },
  {
    icon: AlertTriangle,
    title: 'Acoso Laboral',
    description: 'Te protegemos contra hostigamiento, mobbing y cualquier forma de violencia en tu lugar de trabajo.',
    color: 'from-orange-500 to-amber-600',
  },
  {
    icon: TrendingDown,
    title: 'Reduccion de Salario',
    description: 'Combatimos recortes ilegales a tu sueldo, prestaciones o condiciones laborales sin tu consentimiento.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: HeartPulse,
    title: 'Incapacidades Medicas',
    description: 'Aseguramos que recibas todos los beneficios durante enfermedades o accidentes relacionados al trabajo.',
    color: 'from-emerald-500 to-green-600',
  },
  {
    icon: Shield,
    title: 'Seguridad Social',
    description: 'Garantizamos tus derechos ante el IMSS e INFONAVIT. Recuperamos semanas cotizadas no registradas.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: Users,
    title: 'Constitucion de Sindicatos',
    description: 'Asesoramos en la formacion legal de sindicatos para defender los derechos colectivos de los trabajadores.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: HardHat,
    title: 'Riesgos de Trabajo',
    description: 'Reclamamos indemnizaciones por accidentes laborales y enfermedades profesionales.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: Wallet,
    title: 'Pensiones',
    description: 'Tramitamos pensiones por invalidez, viudez, orfandad y cesantia. Maximizamos tus beneficios.',
    color: 'from-pink-500 to-rose-600',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-gray-50">
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
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Defensa Legal{' '}
            <span className="text-primary-600">Especializada</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mas de 15 anos protegiendo los derechos de los trabajadores mexicanos.
            Cada caso es unico y merece atencion personalizada.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              whileHover={{ y: -5 }}
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} mb-5 shadow-lg`}
                >
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 group-hover:text-white/90 text-sm leading-relaxed transition-colors">
                  {service.description}
                </p>
              </div>

              {/* Arrow */}
              <motion.div
                className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
              >
                <span className="text-white text-2xl">→</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-6">
            ¿No encuentras tu situacion? Atendemos todos los casos laborales.
          </p>
          <motion.a
            href="#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Consultar Mi Caso
            <span>→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
