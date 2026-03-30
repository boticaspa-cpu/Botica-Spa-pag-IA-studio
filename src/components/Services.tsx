import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export const Services = ({ onBook }: { onBook: () => void }) => {
  const { t } = useLanguage();

  const SERVICES = [
    { 
      id: 'relaxing', 
      name: t.services.items.relaxing.name, 
      price: 1800, 
      image: 'input_file_0.png',
      description: t.services.items.relaxing.desc 
    },
    { 
      id: 'deep-tissue', 
      name: t.services.items.deepTissue.name, 
      price: 2100, 
      image: 'input_file_8.png',
      description: t.services.items.deepTissue.desc 
    },
    { 
      id: 'personalized', 
      name: t.services.items.personalized.name, 
      price: 2000, 
      image: 'input_file_4.png',
      description: t.services.items.personalized.desc 
    },
    { 
      id: 'four-hands', 
      name: t.services.items.fourHands.name, 
      price: 3500, 
      image: 'input_file_12.png',
      description: t.services.items.fourHands.desc 
    },
  ];

  return (
    <section id="services" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="input_file_0.png" 
              alt="Logo" 
              className="w-8 h-8 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs uppercase tracking-[0.4em] text-gray-400 block">{t.services.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light">{t.services.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
                <div className="absolute bottom-6 left-6 right-6">
                  <button 
                    onClick={onBook}
                    className="w-full py-4 bg-white text-black rounded-full text-xs uppercase tracking-widest font-medium opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl"
                  >
                    {t.services.select}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-serif">{service.name}</h3>
                <span className="text-sm font-medium text-gray-400">{t.services.from} ${service.price}</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
