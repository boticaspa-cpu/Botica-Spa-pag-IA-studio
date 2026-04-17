import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../LanguageContext';
import { toLangPath } from './LangLink';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  faqs?: { q: string; a: string }[];
  breadcrumbs?: { name: string; url: string }[];
  aggregateRating?: { ratingValue: number; reviewCount: number };
}

const BASE = 'https://boticaspa.com';

export const SEO: React.FC<SEOProps> = ({ title, description, url = "https://boticaspa.com/", faqs, breadcrumbs, aggregateRating }) => {
  const { t, language } = useLanguage();

  // Compute EN and ES canonical URLs
  const enPath = url.replace(BASE, '');
  const esPath = toLangPath(enPath, 'es');
  const enUrl = `${BASE}${enPath}`;
  const esUrl = `${BASE}${esPath}`;
  const canonicalUrl = language === 'es' ? esUrl : enUrl;

  const defaultTitle = 'Massage Playa del Carmen | In-Home Spa | Botica Spa';

  const defaultDescription = 'In-home massage in Playa del Carmen. We bring certified therapists to your hotel, Airbnb, or villa. Relaxing, deep tissue, four-hands & more. Book now.';

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content="massage playa del carmen, in-home massage playa del carmen, four hands massage playa del carmen, deep tissue massage playa del carmen, spa playa del carmen, relaxing massage playa del carmen, massage hotel playa del carmen, massage airbnb playa del carmen, facial playa del carmen, mobile spa playa del carmen" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title || 'Massage Playa del Carmen | In-Home Spa | Botica Spa'} />
      <meta property="og:description" content={description || 'In-home massage in Playa del Carmen. We bring certified therapists to your hotel, Airbnb, or villa. Relaxing, deep tissue, four-hands & more.'} />
      <meta property="og:image" content="https://boticaspa.com/og-image.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title || 'Massage Playa del Carmen | In-Home Spa | Botica Spa'} />
      <meta name="twitter:description" content={description || 'In-home massage in Playa del Carmen. We bring certified therapists to your hotel, Airbnb, or villa.'} />
      <meta name="twitter:image" content="https://boticaspa.com/og-image.jpg" />

      {/* Canonical + hreflang */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="es" href={esUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />

      {/* FAQPage schema */}
      {faqs && faqs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
      )}

      {/* BreadcrumbList schema */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((crumb, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": crumb.name,
              "item": crumb.url
            }))
          })}
        </script>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
          "name": "Botica Spa",
          "description": "Premium mobile massage service in Playa del Carmen. We bring certified therapists to your hotel, villa, or Airbnb. Serving Playa del Carmen, Playacar, Tulum, Cancún, Akumal and Puerto Morelos.",
          "image": "https://boticaspa.com/logo.png",
          "@id": "https://boticaspa.com",
          "url": "https://boticaspa.com",
          "telephone": t.social.phone,
          "serviceType": "Mobile Massage / In-Home Spa Service",
          "areaServed": [
            { "@type": "City", "name": "Playa del Carmen" },
            { "@type": "City", "name": "Playacar" },
            { "@type": "City", "name": "Tulum" },
            { "@type": "City", "name": "Cancún" },
            { "@type": "City", "name": "Akumal" },
            { "@type": "City", "name": "Puerto Morelos" }
          ],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Playa del Carmen",
            "addressRegion": "Quintana Roo",
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
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": aggregateRating ? String(aggregateRating.ratingValue) : "5.0",
            "reviewCount": aggregateRating ? String(aggregateRating.reviewCount) : "47",
            "bestRating": "5",
            "worstRating": "1"
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

