import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle,
  ChevronUp,
  Menu,
  X
} from 'lucide-react';
import { Routes, Route, Link, useLocation, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { useLanguage, LanguageProvider } from './LanguageContext';
import { LangLink, toLangPath, ES_PATHS } from './components/LangLink';
import { translations } from './translations';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Promo } from './components/Promo';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
const BookingSystem = lazy(() => import('./components/BookingSystem').then(m => ({ default: m.BookingSystem })));
import { TreatmentDetail } from './components/TreatmentDetail';
import { SEO } from './components/SEO';
import { Home } from './pages/Home';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { ServicePage } from './pages/ServicePage';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { PaymentSuccess } from './pages/PaymentSuccess';
import { LocationPage } from './pages/LocationPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminClientes = lazy(() => import('./pages/admin/AdminClientes').then(m => ({ default: m.AdminClientes })));
const AdminSEO = lazy(() => import('./pages/admin/AdminSEO').then(m => ({ default: m.AdminSEO })));
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute').then(m => ({ default: m.ProtectedRoute })));
import { cn } from './lib/utils';

function AppContent() {
  const { language, t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [bookingServiceKey, setBookingServiceKey] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const hasOpenedBooking = useRef(false);
  if (isBookingOpen) hasOpenedBooking.current = true;
  const location = useLocation();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTreatment = (id: string) => {
    setSelectedTreatment(id);
  };

  const handleBook = () => {
    setIsBookingOpen(true);
  };

  const isEs = language === 'es';
  const altPath = isEs
    ? (Object.entries(ES_PATHS).find(([, v]) => v === location.pathname)?.[0] ?? (location.pathname.replace(/^\/es/, '') || '/'))
    : toLangPath(location.pathname, 'es');

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center transition-all duration-500",
        location.pathname === '/' ? "bg-gradient-to-b from-black/20 to-transparent" : "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
      )}>
        <LangLink to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Botica Spa Logo"
            width={48}
            height={48}
            className={cn("w-12 h-12 object-contain transition-all", location.pathname === '/' ? "brightness-0 invert" : "")}
          />
        </LangLink>
        <div className={cn(
          "hidden md:flex items-center gap-8 text-xs uppercase tracking-widest transition-colors",
          location.pathname === '/' ? "text-white/80" : "text-[#1A1A1A]/60"
        )}>
          <LangLink to="/massages" className={cn(
            "hover:text-white transition-colors",
            location.pathname !== '/' && "hover:text-brand"
          )}>{t.nav.treatments}</LangLink>
          <LangLink to="/about" className={cn(
            "hover:text-white transition-colors",
            location.pathname !== '/' && "hover:text-brand"
          )}>{language === 'en' ? 'About' : 'Nosotros'}</LangLink>
          <LangLink to="/blog" className={cn(
            "hover:text-white transition-colors",
            location.pathname !== '/' && "hover:text-brand"
          )}>{t.nav.blog}</LangLink>
          {/* Language switcher */}
          <Link
            to={altPath}
            className={cn(
              "text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border transition-all",
              location.pathname === '/'
                ? "border-white/30 text-white/70 hover:border-white hover:text-white"
                : "border-gray-300 text-gray-500 hover:border-brand hover:text-brand"
            )}
          >
            {isEs ? 'EN' : 'ES'}
          </Link>
          <button
            onClick={() => setIsBookingOpen(true)}
            className={cn(
              "px-6 py-3 rounded-full transition-all font-medium",
              location.pathname === '/' ? "bg-white text-black hover:bg-gray-100" : "bg-[#1A1A1A] text-white hover:bg-[#2A2A2A]"
            )}
          >
            {t.nav.bookNow}
          </button>
        </div>

        {/* Mobile: language pill + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            to={altPath}
            className={cn(
              "text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border transition-all",
              location.pathname === '/'
                ? "border-white/30 text-white/70 hover:border-white hover:text-white"
                : "border-gray-300 text-gray-500 hover:border-brand hover:text-brand"
            )}
          >
            {isEs ? 'EN' : 'ES'}
          </Link>
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
            className={cn(
              "p-2 transition-colors",
              location.pathname === '/' ? "text-white" : "text-[#1A1A1A]"
            )}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            <div className="px-8 py-6 flex justify-between items-center border-b border-gray-100">
              <LangLink to="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                <img
                  src="/logo.png"
                  alt="Botica Spa Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </LangLink>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 text-[#1A1A1A]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-8 p-8">
              <LangLink
                to="/massages"
                className="text-3xl font-serif text-[#1A1A1A] hover:text-brand transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.treatments}
              </LangLink>
              <LangLink
                to="/about"
                className="text-3xl font-serif text-[#1A1A1A] hover:text-brand transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === 'en' ? 'About' : 'Nosotros'}
              </LangLink>
              <LangLink
                to="/blog"
                className="text-3xl font-serif text-[#1A1A1A] hover:text-brand transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.blog}
              </LangLink>
              <button 
                onClick={() => {
                  setIsBookingOpen(true);
                  setIsMenuOpen(false);
                }}
                className="mt-4 w-full max-w-xs bg-[#1A1A1A] text-white py-5 rounded-full text-lg font-medium hover:bg-[#2A2A2A] transition-colors"
              >
                {t.nav.bookNow}
              </button>
            </div>

            <div className="p-8 border-t border-gray-100 flex justify-center gap-8">
              <a href={t.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">
                Instagram
              </a>
              <a href={t.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors">
                Facebook
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        {/* English routes */}
        <Route path="/" element={<Home onSelectTreatment={handleSelectTreatment} onBookNow={handleBook} />} />
        <Route path="/massages" element={<TreatmentsPage onSelectTreatment={handleSelectTreatment} />} />
        <Route path="/massages/:serviceId" element={<ServicePage onBookNow={(id) => { setBookingServiceKey(id); setIsBookingOpen(true); }} />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/booking/success" element={<PaymentSuccess />} />
        <Route path="/massage-puerto-aventuras" element={<LocationPage city="puerto-aventuras" />} />
        <Route path="/massage-puerto-morelos" element={<LocationPage city="puerto-morelos" />} />
        <Route path="/massage-akumal" element={<LocationPage city="akumal" />} />
        <Route path="/massage-playacar" element={<LocationPage city="playacar" />} />
        {/* Spanish routes */}
        <Route path="/es/" element={<Home onSelectTreatment={handleSelectTreatment} onBookNow={handleBook} />} />
        <Route path="/es/masajes" element={<TreatmentsPage onSelectTreatment={handleSelectTreatment} />} />
        <Route path="/es/masajes/:serviceId" element={<ServicePage onBookNow={(id) => { setBookingServiceKey(id); setIsBookingOpen(true); }} />} />
        <Route path="/es/blog" element={<Blog />} />
        <Route path="/es/blog/:id" element={<BlogPost />} />
        <Route path="/es/sobre-nosotros" element={<AboutPage />} />
        <Route path="/es/booking/success" element={<PaymentSuccess />} />
        <Route path="/es/masaje-puerto-aventuras" element={<LocationPage city="puerto-aventuras" />} />
        <Route path="/es/masaje-puerto-morelos" element={<LocationPage city="puerto-morelos" />} />
        <Route path="/es/masaje-akumal" element={<LocationPage city="akumal" />} />
        <Route path="/es/masaje-playacar" element={<LocationPage city="playacar" />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/es/contacto" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/es/preguntas-frecuentes" element={<FAQPage />} />
      </Routes>

      <Footer />

      {/* Floating Elements */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="w-14 h-14 bg-white text-[#1A1A1A] rounded-full shadow-2xl flex items-center justify-center hover:bg-[#F5F2ED] transition-all border border-gray-100"
            >
              <ChevronUp className="w-6 h-6" />
            </motion.button>
          )}
        </AnimatePresence>
        
        <a 
          href={t.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="w-14 h-14 bg-brand text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-brand-dark transition-all group relative"
        >
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
          <span className="absolute right-full mr-4 px-4 py-2 bg-white text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
            {language === 'en' ? 'Chat with us' : 'Chatea con nosotros'}
          </span>
        </a>
      </div>

      <TreatmentDetail
        treatmentId={selectedTreatment}
        onClose={() => setSelectedTreatment(null)}
        onBook={(id) => {
          setBookingServiceKey(id);
          setSelectedTreatment(null);
          setIsBookingOpen(true);
        }}
      />

      {hasOpenedBooking.current && (
        <Suspense fallback={null}>
          <BookingSystem
            isOpen={isBookingOpen}
            onClose={() => { setIsBookingOpen(false); setBookingServiceKey(null); }}
            initialServiceId={bookingServiceKey ?? selectedTreatment}
          />
        </Suspense>
      )}
      
    </div>
  );
}

function AdminRouter() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/clientes" element={<ProtectedRoute><AdminClientes /></ProtectedRoute>} />
      <Route path="/admin/seo" element={<ProtectedRoute><AdminSEO /></ProtectedRoute>} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AppRouterSwitch />
      </LanguageProvider>
    </Router>
  );
}

function AppRouterSwitch() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return <Suspense fallback={null}><AdminRouter /></Suspense>;
  return <AppContent />;
}

export default App;
