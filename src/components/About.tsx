'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import { ScissorsAndComb, StraightRazor, DropperBottle } from './CustomIcons';

interface LaurelProps {
  year: string;
  type: 'GOLD' | 'LAUREÁT';
}

const branchPaths = (
  <>
    <path d="M 47 82 C 34 81, 24 72, 23 58 C 22 45, 27 32, 36 21" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 45 77 C 40 76, 38 72, 38 72 C 38 72, 41 71, 46 73 C 48 74, 48 76, 45 77 Z" />
    <path d="M 39 69 C 33 67, 31 63, 31 63 C 31 63, 34 62, 39 64 C 41 65, 41 68, 39 69 Z" />
    <path d="M 33 60 C 27 57, 26 52, 26 52 C 26 52, 29 52, 33 55 C 35 56, 35 59, 33 60 Z" />
    <path d="M 29 49 C 23 45, 23 40, 23 40 C 23 40, 26 41, 30 44 C 32 45, 31 48, 29 49 Z" />
    <path d="M 27 38 C 22 33, 23 28, 23 28 C 23 28, 26 29, 29 33 C 31 34, 30 37, 27 38 Z" />
    <path d="M 28 27 C 24 21, 26 16, 26 16 C 26 16, 29 18, 31 22 C 32 24, 31 26, 28 27 Z" />
    <path d="M 32 17 C 29 11, 32 6, 32 6 C 32 6, 34 8, 35 12 C 36 14, 34 16, 32 17 Z" />
  </>
);

