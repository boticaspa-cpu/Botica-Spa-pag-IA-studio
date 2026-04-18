import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

const GALLERY_IMAGES = [
  { src: '/galeria-1.webp', alt: 'In home massage session Playa del Carmen. Botica Spa therapist at work' },
  { src: '/galeria-2.webp', alt: 'Luxury in home spa setup at a Playa del Carmen villa' },
  { src: '/galeria-3.webp', alt: 'Relaxing massage treatment delivered to hotel room. Botica Spa' },
  { src: '/galeria-4.webp', alt: 'Four-hands massage experience in Playa del Carmen by Botica Spa' },
  { src: '/galeria-5.webp', alt: 'Mobile spa aromatherapy oils and tools. Botica Spa Riviera Maya' },
  { src: '/galeria-6.webp', alt: 'Professional massage table setup in Airbnb. Botica Spa in home service' },
];

export const Gallery = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 px-4 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-4 block">{t.gallery.badge}</span>
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
                src={img.src}
                alt={img.alt}
                width={600}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
