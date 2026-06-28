'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Clock, Scissors, Phone, User, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import FadeIn from './animations/FadeIn';

const services = [
  { id: '1', name: 'Barber Střih & Mytí', category: 'Pánské', price: '750 Kč' },
  { id: '2', name: 'Komplet Střih & Vousy', category: 'Pánské', price: '850 Kč' },
  { id: '3', name: 'Komplet Střední Vlasy', category: 'Dámské', price: '850 Kč' },
  { id: '4', name: 'Komplet Dlouhé Vlasy', category: 'Dámské', price: '1 200 Kč' },
  { id: '5', name: 'Úprava vousů', category: 'Pánské', price: '350 Kč' },
  { id: '6', name: 'Dětský střih', category: 'Dětské', price: '500 Kč' },
];

const stylists = [
  { id: 'serhii', name: 'Serhii Kotliar', role: 'Zakladatel / Master Barber', photo: '/gallery/DSC_9153.webp' },
  { id: 'anna', name: 'Anna', role: 'Dámská kadeřnice / Color expert', photo: '/gallery/DSC_9021.webp' },
  { id: 'libor', name: 'Libor', role: 'Senior Barber & Stylista', photo: '/gallery/DSC_9186.webp' },
];

const timeSlots = [
  { label: 'Dopoledne', times: ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30'] },
  { label: 'Odpoledne', times: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'] },
  { label: 'Večer', times: ['15:30', '16:00', '16:30', '17:00', '17:30', '18:00'] },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

const monthNames = ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'];
const dayNames = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne'];

export default function Booking() {
  const now = new Date();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<typeof stylists[0] | null>(null);
  
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState({ name: '', phone: '', email: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month]);
  const firstDay = useMemo(() => getFirstDayOfMonth(year, month), [year, month]);

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [firstDay, daysInMonth]);

  const isWeekend = (day: number) => {
    const d = new Date(year, month, day);
    return d.getDay() === 0; // Sunday closed
  };

  const isMonday = (day: number) => {
    const d = new Date(year, month, day);
    return d.getDay() === 1; // Monday closed
  };

  const isPast = (day: number) => day < today;

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const isStepValid = () => {
    if (step === 1) return selectedService !== null;
    if (step === 2) return selectedStylist !== null;
    if (step === 3) return selectedDate !== null && selectedTime !== null;
    if (step === 4) return contactInfo.name.trim() !== '' && contactInfo.phone.trim() !== '';
    return false;
  };

  const resetForm = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setContactInfo({ name: '', phone: '', email: '' });
    setIsSuccess(false);
  };

  return (
    <section id="rezervace" className="relative py-24 lg:py-36 bg-[#080809]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Heading and static guidance */}
          <div className="lg:col-span-5">
            <FadeIn>
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-[1px] w-6 bg-[#D4AF37]" />
                <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-bold">ONLINE REZERVACE</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.1}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAFAF9] tracking-tight leading-none mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
                Zajistěte si{' '}
                <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] to-[#E6D5C3] font-normal">
                  své křeslo
                </span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="text-[#A1A1AA] text-base leading-relaxed mb-8">
                Přestože v našem salonu obsluhujeme klienty především **bez objednání**, pro ty, kteří mají rádi pevně naplánovaný harmonogram, nabízíme možnost zarezervovat si konkrétní čas u svého oblíbeného stylisty.
              </p>
            </FadeIn>

            {/* Quick contact notification */}
            <FadeIn delay={0.3}>
              <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col gap-3">
                <div className="flex items-center gap-3 text-[#D4AF37]">
                  <Phone size={16} />
                  <span className="text-xs uppercase tracking-wider font-bold text-white">Chcete se zeptat na volný čas?</span>
                </div>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">
                  Zavolejte nám na <a href="tel:+420770114540" className="text-[#D4AF37] font-semibold hover:underline">+420 770 114 540</a>. Náš tým vám ihned sdělí aktuální vytíženost v salonu.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Step-by-Step Interactive Widget */}
          <div className="lg:col-span-7 relative w-full">
            <div className="rounded-3xl border border-white/5 bg-[#121113]/40 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">
              
              {/* Gold light splash inside the widget */}
              <div className="absolute top-[-20%] right-[-20%] w-60 h-60 rounded-full bg-[#D4AF37]/5 blur-[60px] pointer-events-none" />

              {!isSuccess ? (
                <>
                  {/* Step Progress bar */}
                  <div className="mb-10">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-[#A1A1AA] font-bold mb-3">
                      <span>Krok {step} ze 4</span>
                      <span className="text-white">
                        {step === 1 && 'Výběr služby'}
                        {step === 2 && 'Výběr stylisty'}
                        {step === 3 && 'Výběr termínu'}
                        {step === 4 && 'Kontaktní údaje'}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#D4AF37] to-[#C5A880]"
                        animate={{ width: `${(step / 4) * 100}%` }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    </div>
                  </div>

                  {/* Form step contents */}
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <h3 className="text-base font-bold uppercase tracking-wider text-white mb-6">Jakou službu požadujete?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                          {services.map((service) => (
                            <button
                              key={service.id}
                              onClick={() => setSelectedService(service)}
                              className={`p-4 rounded-xl border text-left transition-all duration-300 flex justify-between items-center ${
                                selectedService?.id === service.id
                                  ? 'bg-[#D4AF37]/5 border-[#D4AF37] text-white'
                                  : 'bg-white/[0.01] border-white/5 text-[#A1A1AA] hover:border-white/15 hover:text-white'
                              }`}
                            >
                              <div>
                                <span className="text-[9px] uppercase tracking-widest text-[#C5A880] block mb-1">{service.category}</span>
                                <span className="text-sm font-semibold block">{service.name}</span>
                              </div>
                              <span className="text-xs font-bold text-[#D4AF37]">{service.price}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <h3 className="text-base font-bold uppercase tracking-wider text-white mb-6 font-semibold">Vyberte si svého stylisty</h3>
                        <div className="grid grid-cols-1 gap-3">
                          {stylists.map((stylist) => (
                            <button
                              key={stylist.id}
                              onClick={() => setSelectedStylist(stylist)}
                              className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-4 relative overflow-hidden ${
                                selectedStylist?.id === stylist.id
                                  ? 'bg-[#D4AF37]/5 border-[#D4AF37] text-white shadow-lg'
                                  : 'bg-white/[0.01] border-white/5 text-[#A1A1AA] hover:border-white/15 hover:text-white'
                              }`}
                            >
                              <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shrink-0 bg-neutral-900">
                                <img src={stylist.photo} alt={stylist.name} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <span className="text-xs font-bold block text-white">{stylist.name}</span>
                                <span className="text-[10px] uppercase tracking-wider text-[#A1A1AA] mt-0.5 block">{stylist.role}</span>
                              </div>
                              {selectedStylist?.id === stylist.id && (
                                <div className="absolute right-4 p-1.5 rounded-full bg-[#D4AF37] text-[#080809]">
                                  <Check size={14} strokeWidth={3} />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-base font-bold uppercase tracking-wider text-white mb-4">Vyberte termín</h3>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                          {/* Calendar Picker (7cols) */}
                          <div className="md:col-span-7">
                            <span className="text-[10px] uppercase tracking-widest text-[#A1A1AA] font-bold mb-3 block">
                              {monthNames[month]} {year}
                            </span>
                            <div className="grid grid-cols-7 gap-1 border border-white/5 p-2 rounded-xl bg-black/10">
                              {dayNames.map((d) => (
                                <div key={d} className="text-center text-[10px] text-[#A1A1AA] py-1 font-bold">{d}</div>
                              ))}
                              {calendarDays.map((day, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  disabled={!day || isPast(day) || isWeekend(day) || isMonday(day)}
                                  onClick={() => day && setSelectedDate(day)}
                                  className={`aspect-square text-xs rounded-lg flex items-center justify-center transition-all ${
                                    !day ? '' :
                                    selectedDate === day ? 'bg-[#D4AF37] text-[#080809] font-bold' :
                                    isPast(day) || isWeekend(day) || isMonday(day) ? 'text-[#71717A]/30 cursor-not-allowed' :
                                    day === today ? 'border border-[#D4AF37]/50 text-[#D4AF37]' :
                                    'text-[#FAFAF9] hover:bg-white/5 font-medium'
                                  }`}
                                >
                                  {day}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Time Slot Picker (5cols) */}
                          <div className="md:col-span-5 h-[240px] overflow-y-auto pr-1 custom-scrollbar">
                            {selectedDate ? (
                              <div className="space-y-4">
                                <span className="text-[10px] uppercase tracking-widest text-[#A1A1AA] font-bold block mb-1">Volné časy</span>
                                {timeSlots.map((slot) => (
                                  <div key={slot.label} className="space-y-2">
                                    <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-bold block">{slot.label}</span>
                                    <div className="grid grid-cols-2 gap-1.5">
                                      {slot.times.map((time) => (
                                        <button
                                          key={time}
                                          type="button"
                                          onClick={() => setSelectedTime(time)}
                                          className={`py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                                            selectedTime === time
                                              ? 'bg-[#D4AF37] border-[#D4AF37] text-[#080809]'
                                              : 'bg-[#080809]/40 border-white/5 text-[#A1A1AA] hover:border-white/15 hover:text-white'
                                          }`}
                                        >
                                          {time}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="h-full flex items-center justify-center text-center p-4 border border-white/5 border-dashed rounded-xl bg-black/10">
                                <span className="text-xs text-[#A1A1AA]">Vyberte prosím nejprve den v kalendáři</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <h3 className="text-base font-bold uppercase tracking-wider text-white mb-4">Kontaktní údaje</h3>
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-[#A1A1AA] font-bold mb-1.5 block">Jméno a příjmení *</label>
                            <input
                              type="text"
                              required
                              value={contactInfo.name}
                              onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                              placeholder="Jan Novák"
                              className="w-full px-4 py-3 rounded-xl bg-[#080809] border border-white/10 text-white text-xs focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-[#A1A1AA] font-bold mb-1.5 block">Telefonní číslo *</label>
                            <input
                              type="tel"
                              required
                              value={contactInfo.phone}
                              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                              placeholder="+420 123 456 789"
                              className="w-full px-4 py-3 rounded-xl bg-[#080809] border border-white/10 text-white text-xs focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-[#A1A1AA] font-bold mb-1.5 block">E-mailová adresa (nepovinné)</label>
                            <input
                              type="email"
                              value={contactInfo.email}
                              onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                              placeholder="jan.novak@example.cz"
                              className="w-full px-4 py-3 rounded-xl bg-[#080809] border border-white/10 text-white text-xs focus:border-[#D4AF37]/50 focus:outline-none transition-colors"
                            />
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation Footer Buttons */}
                  <div className="flex items-center justify-between mt-10 border-t border-white/5 pt-6">
                    {step > 1 ? (
                      <button
                        onClick={handlePrevStep}
                        className="px-5 py-3 border border-white/10 hover:border-white/20 text-[#A1A1AA] hover:text-white rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-1.5"
                      >
                        <ArrowLeft size={12} />
                        Zpět
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 4 ? (
                      <button
                        onClick={handleNextStep}
                        disabled={!isStepValid()}
                        className={`px-6 py-3.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-1.5 ${
                          isStepValid()
                            ? 'bg-[#D4AF37] text-[#080809] hover:bg-[#FAFAF9] cursor-pointer'
                            : 'bg-white/5 border border-white/5 text-[#A1A1AA]/30 cursor-not-allowed'
                        }`}
                      >
                        Pokračovat
                        <ArrowRight size={12} />
                      </button>
                    ) : (
                      <button
                        onClick={handleBookingSubmit}
                        disabled={!isStepValid()}
                        className={`px-8 py-3.5 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300 flex items-center gap-1.5 ${
                          isStepValid()
                            ? 'bg-[#D4AF37] text-[#080809] hover:bg-[#FAFAF9] cursor-pointer'
                            : 'bg-white/5 border border-white/5 text-[#A1A1AA]/30 cursor-not-allowed'
                        }`}
                      >
                        Odeslat rezervaci
                      </button>
                    )}
                  </div>
                </>
              ) : (
                /* Success screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                    <Check size={28} strokeWidth={3} />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Rezervace úspěšná!</h3>
                  <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-sm mb-8">
                    Děkujeme za váš zájem, **{contactInfo.name}**. Váš termín na **{selectedService?.name}** dne **{selectedDate}. {monthNames[month]} v {selectedTime}** u stylisty **{selectedStylist?.name}** je předběžně rezervován.
                  </p>
                  
                  <div className="w-full max-w-sm rounded-2xl bg-white/[0.01] border border-white/5 p-5 text-left mb-8 space-y-2">
                    <div className="flex justify-between text-xs"><span className="text-[#A1A1AA]">Služba:</span><span className="text-white font-semibold">{selectedService?.name}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-[#A1A1AA]">Stylista:</span><span className="text-white font-semibold">{selectedStylist?.name}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-[#A1A1AA]">Termín:</span><span className="text-[#D4AF37] font-semibold">{selectedDate}. {monthNames[month]} • {selectedTime}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-[#A1A1AA]">Telefon:</span><span className="text-white font-semibold">{contactInfo.phone}</span></div>
                  </div>

                  <button
                    onClick={resetForm}
                    className="px-6 py-3 border border-white/10 hover:border-white/20 text-[#A1A1AA] hover:text-white rounded-full text-[10px] uppercase tracking-widest font-bold transition-all duration-300"
                  >
                    Vytvořit další rezervaci
                  </button>
                </motion.div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
