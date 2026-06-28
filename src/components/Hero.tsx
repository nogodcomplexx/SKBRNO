'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Star, Clock, MapPin, Sparkles, Scissors, Moon } from 'lucide-react';
import SplitText from './animations/SplitText';
import BlurText from './animations/BlurText';
import FadeIn from './animations/FadeIn';
import dynamic from 'next/dynamic';

const BarberPole3D = dynamic(() => import('./BarberPole3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="w-3.5 h-3.5 border border-[#D4AF37]/50 border-t-transparent rounded-full animate-spin" />
    </div>
  )
});

export default function Hero() {
  const [currentTime, setCurrentTime] = useState('');
  const [salonStatus, setSalonStatus] = useState({ isOpen: false, text: 'Zavřeno' });
  const [occupancy, setOccupancy] = useState<{ text: string; waitTime: string; percentage: number } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      
      const pragueDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Prague" }));
      const hour = pragueDate.getHours();
      
      if (!salonStatus.isOpen) {
        setOccupancy({ text: 'Zavřeno', waitTime: 'Zavřeno', percentage: 0 });
        return;
      }
      
      const isPeak = (hour >= 11 && hour <= 13) || (hour >= 16 && hour <= 19);
      if (isPeak) {
        setOccupancy({ text: 'Vysoká obsazenost', waitTime: '20–30 min', percentage: 85 });
      } else if (hour >= 9 && hour < 11) {
        setOccupancy({ text: 'Nízká obsazenost', waitTime: '5–10 min', percentage: 20 });
      } else {
        setOccupancy({ text: 'Střední obsazenost', waitTime: '10–20 min', percentage: 50 });
      }
    }, 1500);
  };

  useEffect(() => {
    const updateTimeAndStatus = () => {
      const pragueDate = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Prague" }));
      
      const hours = pragueDate.getHours().toString().padStart(2, '0');
      const minutes = pragueDate.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);

      const day = pragueDate.getDay();
      const hour = pragueDate.getHours();
      const min = pragueDate.getMinutes();
      const timeDecimal = hour + min / 60;

      let isOpen = false;
      let statusText = 'Zavřeno';

      if (day >= 2 && day <= 5) {
        if (timeDecimal >= 9 && timeDecimal < 19) {
          isOpen = true;
          statusText = 'Otevřeno';
        }
      } else if (day === 6) {
        if (timeDecimal >= 10 && timeDecimal < 18) {
          isOpen = true;
          statusText = 'Otevřeno';
        }
      }

      setSalonStatus({ isOpen, text: statusText });
    };

    updateTimeAndStatus();
    const interval = setInterval(updateTimeAndStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#080809] pt-24 pb-12 lg:pb-8">
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-70"
          style={{
            background: `
              radial-gradient(circle at 85% 15%, rgba(212, 175, 55, 0.05) 0%, rgba(212, 175, 55, 0) 60%),
              radial-gradient(circle at 15% 85%, rgba(197, 168, 128, 0.04) 0%, rgba(197, 168, 128, 0) 60%)
            `
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto z-10">
        {/* Left Side: Editorial Typography & Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left">
          {/* Studio Tagline */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-bold flex items-center gap-1.5">
                <Sparkles size={12} className="text-[#D4AF37]" />
                Brno-střed • Novobranská 16
              </span>
            </div>
          </FadeIn>

          {/* Heading with Serif / Italic styling */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#FAFAF9] leading-[1.05] tracking-tight mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
            Střih, který vyjádří
            <br />
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] to-[#E6D5C3] font-normal pr-4">
              vaši osobnost
            </span>
          </h1>

          {/* Descriptive Copy */}
          <div className="max-w-xl mb-10">
            <p className="text-base sm:text-lg text-[#A1A1AA] leading-relaxed">
              Prémiové kadeřnictví v srdci Brna kombinující tradiční řemeslo s moderními trendy. Specializujeme se na precizní pánské střihy, špičkový styling a šetrnou dámskou péči. Přijďte kdykoliv bez objednání.
            </p>
            {/* Social Proof Badge */}
            <div className="flex items-center gap-2.5 mt-5 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              <svg className="w-3.5 h-3.5 text-[#D4AF37] fill-current animate-pulse" viewBox="0 0 24 24">
                <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
              </svg>
              <span>500+ spokojených zákazníků</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <a
                href="tel:+420770114540"
                className="group relative px-8 py-5 bg-[#D4AF37] text-[#080809] rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#FAFAF9] transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2"
              >
                Volat a přijít hned
              </a>
              <a
                href="#cenik"
                className="px-8 py-5 border border-white/10 hover:border-white/30 text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/[0.03] transition-all duration-500 flex items-center justify-center"
              >
                Kompletní ceník
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Right Side: Cinematic Video / Photography Showcase */}
        <div className="lg:col-span-5 relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[24px] overflow-hidden border border-white/5 group shadow-2xl bg-[#121113]">
          
          {/* Floating 3D Barber Pole Widget */}
          <div className="absolute -left-10 top-16 z-30 w-24 h-48 bg-[#080809]/80 backdrop-blur-md border border-white/5 hover:border-[#D4AF37]/35 rounded-[20px] p-2 shadow-[0_15px_35px_rgba(0,0,0,0.8),_0_0_20px_rgba(212,175,55,0.04)] hidden xl:flex flex-col items-center justify-between pointer-events-auto transition-all duration-500 group/pole hover:scale-105">
            <div className="text-[8px] uppercase tracking-[0.2em] text-[#A1A1AA] font-bold mt-1">3D Live</div>
            <div className="w-full h-32">
              <BarberPole3D />
            </div>
            <div className="text-[8px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mb-1 group-hover/pole:animate-pulse">Barber Pole</div>
          </div>

          {/* Glassmorphism Title Overlay */}
          <div className="absolute top-6 left-6 z-20 px-4 py-2 rounded-full bg-[#080809]/60 backdrop-blur-md border border-white/5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[10px] text-white uppercase tracking-[0.2em] font-medium">SK Studio Live</span>
          </div>

          {/* Video Container */}
          <div className="absolute inset-0 w-full h-full bg-[#080809]">
            <video
              className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/hero.webm" type="video/webm" />
              <source src="/videos/hero.mp4" type="video/mp4" />
              {/* Fallback to high-res photo if video fails */}
            </video>
            {/* Absolute overlay tint */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080809]/80 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* Frame details for poster look */}
          <div className="absolute bottom-6 left-6 z-20 text-left">
            <p className="text-[10px] text-[#A1A1AA] uppercase tracking-[0.2em] mb-1 font-semibold">Záběr z našeho studia</p>
            <p className="text-sm text-white font-medium tracking-wide uppercase" style={{ fontFamily: 'var(--font-heading)' }}>Brno, Novobranská</p>
          </div>
        </div>
      </div>

      {/* Live Walk-In Dashboard Footer */}
      <div className="mx-auto max-w-7xl w-full px-6 lg:px-12 z-10 mt-12 lg:mt-6 border-t border-white/5 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Live Status */}
          <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-xl border transition-all duration-500 ${
              salonStatus.isOpen 
                ? 'bg-emerald-500/5 border-emerald-500/15 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.06)]' 
                : 'bg-rose-500/5 border-rose-500/15 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.04)]'
            }`}>
              {salonStatus.isOpen ? (
                <motion.div
                  animate={{ 
                    rotate: [0, -12, 8, -4, 0],
                    scale: [1, 1.08, 0.96, 1.02, 1]
                  }}
                  transition={{ 
                    duration: 1.8, 
                    repeat: Infinity, 
                    repeatDelay: 4,
                    ease: "easeInOut"
                  }}
                  className="relative flex items-center justify-center filter drop-shadow-[0_0_8px_rgba(52,168,83,0.35)]"
                >
                  <Scissors size={15} className="rotate-[90deg]" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ 
                    opacity: [0.6, 1, 0.6],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut"
                  }}
                  className="relative flex items-center justify-center filter drop-shadow-[0_0_6px_rgba(244,63,94,0.3)]"
                >
                  <Moon size={15} />
                </motion.div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA]">Aktuální status</span>
                <span className="text-[10px] text-white/50">{currentTime && `(Brno ${currentTime})`}</span>
              </div>
              <p className="text-base font-bold uppercase tracking-wider mt-1 text-white">
                {salonStatus.text}
              </p>
            </div>
          </div>

          {/* Live Occupancy Estimator */}
          <div className="flex items-start gap-4 col-span-1">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[#D4AF37] shrink-0">
              <Clock size={16} />
            </div>
            <div className="flex-1 min-h-[58px]">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA] block">Vytíženost & Čekací doba</span>
              
              {!scanComplete && !isScanning && (
                <button
                  onClick={handleScan}
                  className="mt-1 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37] bg-[#D4AF37]/5 text-[9px] text-[#D4AF37] hover:text-[#080809] hover:bg-[#D4AF37] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
                >
                  Zjistit aktuální stav
                </button>
              )}

              {isScanning && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-3 h-3 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[9px] text-[#A1A1AA] uppercase tracking-wider font-semibold animate-pulse">Načítám studio...</span>
                </div>
              )}

              {scanComplete && occupancy && (
                <div className="mt-1.5 space-y-1.5 max-w-[220px]">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-white text-[11px]">{occupancy.text}</span>
                    <span className="text-[#D4AF37] font-bold text-[11px]">{occupancy.waitTime}</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        occupancy.percentage > 70 ? 'bg-rose-500' : occupancy.percentage > 35 ? 'bg-[#D4AF37]' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${occupancy.percentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Google Ratings link */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/10">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA]">Google hodnocení</span>
              <a
                href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x471295b43d253b79:0x17392d6a377d37a2?sa=X&ved=1t:8290&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 mt-1 hover:text-[#D4AF37] transition-colors group"
              >
                <span className="text-sm font-bold text-white group-hover:text-[#D4AF37]">4.9/5 ★</span>
                <span className="text-xs text-[#A1A1AA]">(135+ recenzí)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
