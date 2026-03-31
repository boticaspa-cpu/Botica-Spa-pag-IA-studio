import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Promo } from '../components/Promo';
import { About } from '../components/About';
import { Gallery } from '../components/Gallery';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
  onSelectTreatment: (id: string) => void;
  onBookNow: () => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectTreatment, onBookNow }) => {
  const { language, t } = useLanguage();

  return (
    <>
      <SEO />
      <main>
        <Hero onBookNow={onBookNow} />
        <Services onSelectTreatment={onSelectTreatment} />
        
        {/* View All Treatments Link */}
        <section className="py-12 bg-[#F5F2ED] text-center">
          <Link 
            to="/treatments"
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
              <span className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-4 block">FAQ</span>
              <h2 className="text-4xl font-serif font-light">
                {language === 'en' ? 'Common Questions' : 'Preguntas Frecuentes'}
              </h2>
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
      </main>
    </>
  );
};
