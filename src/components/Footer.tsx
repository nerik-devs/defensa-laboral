import { motion } from 'framer-motion';
import { Scale, Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const quickLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Consultas', href: '#consultas' },
  { name: 'Testimonios', href: '#testimonios' },
  { name: 'Contacto', href: '#contacto' },
];

const services = [
  'Despido Injustificado',
  'Acoso Laboral',
  'Seguridad Social',
  'Pensiones',
  'Riesgos de Trabajo',
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.a
              href="#inicio"
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-2 bg-primary-600 rounded-xl">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-xl font-display font-bold text-white">
                  Defensa Laboral
                </span>
                <span className="block text-xs font-semibold tracking-wider text-primary-400">
                  PRO
                </span>
              </div>
            </motion.a>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Mas de 15 anos defendiendo los derechos de los trabajadores mexicanos.
              Tu justicia laboral es nuestra mision.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Enlaces Rapidos</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Servicios</h3>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#servicios"
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+525512345678"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary-500" />
                  55-1234-5678
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@defensalaboralpro.mx"
                  className="flex items-center gap-3 text-gray-400 hover:text-primary-400 transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary-500" />
                  contacto@defensalaboralpro.mx
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Av. Reforma 123, Piso 8
                    <br />
                    Col. Juarez, Ciudad de Mexico
                    <br />
                    CP 06600
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} Defensa Laboral Pro. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Aviso de Privacidad
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors">
                Terminos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/525512345678"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <svg
          className="w-7 h-7 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </footer>
  );
}
