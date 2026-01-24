import { motion } from 'framer-motion';
import { Clock, AlertTriangle, TrendingDown, ShieldAlert } from 'lucide-react';

const reasons = [
  {
    icon: Clock,
    title: 'Plazos Legales',
    description: 'Tienes solo 2 meses para demandar despues de un despido. Cada dia cuenta.',
  },
  {
    icon: TrendingDown,
    title: 'Evidencia se Pierde',
    description: 'Testigos olvidan, documentos desaparecen. Mientras mas esperas, mas debil tu caso.',
  },
  {
    icon: ShieldAlert,
    title: 'Patron se Prepara',
    description: 'Mientras tu dudas, ellos construyen su defensa con abogados corporativos.',
  },
];

export default function Urgency() {
  return (
    <section className="py-20 gradient-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Alert Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-500/20 border border-accent-500/30 rounded-full mb-8"
          >
            <AlertTriangle className="w-5 h-5 text-accent-400 animate-pulse" />
            <span className="text-accent-300 font-medium">Urgente</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6"
          >
            <Clock className="inline-block w-10 h-10 text-accent-400 mr-3 -mt-2" />
            Cada Dia de Espera{' '}
            <span className="text-accent-400">Fortalece a tu Ex-Patron</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Mientras tu dudas, ellos preparan su defensa.
            <br />
            <span className="text-white font-semibold">No dejes que ganen por abandono.</span>
          </motion.p>

          {/* Reasons Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-left hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-accent-500/20 rounded-xl flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-accent-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{reason.title}</h3>
                <p className="text-gray-400 text-sm">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#contacto"
              className="group px-8 py-4 bg-accent-500 text-white font-bold text-lg rounded-full shadow-lg shadow-accent-500/30 hover:bg-accent-600 transition-colors flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Actua Ahora - Consulta Gratis</span>
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.a>
            <a
              href="tel:+525512345678"
              className="px-8 py-4 text-white/80 hover:text-white font-medium transition-colors"
            >
              o llama al 55-1234-5678
            </a>
          </motion.div>

          {/* Countdown Effect */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 text-gray-500 text-sm"
          >
            <span className="text-accent-400 font-semibold">Recuerda:</span>{' '}
            El plazo legal para demandar es de solo 60 dias despues del despido
          </motion.div>
        </div>
      </div>
    </section>
  );
}
