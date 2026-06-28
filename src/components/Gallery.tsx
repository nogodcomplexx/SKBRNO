'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Instagram, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const INITIAL_LIMIT = 7;

const galleryImages = [
  { src: '/gallery/DSC_9153.webp', alt: 'Designové prostředí ateliéru', category: 'atelier', size: 'large' },
  { src: '/gallery/DSC_9021.webp', alt: 'Precizní úprava a detailní barber řemeslo', category: 'barber', size: 'tall' },
  { src: '/gallery/DSC_9186.webp', alt: 'Plně vybavený pracovní kout stylistů', category: 'atelier', size: 'small' },
  { src: '/gallery/DSC_9042.webp', alt: 'Dámský střih a profesionální barvení', category: 'color', size: 'wide' },
  { src: '/gallery/DSC_9254.webp', alt: 'Moderní pánský střih a styling', category: 'barber', size: 'small' },
  { src: '/gallery/DSC_9204.webp', alt: 'Mytí vlasů s regenerační masáží hlavy', category: 'barber', size: 'small' },
  { src: '/gallery/DSC_9297.webp', alt: 'Tradiční holení břitvou s Hot Towel rituálem', category: 'barber', size: 'small' },
  { src: '/gallery/DSC_9157.webp', alt: 'Designové detaily a prémiová kosmetika', category: 'atelier', size: 'wide' },
  { src: '/gallery/DSC_9407.webp', alt: 'Klientská zóna s kávovým barem', category: 'atelier', size: 'large' },
  { src: '/gallery/DSC_9107.webp', alt: 'Prémiová křesla v ateliérovém prostoru', category: 'atelier', size: 'tall' },
  { src: '/gallery/DSC_9344.webp', alt: 'Práce na dámském účesu expertkami', category: 'color', size: 'tall' },
  { src: '/gallery/DSC_9417.webp', alt: 'Finální úprava pánského střihu', category: 'barber', size: 'small' },
  { src: '/gallery/DSC_9149.webp', alt: 'Dámský střih a foukaná', category: 'color', size: 'small' },
  { src: '/gallery/DSC_9236.webp', alt: 'Šetrné barvení a melírování vlasů', category: 'color', size: 'wide' },
  { src: '/gallery/DSC_9321.webp', alt: 'Elegantní styling a společenský účes', category: 'color', size: 'small' },
  { src: '/gallery/DSC_9409.webp', alt: 'Zdravé, vyživené vlasy s leskem', category: 'color', size: 'tall' },
  { src: '/gallery/DSC_9404.webp', alt: 'Moderní fade a úprava vousů', category: 'barber', size: 'small' },
  { src: '/gallery/DSC_9136.webp', alt: 'Kompletní péče o vlasy a vousy', category: 'barber', size: 'wide' },
  { src: '/gallery/DSC_9093.webp', alt: 'Minimalistický design a čisté linie studia', category: 'atelier', size: 'small' },
];

