import { motion } from 'framer-motion';
import { Heart, Eye, Sword, HandshakeIcon, Scale } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Lealtad Inquebrantable',
    description: 'a tus intereses',
  },
  {
    icon: Eye,
    title: 'Veracidad Absoluta',
    description: 'en cada actualización',
  },
  {
    icon: Sword,
    title: 'Coraje Legal',
    description: 'para enfrentar cualquier empresa',
  },
  {
    icon: HandshakeIcon,
    title: 'Respeto Total',
    description: 'a tu tiempo y situación',
  },
  {
    icon: Scale,
    title: 'Justicia Real',
    description: 'sin compromisos',
  },
];

export default function Oath() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z' fill='%23c12872' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-accent-100 text-accent-600 text-sm font-semibold rounded-full mb-4">
              Nuestro Compromiso
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-accent-500 mb-8">
              Juramento al Trabajador
            </h2>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <div className="flex flex-col items-center p-6 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-colors">
                  <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:scale-110 transition-all">
                    <value.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{value.title}</h3>
                  <p className="text-sm text-gray-500">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-8xl text-primary-200 font-serif">
              "
            </div>
            <blockquote className="text-2xl sm:text-3xl font-display text-gray-800 italic pt-8">
              No somos abogados cualquiera.
              <br />
              <span className="text-primary-600 font-semibold">
                Somos defensores laborales.
              </span>
            </blockquote>
          </motion.div>

          {/* Signature Line */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 flex items-center justify-center gap-4"
          >
            <div className="w-16 h-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <Scale className="w-6 h-6 text-primary-600" />
              <span className="text-gray-600 font-medium">
                Bredren Abogados
              </span>
            </div>
            <div className="w-16 h-px bg-gray-300" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
