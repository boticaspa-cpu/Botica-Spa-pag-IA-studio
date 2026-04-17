import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import { translations } from '../translations';
import { SEO } from '../components/SEO';
import { ArrowRight, MessageCircle, MapPin } from 'lucide-react';

interface CityConfig {
  name: string;
  heroImage: string;
  titleEn: string;
  descEn: string;
  h1En: string;
  introEn: string;
  notesEn: string;
  whatsappMsg: string;
}

const cityConfigs: Record<string, CityConfig> = {
  tulum: {
    name: 'Tulum',
    heroImage: '/spa-interior.webp',
    titleEn: 'Massage Tulum | In-Home Spa at Your Villa or Hotel | Botica Spa',
    descEn: 'In-home massage in Tulum. We bring certified therapists to your villa, hotel or Airbnb. Relaxing, deep tissue, four-hands & more. Book on WhatsApp.',
    h1En: 'Massage in Tulum',
    introEn: 'Botica Spa brings certified therapists and a full professional setup — massage table, organic oils, aromatherapy — directly to your Tulum villa, boutique hotel, or Airbnb. No need to leave your oasis.',
    notesEn: 'We travel from Playa del Carmen to Tulum. A small travel fee applies depending on your exact location — ask us on WhatsApp before booking.',
    whatsappMsg: "Hi! I'd like to book an in-home massage in Tulum 🌿 Could you help me?",
  },
  cancun: {
    name: 'Cancún',
    heroImage: '/masaje-relajante.webp',
    titleEn: 'Massage Cancún | In-Home Spa at Your Hotel or Villa | Botica Spa',
    descEn: 'In-home massage in Cancún. Certified therapists delivered to your hotel, Airbnb, or villa. Relaxing, deep tissue, four-hands & more. Book now.',
    h1En: 'Massage in Cancún',
    introEn: 'Botica Spa brings the spa to you — certified therapists, professional table, organic oils — at your Cancún hotel, vacation rental, or private villa. Perfect for groups, couples, and solo travelers.',
    notesEn: 'We travel from Playa del Carmen to Cancún. A travel fee applies — confirm your exact zone on WhatsApp before booking.',
    whatsappMsg: "Hi! I'd like to book an in-home massage in Cancún 🌿 Could you help me?",
  },
  akumal: {
    name: 'Akumal',
    heroImage: '/galeria-1.webp',
    titleEn: 'Massage Akumal | In-Home Spa | Botica Spa',
    descEn: 'In-home massage in Akumal. We bring certified therapists to your villa or hotel in Akumal Bay. Relaxing, deep tissue, four-hands & more.',
    h1En: 'Massage in Akumal',
    introEn: 'Enjoy a professional in-home massage at your Akumal villa or hotel. Botica Spa brings everything needed for a luxury spa experience — organic oils, massage table, fresh linens — so you never have to leave your beachfront retreat.',
    notesEn: 'Akumal is within our service area. Travel fee may apply depending on your exact location — ask us on WhatsApp.',
    whatsappMsg: "Hi! I'd like to book an in-home massage in Akumal 🌿 Could you help me?",
  },
  playacar: {
    name: 'Playacar',
    heroImage: '/galeria-2.webp',
    titleEn: 'Massage Playacar | In-Home Spa at Your Villa | Botica Spa',
    descEn: 'In-home massage in Playacar. Certified therapists delivered to your villa or hotel in Playacar Phase 1 & 2. Relaxing, deep tissue, four-hands & more.',
    h1En: 'Massage in Playacar',
    introEn: 'Botica Spa serves villas and hotels throughout Playacar Phase 1 and Phase 2. Our therapists arrive with everything — table, linens, organic oils — and handle full setup and breakdown so your only job is to relax.',
    notesEn: 'Playacar is within our primary service area. No travel fee for most Playacar locations.',
    whatsappMsg: "Hi! I'd like to book an in-home massage in Playacar 🌿 Could you help me?",
  },
};

