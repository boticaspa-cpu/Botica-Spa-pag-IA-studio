
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
      title: 'The Art of In Home',
      titleItalic: 'Massage',
      subtitle: 'Premium wellness rituals delivered to your private sanctuary in Playa del Carmen. Experience the spa, redefined.',
      ctaBook: 'Book Your Session',
      ctaServices: 'Explore Rituals',
      scroll: 'Scroll',
    },
    about: {
      badge: 'Who We Are',
      title: 'Botica Spa',
      titleItalic: 'Comes to You.',
      description: 'Botica Spa is a premium mobile massage service based in Playa del Carmen. Founded by Gina Agassini, we bring resort quality bodywork directly to your hotel, villa, or Airbnb. No commute, no waiting rooms, no compromise.',
      feature1Title: 'Founded by Gina Agassini',
      feature1Desc: 'With years of experience at luxury hotels in the Riviera Maya — Grand Velas, Azul Fives, and Mayakoba, Gina built Botica Spa around one belief: the best massage experience happens in your own space.',
      feature2Title: 'Resort Quality, Your Location',
      feature2Desc: 'The same techniques and organic products used at five-star properties, delivered to your door with a professional table, fresh linens, and curated aromatherapy.',
      feature3Title: 'Fully Mobile. Always.',
      feature3Desc: 'We have no physical location. That is the point. Every session is private, personal, and designed around you. Not a waiting room schedule.',
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
          name: 'Four Hands Massage',
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
      offer: '2 Four Hands Massages',
      price: '$7,399 MXN',
      cta: 'Claim Offer',
    },
    social: {
      instagram: 'https://www.instagram.com/botica.spa/',
      facebook: 'https://facebook.com/boticaspa',
      whatsapp: 'https://wa.me/529842687428',
      phone: '+52 984 268 7428',
      email: 'boticaspa@gmail.com',
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
          text: "The attention to detail is amazing. The oils smell divine and the pressure was perfect. Best in home spa in Playa.",
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
      welcome: "Hi! I'm Tina 🌿 I'm here to tell you everything about our in home spa rituals. What can I help you with today?",
    },
    footer: {
      desc: 'Premium in home massage services in Playa del Carmen. Bringing the sanctuary of a world-class spa to your private space.',
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
      ctaBadge: 'Botica Spa · Playa del Carmen',
      ctaTitle: 'Ready to experience this?',
      ctaDesc: 'We bring certified therapists and a full professional setup to your hotel, villa or Airbnb in Playa del Carmen.',
      ctaWhatsapp: 'Book on WhatsApp',
      ctaTreatments: 'See All Treatments',
      posts: [
        {
          id: 'wellness-guide',
          title: 'Best In Home Massage in Playa del Carmen (2026 Guide)',
          excerpt: 'Everything you need to know to book the best in home massage in Playa del Carmen: how to choose the right treatment and what to expect on the day.',
          date: 'March 15, 2026',
          image: '/blog-wellness-guide-playa-del-carmen.webp',
          content: `If you are searching for a massage in Playa del Carmen, you already know the area has no shortage of options: hotel spas, street-side massage huts, and mobile services all compete for your attention. But not all massage experiences are equal, and the difference between a mediocre session and a genuinely transformative one comes down to three things: therapist quality, product quality, and setting.

Botica Spa was built around a simple idea: you should not have to leave your villa, hotel, or Airbnb to experience world-class bodywork. We bring certified therapists, a professional massage table, fresh linens, and premium organic oils directly to your door anywhere in Playa del Carmen, typically within 24 hours of booking.

What makes an in home massage in Playa del Carmen better than a spa visit? The answer is comfort and continuity. After a one-hour or 90-minute session, your body is in a deeply relaxed state. When you are already in your own space, that state carries forward. You can shower, rest, nap, or simply stay horizontal. At a hotel spa, you have to get dressed, navigate hallways, and transition back to reality immediately.

We serve all neighborhoods and accommodation types in Playa del Carmen: the 5th Avenue corridor, Playacar Phase 1 and Phase 2, Mamitas Beach area, Colosio, Villas del Sol, and beyond. If you are staying somewhere we have not listed, send us a message on WhatsApp and we'll almost certainly cover your area.

Our most requested treatments in Playa del Carmen are the Relaxing Massage (perfect for first-timers or pure decompression), the Deep Tissue Massage (ideal if you have been sitting on planes or carrying tension from travel), and the Four Hands Massage (two therapists in perfect sync, the closest thing to sensory overload in the best possible way).

Pricing starts at $1,700 MXN for a 60-minute session. We require a 30% deposit for bookings made 5 or more days in advance; same-week bookings are confirmed directly by WhatsApp with no deposit required.

Ready to book the best in home massage in Playa del Carmen? Message us on WhatsApp and we will confirm your slot within minutes.`
        },
        {
          id: 'organic-aromatherapy',
          title: 'In Home Massage vs. Hotel Spa in Playa del Carmen: An Honest Comparison',
          excerpt: 'Thinking about booking a hotel spa vs. an in home massage in Playa del Carmen? Here is the honest breakdown of both options.',
          date: 'March 10, 2026',
          image: '/blog-aromaterapia-organica-botica-spa.webp',
          content: `When you arrive in Playa del Carmen and start looking for a massage, you will quickly face a choice: book the spa at your hotel, or have a certified therapist come to you. Both options have real advantages, but after hundreds of sessions delivered across the Riviera Maya, we have a clear view of when each makes sense.

Hotel spas in Playa del Carmen are well-designed spaces with dedicated ambiance: the lighting, the scent, the decor is all curated for relaxation. The best ones employ skilled therapists and use quality products. The trade-offs are price (hotel spa treatments typically cost 40 to 60 percent more than equivalent mobile services), availability (peak-season slots book out fast), and the post-session experience of having to return to your room immediately after.

In-home massage services like Botica Spa solve the post-session problem entirely. After your therapist finishes, you are already exactly where you want to be: horizontal, in your own space, with nowhere to be. There is no robe walk, no elevator, no checkout desk. Your body stays in the parasympathetic state your nervous system worked hard to reach.

Where hotel spas have a legitimate edge: facilities. If you want a sauna, steam room, cold plunge, or jacuzzi as part of your experience, a full spa facility wins. An in home service cannot replicate that infrastructure.

For pure bodywork quality, however, mobile services are not a compromise. Botica Spa therapists are certified professionals who have worked at top resorts across the Riviera Maya. We use the same organic oils and therapeutic techniques you'd find in a five-star spa, and we bring everything: professional massage table, fresh linens, aromatherapy, and ambient sound.

The honest answer: if your goal is an excellent massage in Playa del Carmen and the freedom to fully relax afterward without moving, an in home service is the better choice for most travelers. If you want a full spa day with sauna access, book the hotel spa.

We serve hotels, Airbnbs, and private villas throughout Playa del Carmen. Message us on WhatsApp to check availability.`
        },
        {
          id: 'traveler-recovery',
          title: 'Deep Tissue Massage in Playa del Carmen: The Traveler\'s Complete Guide',
          excerpt: 'Long flights, heavy bags, hours in transit. Deep tissue massage in Playa del Carmen is the fastest way to reset your body and start your vacation right.',
          date: 'March 5, 2026',
          image: '/blog-masaje-viajeros-recuperacion-vuelo.webp',
          content: `Long-haul travel is hard on the body. Hours in a compressed cabin seat, dehydration, disrupted sleep cycles, and the physical act of carrying luggage create a specific pattern of tension: tight hip flexors from sitting, compressed lumbar spine, elevated trapezius muscles from tension and overhead bins, and a nervous system running on cortisol instead of calm.

A deep tissue massage in Playa del Carmen addresses all of this directly. Unlike a relaxing massage, which works primarily on the superficial muscle layers, deep tissue work targets the connective tissue and deeper muscle fibers where chronic tension accumulates. The pressure is firmer, the pace is slower, and the results are more lasting.

At Botica Spa, our deep tissue protocol for travelers typically focuses on three areas: the posterior chain (lower back, glutes, hamstrings), the neck and shoulder complex, and the hip flexors. We adapt based on what your body needs. Some travelers arrive with acute sciatic pain, others with a relentless neck that hasn't released in three days of flying.

When should you book? Ideally within the first 24 to 48 hours of arrival in Playa del Carmen, before your body compensates further and before you pile activity on top of existing tension. A 90-minute deep tissue session is the standard recommendation for post-travel recovery; 60 minutes is effective if your schedule is tight.

We bring everything to your hotel, Airbnb, or villa in Playa del Carmen: professional table, therapeutic-grade oils, and a muscle relief balm for post-session application. You do not need to go anywhere or prepare anything beyond clearing a 2x3 meter space.

Deep tissue massage in Playa del Carmen with Botica Spa starts at $1,700 MXN for 60 minutes, $2,100 MXN for 90 minutes, and $2,500 MXN for 120 minutes. Book directly on WhatsApp and we can often confirm same day or next day availability.`
        },
        {
          id: 'top-villas-playa',
          title: 'Four Hands Massage in Playa del Carmen: What It Is and Why You Need It',
          excerpt: 'A four hands massage in Playa del Carmen is the most immersive spa experience available. Here is exactly what happens, and why it works so well.',
          date: 'March 1, 2026',
          image: '/blog-villas-playa-del-carmen-spa.webp',
          content: `A four hands massage is exactly what the name implies: two therapists working on your body simultaneously, moving in coordinated sequences designed to confuse the analytical brain and trigger a depth of relaxation that a single therapist simply cannot reach alone.

Here is the neurological reason it works: your brain is wired to track touch. During a standard massage, your nervous system follows the therapist\'s movements, anticipating what comes next. With two therapists working in mirror sequences, the brain cannot keep up. It stops trying to track, stops anticipating, and surrenders. The result is a faster and deeper drop into the parasympathetic state, what practitioners sometimes call the "theta state" of deep relaxation.

Botica Spa\'s four hands massage in Playa del Carmen is performed by two certified therapists who train together specifically for synchronized work. They move in choreographed patterns, mirroring each other from head to toe and alternating between long flowing strokes and targeted pressure, creating a seamless, almost hypnotic experience.

Who is it for? The four hands massage is ideal for people who typically have a hard time "switching off" during a massage. High-stress professionals, frequent travelers, people whose minds tend to wander. The four hands technique bypasses the analytical mind more effectively than any single-therapist modality. It is also simply the most indulgent option available, and a natural choice for a special occasion or a gift.

Our four hands massage in Playa del Carmen is available in 90 minutes ($3,900 MXN) and is delivered to your hotel room, villa, or Airbnb. We coordinate two therapists to arrive together with a full professional setup.

It is consistently our most talked-about treatment. Book via WhatsApp or online. Deposit required for advance bookings.`
        },
        {
          id: 'post-beach-skincare',
          title: 'In Home Massage in Cancún: Which Hotels, Villas & Airbnbs We Serve',
          excerpt: 'Looking for an in home massage in Cancún? Botica Spa travels from Playa del Carmen to serve hotels, private villas, and Airbnbs across the Cancún area.',
          date: 'February 25, 2026',
          image: '/blog-facial-revitalizante-post-playa.webp',
          content: `Cancún is one of the most visited destinations in the world, and yet booking a quality in home massage there can be surprisingly difficult. Hotel spas fill up fast during peak season, and finding a certified mobile therapist who can actually deliver a professional experience (proper table, premium oils, genuine training) takes more research than most visitors have time for.

Botica Spa is based in Playa del Carmen, roughly 65 kilometers south of Cancún, and we regularly travel north to serve guests throughout the Cancún corridor. We cover the Hotel Zone (Zona Hotelera), downtown Cancún (El Centro), Puerto Cancún, and surrounding residential and villa areas.

What does an in home massage in Cancún with Botica Spa look like? We arrive with a professional folding massage table, fresh linens, organic aromatherapy oils, and ambient sound. Setup takes about 10 minutes, the session runs for your chosen duration (60, 90, or 120 minutes depending on treatment), and breakdown takes another 10 minutes. Your job is simply to be there and relax.

A travel fee applies for Cancún bookings given the distance from our base in Playa del Carmen. The exact fee depends on your location within Cancún. Message us on WhatsApp with your hotel or address and we'll give you an exact quote before you commit to anything.

For groups, couples, or back-to-back sessions (common with family or friend groups staying in Cancún villas), we can coordinate multiple therapists to arrive together. This is actually where in home massage shines most clearly: a spa visit requires each person to book individually and travel separately, while a mobile service brings the full experience to one location simultaneously.

Available treatments in Cancún include: Relaxing Massage, Deep Tissue Massage, Botica Signature, Personalized Massage, Four Hands Massage, and Revitalizing Facial. All prices are in MXN. Message us on WhatsApp to confirm your dates.`
        },
        {
          id: 'airbnb-spa-prep',
          title: 'How to Book a Massage at Your Airbnb in Tulum (Complete 2026 Guide)',
          excerpt: 'Booking a massage at your Airbnb in Tulum is easier than you think. Here is everything you need to know: finding a certified therapist and what to prepare.',
          date: 'February 20, 2026',
          image: '/blog-preparar-airbnb-masaje-profesional.webp',
          content: `Tulum has one of the highest concentrations of wellness-focused travelers in Mexico, and in home massage at Airbnbs and private villas has become one of the most requested services in the area. But the quality gap between providers is enormous: from unlicensed practitioners with a bottle of coconut oil to certified therapists with years of resort experience.

This guide covers everything you need to know to book a massage at your Airbnb in Tulum safely, affordably, and with confidence.

Step 1: Find a verified provider. Look for a mobile spa service with verifiable reviews (Google, not just their own website), certified therapists, and a clear pricing structure. Botica Spa operates out of Playa del Carmen and travels regularly to Tulum. Our therapists are certified professionals who have worked at top resorts across the Riviera Maya.

Step 2: Confirm your space. A professional therapist needs approximately 2 meters by 3 meters of clear floor space to set up a folding massage table. In most Tulum villas and Airbnbs, the bedroom or living area works perfectly. You do not need to move furniture permanently, just create a temporary clearing.

Step 3: Book in advance. Tulum fills up fast during high season (November through April) and the Semana Santa and Christmas periods. For a guaranteed slot, book at least 3 to 5 days ahead. Botica Spa accepts a 30% deposit to confirm advance bookings; last-minute requests are handled directly via WhatsApp based on availability.

Step 4: Prepare the basics. Set your room to a comfortable temperature (slightly warmer than usual, since your body cools during massage), dim the lights or close curtains, and silence your phone. The therapist handles everything else: table, linens, oils, and sound.

Step 5: Expect professional setup. A reputable mobile spa should arrive with a professional-grade folding massage table (not a mat on the floor), fresh laundered linens for every client, and pharmaceutical or food-grade massage oils. Anything less is a red flag.

Botica Spa serves all major Tulum zones including the hotel strip, Tulum Pueblo, Aldea Zama, La Veleta, and surrounding cenote and jungle villa areas. A travel fee applies from our Playa del Carmen base. Message us on WhatsApp with your Tulum address for an exact quote.`
        }
      ]
    }
  },
  es: {
    nav: {
      treatments: 'Masajes',
      about: 'Nosotros',
      blog: 'Blog',
      bookNow: 'Reservar Ahora',
    },
    hero: {
      title: 'El Arte de la',
      titleItalic: 'Relajación',
      subtitle: 'Masajes premium a domicilio en Playa del Carmen. Llevamos el spa directamente a tu hotel, villa o Airbnb.',
      ctaBook: 'Reserva tu sesión',
      ctaServices: 'Ver Tratamientos',
      scroll: 'Deslizar',
    },
    about: {
      badge: 'Quiénes Somos',
      title: 'Botica Spa',
      titleItalic: 'Va Donde Tú Estás.',
      description: 'Botica Spa es un servicio de masajes premium a domicilio con base en Playa del Carmen. Fundado por Gina Agassini, llevamos masajes de calidad resort directamente a tu hotel, villa o Airbnb. Sin desplazamientos, sin salas de espera, sin concesiones.',
      feature1Title: 'Fundado por Gina Agassini',
      feature1Desc: 'Con años de experiencia en hoteles de lujo en la Riviera Maya — Grand Velas, Azul Fives y Mayakoba, Gina construyó Botica Spa con una convicción: la mejor experiencia de masaje ocurre en tu propio espacio.',
      feature2Title: 'Calidad Resort, Tu Ubicación',
      feature2Desc: 'Las mismas técnicas y productos orgánicos usados en propiedades de cinco estrellas, llevados a tu puerta con mesa profesional, ropa de cama fresca y aromaterapia.',
      feature3Title: '100% Móvil. Siempre.',
      feature3Desc: 'No tenemos local físico. Ese es el punto. Cada sesión es privada, personal y diseñada para ti. Sin horarios de sala de espera.',
    },
    services: {
      badge: 'Tratamientos Premium',
      title: 'Masajes a Domicilio',
      select: 'Seleccionar Tratamiento',
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
          details: 'Tu terapeuta diseñará la sesión contigo para trabajar exactamente donde lo necesitas.',
          price60: 1700,
          price90: 2100,
          price120: 2500,
          benefitsList: ['Diseñado para tus necesidades', 'Trabaja las zonas que más lo necesitan', 'Equilibrio corporal total'],
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
      cta: 'Aprovechar Oferta',
    },
    social: {
      instagram: 'https://www.instagram.com/botica.spa/',
      facebook: 'https://facebook.com/boticaspa',
      whatsapp: 'https://wa.me/529842687428',
      phone: '+52 984 268 7428',
      email: 'boticaspa@gmail.com',
      location: 'Playa del Carmen, MX'
    },
    gallery: {
      badge: 'Santuario Visual',
      title: 'Vive la Experiencia',
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
      welcome: '¡Hola! Soy Tina 🌿 Estoy aquí para contarte todo sobre nuestros tratamientos de spa a domicilio. ¿En qué te puedo ayudar?',
    },
    footer: {
      desc: 'Masaje a domicilio premium en Playa del Carmen. Los mismos aceites, técnicas y cuidado de un spa cinco estrellas. En tu hotel, villa o Airbnb.',
      quickLinks: 'Enlaces Rápidos',
      home: 'Inicio',
      treatments: 'Masajes',
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
      title: 'Bienestar y Consejos',
      readMore: 'Leer Más',
      backToBlog: 'Volver al Blog',
      ctaBadge: 'Botica Spa · Playa del Carmen',
      ctaTitle: '¿Lista para vivirlo?',
      ctaDesc: 'Llevamos terapeutas certificadas y equipo profesional completo a tu hotel, villa o Airbnb en Playa del Carmen.',
      ctaWhatsapp: 'Reservar por WhatsApp',
      ctaTreatments: 'Ver Todos los Tratamientos',
      posts: [
        {
          id: 'wellness-guide',
          title: 'El Mejor Masaje a Domicilio en Playa del Carmen (Guía 2026)',
          excerpt: 'Todo lo que necesitas saber para reservar el mejor masaje a domicilio en Playa del Carmen: cómo elegir el tratamiento correcto y qué esperar el día de tu sesión.',
          date: '15 de Marzo, 2026',
          image: '/blog-wellness-guide-playa-del-carmen.webp',
          content: `Si estás buscando un masaje en Playa del Carmen, ya sabes que la zona tiene opciones de sobra: spas de hotel, puestos de masaje en la calle y servicios móviles compiten por tu atención. Pero no todas las experiencias de masaje son iguales, y la diferencia entre una sesión mediocre y una genuinamente transformadora depende de tres cosas: la calidad del terapeuta, la calidad del producto y el entorno.

Botica Spa nació de una idea simple: no deberías tener que salir de tu villa, hotel o Airbnb para experimentar un bodywork de clase mundial. Llevamos terapeutas certificados, una mesa de masaje profesional, ropa de cama fresca y aceites orgánicos premium directamente a tu puerta en cualquier lugar de Playa del Carmen, generalmente dentro de las 24 horas de hacer la reserva.

¿Qué hace que un masaje a domicilio en Playa del Carmen sea mejor que una visita al spa? La respuesta es comodidad y continuidad. Después de una sesión de una hora o 90 minutos, tu cuerpo está en un estado de relajación profunda. Cuando ya estás en tu propio espacio, ese estado se mantiene. En un spa de hotel, tienes que vestirte, navegar pasillos y volver a la realidad de inmediato.

Atendemos todos los vecindarios y tipos de alojamiento en Playa del Carmen: el corredor de la 5ta Avenida, Playacar Fase 1 y Fase 2, la zona de Mamitas Beach, Colosio, Villas del Sol y más. Si te hospedas en algún lugar que no hemos mencionado, escríbenos por WhatsApp, casi con certeza cubrimos tu área.

Nuestros tratamientos más solicitados en Playa del Carmen son el Masaje Relajante, el Masaje de Tejido Profundo y el Masaje a Cuatro Manos. Los precios empiezan desde $1,700 MXN por una sesión de 60 minutos. Requerimos un depósito del 30% para reservas con 5 o más días de anticipación; las reservas de la misma semana se confirman directamente por WhatsApp sin depósito.`
        },
        {
          id: 'organic-aromatherapy',
          title: 'Masaje a Domicilio vs. Spa de Hotel en Playa del Carmen: Una Comparación Honesta',
          excerpt: '¿Pensando en reservar el spa del hotel o un masaje a domicilio en Playa del Carmen? Aquí tienes el análisis honesto de ambas opciones.',
          date: '10 de Marzo, 2026',
          image: '/blog-aromaterapia-organica-botica-spa.webp',
          content: `Cuando llegas a Playa del Carmen y buscas un masaje, rápidamente te enfrentas a una elección: reservar el spa de tu hotel o que un terapeuta certificado venga a ti. Ambas opciones tienen ventajas reales, pero después de cientos de sesiones en la Riviera Maya, tenemos una visión clara de cuándo conviene cada una.

Los spas de hotel en Playa del Carmen son espacios bien diseñados con un ambiente dedicado. Los mejores emplean terapeutas hábiles y utilizan productos de calidad. Las desventajas son el precio (los tratamientos de spa de hotel cuestan entre un 40 y un 60 por ciento más que los servicios móviles equivalentes), la disponibilidad limitada y la experiencia post-sesión de tener que regresar a tu habitación de inmediato.

Los servicios de masaje a domicilio como Botica Spa resuelven por completo el problema post-sesión. Después de que el terapeuta termina, ya estás exactamente donde quieres estar: horizontal, en tu propio espacio, sin ningún lugar a donde ir. Tu cuerpo permanece en el estado parasimpático que tu sistema nervioso trabajó tanto para alcanzar.

¿Dónde los spas de hotel tienen una ventaja legítima? En las instalaciones. Si quieres sauna, baño de vapor, inmersión en agua fría o jacuzzi como parte de tu experiencia, gana un spa completo. Un servicio a domicilio no puede replicar esa infraestructura.

Para la calidad pura del bodywork, sin embargo, los servicios móviles no son un compromiso. Los terapeutas de Botica Spa son profesionales certificados que han trabajado en los mejores resorts de la Riviera Maya. Utilizamos el mismo grado de aceites orgánicos y técnicas terapéuticas que encontrarías en un spa de cinco estrellas, y lo llevamos todo a tu ubicación.`
        },
        {
          id: 'traveler-recovery',
          title: 'Masaje de Tejido Profundo en Playa del Carmen: Guía Completa para Viajeros',
          excerpt: 'Vuelos largos, equipaje pesado, horas en tránsito: el masaje de tejido profundo en Playa del Carmen es la forma más rápida de resetear tu cuerpo y empezar bien tus vacaciones.',
          date: '5 de Marzo, 2026',
          image: '/blog-masaje-viajeros-recuperacion-vuelo.webp',
          content: `Los viajes de larga distancia son duros para el cuerpo. Horas en un asiento comprimido de cabina, deshidratación, ciclos de sueño alterados y el acto físico de cargar maletas crean un patrón específico de tensión: flexores de cadera tensos por estar sentado, columna lumbar comprimida, músculos trapecios elevados y un sistema nervioso funcionando con cortisol en lugar de calma.

Un masaje de tejido profundo en Playa del Carmen aborda todo esto directamente. A diferencia de un masaje relajante, que trabaja principalmente en las capas musculares superficiales, el trabajo de tejido profundo apunta al tejido conectivo y las fibras musculares más profundas donde se acumula la tensión crónica.

En Botica Spa, nuestro protocolo de tejido profundo para viajeros generalmente se enfoca en tres áreas: la cadena posterior (espalda baja, glúteos, isquiotibiales), el complejo de cuello y hombros, y los flexores de cadera. Nos adaptamos según lo que necesita tu cuerpo.

¿Cuándo reservar? Idealmente dentro de las primeras 24 a 48 horas de llegada a Playa del Carmen, antes de que tu cuerpo compense más y antes de acumular actividad encima de la tensión existente. Una sesión de 90 minutos es la recomendación estándar para la recuperación post-viaje.

Llevamos todo a tu hotel, Airbnb o villa en Playa del Carmen: mesa profesional, aceites de grado terapéutico y un bálsamo de alivio muscular para aplicación post-sesión. No necesitas ir a ningún lugar ni preparar nada más allá de despejar un espacio de 2x3 metros.

El masaje de tejido profundo en Playa del Carmen con Botica Spa comienza desde $1,700 MXN por 60 minutos, $2,100 MXN por 90 minutos y $2,500 MXN por 120 minutos. Reserva por WhatsApp.`
        },
        {
          id: 'top-villas-playa',
          title: 'Masaje a Cuatro Manos en Playa del Carmen: Qué Es y Por Qué lo Necesitas',
          excerpt: 'Un masaje a cuatro manos en Playa del Carmen es la experiencia de spa más inmersiva disponible. Aquí explicamos exactamente qué sucede y por qué funciona tan bien.',
          date: '1 de Marzo, 2026',
          image: '/blog-villas-playa-del-carmen-spa.webp',
          content: `Un masaje a cuatro manos es exactamente lo que el nombre implica: dos terapeutas trabajando en tu cuerpo simultáneamente, moviéndose en secuencias coordinadas diseñadas para confundir al cerebro analítico y provocar una profundidad de relajación que un solo terapeuta simplemente no puede alcanzar por sí solo.

La razón neurológica por la que funciona: tu cerebro está programado para rastrear el tacto. Durante un masaje estándar, tu sistema nervioso sigue los movimientos del terapeuta, anticipando lo que viene después. Con dos terapeutas trabajando en secuencias espejo, el cerebro no puede seguir el ritmo. Deja de intentar rastrear, deja de anticipar y se rinde. El resultado es una caída más rápida y profunda al estado parasimpático.

El masaje a cuatro manos de Botica Spa en Playa del Carmen es realizado por dos terapeutas certificados que se entrenan juntos específicamente para el trabajo sincronizado. Se mueven en patrones coreografiados, creando una experiencia fluida y casi hipnótica.

¿Para quién es ideal? El masaje a cuatro manos es perfecto para personas que generalmente tienen dificultad para "desconectarse" durante un masaje: profesionales de alto estrés, viajeros frecuentes, personas cuya mente tiende a divagar. También es simplemente la opción más lujosa disponible y una elección natural para una ocasión especial.

Nuestro masaje a cuatro manos en Playa del Carmen está disponible en 90 minutos ($3,900 MXN) y se entrega en tu habitación de hotel, villa o Airbnb. Coordinamos dos terapeutas para llegar juntos con una configuración profesional completa.

Es consistentemente nuestro tratamiento más comentado. Reserva por WhatsApp.`
        },
        {
          id: 'post-beach-skincare',
          title: 'Masaje a Domicilio en Cancún: Hoteles, Villas y Airbnbs que Atendemos',
          excerpt: '¿Buscas un masaje a domicilio en Cancún? Botica Spa viaja desde Playa del Carmen para atender hoteles, villas privadas y Airbnbs en toda el área de Cancún.',
          date: '25 de Febrero, 2026',
          image: '/blog-facial-revitalizante-post-playa.webp',
          content: `Cancún es uno de los destinos más visitados del mundo, y sin embargo, reservar un masaje a domicilio de calidad allí puede ser sorprendentemente difícil. Los spas de hotel se llenan rápidamente durante la temporada alta, y encontrar un terapeuta móvil certificado que pueda ofrecer una experiencia profesional real requiere más investigación de la que la mayoría de los visitantes tiene tiempo para hacer.

Botica Spa está basado en Playa del Carmen, aproximadamente 65 kilómetros al sur de Cancún, y viajamos regularmente al norte para atender a huéspedes en todo el corredor de Cancún. Cubrimos la Zona Hotelera, el centro de Cancún, Puerto Cancún y las áreas residenciales y de villas circundantes.

Un cargo por traslado aplica para las reservas en Cancún dada la distancia desde nuestra base en Playa del Carmen. El cargo exacto depende de tu ubicación dentro de Cancún: escríbenos por WhatsApp con tu hotel o dirección y te daremos una cotización exacta antes de comprometerte a nada.

Para grupos, parejas o sesiones consecutivas (común con grupos de familia o amigos que se hospedan en villas de Cancún), podemos coordinar múltiples terapeutas para llegar juntos. Esto es donde el masaje a domicilio brilla más claramente: una visita al spa requiere que cada persona reserve individualmente y viaje por separado, mientras que un servicio móvil lleva la experiencia completa a un solo lugar simultáneamente.

Los tratamientos disponibles en Cancún incluyen: Masaje Relajante, Masaje de Tejido Profundo, Botica Signature, Masaje Personalizado, Masaje a Cuatro Manos y Facial Revitalizante. Todos los precios están en MXN. Escríbenos por WhatsApp para confirmar tus fechas.`
        },
        {
          id: 'airbnb-spa-prep',
          title: 'Cómo Reservar un Masaje en tu Airbnb en Tulum (Guía Completa 2026)',
          excerpt: 'Reservar un masaje en tu Airbnb en Tulum es más fácil de lo que crees. Aquí está todo lo que necesitas saber: desde encontrar un terapeuta certificado hasta qué preparar.',
          date: '20 de Febrero, 2026',
          image: '/blog-preparar-airbnb-masaje-profesional.webp',
          content: `Tulum tiene una de las concentraciones más altas de viajeros enfocados en el bienestar en México, y el masaje a domicilio en Airbnbs y villas privadas se ha convertido en uno de los servicios más solicitados en el área. Pero la brecha de calidad entre proveedores es enorme: desde practicantes sin licencia con una botella de aceite de coco hasta terapeutas certificados con años de experiencia en resorts.

Esta guía cubre todo lo que necesitas saber para reservar un masaje en tu Airbnb en Tulum de manera segura, asequible y con confianza.

Paso 1: Encuentra un proveedor verificado. Busca un servicio de spa móvil con reseñas verificables (Google, no solo su propio sitio web), terapeutas certificados y una estructura de precios clara. Botica Spa opera desde Playa del Carmen y viaja regularmente a Tulum. Nuestros terapeutas son profesionales certificados que han trabajado en los mejores resorts de la Riviera Maya.

Paso 2: Confirma tu espacio. Un terapeuta profesional necesita aproximadamente 2 metros por 3 metros de espacio libre en el suelo para instalar una mesa plegable de masaje. En la mayoría de las villas y Airbnbs de Tulum, el dormitorio o la sala de estar funciona perfectamente.

Paso 3: Reserva con anticipación. Tulum se llena rápidamente durante la temporada alta (noviembre a abril) y durante Semana Santa y Navidad. Para garantizar tu espacio, reserva con al menos 3 a 5 días de anticipación. Botica Spa acepta un depósito del 30% para confirmar reservas anticipadas; las solicitudes de último momento se manejan directamente por WhatsApp según disponibilidad.

Paso 4: Prepara lo básico. Ajusta tu habitación a una temperatura cómoda (un poco más cálida de lo habitual), atenúa las luces o cierra las cortinas y silencia tu teléfono. El terapeuta se encarga de todo lo demás: mesa, ropa de cama, aceites y sonido.

Botica Spa atiende todas las zonas principales de Tulum incluyendo la franja hotelera, el Pueblo de Tulum, Aldea Zama, La Veleta y las áreas circundantes de villas en cenotes y selva. Aplica cargo de traslado desde nuestra base en Playa del Carmen. Escríbenos por WhatsApp con tu dirección en Tulum para una cotización exacta.`
        }
      ]
    }
  }
};
