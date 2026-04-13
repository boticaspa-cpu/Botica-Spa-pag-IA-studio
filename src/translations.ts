
export type Language = 'en' | 'es';

export const translations = {
  en: {
    nav: {
      treatments: 'Massages',
      about: 'About Us',
      blog: 'Blog',
      bookNow: 'Book Now',
    },
    hero: {
      title: 'The Art of In-Home',
      titleItalic: 'Massage',
      subtitle: 'Premium wellness rituals delivered to your private sanctuary in Playa del Carmen. Experience the spa, redefined.',
      ctaBook: 'Book Your Session',
      ctaServices: 'Explore Rituals',
      scroll: 'Scroll',
    },
    about: {
      badge: 'The Botica Philosophy',
      title: 'Your Private Sanctuary,',
      titleItalic: 'Reimagined.',
      description: 'At Botica Spa, we believe that true relaxation shouldn\'t require a commute. We transform your hotel, villa, or Airbnb into a world-class spa environment, allowing you to surrender to serenity without ever leaving your doorstep.',
      feature1Title: 'Elite Therapists',
      feature1Desc: 'A hand-picked team of certified experts dedicated to the art of healing and professional care.',
      feature2Title: 'Organic Elements',
      feature2Desc: 'We exclusively use premium, locally sourced organic oils and bespoke aromatherapy blends.',
      feature3Title: 'Seamless Experience',
      feature3Desc: 'From professional massage tables to curated soundscapes, we handle every detail of your escape.',
    },
    services: {
      badge: 'Our Massages',
      title: 'Curated Wellness',
      select: 'Select Massage',
      viewDetails: 'View Details',
      from: 'From',
      duration: 'Duration',
      minutes: 'min',
      includes: 'Includes',
      benefits: 'Benefits',
      currency: 'MXN',
      items: {
        facial: {
          name: 'Revitalizing Facial',
          desc: 'A refreshing treatment to restore your skin\'s natural glow and vitality.',
          details: 'Our facial treatments use organic, locally sourced ingredients to cleanse, exfoliate, and hydrate your skin, leaving you looking radiant and refreshed.',
          price60: 1700,
          benefitsList: ['Deep cleansing', 'Improved skin texture', 'Radiant complexion'],
          includesList: ['Organic skincare products', 'Facial massage', 'Hydrating mask']
        },
        relaxing: {
          name: 'Relaxing Massage',
          desc: 'A gentle, rhythmic journey designed to dissolve stress and restore inner harmony.',
          details: 'A classic relaxation massage using long, flowing strokes to calm the nervous system and promote deep relaxation.',
          price60: 1700,
          price90: 2100,
          price120: 2500,
          benefitsList: ['Reduces stress and anxiety', 'Improves circulation', 'Promotes better sleep'],
          includesList: ['Professional massage table', 'Organic aromatherapy oils', 'Relaxing soundscape']
        },
        deepTissue: {
          name: 'Deep Tissue Massage',
          desc: 'Targeted, intense pressure to release chronic tension and revitalize tired muscles.',
          details: 'A therapeutic massage that focuses on realigning deeper layers of muscles and connective tissue. Ideal for chronic aches and contracted areas.',
          price60: 1700,
          price90: 2100,
          price120: 2500,
          benefitsList: ['Relieves chronic muscle pain', 'Improves posture', 'Breaks up scar tissue'],
          includesList: ['Professional massage table', 'Therapeutic grade oils', 'Muscle relief balm']
        },
        botica: {
          name: 'Botica Signature',
          desc: 'Our exclusive signature ritual combining multiple techniques for the ultimate escape.',
          details: 'The Botica Signature is our most popular treatment, blending Swedish, Deep Tissue, and Aromatherapy into one seamless, transformative experience.',
          price90: 2100,
          price120: 2500,
          benefitsList: ['Total body restoration', 'Mental clarity', 'Exclusive technique blend'],
          includesList: ['Premium organic oils', 'Hot stone accents', 'Personalized consultation']
        },
        personalized: {
          name: 'Personalized Massage',
          desc: 'A custom-tailored treatment designed specifically for your body\'s unique needs.',
          details: 'Your therapist will consult with you to create a unique blend of techniques, focusing exactly where you need it most.',
          price60: 1700,
          price90: 2100,
          price120: 2500,
          benefitsList: ['Customized to your needs', 'Addresses specific problem areas', 'Total body balance'],
          includesList: ['Professional massage table', 'Choice of aromatherapy', 'Personalized consultation']
        },
        fourHands: {
          name: 'Four-Hands Massage',
          desc: 'The ultimate indulgence: two therapists working in perfect synchronicity for total immersion.',
          details: 'A unique experience where two therapists work together in a choreographed sequence, making it impossible for the brain to track, leading to a state of total surrender.',
          price90: 3900,
          benefitsList: ['Double the relaxation', 'Ultimate sensory experience', 'Deepest state of meditation'],
          includesList: ['Two professional therapists', 'Premium organic oils', 'Enhanced soundscape']
        },
      },
    },
    promo: {
      badge: 'Limited Time Offer',
      title: 'Monthly Special',
      description: 'Experience the ultimate luxury with a companion or treat yourself twice.',
      offer: '2 Four-Hands Massages',
      price: '$7,399 MXN',
      cta: 'Claim Offer',
    },
    social: {
      instagram: 'https://instagram.com/boticaspa',
      facebook: 'https://facebook.com/boticaspa',
      whatsapp: 'https://wa.me/529842687428',
      phone: '+52 984 268 7428',
      email: 'hola@boticaspa.com',
      location: 'Playa del Carmen, MX'
    },
    gallery: {
      badge: 'Visual Sanctuary',
      title: 'Experience the Serenity',
    },
    testimonials: {
      badge: 'Guest Experiences',
      title: 'What Our Clients Say',
      googleMapsLink: 'https://maps.app.goo.gl/sAJLAuedymWf3uBu5',
      viewOnGoogle: 'View on Google Maps',
      items: [
        {
          text: "Absolutely incredible experience. The therapist arrived on time, was extremely professional, and the massage was one of the best I've ever had. Highly recommend Botica Spa!",
          author: "Jessica Thompson",
          location: "Google Review"
        },
        {
          text: "Perfect service for our vacation. We booked a couples massage and it was so relaxing. They bring everything needed. 5 stars!",
          author: "David Miller",
          location: "Google Review"
        },
        {
          text: "The attention to detail is amazing. The oils smell divine and the pressure was perfect. Best in-home spa in Playa.",
          author: "Sofia Rodriguez",
          location: "Google Review"
        }
      ]
    },
    cta: {
      title: 'Ready for total',
      titleItalic: 'relaxation?',
      subtitle: 'Experience the sanctuary of Botica Spa in the comfort of your own home.',
      button: 'Book Your Session Now',
    },
    assistant: {
      title: 'Tina · Botica Spa',
      placeholder: 'Ask Tina about our treatments...',
      send: 'Send',
      minimize: 'Minimize',
      maximize: 'Chat with Tina',
      welcome: "Hi! I'm Tina 🌿 I'm here to tell you everything about our in-home spa rituals. What can I help you with today?",
    },
    footer: {
      desc: 'Premium in-home massage services in Playa del Carmen. Bringing the sanctuary of a world-class spa to your private space.',
      quickLinks: 'Quick Links',
      home: 'Home',
      treatments: 'Massages',
      blog: 'Blog',
      contact: 'Contact',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
    booking: {
      title: 'Reserve Your Session',
      step: 'Step',
      of: 'of',
      successTitle: 'Booking Received!',
      successDesc: 'We\'ve received your request. Our team will contact you shortly to confirm the details.',
      close: 'Close Window',
      step1Title: 'Select Treatment & Duration',
      step2Title: 'Choose Date & Time',
      step3Title: 'Your Information',
      step4Title: 'Confirm Booking',
      dates: 'Available Dates',
      times: 'Available Times',
      back: 'Back',
      continue: 'Continue',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Address (Hotel/Airbnb/Villa)',
      addressPlaceholder: 'Please provide your full address or hotel name and room number',
      review: 'Review Details',
      confirm: 'Confirm Booking',
      processing: 'Processing...',
      termsNote: 'By clicking confirm, you agree to our terms of service. We will contact you to finalize the payment and therapist assignment.',
      error: 'Something went wrong. Please try again.',
    },
    blog: {
      badge: 'Wellness Journal',
      title: 'Insights & Rituals',
      readMore: 'Read More',
      backToBlog: 'Back to Blog',
      posts: [
        {
          id: 'wellness-guide',
          title: 'The Ultimate Guide to In-Home Wellness in Playa del Carmen',
          excerpt: 'Discover how to transform your vacation rental into a private sanctuary for the perfect relaxation experience.',
          date: 'March 15, 2026',
          image: '/blog-wellness-guide-playa-del-carmen.jpg',
          content: `
            Playa del Carmen is a paradise, but the true luxury lies in the moments of stillness you create for yourself. 
            In this guide, we explore how to maximize your in-home spa experience. 
            From setting the right lighting to choosing the perfect time of day, learn how to turn your stay into a wellness retreat.
            
            1. Create the Atmosphere: Dim the lights and choose a quiet space.
            2. Hydration is Key: Drink plenty of water before and after your session.
            3. Disconnect: Turn off your devices to fully immerse in the ritual.
          `
        },
        {
          id: 'organic-aromatherapy',
          title: 'Why Organic Aromatherapy is the Secret to Deep Relaxation',
          excerpt: 'Learn about the local organic oils we use and how they impact your nervous system and overall well-being.',
          date: 'March 10, 2026',
          image: '/blog-aromaterapia-organica-botica-spa.jpg',
          content: `
            At Botica Spa, we exclusively use premium, locally sourced organic oils. 
            Aromatherapy is more than just a pleasant scent; it's a powerful tool for healing. 
            Our bespoke blends are designed to target specific needs, from reducing anxiety to boosting energy levels.
            
            We use lavender for calming, eucalyptus for revitalizing, and local citrus blends for a refreshing experience.
          `
        },
        {
          id: 'traveler-recovery',
          title: 'Massage for Travelers: How to Recover from a Long Flight',
          excerpt: 'Long flights can take a toll on your body. Discover the best techniques to combat jet lag and muscle stiffness.',
          date: 'March 5, 2026',
          image: '/blog-masaje-viajeros-recuperacion-vuelo.jpg',
          content: `
            Traveling is exciting, but the journey can be exhausting. 
            Jet lag and long hours in a plane seat can lead to muscle stiffness and fatigue. 
            A targeted massage session upon arrival can help reset your internal clock and release tension in your neck, back, and legs.
            
            Our Deep Tissue and Botica Signature rituals are perfect for post-travel recovery.
          `
        },
        {
          id: 'top-villas-playa',
          title: 'Top 5 Villas in Playa del Carmen for an In-Home Spa Day',
          excerpt: 'Planning a luxury retreat? These villas provide the perfect backdrop for our premium wellness rituals.',
          date: 'March 1, 2026',
          image: '/blog-villas-playa-del-carmen-spa.jpg',
          content: `
            Playa del Carmen is home to some of the most stunning villas in the world. 
            If you're staying in one of these private sanctuaries, you already have half of the spa experience ready. 
            We've curated a list of our favorite villas that offer the space, privacy, and ambiance needed for a truly transformative in-home spa day.
            
            From beachfront estates to jungle-shrouded retreats, discover where to book your next wellness escape.
          `
        },
        {
          id: 'post-beach-skincare',
          title: 'The Benefits of Post-Beach Skin Care: Our Revitalizing Facial',
          excerpt: 'Sun, sand, and salt can be harsh on your skin. Learn how our organic facial treatments restore hydration and glow.',
          date: 'February 25, 2026',
          image: '/blog-facial-revitalizante-post-playa.jpg',
          content: `
            A day at the beach is wonderful for the soul, but it can be taxing for your skin. 
            The combination of UV rays, salt water, and sand can lead to dehydration and irritation. 
            Our Revitalizing Facial is specifically designed to counteract these effects using local, organic ingredients that soothe and replenish.
            
            Discover the science behind our skincare rituals and why a post-beach facial is a must for any tropical vacation.
          `
        },
        {
          id: 'airbnb-spa-prep',
          title: 'How to Prepare Your Airbnb for a Professional Massage Session',
          excerpt: 'A few simple steps can turn any room into a world-class spa. Here is our guide to preparing your space.',
          date: 'February 20, 2026',
          image: '/blog-preparar-airbnb-masaje-profesional.jpg',
          content: `
            We bring everything needed for your session, but a little preparation on your end can elevate the experience. 
            From clearing a small space for the table to adjusting the temperature, these tips ensure you get the most out of your ritual.
            
            1. Space: We need about 2x3 meters of clear floor space.
            2. Temperature: Set it slightly warmer than usual, as your body temperature drops during relaxation.
            3. Lighting: Dim the lights or close the curtains to signal your brain it's time to rest.
          `
        }
      ]
    }
  },
  es: {
    nav: {
      treatments: 'Tratamientos',
      about: 'Nosotros',
      blog: 'Blog',
      bookNow: 'Reservar Ahora',
    },
    hero: {
      title: 'El Arte de la',
      titleItalic: 'Relajación',
      subtitle: 'Rituales de bienestar premium en la comodidad de tu espacio privado. El spa, redefinido en Playa del Carmen.',
      ctaBook: 'Reserva tu sesión',
      ctaServices: 'Explorar Rituales',
      scroll: 'Deslizar',
    },
    about: {
      badge: 'La Filosofía Botica',
      title: 'Tu Santuario Privado,',
      titleItalic: 'Reimaginado.',
      description: 'En Botica Spa, creemos que la verdadera relajación no debería requerir un viaje. Transformamos tu hotel, villa o Airbnb en un entorno de spa de clase mundial, permitiéndote rendirte a la serenidad sin salir de casa.',
      feature1Title: 'Terapeutas de Élite',
      feature1Desc: 'Un equipo seleccionado de expertos certificados dedicados al arte de la sanación y el cuidado profesional.',
      feature2Title: 'Elementos Orgánicos',
      feature2Desc: 'Utilizamos exclusivamente aceites orgánicos premium de origen local y mezclas de aromaterapia personalizadas.',
      feature3Title: 'Experiencia Fluida',
      feature3Desc: 'Desde mesas de masaje profesionales hasta paisajes sonoros curados, nos encargamos de cada detalle de tu escape.',
    },
    services: {
      badge: 'Los Rituales',
      title: 'Bienestar Curado',
      select: 'Seleccionar Ritual',
      viewDetails: 'Ver Detalles',
      from: 'Desde',
      duration: 'Duración',
      minutes: 'min',
      includes: 'Incluye',
      benefits: 'Beneficios',
      currency: 'MXN',
      items: {
        facial: {
          name: 'Facial Revitalizante',
          desc: 'Un tratamiento refrescante para restaurar el brillo natural y la vitalidad de tu piel.',
          details: 'Nuestros tratamientos faciales utilizan ingredientes orgánicos de origen local para limpiar, exfoliar e hidratar tu piel, dejándote con un aspecto radiante y renovado.',
          price60: 1700,
          benefitsList: ['Limpieza profunda', 'Mejora la textura de la piel', 'Tez radiante'],
          includesList: ['Productos orgánicos para el cuidado de la piel', 'Masaje facial', 'Mascarilla hidratante']
        },
        relaxing: {
          name: 'Masaje Relajante',
          desc: 'Un viaje suave y rítmico diseñado para disolver el estrés y restaurar la armonía interior.',
          details: 'Un masaje de relajación clásico que utiliza movimientos largos y fluidos para calmar el sistema nervioso y promover una relajación profunda.',
          price60: 1700,
          price90: 2100,
          price120: 2500,
          benefitsList: ['Reduce el estrés y la ansiedad', 'Mejora la circulación', 'Promueve un mejor sueño'],
          includesList: ['Mesa de masaje profesional', 'Aceites de aromaterapia orgánicos', 'Paisaje sonoro relajante']
        },
        deepTissue: {
          name: 'Masaje de Tejido Profundo',
          desc: 'Presión intensa y localizada para liberar la tensión crónica y revitalizar los músculos cansados.',
          details: 'Un masaje terapéutico que se enfoca en realinear las capas más profundas de los músculos y el tejido conectivo. Ideal para dolores crónicos y áreas contraídas.',
          price60: 1700,
          price90: 2100,
          price120: 2500,
          benefitsList: ['Alivia el dolor muscular crónico', 'Mejora la postura', 'Descompone el tejido cicatricial'],
          includesList: ['Mesa de masaje profesional', 'Aceites de grado terapéutico', 'Bálsamo para alivio muscular']
        },
        botica: {
          name: 'Botica Signature',
          desc: 'Nuestro ritual exclusivo que combina múltiples técnicas para el escape definitivo.',
          details: 'El Botica Signature es nuestro tratamiento más popular, combinando técnicas suecas, tejido profundo y aromaterapia en una experiencia transformadora y fluida.',
          price90: 2100,
          price120: 2500,
          benefitsList: ['Restauración total del cuerpo', 'Claridad mental', 'Mezcla de técnicas exclusivas'],
          includesList: ['Aceites orgánicos premium', 'Acentos de piedras calientes', 'Consulta personalizada']
        },
        personalized: {
          name: 'Masaje Personalizado',
          desc: 'Un tratamiento a medida diseñado específicamente para las necesidades únicas de tu cuerpo.',
          details: 'Su terapeuta consultará con usted para crear una combinación única de técnicas, enfocándose exactamente donde más lo necesita.',
          price60: 1700,
          price90: 2100,
          price120: 2500,
          benefitsList: ['Personalizado según sus necesidades', 'Aborda áreas problemáticas específicas', 'Equilibrio corporal total'],
          includesList: ['Mesa de masaje profesional', 'Elección de aromaterapia', 'Consulta personalizada']
        },
        fourHands: {
          name: 'Masaje a Cuatro Manos',
          desc: 'La máxima indulgencia: dos terapeutas trabajando en perfecta sincronía para una inmersión total.',
          details: 'Una experiencia única donde dos terapeutas trabajan juntos en una secuencia coreografiada, haciendo imposible que el cerebro siga el ritmo, lo que lleva a un estado de entrega total.',
          price90: 3900,
          benefitsList: ['Doble relajación', 'Máxima experiencia sensorial', 'Estado de meditación más profundo'],
          includesList: ['Dos terapeutas profesionales', 'Aceites orgánicos premium', 'Paisaje sonoro mejorado']
        },
      },
    },
    promo: {
      badge: 'Oferta por Tiempo Limitado',
      title: 'Especial del Mes',
      description: 'Experimenta el lujo máximo con un acompañante o consiéntete dos veces.',
      offer: '2 Masajes a Cuatro Manos',
      price: '$7,399 MXN',
      cta: 'Reclamar Oferta',
    },
    social: {
      instagram: 'https://instagram.com/boticaspa',
      facebook: 'https://facebook.com/boticaspa',
      whatsapp: 'https://wa.me/529842687428',
      phone: '+52 984 268 7428',
      email: 'hola@boticaspa.com',
      location: 'Playa del Carmen, MX'
    },
    gallery: {
      badge: 'Santuario Visual',
      title: 'Experimenta la Serenidad',
    },
    testimonials: {
      badge: 'Experiencias de Huéspedes',
      title: 'Lo que dicen nuestros clientes',
      googleMapsLink: 'https://maps.app.goo.gl/sAJLAuedymWf3uBu5',
      viewOnGoogle: 'Ver en Google Maps',
      items: [
        {
          text: "Experiencia absolutamente increíble. La terapeuta llegó a tiempo, fue extremadamente profesional y el masaje fue uno de los mejores que he tenido. ¡Recomiendo ampliamente Botica Spa!",
          author: "Jessica Thompson",
          location: "Reseña de Google"
        },
        {
          text: "Servicio perfecto para nuestras vacaciones. Reservamos un masaje en pareja y fue muy relajante. Traen todo lo necesario. ¡5 estrellas!",
          author: "David Miller",
          location: "Reseña de Google"
        },
        {
          text: "La atención al detalle es asombrosa. Los aceites huelen divino y la presión fue perfecta. El mejor spa a domicilio en Playa.",
          author: "Sofia Rodriguez",
          location: "Reseña de Google"
        }
      ]
    },
    cta: {
      title: '¿Listo para una',
      titleItalic: 'relajación total?',
      subtitle: 'Experimenta el santuario de Botica Spa en la comodidad de tu propio hogar.',
      button: 'Reserva tu sesión ahora',
    },
    assistant: {
      title: 'Tina · Botica Spa',
      placeholder: 'Pregúntale a Tina sobre nuestros tratamientos...',
      send: 'Enviar',
      minimize: 'Minimizar',
      maximize: 'Habla con Tina',
      welcome: '¡Hola! Soy Tina 🌿 Estoy aquí para contarte todo sobre nuestros rituales de spa a domicilio. ¿En qué te puedo ayudar?',
    },
    footer: {
      desc: 'Servicios de masaje premium a domicilio en Playa del Carmen. Llevando el santuario de un spa de clase mundial a tu espacio privado.',
      quickLinks: 'Enlaces Rápidos',
      home: 'Inicio',
      treatments: 'Tratamientos',
      blog: 'Blog',
      contact: 'Contacto',
      rights: 'Todos los derechos reservados.',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
    },
    booking: {
      title: 'Reserva tu Sesión',
      step: 'Paso',
      of: 'de',
      successTitle: '¡Reserva Recibida!',
      successDesc: 'Hemos recibido tu solicitud. Nuestro equipo te contactará pronto para confirmar los detalles.',
      close: 'Cerrar Ventana',
      step1Title: 'Selecciona Tratamiento y Duración',
      step2Title: 'Elige Fecha y Hora',
      step3Title: 'Tu Información',
      step4Title: 'Confirmar Reserva',
      dates: 'Fechas Disponibles',
      times: 'Horarios Disponibles',
      back: 'Atrás',
      continue: 'Continuar',
      fullName: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      address: 'Dirección (Hotel/Airbnb/Villa)',
      addressPlaceholder: 'Por favor proporciona tu dirección completa o nombre de hotel y número de habitación',
      review: 'Revisar Detalles',
      confirm: 'Confirmar Reserva',
      processing: 'Procesando...',
      termsNote: 'Al hacer clic en confirmar, aceptas nuestros términos de servicio. Te contactaremos para finalizar el pago y la asignación del terapeuta.',
      error: 'Algo salió mal. Por favor intenta de nuevo.',
    },
    blog: {
      badge: 'Diario de Bienestar',
      title: 'Ideas y Rituales',
      readMore: 'Leer Más',
      backToBlog: 'Volver al Blog',
      posts: [
        {
          id: 'wellness-guide',
          title: 'La Guía Definitiva de Bienestar en Casa en Playa del Carmen',
          excerpt: 'Descubre cómo transformar tu alquiler vacacional en un santuario privado para la experiencia de relajación perfecta.',
          date: '15 de Marzo, 2026',
          image: '/blog-wellness-guide-playa-del-carmen.jpg',
          content: `
            Playa del Carmen es un paraíso, pero el verdadero lujo reside en los momentos de quietud que creas para ti mismo. 
            En esta guía, exploramos cómo maximizar tu experiencia de spa en casa. 
            Desde configurar la iluminación adecuada hasta elegir el momento perfecto del día, aprende cómo convertir tu estancia en un retiro de bienestar.
            
            1. Crea la Atmósfera: Atenúa las luces y elige un espacio tranquilo.
            2. La Hidratación es Clave: Bebe mucha agua antes y después de tu sesión.
            3. Desconéctate: Apaga tus dispositivos para sumergirte por completo en el ritual.
          `
        },
        {
          id: 'organic-aromatherapy',
          title: 'Por qué la Aromaterapia Orgánica es el Secreto de la Relajación Profunda',
          excerpt: 'Conoce los aceites orgánicos locales que utilizamos y cómo impactan en tu sistema nervioso y bienestar general.',
          date: '10 de Marzo, 2026',
          image: '/blog-aromaterapia-organica-botica-spa.jpg',
          content: `
            En Botica Spa, utilizamos exclusivamente aceites orgánicos premium de origen local. 
            La aromaterapia es más que un aroma agradable; es una poderosa herramienta de sanación. 
            Nuestras mezclas personalizadas están diseñadas para abordar necesidades específicas, desde reducir la ansiedad hasta aumentar los niveles de energía.
            
            Utilizamos lavanda para calmar, eucalipto para revitalizar y mezclas de cítricos locales para una experiencia refrescante.
          `
        },
        {
          id: 'traveler-recovery',
          title: 'Masaje para Viajeros: Cómo Recuperarse de un Vuelo Largo',
          excerpt: 'Los vuelos largos pueden afectar tu cuerpo. Descubre las mejores técnicas para combatir el jet lag y la rigidez muscular.',
          date: '5 de Marzo, 2026',
          image: '/blog-masaje-viajeros-recuperacion-vuelo.jpg',
          content: `
            Viajar es emocionante, pero el trayecto puede ser agotador. 
            El jet lag y las largas horas en el asiento de un avión pueden provocar rigidez muscular y fatiga. 
            Una sesión de masaje focalizada al llegar puede ayudar a reiniciar tu reloj interno y liberar la tensión en el cuello, la espalda y las piernas.
            
            Nuestros rituales Deep Tissue y Botica Signature son perfectos para la recuperación post-viaje.
          `
        },
        {
          id: 'top-villas-playa',
          title: 'Las 5 Mejores Villas en Playa del Carmen para un Día de Spa en Casa',
          excerpt: '¿Planeas un retiro de lujo? Estas villas ofrecen el escenario perfecto para nuestros rituales de bienestar premium.',
          date: '1 de Marzo, 2026',
          image: '/blog-villas-playa-del-carmen-spa.jpg',
          content: `
            Playa del Carmen alberga algunas de las villas más impresionantes del mundo. 
            Si te hospedas en uno de estos santuarios privados, ya tienes la mitad de la experiencia de spa lista. 
            Hemos seleccionado una lista de nuestras villas favoritas que ofrecen el espacio, la privacidad y el ambiente necesarios para un día de spa en casa verdaderamente transformador.
            
            Desde propiedades frente al mar hasta retiros envueltos en la selva, descubre dónde reservar tu próximo escape de bienestar.
          `
        },
        {
          id: 'post-beach-skincare',
          title: 'Los Beneficios del Cuidado de la Piel Post-Playa: Nuestro Facial Revitalizante',
          excerpt: 'El sol, la arena y la sal pueden ser duros con tu piel. Aprende cómo nuestros tratamientos faciales orgánicos restauran la hidratación y el brillo.',
          date: '25 de Febrero, 2026',
          image: '/blog-facial-revitalizante-post-playa.jpg',
          content: `
            Un día en la playa es maravilloso para el alma, pero puede ser agotador para la piel. 
            La combinación de rayos UV, agua salada y arena puede provocar deshidratación e irritación. 
            Nuestro Facial Revitalizante está diseñado específicamente para contrarrestar estos efectos utilizando ingredientes orgánicos locales que calman y reponen.
            
            Descubre la ciencia detrás de nuestros rituales de cuidado de la piel y por qué un facial post-playa es imprescindible para cualquier vacación tropical.
          `
        },
        {
          id: 'airbnb-spa-prep',
          title: 'Cómo Preparar tu Airbnb para una Sesión de Masaje Profesional',
          excerpt: 'Unos simples pasos pueden convertir cualquier habitación en un spa de clase mundial. Aquí tienes nuestra guía para preparar tu espacio.',
          date: '20 de Febrero, 2026',
          image: '/blog-preparar-airbnb-masaje-profesional.jpg',
          content: `
            Nosotros traemos todo lo necesario para tu sesión, pero un poco de preparación por tu parte puede elevar la experiencia. 
            Desde despejar un pequeño espacio para la mesa hasta ajustar la temperatura, estos consejos aseguran que aproveches al máximo tu ritual.
            
            1. Espacio: Necesitamos unos 2x3 metros de espacio libre en el suelo.
            2. Temperatura: Ajústala un poco más cálida de lo habitual, ya que la temperatura corporal baja durante la relajación.
            3. Iluminación: Atenúa las luces o cierra las cortinas para indicarle a tu cerebro que es hora de descansar.
          `
        }
      ]
    }
  }
};
