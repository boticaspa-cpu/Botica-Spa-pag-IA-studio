import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Mail, Phone, MapPin, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { format, addDays, startOfDay, isSameDay } from 'date-fns';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { cn } from '../lib/utils';
import { useLanguage } from '../LanguageContext';

export const BookingSystem = ({ isOpen, onClose, initialServiceId }: { isOpen: boolean, onClose: () => void, initialServiceId?: string | null }) => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(initialServiceId ? 2 : 1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const SERVICES = [
    { 
      id: 'relaxing', 
      name: t.services.items.relaxing.name, 
      description: t.services.items.relaxing.desc,
      prices: { '60 min': 1800, '90 min': 2400, '120 min': 3000 }
    },
    { 
      id: 'deep-tissue', 
      name: t.services.items.deepTissue.name, 
      description: t.services.items.deepTissue.desc,
      prices: { '60 min': 2100, '90 min': 2800, '120 min': 3500 }
    },
    { 
      id: 'personalized', 
      name: t.services.items.personalized.name, 
      description: t.services.items.personalized.desc,
      prices: { '60 min': 2000, '90 min': 2700, '120 min': 3400 }
    },
    { 
      id: 'four-hands', 
      name: t.services.items.fourHands.name, 
      description: t.services.items.fourHands.desc,
      prices: { '60 min': 3500, '90 min': 4800 }
    },
  ];

  const initialService = initialServiceId ? SERVICES.find(s => s.id === initialServiceId) : null;

  const [formData, setFormData] = useState({
    serviceId: initialService?.id || '',
    serviceName: initialService?.name || '',
    duration: initialService ? Object.keys(initialService.prices)[0] : '',
    price: initialService ? Object.values(initialService.prices)[0] : 0,
    date: new Date(),
    time: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: '',
    notes: ''
  });

  const TIME_SLOTS = [
    '09:00 AM', '10:30 AM', '12:00 PM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'
  ];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const bookingData = {
        ...formData,
        date: format(formData.date, 'yyyy-MM-dd'),
        status: 'pending',
        createdAt: serverTimestamp(),
        language: language
      };
      
      await addDoc(collection(db, 'bookings'), bookingData);

      // Send confirmation email via backend API
      try {
        await fetch('/api/send-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerEmail: formData.customerEmail,
            customerName: formData.customerName,
            serviceName: formData.serviceName,
            date: format(formData.date, language === 'en' ? 'MMMM do, yyyy' : 'd MMMM, yyyy'),
            time: formData.time,
            address: formData.address,
            price: formData.price,
            language: language
          }),
        });
      } catch (emailError) {
        // Log email error but don't fail the whole booking process
        console.error("Error sending confirmation email:", emailError);
      }

      setSuccess(true);
    } catch (error) {
      console.error("Error creating booking:", error);
      alert(t.booking.error);
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
            <img 
              src="input_file_0.png" 
              alt="Logo" 
              className="w-10 h-10 object-contain"
              referrerPolicy="no-referrer"
            />
            <div>
              <h2 className="text-2xl font-serif font-medium">{t.booking.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{t.booking.step} {step} {t.booking.of} 4</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h3 className="text-3xl font-serif mb-4">{t.booking.successTitle}</h3>
                <p className="text-gray-600 mb-8">{t.booking.successDesc}</p>
                <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-black text-white rounded-full uppercase tracking-widest text-sm"
                >
                  {t.booking.close}
                </button>
              </motion.div>
            ) : (
              <>
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                      <User className="w-5 h-5 text-gray-400" /> {t.booking.step1Title}
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      {SERVICES.map(service => (
                        <div
                          key={service.id}
                          className={cn(
                            "p-6 text-left border rounded-2xl transition-all duration-300",
                            formData.serviceId === service.id ? "border-black bg-black/5" : "border-gray-200"
                          )}
                        >
                          <div className="mb-4">
                            <h4 className="font-medium text-lg">{service.name}</h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {service.description}
                            </p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(service.prices).map(([duration, price]) => (
                              <button
                                key={duration}
                                onClick={() => {
                                  setFormData({ 
                                    ...formData, 
                                    serviceId: service.id, 
                                    serviceName: service.name,
                                    duration: duration,
                                    price: price
                                  });
                                  handleNext();
                                }}
                                className={cn(
                                  "px-4 py-2 rounded-full border text-sm transition-all",
                                  formData.serviceId === service.id && formData.duration === duration
                                    ? "bg-black border-black text-white"
                                    : "border-gray-200 hover:border-black"
                                )}
                              >
                                {duration} • ${price}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" /> {t.booking.step2Title}
                    </h3>
                    
                    <div className="mb-8">
                      <p className="text-sm text-gray-500 mb-4 uppercase tracking-widest">{t.booking.dates}</p>
                      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                        {[...Array(7)].map((_, i) => {
                          const date = addDays(new Date(), i);
                          const isSelected = isSameDay(date, formData.date);
                          return (
                            <button
                              key={i}
                              onClick={() => setFormData({ ...formData, date })}
                              className={cn(
                                "flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center transition-all",
                                isSelected ? "bg-black text-white" : "bg-gray-50 hover:bg-gray-100"
                              )}
                            >
                              <span className="text-xs uppercase opacity-60 mb-1">{format(date, 'EEE')}</span>
                              <span className="text-xl font-medium">{format(date, 'd')}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-4 uppercase tracking-widest">{t.booking.times}</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {TIME_SLOTS.map(time => (
                          <button
                            key={time}
                            onClick={() => setFormData({ ...formData, time })}
                            className={cn(
                              "py-3 rounded-xl border text-sm transition-all",
                              formData.time === time ? "bg-black border-black text-white" : "border-gray-200 hover:border-gray-400"
                            )}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12 flex justify-between">
                      <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-black">
                        <ChevronLeft className="w-4 h-4" /> {t.booking.back}
                      </button>
                      <button 
                        disabled={!formData.time}
                        onClick={handleNext}
                        className="px-8 py-3 bg-black text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        {t.booking.continue}
                      </button>
                    </div>
                  </motion.div>
                )}

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
                            className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all"
                            placeholder="Juan Pérez"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs uppercase tracking-widest text-gray-500">{t.booking.email}</label>
                          <input 
                            type="email" 
                            required
                            value={formData.customerEmail}
                            onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
                            className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all"
                            placeholder="juan@ejemplo.com"
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
                          className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all"
                          placeholder="+52 ..."
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-widest text-gray-500">{t.booking.address}</label>
                        <textarea 
                          required
                          value={formData.address}
                          onChange={e => setFormData({ ...formData, address: e.target.value })}
                          className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-black transition-all h-24 resize-none"
                          placeholder={t.booking.addressPlaceholder}
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
                        className="px-8 py-3 bg-black text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        {t.booking.review}
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h3 className="text-lg font-medium mb-6">{t.booking.step4Title}</h3>
                    <div className="bg-gray-50 rounded-2xl p-6 space-y-4 mb-8">
                      <div className="flex justify-between items-start border-b border-gray-200 pb-4">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{t.nav.treatments}</p>
                          <p className="font-medium">{formData.serviceName} ({formData.duration})</p>
                        </div>
                        <p className="font-serif text-xl">${formData.price} MXN</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-b border-gray-200 pb-4">
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Fecha</p>
                          <p className="font-medium">{format(formData.date, language === 'en' ? 'MMMM do, yyyy' : 'd MMMM, yyyy')}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Hora</p>
                          <p className="font-medium">{formData.time}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Ubicación</p>
                        <p className="font-medium">{formData.address}</p>
                      </div>
                    </div>

                    <p className="text-xs text-gray-400 text-center mb-8">
                      {t.booking.termsNote}
                    </p>

                    <div className="flex justify-between">
                      <button onClick={handleBack} className="flex items-center gap-2 text-gray-500 hover:text-black">
                        <ChevronLeft className="w-4 h-4" /> {t.booking.back}
                      </button>
                      <button 
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-12 py-4 bg-black text-white rounded-full font-medium uppercase tracking-widest text-sm shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                      >
                        {loading ? t.booking.processing : t.booking.confirm}
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
