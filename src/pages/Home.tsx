import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Promo } from '../components/Promo';
import { About } from '../components/About';
import { Gallery } from '../components/Gallery';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface HomeProps {
  onSelectTreatment: (id: string) => void;
  onBookNow: () => void;
}

const FAQS = [
  {
    q: "Is it safe to let a therapist into my villa or hotel room?",
    a: "Absolutely. All Botica Spa therapists are certified professionals with background checks and years of experience at luxury properties in the Riviera Maya. We've served guests at top resorts, private villas, and Airbnbs — discretion and professionalism are at the core of everything we do."
  },
  {
    q: "Do you bring everything? Do I need to set anything up?",
    a: "We bring it all — professional massage table, fresh linens, organic oils, aromatherapy, and ambient music. All you need is a space roughly 2×3 meters. We handle setup and breakdown completely; you don't lift a finger."
  },
  {
    q: "What if my hotel doesn't allow outside vendors?",
    a: "Most hotels in the Riviera Maya welcome in-room spa services, especially in Airbnbs and private villas. If you're at a large all-inclusive resort, send us a message on WhatsApp before booking and we'll confirm access — we've navigated this many times and always find a solution."
  },
  {
    q: "Can two (or more) people get massages at the same time?",
    a: "Yes — and it's one of our most popular requests. We can send two therapists for a couple's session or a small group. Each person books their own service (different treatments and durations are totally fine), and we coordinate to arrive together."
  },
  {
    q: "How far in advance do I need to book?",
    a: "We can often accommodate same-day or next-day bookings — just message us on WhatsApp and we'll confirm availability within minutes. For a guaranteed slot, especially for couples or groups, we recommend booking 5+ days ahead (a 30% deposit secures it instantly online)."
  },
  {
    q: "What is the cancellation and deposit policy?",
    a: "For advance bookings (5+ days out), we require a 30% deposit to confirm your reservation. If you cancel more than 48 hours before your session, we refund the deposit in full. Cancellations within 48 hours forfeit the deposit. Same-week bookings confirmed via WhatsApp have no deposit — just let us know if plans change."
  },
  {
    q: "What areas do you cover?",
    a: "We serve Playa del Carmen, Tulum, Cancún, Akumal, Puerto Morelos, and most areas in between. If you're somewhere not listed, just ask — we travel for larger groups."
  },
  {
    q: "What if the pressure or technique isn't what I expected?",
    a: "Tell us the moment something isn't right. Our therapists check in throughout the session and adjust pressure, technique, and focus areas immediately. Your comfort is not optional — it's the whole point."
  },
  {
    q: "Do I need to tip?",
    a: "Tips are never expected but always appreciated. If you had a wonderful experience, 10–20% is customary in Mexico for in-home spa services. You can tip cash directly to your therapist after the session."
  },
  {
    q: "Are your products safe for sensitive skin or allergies?",
    a: "We use organic, hypoallergenic oils as our base. If you have specific allergies or sensitivities (fragrance, nuts, etc.), let us know when booking and we'll adapt. We never use harsh chemicals or synthetic fragrances."
  },
  {
    q: "Can I book if I have a medical condition or injury?",
    a: "Many conditions benefit from massage — but some require modified techniques or contraindications. Please mention any recent surgeries, injuries, pregnancy, or chronic conditions when booking. Our therapists are trained to adapt or advise honestly if a particular treatment isn't right for you."
  },
  {
    q: "How do I pay?",
    a: "For advance bookings, your 30% deposit is paid securely online via Stripe (all major cards accepted). The remaining balance is paid on the day of your session, in cash or via card. Same-week bookings are confirmed and paid in full via WhatsApp."
  },
];

export const Home: React.FC<HomeProps> = ({ onSelectTreatment, onBookNow }) => {
  const { language, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SEO faqs={FAQS} />
      <main>
        <Hero onBookNow={onBookNow} />
        <Services onSelectTreatment={onSelectTreatment} />
        
        {/* View All Treatments Link */}
        <section className="py-12 bg-[#F5F2ED] text-center">
          <Link 
            to="/massages"
            className="inline-flex items-center gap-3 text-brand font-bold uppercase tracking-[0.2em] text-xs hover:gap-5 transition-all group"
          >
            {language === 'en' ? 'View Full Treatment Menu' : 'Ver Menú Completo de Tratamientos'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <Promo />
        <About />
        <Gallery />
        
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {t.testimonials.items.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex flex-col items-center text-center space-y-6"
                >
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-lg text-gray-600 italic leading-relaxed">
                    "{item.text}"
                  </p>
                  <div className="pt-4">
                    <p className="font-medium uppercase tracking-[0.2em] text-xs text-gray-900">{item.author}</p>
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">{item.location}</p>
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
                Before You Book
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-sm mt-4"
              >
                Everything you need to know before your first in-home session.
              </motion.p>
            </div>
            <div className="divide-y divide-gray-200">
              {FAQS.map((faq, i) => (
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
