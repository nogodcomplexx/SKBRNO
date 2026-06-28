'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const tabs = ['Pánské střihy', 'Dámské střihy', 'Dětské střihy'] as const;
type Tab = typeof tabs[number];

interface PriceItem {
  name: string;
  price: string;
  description?: string;
  note?: boolean;
}

const pricingData: Record<Tab, PriceItem[]> = {
  'Pánské střihy': [
    { name: 'Barber Střih & Mytí', price: '750 Kč', description: 'Kompletní moderní střih nůžkami i strojkem, precizní mytí vlasů, masáž hlavy, úprava obočí a závěrečný prémiový styling.' },
    { name: 'Komplet Střih & Vousy', price: '850 Kč', description: 'Prémiová péče: Střih vlasů s mytím, napaření obličeje horkým ručníkem (Hot Towel), holení a úprava vousů břitvou, ošetření olejem a kolínská.' },
    { name: 'Klasický střih nůžkami', price: '600 Kč', description: 'Tradiční střih výhradně nůžkami přizpůsobený tvaru hlavy a růstu vlasů, základní mytí a styling.' },
    { name: 'Úprava vousů', price: '350 Kč', description: 'Úprava kontur a zkrácení vousů strojkem i břitvou, napaření Hot Towel, ošetření prémiovým olejem a balzámem.' },
    { name: 'Střih na sucho', price: '500 Kč', description: 'Rychlý, efektivní střih strojkem a nůžkami bez mytí a masáže.' },
    { name: 'Střih jedním nástavcem', price: '200 Kč', description: 'Rychlé zkrácení na jednotnou délku po celé hlavě strojkem, očištění.' },
  ],
  'Dámské střihy': [
    { name: 'Komplet Dlouhé Vlasy', price: '1 200 Kč', description: 'Střih dlouhých vlasů, mytí regeneračním šamponem, hloubková vyživující maska, foukaná přes kulatý kartáč, žehlení/vlnění a styling.' },
    { name: 'Komplet Střední Vlasy', price: '850 Kč', description: 'Střih vlasů po ramena, mytí, výživný kondicionér, foukaná a finální styling.' },
    { name: 'Komplet Krátké Vlasy', price: '750 Kč', description: 'Střih krátkých vlasů, mytí, masáž hlavy, foukaná a styling.' },
    { name: 'Barvení & Péče (krátké / střední / dlouhé)', price: '1500 - 2500 Kč', description: 'Profesionální barvení šetrnými barvami, mytí, regenerace a foukaná. Přesná cena se stanoví po individuální domluvě dle spotřeby barvy.' },
    { name: 'Střih na sucho', price: '600 Kč', description: 'Zastřižení konečků nebo tvarování suchých vlasů bez mytí a foukané.' },
    { name: 'Úprava ofiny', price: '150 Kč', description: 'Rychlé a precizní vytvarování ofiny nůžkami.' },
    { name: 'Barvení - poznámka', price: '', description: 'Ceny barvení a složitějších technik (Balayage, Melír) jsou orientační. Vždy doporučujeme bezplatnou konzultaci předem.', note: true }
  ],
  'Dětské střihy': [
    { name: 'Dětský střih (od 6 let)', price: '500 Kč', description: 'Moderní střih pro starší děti přizpůsobený jejich přání, jemný styling.' },
    { name: 'Dětský střih (do 6 let)', price: '400 Kč', description: 'Citlivý a rychlý střih pro nejmenší v klidném a přátelském tempu.' },
  ],
};

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<Tab>('Pánské střihy');

  return (
    <section id="cenik" className="relative py-24 lg:py-36 bg-[#080809]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      <div className="mx-auto max-w-5xl px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <span className="h-[1px] w-6 bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-bold">SLUŽBY A CENY</span>
              <span className="h-[1px] w-6 bg-[#D4AF37]" />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAFAF9] tracking-tight leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
              Náš ceník{' '}
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] to-[#E6D5C3] font-normal">
                služeb
              </span>
            </h2>
          </FadeIn>
        </div>

        {/* Minimalist Lookbook Tab Selector */}
        <FadeIn delay={0.2}>
          <div className="flex justify-start sm:justify-center border-b border-white/5 mb-16 max-w-md mx-auto overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative py-4 px-4 sm:px-6 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-white/40 hover:text-white transition-colors duration-300 flex-1 text-center whitespace-nowrap"
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="activePricingTab"
                    className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[#D4AF37]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Dynamic Service Menu Grid */}
        <div className="relative min-h-[400px]">
          {/* Subtle decoration borders */}
          <div className="absolute inset-0 border border-white/[0.02] rounded-3xl pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 p-8 md:p-12"
            >
              {pricingData[activeTab].map((item, i) => {
                if (item.note) {
                  return (
                    <div key={`note-${i}`} className="col-span-1 md:col-span-2 pt-6 border-t border-white/5 text-center">
                      <p className="text-[#A1A1AA] text-xs italic leading-relaxed max-w-xl mx-auto">
                        * {item.description}
                      </p>
                    </div>
                  );
                }

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex flex-col group border-b border-white/[0.03] pb-6 last:border-b-0 md:last:border-b border-dashed"
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#FAFAF9] group-hover:text-[#D4AF37] transition-all duration-300">
                        {item.name}
                      </h3>
                      <span className="dotted-separator" />
                      <span className="text-sm font-semibold tracking-wider text-[#D4AF37] group-hover:scale-105 transition-transform duration-300">
                        {item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-[#A1A1AA] text-xs leading-relaxed max-w-md">
                        {item.description}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Walk-in notice footer */}
        <FadeIn delay={0.4}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full border border-white/5 bg-white/[0.01] max-w-lg mx-auto">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
              </span>
              <p className="text-xs text-[#A1A1AA] tracking-wide">
                Nemusíte se objednávat. Stačí přijít, průměrná doba čekání je pod 15 minut.
              </p>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
