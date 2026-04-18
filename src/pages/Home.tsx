import React, { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Promo } from '../components/Promo';
import { Gallery } from '../components/Gallery';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { SEO } from '../components/SEO';
import { LangLink } from '../components/LangLink';
import { ArrowRight, ChevronDown, MapPin, MessageCircle } from 'lucide-react';
import { FAQS_EN, FAQS_ES } from '../data/faqs';

interface HomeProps {
  onSelectTreatment: (id: string) => void;
  onBookNow: () => void;
}


export const Home: React.FC<HomeProps> = ({ onSelectTreatment, onBookNow }) => {
  const { language, t } = useLanguage();
  const faqs = language === 'en' ? FAQS_EN : FAQS_ES;
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [googleReviews, setGoogleReviews] = useState<any[]>([]);
  const [reviewStats, setReviewStats] = useState<{ rating: number; total: number } | null>(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then(r => r.json())
      .then(data => {
        if (data.reviews?.length > 0) {
          setGoogleReviews(data.reviews);
          setReviewStats({ rating: data.rating, total: data.total });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <SEO
        title="In Home Spa Playa del Carmen | Massage Delivered to Your Hotel | Botica Spa"
        description="In-home spa in Playa del Carmen. We bring certified therapists to your hotel, Airbnb, or villa. Relaxing, deep tissue, four hands & more. Book now."
        url="https://boticaspa.com/"
        faqs={faqs}
        aggregateRating={reviewStats ? { ratingValue: reviewStats.rating, reviewCount: reviewStats.total } : undefined}
      />
      <main>
        <Hero onBookNow={onBookNow} />
        <Services onSelectTreatment={onSelectTreatment} limit={3} />
        
        {/* View All Treatments Link */}
        <section className="py-12 bg-[#F5F2ED] text-center">
          <LangLink
            to="/massages"
            className="inline-flex items-center gap-3 text-brand font-bold uppercase tracking-[0.2em] text-xs hover:gap-5 transition-all group"
          >
            {language === 'en' ? 'View Full Treatment Menu' : 'Ver Menú Completo de Tratamientos'}
            <ArrowRight className="w-4 h-4" />
          </LangLink>
        </section>

        <Promo />
        {/* About teaser — full content lives at /about */}
        <section className="py-24 px-4 bg-[#F9F8F6]">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl"
            >
              <img
                src="/spa-interior.webp"
                alt="In home massage session. Botica Spa therapist setting up at a Playa del Carmen villa"
                width={600}
                height={450}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <span className="text-xs uppercase tracking-[0.4em] text-gray-500">
                {language === 'en' ? '18 Years in the Riviera Maya' : '18 Años en la Riviera Maya'}
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight">
                {language === 'en' ? (
                  <>Resort quality. <span className="italic">Your space.</span></>
                ) : (
                  <>Calidad de resort. <span className="italic">En tu espacio.</span></>
                )}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {language === 'en'
                  ? 'Founded by Gina Agassini after years at luxury hotels in the Riviera Maya — Grand Velas, Azul Fives, and Mayakoba. Every session brings the same organic oils, techniques, and care you\'d expect from a five-star spa. Without leaving where you\'re staying.'
                  : 'Fundada por Gina Agassini tras años en hoteles de lujo en la Riviera Maya — Grand Velas, Azul Fives y Mayakoba. Cada sesión lleva los mismos aceites orgánicos, técnicas y cuidado que esperarías de un spa cinco estrellas. Sin salir de donde te hospedas.'}
              </p>
              <LangLink
                to="/about"
                className="inline-flex items-center gap-3 text-brand font-bold uppercase tracking-[0.2em] text-xs hover:gap-5 transition-all group"
              >
                {language === 'en' ? 'Our Story' : 'Nuestra Historia'}
                <ArrowRight className="w-4 h-4" />
              </LangLink>
            </motion.div>
          </div>
        </section>
        <Gallery />

        {/* Delivery Areas Section */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs uppercase tracking-[0.4em] text-[#5A5A40] mb-4 block font-bold"
              >
                {language === 'en' ? 'Where We Go' : 'Dónde llegamos'}
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif font-light"
              >
                {language === 'en' ? 'We Deliver to Your Door' : 'Llevamos el spa a tu puerta'}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-sm mt-4 max-w-md mx-auto"
              >
                {language === 'en'
                  ? 'Across the Riviera Maya: hotels, villas, Airbnbs. We bring everything.'
                  : 'En toda la Riviera Maya: hoteles, villas y Airbnbs. Llevamos todo.'}
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {(language === 'en' ? [
                { city: 'Playa del Carmen', note: 'Primary service area', fee: 'No travel fee', primary: true, slug: null },
                { city: 'Playacar', note: 'Phase 1 & Phase 2', fee: 'No travel fee', primary: true, slug: '/massage-playacar' },
                { city: 'Puerto Aventuras', note: 'South of Playa del Carmen', fee: 'Travel fee may apply', primary: false, slug: '/massage-puerto-aventuras' },
                { city: 'Puerto Morelos', note: 'North of Playa del Carmen', fee: 'Travel fee applies', primary: false, slug: '/massage-puerto-morelos' },
                { city: 'Akumal', note: 'Akumal Bay & surrounding', fee: 'Travel fee may apply', primary: false, slug: '/massage-akumal' },
              ] : [
                { city: 'Playa del Carmen', note: 'Zona principal', fee: 'Sin cargo por traslado', primary: true, slug: null },
                { city: 'Playacar', note: 'Fase 1 y Fase 2', fee: 'Sin cargo por traslado', primary: true, slug: '/massage-playacar' },
                { city: 'Puerto Aventuras', note: 'Al sur de Playa del Carmen', fee: 'Cargo por traslado posible', primary: false, slug: '/massage-puerto-aventuras' },
                { city: 'Puerto Morelos', note: 'Al norte de Playa del Carmen', fee: 'Cargo por traslado', primary: false, slug: '/massage-puerto-morelos' },
                { city: 'Akumal', note: 'Bahía Akumal y alrededores', fee: 'Cargo por traslado posible', primary: false, slug: '/massage-akumal' },
              ]).map((area, i) => {
                const cardContent = (
                  <>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-4 h-4 flex-shrink-0 ${area.primary ? 'text-[#5A5A40]' : 'text-gray-400'}`} />
                        <span className="font-serif text-lg text-[#1A1A1A]">{area.city}</span>
                      </div>
                      {area.primary && (
                        <span className="text-[9px] uppercase tracking-widest font-bold text-[#5A5A40] bg-[#5A5A40]/10 px-2 py-1 rounded-full">
                          {language === 'en' ? 'Primary' : 'Principal'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{area.note}</p>
                    <p className={`text-[10px] uppercase tracking-widest font-bold ${area.primary ? 'text-[#5A5A40]' : 'text-gray-400'}`}>
                      {area.fee}
                    </p>
                  </>
                );
                const cardClass = `rounded-2xl p-6 border flex flex-col gap-3 ${area.primary ? 'bg-[#F9F8F6] border-[#D6CFBE]' : 'bg-white border-gray-100'} ${area.slug ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}`;
                return (
                  <motion.div
                    key={area.city}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                  >
                    {area.slug ? (
                      <LangLink to={area.slug} className={cardClass}>{cardContent}</LangLink>
                    ) : (
                      <div className={cardClass}>{cardContent}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <a
                href="https://wa.me/529842687428?text=Hi!%20I%27d%20like%20to%20check%20if%20you%20cover%20my%20area%20%F0%9F%8C%BF"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-white border border-gray-200 hover:border-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/10 transition-all duration-300 rounded-2xl px-8 py-5"
              >
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 group-hover:bg-[#25D366] flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-left">
                  <p className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">
                    {language === 'en' ? 'Not in the list?' : '¿No está tu zona?'}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {language === 'en' ? "Message us on WhatsApp, we'll confirm in minutes" : 'Escríbenos por WhatsApp, confirmamos en minutos'}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-2" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-32 px-4 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-4 block"
              >
                {t.testimonials.badge}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-serif font-light"
              >
                {t.testimonials.title}
              </motion.h2>
            </div>

            {reviewStats && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center justify-center gap-3 mb-12 -mt-8"
              >
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-700">{reviewStats.rating.toFixed(1)}</span>
                <span className="text-sm text-gray-400">· {reviewStats.total} Google reviews</span>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {(googleReviews.length > 0 ? googleReviews : t.testimonials.items).map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(item.rating ?? 5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg text-gray-600 italic leading-relaxed">
                    "{item.text}"
                  </p>
                  <div className="pt-4 flex flex-col items-center gap-2">
                    {item.photo && (
                      <img src={item.photo} alt={item.author} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                    )}
                    <p className="font-medium uppercase tracking-[0.2em] text-xs text-gray-900">{item.author}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{item.time ?? item.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-20 text-center"
            >
              <a 
                href={t.testimonials.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 border border-gray-200 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gray-50 transition-all group"
              >
                <img 
                  src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" 
                  alt="Google" 
                  className="h-4 opacity-70 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <span>{t.testimonials.viewOnGoogle}</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-32 px-4 bg-[#F9F8F6]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-4 block"
              >
                FAQ
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl font-serif font-light"
              >
                {language === 'en' ? 'Before You Book' : 'Antes de reservar'}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-sm mt-4"
              >
                {language === 'en' ? 'Everything you need to know before your first in home session.' : 'Todo lo que necesitas saber antes de tu primera sesión a domicilio.'}
              </motion.p>
            </div>
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 text-left gap-4"
                  >
                    <h4 className="font-serif text-lg leading-snug text-[#1A1A1A]">{faq.q}</h4>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
