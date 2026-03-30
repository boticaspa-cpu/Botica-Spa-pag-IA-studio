import React, { useState } from 'react';
import { SEO } from './components/SEO';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { BookingSystem } from './components/BookingSystem';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from './LanguageContext';
import { Globe } from 'lucide-react';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
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
        <Services onBook={() => setIsBookingOpen(true)} />
        <About />
        <Gallery />
        
        {/* Testimonials Section */}
        <section className="py-32 px-4 bg-white overflow-hidden">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-12 block">{t.testimonials.badge}</span>
              <div className="space-y-10">
                <p className="text-3xl md:text-4xl font-serif italic text-gray-800 leading-relaxed">
                  "{t.testimonials.items[0].text}"
                </p>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-[1px] bg-gray-200 mb-4" />
                  <p className="font-medium uppercase tracking-[0.2em] text-sm text-gray-900">{t.testimonials.items[0].author}</p>
                  <p className="text-xs text-gray-400 italic">{t.testimonials.items[0].location}</p>
                </div>
              </div>
            </motion.div>
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

      <AnimatePresence>
        {isBookingOpen && (
          <BookingSystem 
            isOpen={isBookingOpen} 
            onClose={() => setIsBookingOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
