'use client';
import { Star } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import Marquee from './animations/Marquee';

const reviews = [
  { name: 'Volodymyr Tymchenko', text: 'Děkuji za pěkný střih. Doporučuji)', rating: 5 },
  { name: 'Monika Ondráčková', text: 'Pan velmi milý, trpělivý, poradil si i s tříletým dítětem a ostříhal hezky.', rating: 5 },
  { name: 'Patrik Linek', text: 'Chodím již několik let!!!Top!!!!!!!', rating: 5 },
  { name: 'Honza 147', text: 'Kvalitní rychle stříhaní bez objednání.\nDoporučuji', rating: 5 },
  { name: 'Ondřej Doubek', text: 'Naprosto suprový a profesionální přístup.', rating: 5 },
  { name: 'Lukas Mehnert', text: 'Super. Diky moc', rating: 5 },
  { name: 'Martin Plošina a Taxi', text: 'Výborné. Super.', rating: 5 },
  { name: 'My Life My Rules', text: 'Very good. Doporučuji', rating: 5 },
  { name: 'Oleksii Shaitor', text: 'Perfektní stříhání', rating: 5 },
  { name: 'Vojtěch Procházka', text: 'Perfektní!', rating: 5 },
  { name: 'Petr Jedlička', text: 'Po sobotní návštěvě jsem našel místo, kam se budu vracet. Slečna s pečlivostí splnila střih, který jsem si představoval. Není, co vytknout. Doporučuji :)', rating: 5 },
  { name: 'York Tepsopor', text: 'I really love my new haircut and the service of this salon. 🥰 The best hair salon in brno I would recommend everyone to go 😊', rating: 5 },
  { name: 'Marek Pavlíček', text: 'Moc příjemný pán a střih parádní. Doporučuji, určitě přijdu zas.', rating: 5 },
  { name: 'Karel Zouhar', text: 'Potřeboval jsem se ostříhat narychlo bez objednání. Perfektní přístup, rozumná cena. Sem se určitě vrátím.', rating: 5 },
  { name: 'Radu Szelongova', text: 'Perfektní! Krásná cena, profi práce, i s poradenstvím . Muzu opravdu jen doporučit. 100% spokojenost, bez čekání', rating: 5 },
  { name: 'Tomáš Spurný', text: 'Slečna je skvělá, nechal jsem jí volnou ruku a vytvořila mi perfektní střih a vousy. Celou dobu jsem se cítil jak v bavlnce. Určitě budu navštěvovat pravidelně a VŘELE DOPORUČUJI. DĚKUJI MOCKRÁT 😊', rating: 5 },
  { name: 'Jana Zezulová', text: 'Dnes jsem navštívila kadeřnictví za účelem úpravy střihu. Jsem maximalně spokojená, úžasný přístup, určitě se ráda vrátím. Vřele doporučuji.', rating: 5 },
  { name: 'Natálie Peňázová', text: 'S návštěvou jsem moc spokojená. Slečna si na střihu dala opravdu záležet a splnila mi přesně to, co jsem si představovala. Určitě se ráda vrátím. Doporučuji!', rating: 5 },
  { name: 'Harry Czech', text: 'Skvělá přístup! Jde vidět že to ty lidi doopravdy baví. Se střihem si vyhrají a rozhodně rozumí tomu co dělají. Rozhodně se budu vracet zpět a budu i doporučovat ostatním.', rating: 5 },
  { name: 'Gabriela Vokurková', text: 'Poprvé jsem někde byla bez objednání, stříhal mě muž a poprvé odcházím spokojená a hlavně v klidu. Pán je šikovný, milý, rozhodně ví, co dělá, je vstřícný a dbá na to, abyste odcházeli spokojení. Platbu v hotovosti jsem mohla vyřešit výběrem z nedalekého bankomatu až po ostříhání. Děkuji moc 😇', rating: 5 },
  { name: 'Nicolas Fleg', text: 'Naprostá spokojenost,vše podle přání/popř. poradí.Super borec kterej vše doladí do detailu a sevším si pohraje. Ceny jsou adekvátní vůči službě.', rating: 5 },
  { name: 'Pavla Němcová', text: 'Naprostá spokojenost. Velmi příjemný, ochotný človíček, poradí, co by se na daný typ vlasů hodilo. Ostříhá i suché vlasy. Udělá přesně to, co po něm člověk chce a do ničeho ho netlačí.', rating: 5 },
  { name: 'Jiří Štodt', text: 'Profesionální přístup, perfektní střih za skvělou cenu a kvalitní přípravky. Vřele mohu doporučit toto kadeřnictví.', rating: 5 },
  { name: 'Veronika Židková', text: 'Šikovný, milý a ochotný kadeřník. Se střihem si opravdu "vyhrál". Dokonce ani syn v roli zákazníka neprotestoval (jako v jiném kadeřnictví). Ceny rozumné. Doporučuji.', rating: 5 },
  { name: 'Edita Kubíčková', text: 'Konečně jsem našla v Brně kadeřníka, který ví co dělá, rozumí své práci, dokáže poradit a ještě si dobře pokecáte :-). Nejlepší poměr cena-výkon, jakej si můžete přát. Já už jinam určitě nechci :-). Rozhodně doporučuji všema deseti!', rating: 5 },
  { name: 'Lenka Volná Šrotířová', text: 'Perfektní služba-krásný účes, bez zbytečně dlouhého sezení a za skvělou cenu. Pán přesně ví co dělá. Kadeřnictví jsem si našla na základě recenzí a byla to šťastná volba. Rozhodně to nebyla moje poslední návštěva v tomto místě.', rating: 5 },
  { name: 'Lukáš Puška', text: 'No přesvědčilo mě to minimálně o tom, že už bych se neměl stříhat doma sám. Snad po deseti letech jsem byl u kadeřníka a jsem mile překvapen! Perfektní přístup, příjemná atmosféra a ještě lepší střih. Myslím, že jsem si zadělal na pravidelné návštěvy.', rating: 5 },
  { name: 'Nicole Slavatová', text: 'Moc milý pán, přišla jsem v sobotu večer a vzal mě hned. Střih skvělý, vysvětlil mi, co bude dělat a proč. Není co vytknout, děkuji!', rating: 5 },
  { name: 'Jarmil Vepřek', text: 'Skvělá přístup, mistr to má jako koníček a dělá to dobře! Přijdu zas! 😊', rating: 5 },
  { name: 'Lada Maurerová', text: 'Jsem moc spokojená, děkuji za ostříhání i za rady ohledně péče 🙂🙂', rating: 5 },
  { name: 'Ro Lipčák', text: 'Zachránil mi účes a také mi dal hodně rad co a jak se starat o vlasy\n\nPS: byl jsem tak nadšený z účesu že jsem tam omylem nechal sponky do vlasů', rating: 5 },
  { name: 'Karla Miloševičová', text: 'Úžasný přístup, dokonalý účes dámský i pánský, pán je pravý mistr oboru. Vše rychle a za dobrou cenu. Doporučuji!', rating: 5 },
  { name: 'Eliška R', text: 'U pána jsem byla poprvé.. Můžu říct super stříhání, mytí vlasů.. příjemný přístup.. Dal mi dobrý rady, co s vlasy..Cena přijatelná.. Moc děkuji!', rating: 5 },
];




