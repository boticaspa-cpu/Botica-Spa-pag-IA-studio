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
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.88) contrast(1.0) saturate(1.2) sepia(0.2)' }}
        >
          Your browser does not support the video tag.
        </video>
        {/* White-gold light burst — champagne sunrise */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 90% 60% at 50% 25%, rgba(255,248,220,0.25) 0%, rgba(255,236,180,0.1) 50%, transparent 100%)'
        }} />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to top, rgba(10,8,4,0.5) 0%, rgba(10,8,4,0.25) 40%, rgba(10,8,4,0.1) 70%, transparent 100%)'
        }} />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* H1 — painted at opacity:1 immediately so Lighthouse records LCP at first frame */}
        <h1 className="text-5xl md:text-7xl lg:text-[8rem] font-serif font-light leading-[0.9] mb-12 tracking-tight" style={{ color: '#fff', textShadow: '0 2px 30px rgba(0,0,0,0.7), 0 4px 60px rgba(0,0,0,0.5)' }}>
          {t.hero.title} <br />
          <motion.span
            initial={{ x: -12 }}
            animate={{ x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="italic"
          >
            {t.hero.titleItalic}.
          </motion.span>
        </h1>

        {/* Subtitle and CTAs animate in — opacity animation only on non-LCP elements */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-lg md:text-xl text-white/95 font-sans font-light mb-16 max-w-2xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

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