const categoryLabels: Record<string, string> = {
  atelier: 'Ateliér',
  barber: 'Vlasy & Styling',
  color: 'Vlasy & Styling',
};

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'hair' | 'atelier'>('all');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return galleryImages;
    if (activeCategory === 'hair') return galleryImages.filter(img => img.category === 'barber' || img.category === 'color');
    if (activeCategory === 'atelier') return galleryImages.filter(img => img.category === 'atelier');
    return galleryImages;
  }, [activeCategory]);

  const visibleImages = useMemo(() => {
    return isExpanded ? filteredImages : filteredImages.slice(0, INITIAL_LIMIT);
  }, [isExpanded, filteredImages]);

  const openLightbox = (imgSrc: string) => {
    const idx = filteredImages.findIndex(img => img.src === imgSrc);
    if (idx !== -1) setSelectedIndex(idx);
  };
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredImages.length);
  };

  const goPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="galerie" className="relative py-24 lg:py-36 bg-[#080809] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      {/* Decorative background lights */}
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#D4AF37]/1 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#C5A880]/1 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <FadeIn>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-[1px] w-6 bg-[#D4AF37]" />
                <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-bold">VIZUÁLNÍ LOOKBOOK</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAFAF9] tracking-tight leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                Inspirujte se{' '}
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] to-[#E6D5C3] font-normal">
                  naším stylem
                </span>
              </h2>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <p className="text-xs text-[#A1A1AA] uppercase tracking-[0.2em] max-w-xs leading-relaxed md:text-right">
              Profesionální střih, špičkový styling a designové studio Novobranská.
            </p>
          </FadeIn>
        </div>

        {/* Category Filters */}
        <FadeIn delay={0.2}>
          <div className="flex justify-start md:justify-center gap-3 mb-10 overflow-x-auto scrollbar-hide">
            {(['all', 'hair', 'atelier'] as const).map((category) => {
              const label = category === 'all' ? 'Všechny' : category === 'hair' ? 'Vlasy & Styling' : 'Ateliér';
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setIsExpanded(false); // Reset expansion on category change
                  }}
                  className={`px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#D4AF37] border-[#D4AF37] text-[#080809] font-bold'
                      : 'bg-[#080809] border-white/5 text-[#A1A1AA] hover:text-white hover:border-white/10'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Lookbook Asymmetric Grid Container */}
        <div className="relative">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] sm:auto-rows-[300px] grid-flow-row-dense"
          >
            <AnimatePresence mode="popLayout">
              {visibleImages.map((img, i) => {
                // Grid size determining based on aspect ratios
                let gridClasses = 'col-span-1 row-span-1';
                if (img.size === 'large') {
                  gridClasses = 'col-span-1 sm:col-span-2 row-span-2';
                } else if (img.size === 'tall') {
                  gridClasses = 'col-span-1 row-span-2';
                } else if (img.size === 'wide') {
                  gridClasses = 'col-span-1 sm:col-span-2 row-span-1';
                }

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    key={img.src}
                    className={gridClasses}
                  >
                    <div
                      onClick={() => openLightbox(img.src)}
                      className="relative w-full h-full rounded-2xl overflow-hidden cursor-pointer border border-white/5 group bg-[#121113] hover:border-[#D4AF37]/30 transition-all duration-500 shadow-lg hover:shadow-[0_20px_50px_rgba(212,175,55,0.06)]"
                    >
                      {/* Image */}
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                      />

                      {/* Gradient Vignette overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-[#080809]/20 to-transparent opacity-40 group-hover:opacity-90 transition-all duration-500" />

                      {/* Subtle warm gold shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/0 via-[#D4AF37]/2.5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

                      {/* Hover labels and action icons */}
                      <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
                        {/* Top label - category badge */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-[-10px] group-hover:translate-y-0">
                          <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-[#080809]/80 backdrop-blur-md border border-[#D4AF37]/20 text-[#D4AF37]">
                            {categoryLabels[img.category]}
                          </span>
                        </div>

                        {/* Bottom details */}
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-3 group-hover:translate-y-0 flex items-end justify-between gap-4">
                          <div className="text-left">
                            <span className="text-[9px] text-[#C5A880] uppercase tracking-[0.25em] font-bold block">SK LOOKBOOK</span>
                          </div>

                          <div className="p-2.5 rounded-full bg-[#D4AF37] text-[#080809] shadow-lg shadow-[#D4AF37]/20 scale-90 group-hover:scale-100 transition-all duration-300">
                            <Maximize2 size={12} strokeWidth={2.5} />
                          </div>
                        </div>
                      </div>

                      {/* Subtle Overlay to match obsidian theme */}
                      <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Fade-out Overlay at the bottom when not expanded */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#080809] via-[#080809]/95 to-transparent z-20 pointer-events-none" />
          )}
        </div>

        {/* Toggle Expand Button */}
        <FadeIn delay={0.2}>
          <div className="relative flex justify-center z-30 mt-12">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center justify-center px-8 py-4 border border-[#D4AF37]/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-[#080809] hover:bg-[#D4AF37]/5 transition-all duration-500 shadow-md group"
            >
              {isExpanded ? 'Zobrazit méně' : 'Zobrazit celou galerii'}
              <span className="ml-2 group-hover:translate-y-[2px] transition-transform">
                {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </span>
            </button>
          </div>
        </FadeIn>

        {/* Instagram Call to Action */}
        <FadeIn delay={0.4}>
          <div className="text-center mt-20">
            <a
              href="https://www.instagram.com/sk_kadernictvi_brno"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 border border-[#D4AF37]/20 hover:border-[#D4AF37] text-white hover:text-[#D4AF37] rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#D4AF37]/5 transition-all duration-500 shadow-md group"
            >
              <Instagram size={14} className="mr-2 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              Sledujte nás na Instagramu
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Lightbox / Fullscreen Viewer */}
      <AnimatePresence>
        {selectedIndex !== null && filteredImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#080809]/98 backdrop-blur-xl flex flex-col justify-between p-4 md:p-6"
            onClick={closeLightbox}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between w-full z-10 max-w-7xl mx-auto">
              <span className="text-[10px] tracking-[0.3em] text-[#C5A880] uppercase font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                <span className="font-serif italic text-white text-base mr-1">0{selectedIndex + 1}</span> / 0{filteredImages.length}
                <span className="text-[#A1A1AA] ml-3 hidden sm:inline">• {categoryLabels[filteredImages[selectedIndex].category]}</span>
              </span>
              <button
                onClick={closeLightbox}
                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-white transition-all duration-300 hover:scale-105"
                aria-label="Zavřít"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Image Slider Area */}
            <div className="relative flex items-center justify-center flex-1 my-4 w-full max-w-7xl mx-auto">
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-2 md:left-4 p-4 rounded-full bg-black/40 hover:bg-white/10 border border-white/5 text-white z-10 transition-all duration-300 hover:scale-105"
                aria-label="Předchozí"
              >
                <ChevronLeft size={20} />
              </button>

              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-h-[60vh] md:max-h-[65vh] aspect-[4/5] sm:aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black/40 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={filteredImages[selectedIndex].src}
                  alt={filteredImages[selectedIndex].alt}
                  className="max-w-full max-h-full object-contain"
                />
              </motion.div>

              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-2 md:right-4 p-4 rounded-full bg-black/40 hover:bg-white/10 border border-white/5 text-white z-10 transition-all duration-300 hover:scale-105"
                aria-label="Další"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Bottom Section with Caption & Navigation Film-strip */}
            <div className="w-full z-10 pb-2 flex flex-col items-center gap-4 max-w-7xl mx-auto">
              <div className="text-center max-w-xl">
                <p className="text-sm font-semibold tracking-wide text-white uppercase mb-1 font-heading">
                  SK LOOKBOOK
                </p>
                <p className="text-[9px] text-[#C5A880] uppercase tracking-[0.2em] font-bold">
                  SK Kadeřnictví Brno • {categoryLabels[filteredImages[selectedIndex].category]}
                </p>
              </div>

              {/* Film-strip strip */}
              <div 
                className="flex items-center gap-2.5 overflow-x-auto max-w-full py-2 px-6 justify-start md:justify-center custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
                {filteredImages.map((img, idx) => (
                  <button
                    key={img.src}
                    onClick={() => setSelectedIndex(idx)}
                    className={`w-12 h-16 md:w-14 md:h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all duration-300 ${
                      selectedIndex === idx
                        ? 'border-[#D4AF37] scale-105 opacity-100 shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                        : 'border-white/5 opacity-30 hover:opacity-70'
                    }`}
                  >
                    <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
