
export type Language = 'en' | 'es';

export const translations = {
  en: {
    nav: {
      treatments: 'Treatments',
      about: 'About Us',
      bookNow: 'Book Now',
    },
    hero: {
      title: 'The Art of In-Home',
      titleItalic: 'Relaxation',
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
      badge: 'The Rituals',
      title: 'Curated Wellness',
      select: 'Select Ritual',
      viewDetails: 'View Details',
      from: 'From',
      duration: 'Duration',
      minutes: 'min',
      includes: 'Includes',
      benefits: 'Benefits',
      items: {
        relaxing: {
          name: 'Signature Relaxation',
          desc: 'A gentle, rhythmic journey designed to dissolve stress and restore inner harmony.',
          details: 'Our signature treatment uses long, flowing strokes to calm the nervous system. Perfect for jet lag recovery or simply unwinding after a day in the sun.',
          price60: 1800,
          price90: 2400,
          price120: 3000,
          benefitsList: ['Reduces stress and anxiety', 'Improves circulation', 'Promotes better sleep'],
          includesList: ['Professional massage table', 'Organic aromatherapy oils', 'Relaxing soundscape']
        },
        deepTissue: {
          name: 'Deep Tissue Recovery',
          desc: 'Targeted, intense pressure to release chronic tension and revitalize tired muscles.',
          details: 'A therapeutic massage that focuses on realigning deeper layers of muscles and connective tissue. Ideal for chronic aches and contracted areas.',
          price60: 2100,
          price90: 2700,
          price120: 3300,
          benefitsList: ['Relieves chronic muscle pain', 'Improves posture', 'Breaks up scar tissue'],
          includesList: ['Professional massage table', 'Therapeutic grade oils', 'Muscle relief balm']
        },
        personalized: {
          name: 'Bespoke Therapy',
          desc: 'A custom-tailored treatment designed specifically for your body\'s unique needs.',
          details: 'Your therapist will consult with you to create a unique blend of techniques, focusing exactly where you need it most.',
          price60: 2000,
          price90: 2600,
          price120: 3200,
          benefitsList: ['Customized to your needs', 'Addresses specific problem areas', 'Total body balance'],
          includesList: ['Professional massage table', 'Choice of aromatherapy', 'Personalized consultation']
        },
        fourHands: {
          name: 'Four-Hands Bliss',
          desc: 'The ultimate indulgence: two therapists working in perfect synchronicity for total immersion.',
          details: 'A unique experience where two therapists work together in a choreographed sequence, making it impossible for the brain to track, leading to a state of total surrender.',
          price60: 3500,
          price90: 4200,
          benefitsList: ['Double the relaxation', 'Ultimate sensory experience', 'Deepest state of meditation'],
          includesList: ['Two professional therapists', 'Premium organic oils', 'Enhanced soundscape']
        },
      },
    },
    social: {
      instagram: 'https://instagram.com/boticaspa',
      facebook: 'https://facebook.com/boticaspa',
      whatsapp: 'https://wa.me/529841234567',
      phone: '+52 984 123 4567',
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
    footer: {
      desc: 'Premium in-home massage services in Playa del Carmen. Bringing the sanctuary of a world-class spa to your private space.',
      quickLinks: 'Quick Links',
      home: 'Home',
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
    }
  },
  es: {
    nav: {
      treatments: 'Tratamientos',
      about: 'Nosotros',
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
      items: {
        relaxing: {
          name: 'Signature Relaxation',
          desc: 'Un viaje suave y rítmico diseñado para disolver el estrés y restaurar la armonía interior.',
          details: 'Nuestro tratamiento insignia utiliza movimientos largos y fluidos para calmar el sistema nervioso. Perfecto para recuperarse del jet lag o simplemente desconectar después de un día bajo el sol.',
          price60: 1800,
          price90: 2400,
          price120: 3000,
          benefitsList: ['Reduce el estrés y la ansiedad', 'Mejora la circulación', 'Promotes un mejor sueño'],
          includesList: ['Mesa de masaje profesional', 'Aceites de aromaterapia orgánicos', 'Paisaje sonoro relajante']
        },
        deepTissue: {
          name: 'Deep Tissue Recovery',
          desc: 'Presión intensa y localizada para liberar la tensión crónica y revitalizar los músculos cansados.',
          details: 'Un masaje terapéutico que se enfoca en realinear las capas más profundas de los músculos y el tejido conectivo. Ideal para dolores crónicos y áreas contraídas.',
          price60: 2100,
          price90: 2700,
          price120: 3300,
          benefitsList: ['Alivia el dolor muscular crónico', 'Mejora la postura', 'Descompone el tejido cicatricial'],
          includesList: ['Mesa de masaje profesional', 'Aceites de grado terapéutico', 'Bálsamo para alivio muscular']
        },
        personalized: {
          name: 'Bespoke Therapy',
          desc: 'Un tratamiento a medida diseñado específicamente para las necesidades únicas de tu cuerpo.',
          details: 'Su terapeuta consultará con usted para crear una combinación única de técnicas, enfocándose exactamente donde más lo necesita.',
          price60: 2000,
          price90: 2600,
          price120: 3200,
          benefitsList: ['Personalizado según sus necesidades', 'Aborda áreas problemáticas específicas', 'Equilibrio corporal total'],
          includesList: ['Mesa de masaje profesional', 'Elección de aromaterapia', 'Consulta personalizada']
        },
        fourHands: {
          name: 'Four-Hands Bliss',
          desc: 'La máxima indulgencia: dos terapeutas trabajando en perfecta sincronía para una inmersión total.',
          details: 'Una experiencia única donde dos terapeutas trabajan juntos en una secuencia coreografiada, haciendo imposible que el cerebro siga el ritmo, lo que lleva a un estado de entrega total.',
          price60: 3500,
          price90: 4200,
          benefitsList: ['Doble relajación', 'Máxima experiencia sensorial', 'Estado de meditación más profundo'],
          includesList: ['Dos terapeutas profesionales', 'Aceites orgánicos premium', 'Paisaje sonoro mejorado']
        },
      },
    },
    social: {
      instagram: 'https://instagram.com/boticaspa',
      facebook: 'https://facebook.com/boticaspa',
      whatsapp: 'https://wa.me/529841234567',
      phone: '+52 984 123 4567',
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
    footer: {
      desc: 'Servicios de masaje premium a domicilio en Playa del Carmen. Llevando el santuario de un spa de clase mundial a tu espacio privado.',
      quickLinks: 'Enlaces Rápidos',
      home: 'Inicio',
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
    }
  }
};
