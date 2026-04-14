import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, ChevronLeft, MessageCircle, CreditCard, Users, Plus, X } from 'lucide-react';
import { format, addDays, isSameDay, differenceInCalendarDays } from 'date-fns';
import { cn } from '../lib/utils';
import { useLanguage } from '../LanguageContext';

const WHATSAPP_NUMBER = '529842687428';
const DEPOSIT_PERCENT = 0.30;

interface GuestService {
  serviceId: string;
  serviceName: string;
  duration: string;
  price: number;
}

function buildWhatsAppUrl(booking: any, depositPaid?: number) {
  const guestLines = (booking.guests as GuestService[]).map(
    (g, i) => `   Guest ${i + 1}: ${g.serviceName} — ${g.duration} ($${g.price} MXN)`
  );

  const lines = [
    `Hello! I'd like to book with Botica Spa:`,
    ``,
    `🧖 Services:`,
    ...guestLines,
    ``,
    `📅 Date: ${booking.date}`,
    `⏰ Time: ${booking.time}`,
    `📍 Address: ${booking.address}`,
    ...(booking.mapsUrl ? [`🗺️ Google Maps: ${booking.mapsUrl}`] : []),
    `👤 Name: ${booking.customerName}`,
    `📧 Email: ${booking.customerEmail}`,
    `📱 Phone: ${booking.customerPhone}`,
    ``,
    `💰 Total: $${booking.totalPrice} MXN`,
    `💳 30% Deposit: $${booking.depositAmount} MXN`,
  ];

  if (depositPaid != null) {
    lines.push(``, `✅ 30% deposit paid: $${depositPaid.toFixed(2)} MXN`);
  }

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function buildQuickWhatsAppUrl(guests: GuestService[], email: string) {
  const guestLines = guests.map(
    (g, i) => `   Guest ${i + 1}: ${g.serviceName} — ${g.duration} ($${g.price} MXN)`
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
  const [loading, setLoading] = useState(false);
  const [bookingMode, setBookingMode] = useState<'quick' | 'advance'>('quick');

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

  // Which guest card is expanded (showing service options)
  const [expandedGuest, setExpandedGuest] = useState<number>(0);

  const emptyGuest = (): GuestService => ({ serviceId: '', serviceName: '', duration: '', price: 0 });

  const [guests, setGuests] = useState<GuestService[]>([emptyGuest()]);

  const [formData, setFormData] = useState({
    date: new Date(),
    time: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
  });

  React.useEffect(() => {
    if (isOpen) {
      if (initialServiceId) {
        const service = SERVICES.find(s => s.id === initialServiceId);
        if (service) {
          const firstDuration = Object.keys(service.prices)[0];
          const firstPrice = Object.values(service.prices)[0] as number;
          setGuests([{ serviceId: service.id, serviceName: service.name, duration: firstDuration, price: firstPrice }]);
          setBookingMode('quick');
          setStep(1);
        }
      } else {
        setGuests([emptyGuest()]);
        setExpandedGuest(0);
        setStep(0);
      }
      setFormData(prev => ({ ...prev, date: new Date(), time: '', customerEmail: '' }));
    }
  }, [isOpen, initialServiceId, language]);

  // Hours 8–20 (8 AM to 8 PM start)
  const HOURS = Array.from({ length: 13 }, (_, i) => i + 8);
  const MINUTES = [0, 10, 15, 20, 30, 40, 45, 50];

  const [selectedHour, setSelectedHour] = useState(10);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const formatTime = (h: number, m: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayH}:${m.toString().padStart(2, '0')} ${period}`;
  };

  const isTimePast = (h: number, m: number, selectedDate: Date) => {
    if (!isSameDay(selectedDate, new Date())) return false;
    const slotDate = new Date(selectedDate);
    slotDate.setHours(h, m, 0, 0);
    return slotDate < new Date();
  };

  React.useEffect(() => {
    const timeStr = formatTime(selectedHour, selectedMinute);
    if (!isTimePast(selectedHour, selectedMinute, formData.date)) {
      setFormData(prev => ({ ...prev, time: timeStr }));
    } else {
      setFormData(prev => ({ ...prev, time: '' }));
    }
  }, [selectedHour, selectedMinute, formData.date]);

  const daysAhead = differenceInCalendarDays(formData.date, new Date());
  const requiresDeposit = daysAhead >= 5;
  const totalPrice = guests.reduce((sum, g) => sum + g.price, 0);
  const depositAmount = Math.round(totalPrice * DEPOSIT_PERCENT * 100) / 100;
  const balanceDue = Math.round((totalPrice - depositAmount) * 100) / 100;

  const allGuestsSelected = guests.length > 0 && guests.every(g => g.serviceId !== '');

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const selectServiceForGuest = (guestIndex: number, service: typeof SERVICES[0], duration: string, price: number) => {
    setGuests(prev => prev.map((g, i) =>
      i === guestIndex ? { serviceId: service.id, serviceName: service.name, duration, price } : g
    ));
    // Auto-expand next guest if it hasn't been selected yet
    const nextUnselected = guests.findIndex((g, i) => i > guestIndex && g.serviceId === '');
    if (nextUnselected !== -1) setExpandedGuest(nextUnselected);
    else setExpandedGuest(-1); // collapse all when all selected
  };

  const addGuest = () => {
    setGuests(prev => [...prev, emptyGuest()]);
    setExpandedGuest(guests.length); // expand new guest
  };

  const removeGuest = (index: number) => {
    setGuests(prev => prev.filter((_, i) => i !== index));
    setExpandedGuest(-1);
  };

  const getBookingPayload = () => ({
    guests,
    totalPrice,
    depositAmount,
    date: format(formData.date, 'MMMM do, yyyy'),
    time: formData.time,
    customerName: formData.customerName,
    customerEmail: formData.customerEmail,
    customerPhone: formData.customerPhone,
    address: formData.address,
  });

  const handleWhatsApp = () => {
    const url = buildWhatsAppUrl(getBookingPayload());
    window.open(url, '_blank');
    onClose();
  };

  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: depositAmount, bookingData: getBookingPayload() }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Could not initiate payment. Please try again.');
      }
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
                {step === 0 ? "Let's get started" : bookingMode === 'quick' ? `Pick your treatment` : `${t.booking.step} ${step} ${t.booking.of} 4`}
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
              {/* ─── Step 0 — Email capture ─── */}
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-2xl font-serif mb-2">Book Your Massage</h3>
                  <p className="text-sm text-gray-400 mb-6">Enter your email and we'll get you set up in seconds.</p>
                  <div className="space-y-1 mb-6">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Email</label>
                    <input
                      type="email"
                      autoFocus
                      value={formData.customerEmail}
                      onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
                      onKeyDown={e => { if (e.key === 'Enter' && formData.customerEmail) handleNext(); }}
                      className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>

                  {/* Two paths */}
                  <div className="space-y-3">
                    <button
                      disabled={!formData.customerEmail}
                      onClick={() => {
                        fetch('/api/leads', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email: formData.customerEmail }),
                        }).catch(() => {});
                        setBookingMode('quick');
                        setStep(1);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white rounded-2xl font-medium text-sm shadow-lg hover:bg-brand-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Book on WhatsApp — pick a service &amp; chat now
                    </button>
                    <button
                      disabled={!formData.customerEmail}
                      onClick={() => {
                        fetch('/api/leads', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ email: formData.customerEmail }),
                        }).catch(() => {});
                        setBookingMode('advance');
                        setStep(1);
                      }}
                      className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-gray-100 text-gray-700 rounded-2xl text-sm hover:bg-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Calendar className="w-4 h-4" />
                      Schedule in advance (5+ days) — pay deposit online
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-4 text-center">WhatsApp: instant reply · Advance: secure your date with a 30% deposit</p>
                </motion.div>
              )}

              {/* ─── Step 1 — Select services per guest ─── */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400" /> {t.booking.step1Title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-6">Each person can choose a different treatment and duration.</p>

                  <div className="space-y-4">
                    {guests.map((guest, gIdx) => {
                      const isExpanded = expandedGuest === gIdx;
                      const isSelected = guest.serviceId !== '';
                      return (
                        <div key={gIdx} className={cn("border rounded-2xl overflow-hidden transition-all", isSelected ? "border-brand" : "border-gray-200")}>
                          {/* Guest header */}
                          <button
                            onClick={() => setExpandedGuest(isExpanded ? -1 : gIdx)}
                            className="w-full flex items-center justify-between p-4 text-left"
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium", isSelected ? "bg-brand text-white" : "bg-gray-100 text-gray-500")}>
                                {gIdx + 1}
                              </div>
                              <div>
                                <p className="font-medium text-sm">Guest {gIdx + 1}</p>
                                {isSelected ? (
                                  <p className="text-xs text-brand">{guest.serviceName} — {guest.duration} · ${guest.price} MXN</p>
                                ) : (
                                  <p className="text-xs text-gray-400">Tap to choose a treatment</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {guests.length > 1 && (
                                <span
                                  onClick={e => { e.stopPropagation(); removeGuest(gIdx); }}
                                  className="p-1 rounded-full hover:bg-red-50 text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
                                >
                                  <X className="w-4 h-4" />
                                </span>
                              )}
                              <span className={cn("text-gray-400 transition-transform", isExpanded && "rotate-180")}>▾</span>
                            </div>
                          </button>

                          {/* Service options (expanded) */}
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

                  {/* Add guest */}
                  <button
                    onClick={addGuest}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-2xl text-sm text-gray-400 hover:border-brand hover:text-brand transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add another person
                  </button>

                  {/* Running total */}
                  {totalPrice > 0 && (
                    <div className="mt-6 flex justify-between items-center bg-brand/5 border border-brand/20 rounded-xl px-4 py-3">
                      <span className="text-sm text-gray-600">{guests.filter(g => g.serviceId).length} service{guests.filter(g => g.serviceId).length !== 1 ? 's' : ''} selected</span>
                      <span className="font-serif text-xl text-brand">${totalPrice} <span className="text-xs font-sans text-gray-400">MXN</span></span>
                    </div>
                  )}

                  <div className="mt-6">
                    {bookingMode === 'quick' ? (
                      <button
                        disabled={!allGuestsSelected}
                        onClick={() => {
                          const url = buildQuickWhatsAppUrl(guests, formData.customerEmail);
                          window.open(url, '_blank');
                          onClose();
                        }}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white rounded-2xl font-medium text-sm shadow-lg hover:bg-brand-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Open WhatsApp to confirm your booking
                      </button>
                    ) : (
                      <div className="flex justify-end">
                        <button
                          disabled={!allGuestsSelected}
                          onClick={handleNext}
                          className="px-8 py-3 bg-brand text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          {t.booking.continue}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ─── Step 2 — Date & Time ─── */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" /> {t.booking.step2Title}
                  </h3>

                  {/* Date picker */}
                  <div className="mb-8">
                    <p className="text-sm text-gray-500 mb-4 uppercase tracking-widest">{t.booking.dates}</p>
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                      {[...Array(14)].map((_, i) => {
                        const date = addDays(new Date(), i);
                        const isSelected = isSameDay(date, formData.date);
                        const days = differenceInCalendarDays(date, new Date());
                        const needsDeposit = days >= 5;
                        return (
                          <button
                            key={i}
                            onClick={() => setFormData(prev => ({ ...prev, date }))}
                            className={cn(
                              "flex-shrink-0 w-20 rounded-2xl flex flex-col items-center justify-center transition-all py-3 gap-1",
                              isSelected ? "bg-brand text-white" : "bg-gray-50 hover:bg-gray-100"
                            )}
                          >
                            <span className="text-[10px] uppercase opacity-60">{format(date, 'EEE')}</span>
                            <span className="text-xl font-medium">{format(date, 'd')}</span>
                            {needsDeposit && (
                              <span className={cn("text-[9px] uppercase tracking-wide px-1", isSelected ? "text-white/70" : "text-amber-500")}>
                                deposit
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {requiresDeposit ? (
                      <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700 flex items-start gap-2">
                        <CreditCard className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Advance booking — pay your <strong>30% deposit online</strong> to confirm instantly.</span>
                      </div>
                    ) : (
                      <div className="mt-4 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700 flex items-start gap-2">
                        <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>Last-minute booking — our team will process your <strong>30% deposit via WhatsApp</strong> to confirm.</span>
                      </div>
                    )}
                  </div>

                  {/* Time drum picker */}
                  <div>
                    <p className="text-sm text-gray-500 mb-4 uppercase tracking-widest">{t.booking.times}</p>
                    <div className="flex gap-4 justify-center">
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Hour</span>
                        <div className="h-52 overflow-y-auto flex flex-col gap-1 scroll-smooth scrollbar-hide w-full">
                          {HOURS.map(h => {
                            const past = isTimePast(h, selectedMinute, formData.date);
                            return (
                              <button
                                key={h}
                                disabled={past}
                                onClick={() => setSelectedHour(h)}
                                className={cn(
                                  "w-full py-2.5 rounded-xl text-sm font-medium transition-all",
                                  selectedHour === h ? "bg-brand text-white shadow-md" : "bg-gray-50 hover:bg-gray-100 text-gray-700",
                                  past && "opacity-30 cursor-not-allowed"
                                )}
                              >
                                {h > 12 ? h - 12 : h === 0 ? 12 : h} {h >= 12 ? 'PM' : 'AM'}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex items-center self-center text-2xl font-serif text-gray-300 pb-4">:</div>
                      <div className="flex flex-col items-center gap-1 flex-1">
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Min</span>
                        <div className="h-52 overflow-y-auto flex flex-col gap-1 scroll-smooth scrollbar-hide w-full">
                          {MINUTES.map(m => {
                            const past = isTimePast(selectedHour, m, formData.date);
                            return (
                              <button
                                key={m}
                                disabled={past}
                                onClick={() => setSelectedMinute(m)}
                                className={cn(
                                  "w-full py-2.5 rounded-xl text-sm font-medium transition-all",
                                  selectedMinute === m ? "bg-brand text-white shadow-md" : "bg-gray-50 hover:bg-gray-100 text-gray-700",
                                  past && "opacity-30 cursor-not-allowed"
                                )}
                              >
                                :{m.toString().padStart(2, '0')}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    {formData.time ? (
                      <p className="text-center mt-4 text-lg font-serif text-brand">{formData.time}</p>
                    ) : (
                      <p className="text-center mt-4 text-sm text-red-400">Selected time has passed — please choose another</p>
                    )}
                  </div>

                  <div className="mt-12 flex justify-between">
                    <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-black">
                      <ChevronLeft className="w-4 h-4" /> {t.booking.back}
                    </button>
                    <button
                      disabled={!formData.time}
                      onClick={handleNext}
                      className="px-8 py-3 bg-brand text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {t.booking.continue}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─── Step 3 — Contact info ─── */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-gray-400" /> {t.booking.step3Title}
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-gray-500">{t.booking.fullName}</label>
                        <input
                          type="text"
                          required
                          value={formData.customerName}
                          onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                          className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand transition-all"
                          placeholder="Jane Smith"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-gray-500">{t.booking.email}</label>
                        <input
                          type="email"
                          required
                          value={formData.customerEmail}
                          onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
                          className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand transition-all"
                          placeholder="jane@example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-gray-500">{t.booking.phone}</label>
                      <input
                        type="tel"
                        required
                        value={formData.customerPhone}
                        onChange={e => setFormData({ ...formData, customerPhone: e.target.value })}
                        className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand transition-all"
                        placeholder="+1 555 000 0000"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-widest text-gray-500">{t.booking.address}</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-brand transition-all"
                        placeholder="Hotel name, villa or Airbnb address"
                      />
                    </div>
                  </div>

                  <div className="mt-12 flex justify-between">
                    <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-black">
                      <ChevronLeft className="w-4 h-4" /> {t.booking.back}
                    </button>
                    <button
                      disabled={!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.address}
                      onClick={handleNext}
                      className="px-8 py-3 bg-brand text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {t.booking.review}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ─── Step 4 — Confirmation ─── */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <h3 className="text-lg font-medium mb-6">{t.booking.step4Title}</h3>

                  <div className="bg-gray-50 rounded-2xl p-6 space-y-4 mb-6">
                    {/* Per-guest services */}
                    <div className="space-y-2 border-b border-gray-200 pb-4">
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">Services</p>
                      {guests.map((g, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-brand/10 text-brand text-xs flex items-center justify-center font-medium">{i + 1}</div>
                            <span className="text-sm font-medium">{g.serviceName}</span>
                            <span className="text-xs text-gray-400">{g.duration}</span>
                          </div>
                          <span className="text-sm font-serif">${g.price} MXN</span>
                        </div>
                      ))}
                    </div>

                    {/* Date / Time */}
                    <div className="grid grid-cols-2 gap-3 border-b border-gray-200 pb-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</p>
                        <p className="font-medium text-sm">{format(formData.date, 'MMM do, yyyy')}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Time</p>
                        <p className="font-medium text-sm">{formData.time}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="border-b border-gray-200 pb-4">
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">📍 Location</p>
                      <p className="font-medium text-sm">{formData.address}</p>
                      {formData.mapsUrl && (
                        <a href={formData.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-brand hover:underline mt-1 inline-block">
                          🗺️ Ver en Google Maps →
                        </a>
                      )}
                    </div>

                    {/* Price breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between font-semibold text-base pt-1">
                        <span>Total</span>
                        <span className="font-serif text-xl text-[#1A1A1A]">${totalPrice} <span className="text-xs font-sans font-normal text-gray-400">MXN</span></span>
                      </div>
                      <div className="flex justify-between text-sm pt-1 border-t border-gray-200">
                        <span className="text-amber-700 font-medium">30% Deposit {requiresDeposit ? '(pay now online)' : '(via WhatsApp)'}</span>
                        <span className="text-amber-700 font-serif text-lg">${depositAmount} <span className="text-xs font-sans font-normal">MXN</span></span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Balance on day of service</span>
                        <span>${balanceDue} MXN</span>
                      </div>
                    </div>
                  </div>

                  {requiresDeposit ? (
                    <p className="text-xs text-gray-400 text-center mb-6">
                      After payment you'll be redirected to WhatsApp to complete your reservation with our team.
                    </p>
                  ) : (
                    <p className="text-xs text-gray-400 text-center mb-6">
                      You'll be connected to our team on WhatsApp to process your 30% deposit and confirm.
                    </p>
                  )}

                  <div className="flex justify-between items-center">
                    <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-black">
                      <ChevronLeft className="w-4 h-4" /> {t.booking.back}
                    </button>

                    {requiresDeposit ? (
                      <button
                        onClick={handleStripeCheckout}
                        disabled={loading}
                        className="flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-full font-medium uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                      >
                        <CreditCard className="w-4 h-4" />
                        {loading ? 'Redirecting…' : `Pay 30% deposit — $${depositAmount} MXN`}
                      </button>
                    ) : (
                      <button
                        onClick={handleWhatsApp}
                        className="flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-full font-medium uppercase tracking-widest text-sm shadow-xl hover:scale-105 hover:bg-brand-dark transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Book on WhatsApp
                      </button>
                    )}
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
