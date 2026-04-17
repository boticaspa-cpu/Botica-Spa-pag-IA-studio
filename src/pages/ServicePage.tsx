import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check, Clock, ArrowLeft, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { SEO } from '../components/SEO';

interface ServicePageProps {
  onBookNow: (serviceId: string) => void;
}

// Map URL slug → translation key + image + SEO
const serviceConfig: Record<string, {
  key: string;
  image: string;
  titleEn: string;
  descEn: string;
  titleEs: string;
  descEs: string;
}> = {
  'relaxing-massage': {
    key: 'relaxing',
    image: '/masaje-relajante.webp',
    titleEn: 'Relaxing Massage in Playa del Carmen | In-Home Spa | Botica Spa',
    descEn: 'Book a professional relaxing massage at your hotel, villa or Airbnb in Playa del Carmen. Certified therapists, organic oils, delivered to your door. From $1,700 MXN.',
    titleEs: 'Masaje Relajante a Domicilio en Playa del Carmen | Botica Spa',
    descEs: 'Reserva un masaje relajante profesional en tu hotel, villa o Airbnb en Playa del Carmen. Terapeutas certificadas, aceites orgánicos, a domicilio.',
  },
  'deep-tissue-massage': {
    key: 'deepTissue',
    image: '/masaje-profundo.webp',
    titleEn: 'Deep Tissue Massage Playa del Carmen | In-Home | Botica Spa',
    descEn: 'Expert deep tissue massage delivered to your villa, hotel or Airbnb in Playa del Carmen. Release chronic tension with certified therapists. From $1,700 MXN.',
    titleEs: 'Masaje de Tejido Profundo a Domicilio Playa del Carmen | Botica Spa',
    descEs: 'Masaje de tejido profundo a domicilio en Playa del Carmen. Libera la tensión crónica con terapeutas certificadas.',
  },
  'four-hands-massage': {
    key: 'fourHands',
    image: '/masaje-cuatro-manos.webp',
    titleEn: 'Four-Hands Massage Playa del Carmen | Two Therapists | Botica Spa',
    descEn: 'Experience a luxury four-hands massage at your villa or hotel in Playa del Carmen. Two certified therapists in perfect synchronicity. From $3,900 MXN.',
    titleEs: 'Masaje a Cuatro Manos en Playa del Carmen | Botica Spa',
    descEs: 'Masaje a cuatro manos a domicilio en Playa del Carmen. Dos terapeutas certificadas en perfecta sincronía.',
  },
  'botica-signature': {
    key: 'botica',
    image: '/masaje-botica.webp',
    titleEn: 'Botica Signature Massage Playa del Carmen | Luxury In-Home Spa',
    descEn: 'Our exclusive signature ritual blending Swedish, Deep Tissue and Aromatherapy. The ultimate in-home spa experience in Playa del Carmen. From $1,700 MXN.',
    titleEs: 'Masaje Botica Signature Playa del Carmen | Spa a Domicilio de Lujo',
    descEs: 'Nuestro ritual exclusivo que combina sueco, tejido profundo y aromaterapia. La experiencia de spa a domicilio más completa en Playa del Carmen.',
  },
  'personalized-massage': {
    key: 'personalized',
    image: '/spa-detalle.webp',
    titleEn: 'Personalized Massage Playa del Carmen | Custom In-Home Therapy | Botica Spa',
    descEn: 'A custom-tailored massage designed for your unique needs, delivered to your hotel or Airbnb in Playa del Carmen. Certified therapists. From $1,700 MXN.',
    titleEs: 'Masaje Personalizado a Domicilio Playa del Carmen | Botica Spa',
    descEs: 'Masaje personalizado a domicilio en Playa del Carmen. Tu terapeuta diseña la sesión según tus necesidades únicas.',
  },
  'revitalizing-facial': {
    key: 'facial',
    image: '/masaje-cuatro-manos.webp',
    titleEn: 'Revitalizing Facial Treatment Playa del Carmen | In-Home | Botica Spa',
    descEn: 'Professional organic facial treatment delivered to your villa or hotel in Playa del Carmen. Restore your skin\'s natural glow after a day at the beach. $1,700 MXN.',
    titleEs: 'Facial Revitalizante a Domicilio Playa del Carmen | Botica Spa',
    descEs: 'Tratamiento facial orgánico a domicilio en Playa del Carmen. Restaura el brillo de tu piel después de un día en la playa.',
  },
};

