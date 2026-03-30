import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export const Hero = ({ onBookNow }: { onBookNow: () => void }) => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with Parallax and Overlay */}
      <motion.div style={{ y: videoY }} className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-110"
          style={{ filter: 'brightness(0.6) contrast(1.1)' }}
        >
          <source 
            src="https://cdn.pixabay.com/video/2021/09/07/87723-601955561_large.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/60 backdrop-blur-[1px]" />
      </motion.div>

      <motion.div 
        style={{ y: contentY, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="text-white/80 uppercase text-xs mb-10 block font-sans font-medium"
          >
            Botica Spa • Playa del Carmen
          </motion.span>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-serif font-light leading-[1] mb-10 tracking-tight">
            {t.hero.title} <br />
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="italic text-white/90"
            >
              {t.hero.titleItalic}.
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="text-lg md:text-2xl text-white/80 font-sans font-light mb-16 max-w-2xl mx-auto leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookNow}
              className="px-14 py-7 bg-white text-black transition-all duration-500 rounded-full text-xs uppercase tracking-[0.3em] font-bold shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              {t.hero.ctaBook}
            </motion.button>
            <motion.a 
              href="#services"
              whileHover={{ x: 8 }}
              className="text-white border-b border-white/20 hover:border-white transition-all duration-500 pb-2 text-xs uppercase tracking-[0.4em] font-medium"
            >
              {t.hero.ctaServices}
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
      >
        <span className="text-white/30 text-[9px] uppercase tracking-[0.6em] rotate-90 origin-left translate-x-2 font-medium">{t.hero.scroll}</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white/60 via-white/20 to-transparent" />
      </motion.div>
    </section>
  );
};
