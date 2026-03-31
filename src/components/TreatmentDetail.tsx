import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';

interface TreatmentDetailProps {
  treatmentId: string | null;
  onClose: () => void;
  onBook: (treatmentId: string) => void;
}

export const TreatmentDetail: React.FC<TreatmentDetailProps> = ({ treatmentId, onClose, onBook }) => {
  const { language } = useLanguage();
  const t = translations[language];

  if (!treatmentId) return null;

  const treatment = (t.services.items as any)[treatmentId];

  return (
    <AnimatePresence>
      {treatmentId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#F5F2ED] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
            >
              <X className="w-6 h-6 text-[#1A1A1A]" />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-${
                  treatmentId === 'relaxing' ? '1544161515-436cead10245' :
                  treatmentId === 'deepTissue' ? '1519823551278-64ac92734fb1' :
                  treatmentId === 'personalized' ? '1600334129128-685c5582fd35' :
                  '1515377905703-c4788e51af15'
                }?auto=format&fit=crop&q=80&w=1200`}
                alt={treatment.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
              <div className="absolute bottom-6 left-6 md:hidden">
                <h2 className="text-3xl font-serif text-white">{treatment.name}</h2>
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="hidden md:block mb-8">
                <span className="text-xs uppercase tracking-[0.2em] text-[#5A5A40] font-semibold mb-2 block">
                  {t.services.badge}
                </span>
                <h2 className="text-4xl font-serif text-[#1A1A1A] leading-tight">
                  {treatment.name}
                </h2>
              </div>

              <p className="text-lg text-[#4A4A4A] leading-relaxed mb-8 italic">
                {treatment.desc}
              </p>

              <div className="space-y-8">
                {/* Details */}
                <div>
                  <p className="text-[#1A1A1A] leading-relaxed">
                    {treatment.details}
                  </p>
                </div>

                {/* Pricing & Duration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-[#E5E5E5]">
                    <div className="flex items-center gap-2 text-[#5A5A40] mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider font-semibold">{t.services.duration}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-[#4A4A4A]">60 {t.services.minutes} — <span className="font-semibold">${treatment.price60} MXN</span></p>
                      <p className="text-sm text-[#4A4A4A]">90 {t.services.minutes} — <span className="font-semibold">${treatment.price90} MXN</span></p>
                      {treatment.price120 && (
                        <p className="text-sm text-[#4A4A4A]">120 {t.services.minutes} — <span className="font-semibold">${treatment.price120} MXN</span></p>
                      )}
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-[#E5E5E5]">
                    <div className="flex items-center gap-2 text-[#5A5A40] mb-2">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs uppercase tracking-wider font-semibold">{t.services.includes}</span>
                    </div>
                    <ul className="space-y-1">
                      {treatment.includesList.map((item: string, i: number) => (
                        <li key={i} className="text-xs text-[#4A4A4A] flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-[#5A5A40] mt-1.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#5A5A40] mb-4">
                    {t.services.benefits}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {treatment.benefitsList.map((benefit: string, i: number) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#5A5A40] shrink-0" />
                        <span className="text-sm text-[#4A4A4A]">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={() => onBook(treatmentId)}
                  className="w-full py-5 bg-[#1A1A1A] text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-[#2A2A2A] transition-all group shadow-lg shadow-black/10"
                >
                  <span className="font-semibold tracking-wide">{t.hero.ctaBook}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
