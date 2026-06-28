'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Instagram } from 'lucide-react';
import Magnet from './animations/Magnet';
import Logo from './Logo';

const navLinks = [
  { href: '#o-nas', label: 'O nás' },
  { href: '#cenik', label: 'Ceník' },
  { href: '#galerie', label: 'Lookbook' },
  { href: '#recenze', label: 'Hodnocení' },
  { href: '#rezervace', label: 'Rezervace' },
  { href: '#kontakt', label: 'Kontakt' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  const navLinksVariants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const linkVariants = {
    closed: { y: 80, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1] as const,
      },
    },
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#080809]/80 backdrop-blur-xl border-b border-white/5 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 z-50">
            <div className="relative flex items-center gap-2 group">
              <Logo size={40} className="transition-all duration-500 group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="text-[#FAFAF9] text-xs font-bold tracking-[0.25em] uppercase leading-none" style={{ fontFamily: 'var(--font-heading)' }}>SK STUDIO</span>
                <span className="text-[#A1A1AA] text-[9px] tracking-[0.1em] uppercase mt-0.5">Kadeřnictví Brno</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className={`hidden lg:flex items-center gap-2 transition-all duration-500 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-xs text-[#A1A1AA] hover:text-[#FAFAF9] transition-colors duration-300 uppercase tracking-[0.2em] font-medium group"
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* CTA & Custom Hamburger */}
          <div className="flex items-center gap-6">
            <div className={`hidden md:block transition-all duration-500 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <Magnet strength={0.15}>
                <a
                  href="tel:+420770114540"
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/10 hover:border-[#D4AF37] text-white rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] bg-white/[0.02]"
                >
                  <Phone size={12} className="mr-2 text-[#D4AF37]" />
                  +420 770 114 540
                </a>
              </Magnet>
            </div>

            {/* Custom Premium Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 focus:outline-none text-[#FAFAF9] hover:text-[#D4AF37] transition-colors"
              aria-label="Menu"
            >
              <span className={`block h-[1px] w-6 bg-current transition-all duration-300 ${isOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`block h-[1px] w-6 bg-current transition-all duration-300 ${isOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Premium Curtain Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-[#080809]/60 backdrop-blur-md"
            />
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 right-0 z-40 w-full md:w-[480px] bg-[#0C0B0D] border-l border-white/5 shadow-2xl flex flex-col justify-between p-12 md:p-16 pt-32"
            >
              {/* Background elements */}
              <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#D4AF37]/2.5 blur-[100px] pointer-events-none" />

              <motion.div variants={navLinksVariants} className="flex flex-col gap-6 md:gap-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold border-b border-white/5 pb-2">Menu</span>
                {navLinks.map((link) => (
                  <div key={link.href} className="overflow-hidden">
                    <motion.a
                      variants={linkVariants}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-3xl md:text-4xl text-[#FAFAF9] hover:text-[#D4AF37] font-medium tracking-wide transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      <span className="inline-block text-xs font-serif italic text-[#C5A880] mr-4 opacity-50 font-normal">
                        {navLinks.indexOf(link) + 1 < 10 ? `0${navLinks.indexOf(link) + 1}` : navLinks.indexOf(link) + 1}
                      </span>
                      {link.label}
                    </motion.a>
                  </div>
                ))}
              </motion.div>

              {/* Menu footer info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col gap-6 border-t border-white/5 pt-8"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA]">Novobranská 16, Brno</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA]">Út–Pá: 9–19 | So: 10–18</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <a
                    href="tel:+420770114540"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#FAFAF9] hover:text-[#D4AF37] transition-colors uppercase tracking-widest"
                  >
                    <Phone size={14} className="text-[#D4AF37]" />
                    Zavolat
                  </a>
                  <a
                    href="https://www.instagram.com/sk_kadernictvi_brno"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-[#A1A1AA] hover:text-[#FAFAF9] transition-colors uppercase tracking-widest"
                  >
                    <Instagram size={14} className="text-[#D4AF37]" />
                    Instagram
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