const allServices = [
  { id: 'botica', slug: 'botica-signature', image: '/masaje-botica.webp', priceKey: 'price90' as const },
  { id: 'fourHands', slug: 'four-hands-massage', image: '/masaje-cuatro-manos.webp', priceKey: 'price90' as const },
  { id: 'deepTissue', slug: 'deep-tissue-massage', image: '/masaje-profundo.webp', priceKey: 'price60' as const },
  { id: 'relaxing', slug: 'relaxing-massage', image: '/masaje-relajante.webp', priceKey: 'price60' as const },
  { id: 'personalized', slug: 'personalized-massage', image: '/spa-detalle.webp', priceKey: 'price60' as const },
  { id: 'facial', slug: 'revitalizing-facial', image: '/masaje-cuatro-manos.webp', priceKey: 'price60' as const },
];

interface LocationPageProps {
  city: string;
  onBookNow: () => void;
}

export const LocationPage: React.FC<LocationPageProps> = ({ city, onBookNow }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const config = cityConfigs[city];

  if (!config) return null;

  const whatsappUrl = `https://wa.me/529842687428?text=${encodeURIComponent(config.whatsappMsg)}`;
  const slug = `massage-${city}`;

  return (
    <>
      <SEO
        title={config.titleEn}
        description={config.descEn}
        url={`https://boticaspa.com/${slug}`}
        breadcrumbs={[
          { name: 'Home', url: 'https://boticaspa.com/' },
          { name: `${config.name} Massage`, url: `https://boticaspa.com/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative h-[65vh] min-h-[480px] flex items-end overflow-hidden">
        <img
          src={config.heroImage}
          alt={`In-home massage in ${config.name}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-8 pb-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-[#C9B99A]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#C9B99A] font-bold">
                Botica Spa · {config.name}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-4">
              {config.h1En}
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed">
              {config.introEn}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-[#F5F2ED] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Book on WhatsApp
              </a>
              <button
                onClick={onBookNow}
                className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                Book & Pay Online
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-[#F5F2ED] py-20">
        <div className="max-w-5xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-[#5A5A40] font-bold block mb-3">
              {t.services.badge}
            </span>
            <h2 className="text-4xl font-serif text-[#1A1A1A]">
              {language === 'en' ? `Treatments Available in ${config.name}` : `Tratamientos disponibles en ${config.name}`}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((service, index) => {
              const item = (t.services.items as any)[service.id];
              const price = item[service.priceKey];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group relative"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-xl shadow-black/5">
                    <img
                      src={service.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className="text-xl font-serif text-white mb-1 leading-tight">
                        {item.name}
                      </h3>
                      <p className="text-white/60 text-xs leading-relaxed italic line-clamp-2 mb-4">
                        {item.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-white/50 text-[10px] uppercase tracking-widest block mb-0.5">
                            {t.services.from}
                          </span>
                          <span className="text-lg font-serif text-white">
                            ${price?.toLocaleString()} {t.services.currency}
                          </span>
                        </div>
                        <Link
                          to={`/massages/${service.slug}`}
                          className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl flex items-center justify-center hover:bg-white hover:text-[#1A1A1A] transition-all duration-300"
                          aria-label={`View details for ${item.name}`}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Travel note + CTA */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#F9F8F6] rounded-3xl p-10 border border-[#E8E4DC]"
          >
            <MapPin className="w-6 h-6 text-[#5A5A40] mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3">
              {language === 'en' ? 'We Come to You' : 'Vamos a Ti'}
            </h3>
            <p className="text-[#1A1A1A]/60 text-sm leading-relaxed mb-8 max-w-md mx-auto">
              {config.notesEn}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#1A1A1A] text-white px-10 py-4 rounded-full font-medium text-sm uppercase tracking-widest hover:bg-[#2A2A2A] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {language === 'en' ? `Book a Massage in ${config.name}` : `Reservar en ${config.name}`}
            </a>
          </motion.div>

          {/* Internal links to other cities */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
              {language === 'en' ? 'Also available in' : 'También disponible en'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {Object.entries(cityConfigs)
                .filter(([key]) => key !== city)
                .map(([key, cfg]) => (
                  <Link
                    key={key}
                    to={`/massage-${key}`}
                    className="px-5 py-2 border border-gray-200 rounded-full text-xs uppercase tracking-widest text-gray-500 hover:border-[#5A5A40] hover:text-[#5A5A40] transition-colors"
                  >
                    {cfg.name}
                  </Link>
                ))}
              <Link
                to="/massages"
                className="px-5 py-2 border border-gray-200 rounded-full text-xs uppercase tracking-widest text-gray-500 hover:border-[#5A5A40] hover:text-[#5A5A40] transition-colors"
              >
                Playa del Carmen
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