export const ServicePage: React.FC<ServicePageProps> = ({ onBookNow }) => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { language } = useLanguage();
  const t = translations[language];

  const config = serviceId ? serviceConfig[serviceId] : null;
  if (!config) return <Navigate to="/massages" replace />;

  const item = (t.services.items as any)[config.key];
  if (!item) return <Navigate to="/massages" replace />;

  const seoTitle = language === 'en' ? config.titleEn : config.titleEs;
  const seoDesc = language === 'en' ? config.descEn : config.descEs;
  const canonicalUrl = `https://boticaspa.com/massages/${serviceId}`;

  const durations: { mins: number; price: number }[] = [];
  if (item.price60) durations.push({ mins: 60, price: item.price60 });
  if (item.price90) durations.push({ mins: 90, price: item.price90 });
  if (item.price120) durations.push({ mins: 120, price: item.price120 });

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDesc}
        url={canonicalUrl}
        breadcrumbs={[
          { name: 'Home', url: 'https://boticaspa.com/' },
          { name: 'Massages', url: 'https://boticaspa.com/massages' },
          { name: item.name, url: canonicalUrl },
        ]}
      />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
        <img
          src={config.image}
          alt={`${item.name} in Playa del Carmen — in-home massage by Botica Spa`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-8 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/massages"
              className="inline-flex items-center gap-2 text-white/60 text-xs uppercase tracking-widest hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-3 h-3" />
              {language === 'en' ? 'All Treatments' : 'Todos los Tratamientos'}
            </Link>
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-4 h-4 text-[#C9B99A]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9B99A] font-bold">
                {t.services.badge}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
              {item.name}
            </h1>
            <p className="mt-4 text-white/70 text-lg max-w-xl leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#F5F2ED] py-20">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-12">

              {/* About this treatment */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-2xl font-serif text-[#1A1A1A] mb-4">
                  {language === 'en' ? 'About This Treatment' : 'Sobre este Tratamiento'}
                </h2>
                <p className="text-[#1A1A1A]/70 leading-relaxed text-lg">
                  {item.details}
                </p>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-serif text-[#1A1A1A] mb-6">
                  {t.services.benefits}
                </h2>
                <ul className="space-y-3">
                  {item.benefitsList.map((benefit: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#5A5A40] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[#1A1A1A]/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Includes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-serif text-[#1A1A1A] mb-6">
                  {t.services.includes}
                </h2>
                <ul className="space-y-3">
                  {item.includesList.map((inc: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#C9B99A]/40 border border-[#C9B99A] flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-[#5A5A40]" />
                      </div>
                      <span className="text-[#1A1A1A]/80">{inc}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Service area note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-6 border border-[#E8E4DC]"
              >
                <h3 className="font-serif text-[#1A1A1A] text-lg mb-2">
                  {language === 'en' ? '📍 Service Area' : '📍 Área de Servicio'}
                </h3>
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed">
                  {language === 'en'
                    ? 'We are based in Playa del Carmen and serve all hotels, villas, and Airbnbs in the area. We also travel to Tulum, Cancún, Akumal, and Puerto Morelos — a travel fee applies outside of Playa del Carmen.'
                    : 'Estamos basados en Playa del Carmen y atendemos todos los hoteles, villas y Airbnbs de la zona. También viajamos a Tulum, Cancún, Akumal y Puerto Morelos — aplica cargo de traslado fuera de Playa del Carmen.'}
                </p>
              </motion.div>
            </div>

            {/* Right: Booking card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-black/5 border border-[#E8E4DC] sticky top-28">
                <h3 className="font-serif text-[#1A1A1A] text-xl mb-2">
                  {language === 'en' ? 'Book This Treatment' : 'Reservar este Tratamiento'}
                </h3>
                <p className="text-[#1A1A1A]/50 text-xs mb-6">
                  {language === 'en'
                    ? 'Delivered to your hotel, villa or Airbnb'
                    : 'A domicilio en tu hotel, villa o Airbnb'}
                </p>

                {/* Pricing */}
                <div className="space-y-3 mb-8">
                  {durations.map(({ mins, price }) => (
                    <div
                      key={mins}
                      className="flex items-center justify-between py-3 border-b border-[#F5F2ED]"
                    >
                      <div className="flex items-center gap-2 text-[#1A1A1A]/70 text-sm">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{mins} {t.services.minutes}</span>
                      </div>
                      <span className="font-serif text-[#1A1A1A] text-lg">
                        {t.services.from} ${price.toLocaleString()} {t.services.currency}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onBookNow(config.key)}
                  className="w-full bg-[#1A1A1A] text-white py-4 rounded-full font-medium hover:bg-[#2A2A2A] transition-colors text-sm uppercase tracking-widest"
                >
                  {language === 'en' ? 'Book Now' : 'Reservar Ahora'}
                </button>

                <p className="text-center text-[#1A1A1A]/40 text-xs mt-4">
                  {language === 'en'
                    ? '30% deposit to confirm · Balance on the day'
                    : '30% depósito para confirmar · Resto el día del servicio'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related treatments */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#5A5A40] font-bold mb-4">
            {language === 'en' ? 'Explore More' : 'Explorar Más'}
          </p>
          <h2 className="text-3xl font-serif text-[#1A1A1A] mb-8">
            {language === 'en' ? 'Other Treatments' : 'Otros Tratamientos'}
          </h2>
          <Link
            to="/massages"
            className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#2A2A2A] transition-colors"
          >
            {language === 'en' ? 'View All Rituals' : 'Ver Todos los Rituales'}
          </Link>
        </div>
      </section>
    </>
  );
};
