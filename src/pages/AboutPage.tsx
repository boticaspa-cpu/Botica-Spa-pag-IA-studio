import React from 'react';
import { motion } from 'motion/react';
import { About } from '../components/About';
import { SEO } from '../components/SEO';
import { useLanguage } from '../LanguageContext';

export const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  return (
    <>
      <SEO
        title="About Botica Spa | Gina Agassini & Our Story | In Home Spa Playa del Carmen"
        description="Meet Gina Agassini, founder of Botica Spa. Born from years at luxury hotels in the Riviera Maya — Grand Velas, Azul Fives, and Mayakoba, built around one belief: the best massage happens in your own space."
        url="https://boticaspa.com/about"
      />
      <main className="pt-32 pb-0 bg-[#F5F2ED]">
        <div className="container mx-auto px-6 pb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-tight max-w-3xl"
          >
            {language === 'en' ? 'Botica Spa' : 'Botica Spa'}{' '}
            <span className="italic font-light">
              {language === 'en' ? 'Playa del Carmen' : 'Playa del Carmen'}
            </span>
          </motion.h1>
        </div>
        <About />
      </main>
    </>
  );
};
