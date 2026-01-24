import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Scale } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Consultas', href: '#consultas' },
  { name: 'Testimonios', href: '#testimonios' },
  { name: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#inicio"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className={`p-2 rounded-xl ${scrolled ? 'bg-primary-600' : 'bg-white/20 backdrop-blur'}`}>
              <Scale className={`w-8 h-8 ${scrolled ? 'text-white' : 'text-white'}`} />
            </div>
            <div>
              <span className={`text-xl font-display font-bold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                Defensa Laboral
              </span>
              <span className={`block text-xs font-semibold tracking-wider ${scrolled ? 'text-primary-600' : 'text-primary-200'}`}>
                PRO
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-gray-600 hover:text-primary-600'
                    : 'text-white/90 hover:text-white'
                }`}
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="tel:+525512345678"
              className={`flex items-center gap-2 text-sm font-medium ${
                scrolled ? 'text-gray-600' : 'text-white/90'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-4 h-4" />
              55-1234-5678
            </motion.a>
            <motion.a
              href="#consultas"
              className="px-6 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-full hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Consulta Gratis
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-600 hover:text-primary-600 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="my-4" />
              <a
                href="tel:+525512345678"
                className="flex items-center gap-2 text-gray-600 font-medium"
              >
                <Phone className="w-4 h-4" />
                55-1234-5678
              </a>
              <a
                href="#consultas"
                className="block w-full text-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-full"
                onClick={() => setIsOpen(false)}
              >
                Consulta Gratis
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
