import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useLanguage } from '../LanguageContext';

export const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const areas = [
    { name: 'Playa del Carmen', fee: isEn ? 'No travel fee' : 'Sin cargo de traslado', primary: true },
    { name: 'Playacar', fee: isEn ? 'No travel fee' : 'Sin cargo de traslado', primary: true },
    { name: 'Puerto Aventuras', fee: isEn ? 'Travel fee may apply' : 'Cargo de traslado posible', primary: false },
    { name: 'Puerto Morelos', fee: isEn ? 'Travel fee applies' : 'Cargo de traslado', primary: false },
    { name: 'Akumal', fee: isEn ? 'Travel fee may apply' : 'Cargo de traslado posible', primary: false },
  ];

  return (
    <>
      <SEO
        title={isEn
          ? 'Contact Botica Spa | Book Your In Home Massage Playa del Carmen'
          : 'Contacto Botica Spa | Reserva tu Masaje a Domicilio Playa del Carmen'}
        description={isEn
          ? 'Contact Botica Spa to book your in home massage in Playa del Carmen. Reach us via WhatsApp, email or phone. We serve Playa del Carmen, Tulum, Cancún and the Riviera Maya.'
          : 'Contacta a Botica Spa para reservar tu masaje a domicilio en Playa del Carmen. Escríbenos por WhatsApp, email o teléfono. Servicio en toda la Riviera Maya.'}
        url="https://boticaspa.com/contact"
      />
      <main className="pt-32 pb-24 bg-[#F5F2ED]">
        <div className="max-w-4xl mx-auto px-6">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif text-[#1A1A1A] leading-tight mb-4"
          >
            {isEn ? 'Book a Massage' : 'Reserva tu Masaje'}{' '}
            <span className="italic font-light">{isEn ? 'in Playa del Carmen' : 'en Playa del Carmen'}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 max-w-xl mb-16"
          >
            {isEn
              ? 'The fastest way to book is WhatsApp. We reply in minutes. You can also reach us by email or phone.'
              : 'La forma más rápida de reservar es por WhatsApp. Respondemos en minutos. También puedes escribirnos por email o llamarnos.'}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">

            {/* WhatsApp — primary CTA */}
            <motion.a
              href="https://wa.me/529842687428"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="col-span-1 md:col-span-2 flex items-center gap-6 bg-[#1A1A1A] text-white rounded-3xl p-8 hover:bg-[#2A2A2A] transition-colors group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-1">WhatsApp</p>
                <p className="text-2xl font-serif">+52 984 268 7428</p>
                <p className="text-white/60 text-sm mt-1">
                  {isEn ? 'Tap to open WhatsApp. We reply in minutes.' : 'Toca para abrir WhatsApp. Respondemos en minutos.'}
                </p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href="mailto:boticaspa@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-5 bg-white rounded-3xl p-7 border border-[#E8E4DC] hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F5F2ED] flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#5A5A40]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">Email</p>
                <p className="font-serif text-[#1A1A1A] text-lg">boticaspa@gmail.com</p>
              </div>
            </motion.a>

            {/* Phone */}
            <motion.a
              href="tel:+529842687428"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-5 bg-white rounded-3xl p-7 border border-[#E8E4DC] hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F5F2ED] flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[#5A5A40]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">{isEn ? 'Phone' : 'Teléfono'}</p>
                <p className="font-serif text-[#1A1A1A] text-lg">+52 984 268 7428</p>
              </div>
            </motion.a>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-5 bg-white rounded-3xl p-7 border border-[#E8E4DC]"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F5F2ED] flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#5A5A40]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">{isEn ? 'Hours' : 'Horario'}</p>
                <p className="font-serif text-[#1A1A1A] text-lg">{isEn ? 'Daily 8 am – 9 pm' : 'Todos los días 8 am – 9 pm'}</p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-5 bg-white rounded-3xl p-7 border border-[#E8E4DC]"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F5F2ED] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#5A5A40]" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-1">{isEn ? 'Base' : 'Base'}</p>
                <p className="font-serif text-[#1A1A1A] text-lg">Playa del Carmen, MX</p>
              </div>
            </motion.div>
          </div>

          {/* Service area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-6">
              {isEn ? 'Service Area' : 'Área de Servicio'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {areas.map(area => (
                <div
                  key={area.name}
                  className={`rounded-2xl p-5 border flex flex-col gap-1 ${area.primary ? 'bg-white border-[#D6CFBE]' : 'bg-[#F9F8F6] border-gray-100'}`}
                >
                  <span className="font-serif text-[#1A1A1A]">{area.name}</span>
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${area.primary ? 'text-[#5A5A40]' : 'text-gray-400'}`}>
                    {area.fee}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
    </>
  );
};
