import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { SEO } from '../components/SEO';
import { FAQS_EN, FAQS_ES } from '../data/faqs';

export const FAQPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';
  const faqs = isEn ? FAQS_EN : FAQS_ES;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <SEO
        title={isEn
          ? 'FAQ | In Home Massage Playa del Carmen | Botica Spa'
          : 'Preguntas Frecuentes | Masaje a Domicilio Playa del Carmen | Botica Spa'}
        description={isEn
          ? 'Answers to the most common questions about booking an in-home massage in Playa del Carmen with Botica Spa. Safety, pricing, areas covered, and more.'
          : 'Respuestas a las preguntas más frecuentes sobre reservar un masaje a domicilio en Playa del Carmen con Botica Spa. Seguridad, precios, zonas y más.'}
        url="https://boticaspa.com/faq"
        faqs={faqs}
      />
      <main className="pt-32 pb-24 bg-[#F5F2ED]">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-tight mb-6"
          >
            {isEn ? 'Frequently Asked' : 'Preguntas'}{' '}
            <span className="italic font-light">
              {isEn ? 'Questions' : 'Frecuentes'}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 mb-16 max-w-xl leading-relaxed"
          >
            {isEn
              ? 'Everything you need to know about booking an in-home massage in Playa del Carmen.'
              : 'Todo lo que necesitas saber sobre reservar un masaje a domicilio en Playa del Carmen.'}
          </motion.p>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl border border-[#E8E4DC] overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left"
                >
                  <span className="font-serif text-[#1A1A1A] text-lg pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#5A5A40] flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="px-7 pb-6 text-[#1A1A1A]/70 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center bg-[#1A1A1A] rounded-3xl p-10"
          >
            <p className="text-white/60 text-sm mb-2">
              {isEn ? 'Still have questions?' : '¿Tienes más preguntas?'}
            </p>
            <p className="font-serif text-white text-2xl mb-6">
              {isEn ? 'We reply in minutes on WhatsApp.' : 'Respondemos en minutos por WhatsApp.'}
            </p>
            <a
              href="https://wa.me/529842687428"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-[#F5F2ED] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {isEn ? 'Chat on WhatsApp' : 'Escribir por WhatsApp'}
            </a>
          </motion.div>
        </div>
      </main>
    </>
  );
};
