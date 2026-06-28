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
      <header className="fixed top-4 left-0 right-0 z-50 pointer-events-none flex justify-center px-4 sm:px-6">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          className={`pointer-events-auto flex items-center justify-between bg-[#080809]/40 backdrop-blur-2xl border border-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.7),_0_0_20px_rgba(212,175,55,0.05)] transition-all duration-500 rounded-full ${
            isScrolled
              ? 'w-full max-w-[480px] lg:max-w-5xl px-5 lg:px-6 py-2.5 lg:py-3.5 border-[#D4AF37]/20 lg:border-white/10'
              : 'w-full max-w-5xl px-6 py-4'
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <div className="relative flex items-center gap-2 group">
              <Logo size={isScrolled ? 36 : 40} className="transition-all duration-500 group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="text-[#FAFAF9] text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase leading-none" style={{ fontFamily: 'var(--font-heading)' }}>SK STUDIO</span>
                <span className={`text-[#A1A1AA] text-[9px] tracking-[0.1em] uppercase mt-0.5 ${isScrolled ? 'hidden lg:block' : 'block'}`}>
                  Kadeřnictví Brno
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 overflow-hidden transition-all duration-500">
            {!isOpen && navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-3.5 py-2 text-[11px] text-[#A1A1AA] hover:text-[#FAFAF9] transition-colors duration-300 uppercase tracking-[0.2em] font-medium group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-3.5 right-3.5 h-[1px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* CTA & Custom Hamburger */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Phone Button */}
            {!isOpen && (
              <div className="transition-all duration-300">
                {isScrolled ? (
                  <div className="flex items-center">
                    {/* Mobile/Tablet icon-only */}
                    <div className="lg:hidden">
                      <Magnet strength={0.15}>
                        <a
                          href="tel:+420770114540"
                          className="w-9 h-9 flex items-center justify-center border border-[#D4AF37]/25 hover:border-[#D4AF37] text-[#D4AF37] rounded-full bg-[#D4AF37]/5 transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                          aria-label="Zavolat"
                        >
                          <Phone size={13} />
                        </a>
                      </Magnet>
                    </div>
                    {/* Desktop full button */}
                    <div className="hidden lg:block">
                      <Magnet strength={0.15}>
                        <a
                          href="tel:+420770114540"
                          className="inline-flex items-center justify-center px-5 py-2.5 border border-white/10 hover:border-[#D4AF37] text-white rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all duration-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] bg-white/[0.02]"
                        >
                          <Phone size={11} className="mr-2 text-[#D4AF37]" />
                          +420 770 114 540
                        </a>
                      </Magnet>
                    </div>
                  </div>
                ) : (
                  <div className="hidden sm:block">
                    <Magnet strength={0.15}>
                      <a
                        href="tel:+420770114540"
                        className="inline-flex items-center justify-center px-5 py-2.5 border border-white/10 hover:border-[#D4AF37] text-white rounded-full text-[10px] font-semibold uppercase tracking-widest transition-all duration-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] bg-white/[0.02]"
                      >
                        <Phone size={11} className="mr-2 text-[#D4AF37]" />
                        +420 770 114 540
                      </a>
                    </Magnet>
                  </div>
                )}
              </div>
            )}

            {/* Custom Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-1.5 focus:outline-none text-[#FAFAF9] hover:text-[#D4AF37] transition-colors border border-white/5 hover:border-[#D4AF37]/35 rounded-full bg-white/[0.01]"
              aria-label="Menu"
            >
              <span className="block h-[1px] bg-current transition-all duration-300" style={{ width: '18px', transform: isOpen ? 'translateY(3.5px) rotate(45deg)' : '' }} />
              <span className="block h-[1px] bg-current transition-all duration-300" style={{ width: '18px', transform: isOpen ? 'translateY(-3.5px) rotate(-45deg)' : '' }} />
            </button>
          </div>
        </motion.div>
      </header>

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