function GoogleGoldIcon() {
  return (
    <svg className="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.113-5.136 4.113-3.41 0-6.177-2.767-6.177-6.178 0-3.41 2.767-6.177 6.177-6.177 1.482 0 2.845.525 3.918 1.405l3.07-3.07C18.665 2.295 15.65 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.96 0 10.93-4.29 10.93-11.24 0-.693-.06-1.365-.18-1.955H12.24z"/>
    </svg>
  );
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="w-[360px] shrink-0 rounded-3xl border border-white/[0.04] bg-[#121113]/50 backdrop-blur-md p-8 flex flex-col gap-6 group hover:border-[#D4AF37]/20 transition-all duration-500">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
          ))}
        </div>
        <GoogleGoldIcon />
      </div>
      
      {/* Magazine-style Quotation Marks */}
      <div className="relative flex-1">
        <span className="absolute -top-4 -left-2 text-5xl font-serif text-[#C5A880]/15 pointer-events-none select-none">“</span>
        <p className="text-[#E4E4E7] text-sm leading-relaxed font-serif italic pl-4">
          {review.text}
        </p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.03]">
        <div className="w-8 h-8 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] text-xs font-bold bg-[#D4AF37]/5">
          {review.name.charAt(0)}
        </div>
        <span className="text-[#A1A1AA] text-xs uppercase tracking-wider font-semibold">{review.name}</span>
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="recenze" className="relative py-24 lg:py-36 bg-[#080809] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12 mb-16 md:mb-24">
        <div className="text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-4 justify-center">
              <span className="h-[1px] w-6 bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-bold">ZKUŠENOSTI KLIENTŮ</span>
              <span className="h-[1px] w-6 bg-[#D4AF37]" />
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAFAF9] tracking-tight leading-none mb-8" style={{ fontFamily: 'var(--font-heading)' }}>
              Co o nás{' '}
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#C5A880] to-[#E6D5C3] font-normal">
                říkají naši hosté
              </span>
            </h2>
          </FadeIn>

          {/* Rating Badge */}
          <FadeIn delay={0.2}>
            <a
              href="https://www.google.com/maps/place//data=!4m2!3m1!1s0x471295b43d253b79:0x17392d6a377d37a2?sa=X&ved=1t:8290&ictx=111"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-6 py-3.5 rounded-full border border-white/5 bg-white/[0.01] hover:border-[#D4AF37]/20 hover:bg-[#D4AF37]/2.5 transition-all duration-500 group"
            >
              <GoogleGoldIcon />
              <div className="flex items-center gap-2">
                <span className="text-[#FAFAF9] text-xl font-bold group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: 'var(--font-heading)' }}>4.9 / 5.0</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                  ))}
                </div>
              </div>
              <span className="text-xs text-[#A1A1AA] uppercase tracking-wider font-semibold">135+ recenzí</span>
            </a>
              <p className="text-[10px] text-[#A1A1AA] mt-3 flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Ověřené recenze z Google
              </p>
          </FadeIn>
        </div>
      </div>

      {/* Scrolling Reviews Carousel Track */}
      <div className="flex flex-col gap-6 relative">
        <FadeIn delay={0.3}>
          <Marquee speed={280}>
            {reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </Marquee>
        </FadeIn>

        {/* Second row scrolling opposite direction */}
        <FadeIn delay={0.4}>
          <Marquee speed={320} direction="right">
            {[...reviews].reverse().map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </Marquee>
        </FadeIn>
      </div>
    </section>
  );
}
