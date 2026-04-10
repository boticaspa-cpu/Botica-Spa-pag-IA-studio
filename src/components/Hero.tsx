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
      <motion.div 
        style={{ y: videoY }} 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.25 }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          repeatType: "reverse", 
          ease: "linear" 
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.5) contrast(1.05)' }}
        >
          <source 
            src="https://cdn.pixabay.com/video/2023/10/19/185641-876115984_large.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/60 backdrop-blur-[0.5px]" />
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
            className="text-white/80 uppercase text-[10px] mb-12 block font-sans font-medium"
          >
            Botica Spa • Playa del Carmen
          </motion.span>
          
          <h1 className="text-7xl md:text-9xl lg:text-[10rem] text-white font-serif font-light leading-[0.9] mb-12 tracking-tight">
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
            className="text-lg md:text-xl text-white/70 font-sans font-light mb-16 max-w-2xl mx-auto leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookNow}
              className="px-16 py-7 bg-white text-black transition-all duration-500 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            >
              {t.hero.ctaBook}
            </motion.button>
            <motion.a 
              href="#services"
              whileHover={{ x: 8 }}
              className="text-white border-b border-white/20 hover:border-white transition-all duration-500 pb-2 text-[10px] uppercase tracking-[0.4em] font-medium"
            >
              {t.hero.ctaServices}
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
};
