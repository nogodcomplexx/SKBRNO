'use client';
import { Phone, MapPin, Clock, Navigation } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import SpotlightCard from './animations/SpotlightCard';

const openingHours = [
  { day: 'Pondělí', hours: 'Zavřeno', closed: true },
  { day: 'Úterý', hours: '9:00 – 19:00', closed: false },
  { day: 'Středa', hours: '9:00 – 19:00', closed: false },
  { day: 'Čtvrtek', hours: '9:00 – 19:00', closed: false },
  { day: 'Pátek', hours: '9:00 – 19:00', closed: false },
  { day: 'Sobota', hours: '10:00 – 18:00', closed: false },
  { day: 'Neděle', hours: 'Zavřeno', closed: true },
];

export default function Contact() {
  return (
    <section id="kontakt" className="relative bg-[#080809]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      {/* Map Section - Responsive Stack on Mobile, Absolute Overlay on Desktop */}
      <div className="relative flex flex-col lg:block">

        {/* Map */}
        <div className="w-full h-[350px] sm:h-[450px] lg:h-[600px] order-1 lg:order-none relative">
          <iframe
            className="w-full h-full grayscale-[80%] contrast-[1.1] opacity-80"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.35145269768!2d16.610855415849414!3d49.1938920849784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471295b43d253b79%3A0x17392d6a377d37a2!2zU0sgS2FkZcWZbmljdHbDrSBuYSBOb3ZvYnJhbnNrw6kgYmV6IG9iamVkbsOhbsOt!5e0!3m2!1scs!2scz!4v1654542679256!5m2!1scs!2scz"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SK Kadeřnictví na mapě"
          />
          {/* Navigation hint — desktop: overlay at bottom of map */}
          <div className="hidden lg:flex absolute bottom-4 left-0 right-0 z-20 justify-end pr-8 pointer-events-none">
            <FadeIn>
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/5 bg-[#080809]/80 backdrop-blur-md pointer-events-auto">
                <MapPin size={14} className="text-[#D4AF37] shrink-0" />
                <p className="text-sm text-[#A1A1AA]">
                  Jsme přímo v pasáži u vchodu z ulice Novobranská, 2 minuty od zastávky Hlavní nádraží.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Navigation hint — mobile: between map and card */}
        <div className="lg:hidden bg-[#0C0B0D] py-4 px-4 text-center order-1">
          <FadeIn>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.01]">
              <MapPin size={13} className="text-[#D4AF37] shrink-0" />
              <p className="text-xs text-[#A1A1AA] text-left">
                Jsme přímo v pasáži u vchodu z ulice Novobranská, 2 minuty od zastávky Hlavní nádraží.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Overlay Card */}
        <div className="relative lg:absolute lg:inset-0 flex items-start lg:items-center lg:justify-start pointer-events-none px-4 sm:px-6 lg:px-8 pb-12 lg:pb-0 mt-[-60px] lg:mt-0 z-10 order-2 lg:order-none w-full">
          <div className="mx-auto max-w-7xl w-full pointer-events-auto">
            <FadeIn direction="left">
              <SpotlightCard className="w-full lg:w-[420px] rounded-3xl border border-white/5 bg-[#080809]/95 lg:bg-[#080809]/90 backdrop-blur-2xl lg:backdrop-blur-xl p-6 sm:p-8">
                <span className="text-[#D4AF37] text-sm font-semibold uppercase tracking-[0.2em] mb-6 block">Kontakt</span>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <MapPin size={18} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-[#FAFAF9] font-medium">Novobranská 16</p>
                      <p className="text-[#A1A1AA] text-sm">602 00 Brno-střed</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <Phone size={18} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <a href="tel:+420770114540" className="text-[#FAFAF9] font-medium hover:text-[#D4AF37] transition-colors">
                        +420 770 114 540
                      </a>
                      <p className="text-[#A1A1AA] text-sm">Zavolejte nám kdykoliv</p>
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <Clock size={18} className="text-[#D4AF37]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[#FAFAF9] font-medium mb-3">Otevírací doba</p>
                      <div className="space-y-1.5">
                        {openingHours.map((item) => (
                          <div key={item.day} className="flex justify-between text-sm">
                            <span className={item.closed ? 'text-[#71717A]' : 'text-[#A1A1AA]'}>{item.day}</span>
                            <span className={item.closed ? 'text-[#71717A]' : 'text-[#FAFAF9]'}>{item.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Directions Button */}
                  <a
                    href="https://www.google.com/maps/dir//SK+Kade%C5%99nictv%C3%AD+na+Novobransk%C3%A9+bez+objedn%C3%A1n%C3%AD,+Novobransk%C3%A1+16,+602+00+Brno-st%C5%99ed"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#D4AF37] text-[#0A0A0B] rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-[#C5A880] transition-colors duration-300"
                  >
                    <Navigation size={16} />
                    Navigovat
                  </a>

                  {/* Social Links */}
                  <div className="flex items-center justify-center gap-4 pt-2">
                    <a
                      href="https://www.instagram.com/sk_kadernictvi_brno"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a
                      href="https://www.facebook.com/share/1BuRHekTJe/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
                      aria-label="Facebook"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a
                      href="https://t.me/SerhiiKotliar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300"
                      aria-label="Telegram"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                    </a>
                  </div>
                </div>
              </SpotlightCard>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
