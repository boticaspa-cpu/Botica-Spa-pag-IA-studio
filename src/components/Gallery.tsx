import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

const GALLERY_IMAGES = [
  'input_file_1.png',
  'input_file_2.png',
  'input_file_6.png',
  'input_file_9.png',
  'input_file_10.png',
  'input_file_11.png',
];

export const Gallery = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 px-4 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-4 block">{t.gallery.badge}</span>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">{t.gallery.title}</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <img 
                src={img} 
                alt={`Spa experience ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
