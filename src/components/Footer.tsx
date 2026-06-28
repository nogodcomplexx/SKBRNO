import { Phone, MapPin, Clock } from 'lucide-react';
import Logo from './Logo';

const footerLinks = [
  { href: '#o-nas', label: 'O nás' },
  { href: '#cenik', label: 'Ceník' },
  { href: '#galerie', label: 'Lookbook' },
  { href: '#recenze', label: 'Hodnocení' },
  { href: '#rezervace', label: 'Rezervace' },
  { href: '#kontakt', label: 'Kontakt' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#080809] border-t border-white/5">
      {/* Subtle top divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <a href="#" className="flex items-center gap-3">
              <Logo size={40} className="transition-all duration-500 hover:scale-105" />
              <div className="flex flex-col">
                <span className="text-[#FAFAF9] text-xs font-bold tracking-[0.25em] uppercase leading-none" style={{ fontFamily: 'var(--font-heading)' }}>SK STUDIO</span>
                <span className="text-[#A1A1AA] text-[9px] tracking-[0.1em] uppercase mt-0.5">Kadeřnictví Brno</span>
              </div>
            </a>
            <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-sm">
              Kombinace precizního řemesla, moderního designu a nadstandardního komfortu přímo v centru Brna. Dopřejte si prémiovou kadeřnickou péči bez nutnosti objednání.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
              Rychlé odkazy
            </h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href} 
                    className="text-[#A1A1AA] text-xs uppercase tracking-wider font-semibold hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contacts */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              Kontakt a lokace
            </h4>
            
            <div className="space-y-4 text-xs font-medium text-[#A1A1AA] tracking-wide">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Novobranská 16, 602 00 Brno-střed</span>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Út–Pá: 9:00–19:00<br />So: 10:00–18:00<br />Ne–Po: Zavřeno</span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Phone size={16} className="text-[#D4AF37] shrink-0" />
                <a 
                  href="tel:+420770114540" 
                  className="text-white font-bold hover:text-[#D4AF37] transition-colors uppercase tracking-widest text-xs"
                >
                  +420 770 114 540
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a 
                href="https://www.instagram.com/sk_kadernictvi_brno" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full border border-white/5 bg-white/[0.01] flex items-center justify-center text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300" 
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a 
                href="https://www.facebook.com/share/1BuRHekTJe/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full border border-white/5 bg-white/[0.01] flex items-center justify-center text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300" 
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a 
                href="https://t.me/SerhiiKotliar" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-9 h-9 rounded-full border border-white/5 bg-white/[0.01] flex items-center justify-center text-[#A1A1AA] hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all duration-300" 
                aria-label="Telegram"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#A1A1AA]/50 font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} SK Kadeřnictví. Všechna práva vyhrazena.</p>
          <p>Navrženo s důrazem na detail</p>
        </div>
      </div>
    </footer>
  );
}
