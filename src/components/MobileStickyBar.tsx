'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Navigation } from 'lucide-react';

export default function MobileStickyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Show when scrolled past hero (>500px) and scrolling down or stationary
          if (currentScrollY > 500) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
        >
          <div className="bg-[#0C0B0D]/95 backdrop-blur-xl border-t border-white/5 px-4 py-3 flex items-center gap-3">
            <a
              href="tel:+420770114540"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[#D4AF37] text-[#080809] rounded-full text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#FAFAF9] transition-all duration-300 shadow-lg shadow-[#D4AF37]/20"
            >
              <Phone size={14} />
              Zavolat
            </a>
            <a
              href="https://www.google.com/maps/dir//SK+Kade%C5%99nictv%C3%AD+na+Novobransk%C3%A9+bez+objedn%C3%A1n%C3%AD,+Novobransk%C3%A1+16,+602+00+Brno-st%C5%99ed"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-white/10 text-white rounded-full text-xs font-bold uppercase tracking-[0.15em] hover:border-[#D4AF37]/30 hover:text-[#D4AF37] transition-all duration-300"
            >
              <Navigation size={14} />
              Navigovat
            </a>
          </div>
          {/* Safe area spacer for phones with gesture bar */}
          <div className="bg-[#0C0B0D]/95 h-[env(safe-area-inset-bottom)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
