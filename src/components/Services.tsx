import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { ArrowRight, Sparkles, Plus } from 'lucide-react';

interface ServicesProps {
  onSelectTreatment: (id: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectTreatment }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const services = [
    {
      id: 'relaxing',
      image: 'input_file_16.png',
      price: t.services.items.relaxing.price60,
    },
    {
      id: 'deepTissue',
      image: 'input_file_8.png',
      price: t.services.items.deepTissue.price60,
    },
    {
      id: 'personalized',
      image: 'input_file_4.png',
      price: t.services.items.personalized.price60,
    },
    {
      id: 'fourHands',
      image: 'input_file_12.png',
      price: t.services.items.fourHands.price60,
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#F5F2ED] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5E5E5] rounded-full blur-[100px] opacity-30 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5A5A40] rounded-full blur-[100px] opacity-10 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-4"
          >
            <Sparkles className="w-5 h-5 text-[#5A5A40]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#5A5A40] font-bold">
              {t.services.badge}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-tight"
          >
            {t.services.title}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {services.map((service, index) => {
            const item = (t.services.items as any)[service.id];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/5">
                  <img
                    src={service.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-serif text-white mb-3 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-white/70 text-sm md:text-base max-w-xs leading-relaxed italic">
                          {item.desc}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-white/60 text-xs uppercase tracking-widest block mb-1">
                          {t.services.from}
                        </span>
                        <span className="text-2xl md:text-3xl font-serif text-white">
                          ${service.price}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => onSelectTreatment(service.id)}
                        className="flex-1 py-4 bg-white text-[#1A1A1A] rounded-2xl flex items-center justify-center gap-2 hover:bg-[#5A5A40] hover:text-white transition-all duration-300 font-semibold tracking-wide"
                      >
                        {t.services.viewDetails}
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onSelectTreatment(service.id)}
                        className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl flex items-center justify-center hover:bg-white hover:text-[#1A1A1A] transition-all duration-300"
                      >
                        <ArrowRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

