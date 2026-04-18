import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Plus, X, MessageCircle, ChevronLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguage } from '../LanguageContext';

const WHATSAPP_NUMBER = '529842687428';

interface GuestService {
  serviceId: string;
  serviceName: string;
  duration: string;
  price: number;
}

function buildWhatsAppUrl(guests: GuestService[], email: string) {
  const guestLines = guests.map(
    (g, i) => `   Guest ${i + 1}: ${g.serviceName}, ${g.duration} ($${g.price} MXN)`
  );
  const total = guests.reduce((sum, g) => sum + g.price, 0);
  const lines = [
    `Hello! I'd like to book a massage with Botica Spa 🌿`,
    ``,
    `🧖 Services:`,
    ...guestLines,
    ``,
    `💰 Total: $${total} MXN`,
    `📧 Email: ${email}`,
    ``,
    `Please help me find an available time!`,
  ];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export const BookingSystem = ({ isOpen, onClose, initialServiceId }: { isOpen: boolean, onClose: () => void, initialServiceId?: string | null }) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');

  const SERVICES = [
    {
      id: 'botica',
      name: t.services.items.botica.name,
      description: t.services.items.botica.desc,
      prices: {
        '90 min': t.services.items.botica.price90,
        '120 min': t.services.items.botica.price120,
      },
    },
    {
      id: 'fourHands',
      name: t.services.items.fourHands.name,
      description: t.services.items.fourHands.desc,
      prices: {
        '90 min': t.services.items.fourHands.price90,
      },
    },
    {
      id: 'deepTissue',
      name: t.services.items.deepTissue.name,
      description: t.services.items.deepTissue.desc,
      prices: {
        '60 min': t.services.items.deepTissue.price60,
        '90 min': t.services.items.deepTissue.price90,
        '120 min': t.services.items.deepTissue.price120,
      },
    },
    {
      id: 'relaxing',
      name: t.services.items.relaxing.name,
      description: t.services.items.relaxing.desc,
      prices: {
        '60 min': t.services.items.relaxing.price60,
        '90 min': t.services.items.relaxing.price90,
        '120 min': t.services.items.relaxing.price120,
      },
    },
    {
      id: 'personalized',
      name: t.services.items.personalized.name,
      description: t.services.items.personalized.desc,
      prices: {
        '60 min': t.services.items.personalized.price60,
        '90 min': t.services.items.personalized.price90,
        '120 min': t.services.items.personalized.price120,
      },
    },
    {
      id: 'facial',
      name: t.services.items.facial.name,
      description: t.services.items.facial.desc,
      prices: {
        '60 min': t.services.items.facial.price60,
      },
    },
  ];

  const [expandedGuest, setExpandedGuest] = useState<number>(0);
  const emptyGuest = (): GuestService => ({ serviceId: '', serviceName: '', duration: '', price: 0 });
  const [guests, setGuests] = useState<GuestService[]>([emptyGuest()]);

  React.useEffect(() => {
    if (isOpen) {
      if (initialServiceId) {
        const service = SERVICES.find(s => s.id === initialServiceId);
        if (service) {
          const firstDuration = Object.keys(service.prices)[0];
          const firstPrice = Object.values(service.prices)[0] as number;
          setGuests([{ serviceId: service.id, serviceName: service.name, duration: firstDuration, price: firstPrice }]);
        }
      } else {
        setGuests([emptyGuest()]);
        setExpandedGuest(0);
      }
      setStep(0);
      setEmail('');
    }
  }, [isOpen, initialServiceId, language]);

  const totalPrice = guests.reduce((sum, g) => sum + g.price, 0);
  const allGuestsSelected = guests.length > 0 && guests.every(g => g.serviceId !== '');

  const selectServiceForGuest = (guestIndex: number, service: typeof SERVICES[0], duration: string, price: number) => {
    setGuests(prev => prev.map((g, i) =>
      i === guestIndex ? { serviceId: service.id, serviceName: service.name, duration, price } : g
    ));
    const nextUnselected = guests.findIndex((g, i) => i > guestIndex && g.serviceId === '');
    if (nextUnselected !== -1) setExpandedGuest(nextUnselected);
    else setExpandedGuest(-1);
  };

  const addGuest = () => {
    setGuests(prev => [...prev, emptyGuest()]);
    setExpandedGuest(guests.length);
  };

  const removeGuest = (index: number) => {
    setGuests(prev => prev.filter((_, i) => i !== index));
    setExpandedGuest(-1);
  };

  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(guests, email);
    window.open(url, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-[#F9F8F6]">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Botica Spa" width={48} height={48} className="w-12 h-12 object-contain" />
            <div>
              <h2 className="text-2xl font-serif font-medium">{t.booking.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {step === 0
                  ? (language === 'en' ? "Let's get started" : 'Empecemos')
                  : (language === 'en' ? 'Pick your treatment' : 'Elige tu tratamiento')}
              </p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close booking" className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <svg className="w-6 h-6" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <>
              {/* Step 0 — Email */}
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-serif mb-2">{language === 'en' ? 'Book Your Massage' : 'Reserva tu Masaje'}</h3>
                  <p className="text-sm text-gray-500 mb-6">{language === 'en' ? "Enter your email and we'll get you set up in seconds." : 'Escribe tu email y te ayudamos en segundos.'}</p>
                  <div className="space-y-1 mb-6">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Email</label>
                    <input
                      type="email"
                      autoFocus
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && email) { fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) }).catch(() => {}); setStep(1); } }}
                      className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <button
                    disabled={!email}
                    onClick={() => {
                      fetch('/api/leads', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email }),
                      }).catch(() => {});
                      setStep(1);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white rounded-2xl font-medium text-sm shadow-lg hover:bg-brand-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {language === 'en' ? 'Book on WhatsApp' : 'Reservar por WhatsApp'}
                  </button>
                </motion.div>
              )}

              {/* Step 1 — Select services */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" /> {t.booking.step1Title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">{language === 'en' ? 'Each person can choose a different treatment and duration.' : 'Cada persona puede elegir un tratamiento y duración diferente.'}</p>

                  <div className="space-y-4">
                    {guests.map((guest, gIdx) => {
                      const isExpanded = expandedGuest === gIdx;
                      const isSelected = guest.serviceId !== '';
                      return (
                        <div key={gIdx} className={cn("border rounded-2xl overflow-hidden transition-all", isSelected ? "border-brand" : "border-gray-200")}>
                          <button
                            onClick={() => setExpandedGuest(isExpanded ? -1 : gIdx)}
                            aria-expanded={isExpanded}
                            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} treatment selection for Guest ${gIdx + 1}`}
                            className="w-full flex items-center justify-between p-4 text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium", isSelected ? "bg-brand text-white" : "bg-gray-100 text-gray-500")}>
                                {gIdx + 1}
                              </div>
                              <div>
                                <p className="font-medium text-sm">{language === 'en' ? `Guest ${gIdx + 1}` : `Persona ${gIdx + 1}`}</p>
                                {isSelected ? (
                                  <p className="text-xs text-brand">{guest.serviceName} · {guest.duration} · ${guest.price} MXN</p>
                                ) : (
                                  <p className="text-xs text-gray-500">{language === 'en' ? 'Tap to choose a treatment' : 'Toca para elegir un tratamiento'}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {guests.length > 1 && (
                                <button
                                  type="button"
                                  aria-label={`Remove guest ${gIdx + 1}`}
                                  onClick={e => { e.stopPropagation(); removeGuest(gIdx); }}
                                  className="p-1 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors"
                                >
                                  <X className="w-4 h-4" aria-hidden="true" />
                                </button>
                              )}
                              <span className={cn("text-gray-500 transition-transform", isExpanded && "rotate-180")}>▾</span>
                            </div>
                          </button>

                          {isExpanded && (
                            <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50/50">
                              {SERVICES.map(service => (
                                <div key={service.id} className="space-y-1.5">
                                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">{service.name}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {Object.entries(service.prices).map(([dur, price]) => {
                                      const selected = guest.serviceId === service.id && guest.duration === dur;
                                      return (
                                        <button
                                          key={dur}
                                          onClick={() => selectServiceForGuest(gIdx, service, dur, price as number)}
                                          className={cn(
                                            "px-3 py-1.5 rounded-full border text-xs transition-all",
                                            selected ? "bg-brand border-brand text-white" : "border-gray-200 bg-white hover:border-brand"
                                          )}
                                        >
                                          {dur} · ${price as number} MXN
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={addGuest}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-2xl text-sm text-gray-500 hover:border-brand hover:text-brand transition-all"
                  >
                    <Plus className="w-4 h-4" /> {language === 'en' ? 'Add another person' : 'Agregar otra persona'}
                  </button>

                  {totalPrice > 0 && (
                    <div className="mt-6 flex justify-between items-center bg-brand/5 border border-brand/20 rounded-xl px-4 py-3">
                      <span className="text-sm text-gray-600">{guests.filter(g => g.serviceId).length} service{guests.filter(g => g.serviceId).length !== 1 ? 's' : ''} selected</span>
                      <span className="font-serif text-xl text-brand">${totalPrice} <span className="text-xs font-sans text-gray-500">MXN</span></span>
                    </div>
                  )}

                  <div className="mt-6 flex justify-between items-center">
                    <button onClick={() => setStep(0)} className="flex items-center gap-2 text-gray-500 hover:text-black">
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" /> {t.booking.back}
                    </button>
                    <button
                      disabled={!allGuestsSelected}
                      onClick={handleWhatsApp}
                      className="flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-2xl font-medium text-sm shadow-lg hover:bg-brand-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <MessageCircle className="w-5 h-5" />
                      {language === 'en' ? 'Open WhatsApp to confirm' : 'Abrir WhatsApp para confirmar'}
                    </button>
                  </div>
                </motion.div>
              )}
            </>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
