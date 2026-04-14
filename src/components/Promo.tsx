import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { Sparkles, ArrowRight } from 'lucide-react';

export const Promo: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e8e4d8 0%, #d6cfbe 50%, #c8bfa8 100%)' }}>
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#b5a88a] rounded-full blur-[180px] opacity-25" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#c9b99a] rounded-full blur-[150px] opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white/30 backdrop-blur-xl border border-white/40 rounded-[3rem] p-8 md:p-16 overflow-hidden relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-full text-[10px] uppercase tracking-[0.2em] font-bold mb-8"
              >
                <Sparkles className="w-3 h-3" />
                {t.promo.badge}
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-serif text-[#1A1A1A] mb-6 leading-tight"
              >
                {t.promo.title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-[#1A1A1A]/60 text-lg mb-10 font-light leading-relaxed max-w-md"
              >
                {t.promo.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-2 mb-12"
              >
                <span className="text-[#1A1A1A]/40 text-xs uppercase tracking-widest">{t.promo.offer}</span>
                <span className="text-5xl md:text-7xl font-serif text-[#1A1A1A]">{t.promo.price}</span>
              </motion.div>

              <motion.a
                href={`https://wa.me/529842687428?text=${encodeURIComponent(language === 'en'
                  ? "Hi! I'd like to claim the Monthly Special 🌿\n\n2 Four-Hands Massages for $7,399 MXN\n\nCould you help me book this offer? Thank you!"
                  : "¡Hola! Me gustaría reclamar el Especial del Mes 🌿\n\n2 Masajes a Cuatro Manos por $7,399 MXN\n\n¿Me pueden ayudar a reservar esta oferta? ¡Gracias!")}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="px-10 py-5 bg-white text-[#1A1A1A] rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-brand hover:text-white transition-all duration-300"
              >
                {t.promo.cta}
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl"
              >
                <img
                  src="/masaje-cuatro-manos.webp"
                  alt="Four-hands massage promo — two therapists, double the relaxation"
                  width={600}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-6 -right-6 w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center text-center p-4 shadow-2xl rotate-12"
              >
                <span className="text-[#1A1A1A] font-serif text-2xl font-bold leading-none">Best</span>
                <span className="text-brand text-[10px] uppercase tracking-widest font-bold">Value</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
