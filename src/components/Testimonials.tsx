import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Carlos Martinez',
    role: 'Gerente de Operaciones',
    company: 'Empresa de Manufactura',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'Despues de 12 anos en la empresa me despidieron sin justificacion. Defensa Laboral Pro logro que me pagaran el triple de lo que me ofrecieron inicialmente. Profesionales de primera.',
    rating: 5,
    result: '$450,000 MXN recuperados',
  },
  {
    name: 'Laura Sanchez',
    role: 'Ejecutiva de Ventas',
    company: 'Corporativo Comercial',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    content: 'Intente negociar sola con mi ex-patron, pero mi defensor laboral nunca se dejo presionar y ganamos el caso completo. Su experiencia marco toda la diferencia.',
    rating: 5,
    result: 'Indemnizacion completa + salarios caidos',
  },
  {
    name: 'Roberto Hernandez',
    role: 'Supervisor de Produccion',
    company: 'Industria Automotriz',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    content: 'Sufri un accidente de trabajo y la empresa no queria reconocerlo. Gracias a su equipo legal, obtuve mi pension por incapacidad permanente y todos mis derechos.',
    rating: 5,
    result: 'Pension vitalicia asegurada',
  },
  {
    name: 'Ana Garcia',
    role: 'Contadora',
    company: 'Despacho Contable',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'Me reducian el salario cada mes con pretextos. Defensa Laboral Pro documento todo y logro que me reintegraran los salarios no pagados de 2 anos.',
    rating: 5,
    result: '$180,000 MXN en salarios recuperados',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-gray-50">
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
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Historias de{' '}
            <span className="text-primary-600">Justicia Laboral</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada testimonio representa una victoria. Trabajadores como tu que
            decidieron defender sus derechos.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-shadow"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-24 h-24 text-primary-600" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 text-lg mb-6 relative z-10 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Result Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 text-sm font-semibold rounded-full mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                {testimonial.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary-100"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                  </p>
                  <p className="text-xs text-gray-400">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">98%</div>
              <div className="text-sm text-gray-500">Tasa de Exito</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">500+</div>
              <div className="text-sm text-gray-500">Casos Ganados</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">4.9/5</div>
              <div className="text-sm text-gray-500">Calificacion</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
