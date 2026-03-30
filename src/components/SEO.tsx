import React from 'react';

export const SEO = () => {
  return (
    <>
      <title>Botica Spa | Masajes a Domicilio en Playa del Carmen</title>
      <meta name="description" content="Masajes de lujo a domicilio en Playa del Carmen. Llevamos el spa a tu hotel, Airbnb o villa. Terapeutas certificados. Reserva tu sesión hoy." />
      <meta name="keywords" content="masaje playa del carmen, masaje a domicilio, spa playa del carmen, masaje tejido profundo, masaje relajante, masaje en casa" />
      
      {/* Open Graph */}
      <meta property="og:title" content="Botica Spa | Masajes a Domicilio en Playa del Carmen" />
      <meta property="og:description" content="Masajes de lujo a domicilio en Playa del Carmen. Llevamos el spa a tu hotel, Airbnb o villa." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://boticaspa.com/" />
      <meta property="og:image" content="input_file_3.png" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Botica Spa | Masajes a Domicilio en Playa del Carmen" />
      <meta name="twitter:description" content="Masajes de lujo a domicilio en Playa del Carmen. Terapeutas certificados." />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Botica Spa",
          "image": "input_file_3.png",
          "description": "Masajes de lujo a domicilio en Playa del Carmen.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Playa del Carmen",
            "addressRegion": "Quintana Roo",
            "addressCountry": "MX"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 20.6296,
            "longitude": -87.0739
          },
          "url": "https://boticaspa.com/",
          "telephone": "+529840000000",
          "priceRange": "$$",
          "openingHoursSpecification": [
            {
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
              "opens": "09:00",
              "closes": "21:00"
            }
          ]
        })}
      </script>
    </>
  );
};
