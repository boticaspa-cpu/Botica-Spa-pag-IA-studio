import React, { useState, useEffect } from 'react';
import { SEO } from './components/SEO';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { BookingSystem } from './components/BookingSystem';
import { TreatmentDetail } from './components/TreatmentDetail';
import { AnimatePresence, motion } from 'motion/react';
import { LanguageProvider, useLanguage } from './LanguageContext';
import { Globe, MessageCircle, ChevronUp } from 'lucide-react';

import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </HelmetProvider>
  );
}

function AppContent() {
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBook = () => {
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <SEO />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/20 to-transparent">
        <div className="flex items-center gap-3">
          <img 
            src="input_file_0.png" 
            alt="Botica Spa Logo" 
            className="w-10 h-10 object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="text-white font-serif text-2xl tracking-tight">Botica Spa</div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-white/80 text-xs uppercase tracking-widest">
          <a href="#services" className="hover:text-white transition-colors">{t.nav.treatments}</a>
          <a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a>
          
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 hover:text-white transition-colors group"
          >
            <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>{language === 'en' ? 'ES' : 'EN'}</span>
          </button>

          <button 
            onClick={() => setIsBookingOpen(true)}
            className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-all font-medium"
          >
            {t.nav.bookNow}
          </button>
        </div>
      </nav>

      <main>
        <Hero onBookNow={() => setIsBookingOpen(true)} />
        <Services onSelectTreatment={setSelectedTreatment} />
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
              <span className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-4 block">FAQ</span>
              <h2 className="text-4xl font-serif font-light">Common Questions</h2>
            </div>
            <div className="space-y-8">
              {[
                {
                  q: language === 'en' ? "How do I book a session?" : "¿Cómo reservo una sesión?",
                  a: language === 'en' ? "You can book directly through our website by clicking the 'Book Now' button, or contact us via WhatsApp." : "Puedes reservar directamente a través de nuestra web haciendo clic en el botón 'Reservar Ahora', o contáctanos por WhatsApp."
                },
                {
                  q: language === 'en' ? "What do I need to provide?" : "¿Qué necesito proporcionar?",
                  a: language === 'en' ? "We provide everything: massage table, organic oils, and relaxing music. You just need a small space for the table." : "Nosotros proporcionamos todo: mesa de masaje, aceites orgánicos y música relajante. Solo necesitas un pequeño espacio para la mesa."
                },
                {
                  q: language === 'en' ? "Do you go to hotels?" : "¿Van a hoteles?",
                  a: language === 'en' ? "Yes, we bring the spa to any hotel, Airbnb, or villa in Playa del Carmen and surrounding areas." : "Sí, llevamos el spa a cualquier hotel, Airbnb o villa en Playa del Carmen y sus alrededores."
                }
              ].map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-8">
                  <h4 className="text-lg font-serif mb-3">{faq.q}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 px-4 bg-[#0A0A0A] text-white text-center overflow-hidden">
          {/* Subtle Background Element */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/20 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">{t.cta.title} <br /><span className="italic">{t.cta.titleItalic}</span></h2>
              <p className="text-white/50 mb-12 text-lg font-light max-w-xl mx-auto">
                {t.cta.subtitle}
              </p>
              <button 
                onClick={() => setIsBookingOpen(true)}
                className="px-14 py-6 bg-white text-black rounded-full uppercase tracking-[0.2em] text-xs font-bold hover:scale-105 transition-all shadow-2xl"
              >
                {t.cta.button}
              </button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Actions */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="w-12 h-12 bg-white text-[#1A1A1A] rounded-full shadow-xl flex items-center justify-center hover:bg-[#F5F2ED] transition-colors border border-[#E5E5E5]"
            >
              <ChevronUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
        <a 
          href={t.social.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group relative"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute right-full mr-4 px-4 py-2 bg-white text-[#1A1A1A] text-sm font-medium rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-[#E5E5E5]">
            {language === 'en' ? 'Chat with us' : 'Chatea con nosotros'}
          </span>
        </a>
      </div>

      <AnimatePresence>
        {isBookingOpen && (
          <BookingSystem 
            isOpen={isBookingOpen} 
            onClose={() => {
              setIsBookingOpen(false);
              setSelectedTreatment(null);
            }} 
            initialServiceId={selectedTreatment}
          />
        )}
      </AnimatePresence>

      <TreatmentDetail 
        treatmentId={selectedTreatment} 
        onClose={() => setSelectedTreatment(null)} 
        onBook={handleBook}
      />
    </div>
  );
}

export default App;
