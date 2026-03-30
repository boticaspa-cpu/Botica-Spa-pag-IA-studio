import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export const About = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-24 px-4 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="input_file_5.png" 
              alt="Massage therapy" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white rounded-3xl overflow-hidden shadow-xl hidden md:block">
            <img 
              src="input_file_7.png" 
              alt="Botica apothecary" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex items-center gap-3">
            <img 
              src="input_file_0.png" 
              alt="Logo" 
              className="w-6 h-6 object-contain"
              referrerPolicy="no-referrer"
            />
            <span className="text-xs uppercase tracking-[0.4em] text-gray-400 block">{t.about.badge}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light leading-tight">
            {t.about.title} <br />
            <span className="italic">{t.about.titleItalic}</span>
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            {t.about.description}
          </p>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-sm font-serif">01</span>
              </div>
              <div>
                <h4 className="font-medium mb-1">{t.about.feature1Title}</h4>
                <p className="text-sm text-gray-500">{t.about.feature1Desc}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-sm font-serif">02</span>
              </div>
              <div>
                <h4 className="font-medium mb-1">{t.about.feature2Title}</h4>
                <p className="text-sm text-gray-500">{t.about.feature2Desc}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-sm font-serif">03</span>
              </div>
              <div>
                <h4 className="font-medium mb-1">{t.about.feature3Title}</h4>
                <p className="text-sm text-gray-500">{t.about.feature3Desc}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
