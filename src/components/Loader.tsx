'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { Scissors } from 'lucide-react';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show loader for 1.4 seconds, then trigger exit transition
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -30,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080809] overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.035) 0%, rgba(212, 175, 55, 0) 70%), #080809'
          }}
        >
          
          <div className="relative flex flex-col items-center justify-center">
            
            {/* Glowing Backdrop Ring with slowly rotating scissor emblem */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 0.15,
                rotate: 360,
                transition: { 
                  scale: { duration: 1.2, ease: "easeOut" },
                  opacity: { duration: 0.8, ease: "easeOut" },
                  rotate: { duration: 20, ease: "linear", repeat: Infinity }
                } 
              }}
              className="absolute w-44 h-44 rounded-full border border-dashed border-[#D4AF37]/45 flex items-center justify-center pointer-events-none"
            >
              {/* Scissors positioned at the outer ring */}
              <div className="absolute top-[-10px] text-[#D4AF37]">
                <Scissors size={18} className="rotate-[45deg]" />
              </div>
              <div className="absolute bottom-[-10px] text-[#D4AF37]">
                <Scissors size={18} className="rotate-[225deg]" />
              </div>
            </motion.div>

            {/* Inner radial golden glow behind logo */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ 
                scale: [0.8, 1.05, 0.95, 1], 
                opacity: 0.12,
                transition: { 
                  duration: 1.5,
                  ease: "easeInOut"
                } 
              }}
              className="absolute w-48 h-48 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0) 65%)'
              }}
            />

            {/* 3D Y-Axis Rotating Gold Logo */}
            <div style={{ perspective: 1000 }}>
              <motion.div
                initial={{ rotateY: 0, scale: 0.75, opacity: 0 }}
                animate={{ 
                  rotateY: 360, 
                  scale: 1, 
                  opacity: 1,
                  transition: { 
                    rotateY: { duration: 1.4, ease: [0.25, 1, 0.5, 1] },
                    scale: { duration: 0.8, ease: "easeOut" },
                    opacity: { duration: 0.5, ease: "easeOut" }
                  }
                }}
                className="relative z-10"
              >
                <Logo size={96} className="filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.15)]" />
              </motion.div>
            </div>

            {/* Loading text with prestigious layout */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.5, duration: 0.8, ease: "easeOut" }
              }}
              className="mt-8 flex flex-col items-center gap-1.5 z-10"
            >
              <h3 
                className="text-xs uppercase tracking-[0.4em] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FAFAF9] to-[#C5A880] font-sans"
                style={{ textShadow: '0 2px 10px rgba(212,175,55,0.05)' }}
              >
                SK KADEŘNICTVÍ
              </h3>
              
              {/* Premium Progress/Style bar */}
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent relative mt-1 overflow-hidden">
                <motion.div 
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                  className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                />
              </div>

              <span className="text-[8px] uppercase tracking-[0.2em] text-[#A1A1AA]/80 font-medium mt-1">
                Brno • Novobranská
              </span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