function LaurelWreath({ year, type }: LaurelProps) {
  const isGold = type === 'GOLD';
  const textColor = isGold ? 'text-[#D4AF37]' : 'text-[#C5A880]';
  
  return (
    <div className="flex flex-col items-center justify-center shrink-0">
      <svg 
        viewBox="0 0 100 100" 
        className={`w-20 h-20 sm:w-28 sm:h-28 ${textColor} transition-transform duration-500 hover:scale-110 filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.05)]`}
      >
        <g fill="currentColor">
          {branchPaths}
        </g>
        <g fill="currentColor" transform="translate(100, 0) scale(-1, 1)">
          {branchPaths}
        </g>
        <text 
          x="50" 
          y="46" 
          textAnchor="middle" 
          fill="currentColor"
          className="font-bold text-[12px]" 
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {year}
        </text>
        <text 
          x="50" 
          y="56" 
          textAnchor="middle" 
          fill="currentColor"
          className="font-semibold text-[6px] tracking-wider" 
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {type}
        </text>
      </svg>
    </div>
  );
}

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Create subtle parallax drifting effects for the overlapping photos
  const imgY1 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const imgY2 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const imgY3 = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section id="o-nas" ref={containerRef} className="relative py-24 lg:py-36 bg-[#080809] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Philosophy & Editorial Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <FadeIn>
              <span className="text-[#D4AF37] text-xs uppercase tracking-[0.3em] font-bold mb-4 block">O NÁŠEM ATELIÉRU</span>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAFAF9] mb-8 leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
                Věříme v detail,<br />
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] to-[#E6D5C3] font-normal">
                  který mluví za vás
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-lg font-serif italic text-[#C5A880] border-l-2 border-[#D4AF37]/30 pl-4 mb-8 leading-relaxed">
                "Kadeřnictví pro nás není jen práce. Je to vyjádření osobitého stylu, preciznosti a péče o klienta v prostředí, kde se budete cítit výjimečně."
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-[#A1A1AA] text-base leading-relaxed mb-8">
                Naše studio <strong>SK Kadeřnictví na Novobranské</strong> v Brně je navrženo tak, aby vám nabídlo oázu klidu a maximální péče. Chápeme, že váš čas je cenný, proto u nás funguje systém <strong>bez objednání</strong> — stačí přijít, posadit se a nechat pracovat profesionály s mnohaletými zkušenostmi.
              </p>
            </FadeIn>

             {/* Micro-Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/5">
              <FadeIn delay={0.4} className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <ScissorsAndComb size={16} className="shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Preciznost</span>
                </div>
                <span className="text-xs text-[#A1A1AA]">Každý střih ladíme k dokonalosti podle anatomie vaší hlavy.</span>
              </FadeIn>
              
              <FadeIn delay={0.5} className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <StraightRazor size={16} className="shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Vášeň</span>
                </div>
                <span className="text-xs text-[#A1A1AA]">Sledujeme světové trendy, abychom přinesli to nejlepší.</span>
              </FadeIn>

              <FadeIn delay={0.6} className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <DropperBottle size={16} className="shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">Kvalita</span>
                </div>
                <span className="text-xs text-[#A1A1AA]">Používáme špičkovou kosmetiku pro zdravé a lesklé vlasy.</span>
              </FadeIn>
            </div>

            {/* Awards Row */}
            <FadeIn delay={0.7} className="mt-8 pt-8 border-t border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={11} className="text-[#D4AF37] animate-pulse shrink-0" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#C5A880] to-[#D4AF37]">
                  Prestižní ocenění
                </span>
              </div>
              <p className="text-xs text-[#A1A1AA] leading-relaxed mb-5">
                SK Kadeřnictví na Novobranské je trojnásobným oceněným laureátem celostátního hodnocení spokojenosti zákazníků{' '}
                <a 
                  href="https://www.orlovekrasy.cz/profile-542594-sk-kadernictvi-na-novobranske" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#D4AF37] font-bold hover:text-white transition-colors duration-300 underline underline-offset-4 decoration-[#D4AF37]/50 hover:decoration-white"
                >
                  Orlové Krásy (Orly kadeřnictví)
                </a>{' '}
                s prestižním oceněním <strong className="font-bold text-[#D4AF37] text-gold-gradient-animated">Gold</strong> za roky 2024, 2025 a 2026.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-5 items-center justify-start">
                <LaurelWreath year="2026" type="LAUREÁT" />
                <LaurelWreath year="2026" type="GOLD" />
                <LaurelWreath year="2025" type="LAUREÁT" />
                <LaurelWreath year="2025" type="GOLD" />
                <LaurelWreath year="2024" type="LAUREÁT" />
                <LaurelWreath year="2024" type="GOLD" />
              </div>
            </FadeIn>
          </div>

          {/* Right: Floating Asymmetrical Parallax Collage */}
          <div className="lg:col-span-6 relative h-[480px] sm:h-[600px] lg:h-[650px] w-full flex items-center justify-center">
            
            {/* Background decorative square outline */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-white/[0.03] rounded-3xl pointer-events-none" />

            {/* Photo 1: Large Central Backdrop (Slightly Offset) */}
            <motion.div 
              style={{ y: imgY1 }}
              className="absolute left-[5%] top-[10%] w-[55%] aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 shadow-2xl z-10 bg-[#121113]"
            >
              <img 
                src="/gallery/DSC_9153.webp" 
                alt="Prostředí salonu SK Kadeřnictví" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            {/* Photo 2: Overlapping Foreground (Shifted Right/Bottom) */}
            <motion.div 
              style={{ y: imgY2 }}
              className="absolute right-[5%] bottom-[15%] w-[45%] aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-20 bg-[#161517]"
            >
              <img 
                src="/gallery/DSC_9021.webp" 
                alt="Barber práce na detailu" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            {/* Photo 3: Small Floating Accent Frame (Top Right) */}
            <motion.div 
              style={{ y: imgY3 }}
              className="absolute right-[12%] top-[8%] w-[28%] aspect-square rounded-xl overflow-hidden border border-[#D4AF37]/20 shadow-xl z-30 bg-[#1e1d20] hidden sm:block"
            >
              <img 
                src="/gallery/DSC_9186.webp" 
                alt="Detaily našeho vybavení" 
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute left-[8%] bottom-[8%] z-30 px-6 py-4 rounded-2xl bg-[#080809]/90 backdrop-blur-xl border border-[#D4AF37]/10 flex flex-col items-center justify-center shadow-2xl"
            >
              <span className="text-3xl font-bold text-[#D4AF37] leading-none" style={{ fontFamily: 'var(--font-heading)' }}>4.9 ★</span>
              <span className="text-[10px] text-[#FAFAF9] font-semibold mt-1.5">135+ recenzí</span>
              <span className="text-[8px] uppercase tracking-[0.15em] text-[#A1A1AA] mt-0.5">Google rating</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute right-[4%] bottom-[6%] z-30 px-5 py-3.5 rounded-2xl bg-[#080809]/90 backdrop-blur-xl border border-[#D4AF37]/10 flex flex-col items-center justify-center shadow-2xl"
            >
              <span className="text-2xl font-bold text-[#D4AF37] leading-none" style={{ fontFamily: 'var(--font-heading)' }}>500+</span>
              <span className="text-[9px] text-[#FAFAF9] font-bold mt-1.5 uppercase tracking-wider text-center leading-tight">Spokojených<br/>zákazníků</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
