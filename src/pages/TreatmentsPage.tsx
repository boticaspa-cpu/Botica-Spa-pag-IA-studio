import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { Sparkles, ArrowRight, Plus } from 'lucide-react';
import { SEO } from '../components/SEO';

interface TreatmentsPageProps {
  onSelectTreatment: (id: string) => void;
}

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({ onSelectTreatment }) => {
  const { language } = useLanguage();
  const t = translations[language];

  const allServices = [
    {
      id: 'botica',
      image: 'input_file_12.png',
      price: t.services.items.botica.price60,
    },
    {
      id: 'fourHands',
      image: 'input_file_16.png',
      price: t.services.items.fourHands.price60,
    },
    {
      id: 'deepTissue',
      image: 'input_file_8.png',
      price: t.services.items.deepTissue.price60,
    },
    {
      id: 'relaxing',
      image: 'input_file_4.png',
      price: t.services.items.relaxing.price60,
    },
    {
      id: 'personalized',
      image: 'input_file_12.png',
      price: t.services.items.personalized.price60,
    },
    {
      id: 'facial',
      image: 'input_file_16.png',
      price: t.services.items.facial.price60,
    },
  ];

  return (
    <>
      <SEO 
        title={language === 'en' ? 'Our Treatment Menu | Botica Spa' : 'Nuestro Menú de Tratamientos | Botica Spa'}
        description={language === 'en' ? 'Explore our full range of premium spa rituals including signature massages, deep tissue, and revitalizing facials.' : 'Explora nuestra gama completa de rituales de spa premium, incluyendo masajes exclusivos, tejido profundo y faciales revitalizantes.'}
      />
      <main className="pt-32 pb-24 bg-[#F5F2ED]">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-16 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <Sparkles className="w-5 h-5 text-[#5A5A40]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#5A5A40] font-bold">
                {t.services.badge}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-tight"
            >
              {language === 'en' ? 'Full Treatment Rituals' : 'Rituales Completos de Tratamiento'}
            </motion.h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service, index) => {
              const item = (t.services.items as any)[service.id];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
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
                    
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="mb-6">
                        <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-white/70 text-xs md:text-sm leading-relaxed italic line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-left">
                          <span className="text-white/60 text-[10px] uppercase tracking-widest block mb-1">
                            {t.services.from}
                          </span>
                          <span className="text-xl md:text-2xl font-serif text-white">
                            ${service.price.toLocaleString(undefined, { minimumFractionDigits: service.price % 1 !== 0 ? 2 : 0 })} {t.services.currency}
                          </span>
                        </div>
                        <button
                          onClick={() => onSelectTreatment(service.id)}
                          className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-[#1A1A1A] transition-all duration-300"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onSelectTreatment(service.id)}
                        className="w-full py-3 bg-white text-[#1A1A1A] rounded-xl flex items-center justify-center gap-2 hover:bg-[#5A5A40] hover:text-white transition-all duration-300 text-xs font-bold tracking-widest uppercase"
                      >
                        {t.services.viewDetails}
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};
