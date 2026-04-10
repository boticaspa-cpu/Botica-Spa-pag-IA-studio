import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../LanguageContext';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, url = "https://boticaspa.com/" }) => {
  const { language, t } = useLanguage();

  const defaultTitle = language === 'en' 
    ? 'The Art of In-Home Relaxation | Botica Spa Playa del Carmen' 
    : 'El Arte de la Relajación a Domicilio | Botica Spa Playa del Carmen';
  
  const defaultDescription = language === 'en' 
    ? 'Premium wellness rituals delivered to your private sanctuary in Playa del Carmen. Experience signature relaxation, deep tissue recovery, and bespoke therapy at home.' 
    : 'Rituales de bienestar premium en la comodidad de tu espacio privado en Playa del Carmen. Masajes relajantes, tejido profundo y terapia a medida a domicilio.';

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content="masajes a domicilio playa del carmen, in-home massage playa del carmen, spa a domicilio playa del carmen, massage therapy playa del carmen, relaxing massage playa del carmen, deep tissue massage playa del carmen, bachelorette spa playa del carmen, masajes para grupos playa del carmen, facial playa del carmen, four hands massage playa del carmen" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title || (language === 'en' ? 'Botica Spa | Premium In-Home Wellness' : 'Botica Spa | Bienestar Premium a Domicilio')} />
      <meta property="og:description" content={description || (language === 'en' 
        ? 'Luxury spa rituals delivered to your door in Playa del Carmen. Certified therapists, organic oils, and total serenity.' 
        : 'Rituales de spa de lujo en tu puerta en Playa del Carmen. Terapeutas certificados, aceites orgánicos y serenidad total.')} />
      <meta property="og:image" content="https://boticaspa.com/og-image.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title || (language === 'en' ? 'Botica Spa | Premium In-Home Wellness' : 'Botica Spa | Bienestar Premium a Domicilio')} />
      <meta name="twitter:description" content={description || (language === 'en' 
        ? 'Luxury spa rituals delivered to your door in Playa del Carmen.' 
        : 'Rituales de spa de lujo en tu puerta en Playa del Carmen.')} />
      <meta name="twitter:image" content="https://boticaspa.com/og-image.jpg" />

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
          "name": "Botica Spa",
          "image": "https://boticaspa.com/logo.png",
          "@id": "https://boticaspa.com",
          "url": "https://boticaspa.com",
          "telephone": t.social.phone,
          "serviceType": "Mobile Spa / In-Home Massage Service",
          "areaServed": [
            { "@type": "City", "name": "Playa del Carmen" },
            { "@type": "City", "name": "Tulum" },
            { "@type": "City", "name": "Cancún" },
            { "@type": "City", "name": "Akumal" },
            { "@type": "City", "name": "Puerto Morelos" }
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Playa del Carmen",
            "addressRegion": "Quintana Roo",
            "postalCode": "77710",
            "addressCountry": "MX"
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "08:00",
            "closes": "21:00"
          },
          "sameAs": [
            "https://www.facebook.com/boticaspa",
            "https://www.instagram.com/boticaspa"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Spa Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Botica Signature Massage",
                  "description": "Our exclusive signature ritual combining multiple techniques for the ultimate escape."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Four-Hands Massage",
                  "description": "Two therapists working in perfect synchronicity for total immersion."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Deep Tissue Massage",
                  "description": "Targeted, intense pressure to release chronic tension."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Relaxing Massage",
                  "description": "A gentle, rhythmic journey designed to dissolve stress."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Personalized Massage",
                  "description": "A custom-tailored treatment designed specifically for your body's unique needs."
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Revitalizing Facial",
                  "description": "A refreshing treatment to restore your skin's natural glow and vitality."
                }
              }
            ]
          }
        })}
      </script>
    </Helmet>
  );
};

