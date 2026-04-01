import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  ChevronUp, 
  Globe,
  Menu,
  X
} from 'lucide-react';
import { Routes, Route, Link, useLocation, BrowserRouter as Router, matchPath } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { translations } from './translations';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Promo } from './components/Promo';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Footer } from './components/Footer';
import { BookingSystem } from './components/BookingSystem';
import { TreatmentDetail } from './components/TreatmentDetail';
import { SEO } from './components/SEO';
import { GeminiAssistant } from './components/GeminiAssistant';
import { Home } from './pages/Home';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { cn } from './lib/utils';

function AppContent() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  const getSEOProps = () => {
    if (location.pathname === '/treatments') {
      return {
        title: language === 'en' ? 'Our Treatment Menu | Botica Spa' : 'Nuestro Menú de Tratamientos | Botica Spa',
        description: language === 'en' ? 'Explore our full range of premium spa rituals including signature massages, deep tissue, and revitalizing facials.' : 'Explora nuestra gama completa de rituales de spa premium, incluyendo masajes exclusivos, tejido profundo y faciales revitalizantes.'
      };
    }
    if (location.pathname === '/blog') {
      return {
        title: `${t.nav.blog} | Botica Spa`,
        description: t.blog.title
      };
    }
    const blogMatch = matchPath('/blog/:id', location.pathname);
    if (blogMatch) {
      const id = blogMatch.params.id;
      const post = t.blog.posts.find((p: any) => p.id === id);
      if (post) {
        return {
          title: `${post.title} | Botica Spa Blog`,
          description: post.excerpt
        };
      }
    }
    return null;
  };

  const seoProps = getSEOProps();

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

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      {seoProps && <SEO {...seoProps} />}
      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center transition-all duration-500",
        location.pathname === '/' ? "bg-gradient-to-b from-black/20 to-transparent" : "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100"
      )}>
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="input_file_20.png" 
            alt="Botica Spa Logo" 
            className="w-12 h-12 object-contain"
            referrerPolicy="no-referrer"
          />
          <div className={cn(
            "font-sans text-2xl font-bold tracking-tight transition-colors",
            location.pathname === '/' ? "text-white" : "text-[#1A1A1A]"
          )}>Botica Spa</div>
        </Link>
        <div className={cn(
          "hidden md:flex items-center gap-8 text-xs uppercase tracking-widest transition-colors",
          location.pathname === '/' ? "text-white/80" : "text-[#1A1A1A]/60"
        )}>
          <Link to="/treatments" className={cn(
            "hover:text-white transition-colors",
            location.pathname !== '/' && "hover:text-brand"
          )}>{t.nav.treatments}</Link>
          <Link to="/blog" className={cn(
            "hover:text-white transition-colors",
            location.pathname !== '/' && "hover:text-brand"
          )}>{t.nav.blog}</Link>
          <a href="/#about" className={cn(
            "hover:text-white transition-colors",
            location.pathname !== '/' && "hover:text-brand"
          )}>{t.nav.about}</a>
          
          {/* Language Switcher */}
          <button 
            onClick={toggleLanguage}
            className={cn(
              "flex items-center gap-2 transition-colors group",
              location.pathname === '/' ? "hover:text-white" : "hover:text-brand"
            )}
          >
            <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>{language === 'en' ? 'ES' : 'EN'}</span>
          </button>

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

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMenuOpen(true)}
          className={cn(
            "md:hidden p-2 transition-colors",
            location.pathname === '/' ? "text-white" : "text-[#1A1A1A]"
          )}
        >
          <Menu className="w-6 h-6" />
        </button>
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
              <div className="flex items-center gap-3">
                <img 
                  src="input_file_20.png" 
                  alt="Botica Spa Logo" 
                  className="w-10 h-10 object-contain"
                  referrerPolicy="no-referrer"
                />
                <div className="font-serif text-xl tracking-tight text-[#1A1A1A]">Botica Spa</div>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-[#1A1A1A]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-8 p-8">
              <Link 
                to="/treatments" 
                className="text-3xl font-serif text-[#1A1A1A] hover:text-brand transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.treatments}
              </Link>
              <Link 
                to="/blog" 
                className="text-3xl font-serif text-[#1A1A1A] hover:text-brand transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.blog}
              </Link>
              <a 
                href="/#about" 
                className="text-3xl font-serif text-[#1A1A1A] hover:text-brand transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.nav.about}
              </a>
              
              <button 
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-3 text-xl font-serif text-[#1A1A1A]"
              >
                <Globe className="w-5 h-5" />
                <span>{language === 'en' ? 'Español' : 'English'}</span>
              </button>

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
              <a href={t.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                Instagram
              </a>
              <a href={t.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                Facebook
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home onSelectTreatment={handleSelectTreatment} onBookNow={handleBook} />} />
        <Route path="/treatments" element={<TreatmentsPage onSelectTreatment={handleSelectTreatment} />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
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
          className="w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform group relative"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute right-full mr-4 px-4 py-2 bg-white text-[#1A1A1A] text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
            {language === 'en' ? 'Chat with us' : 'Chatea con nosotros'}
          </span>
        </a>
      </div>

      <TreatmentDetail 
        treatmentId={selectedTreatment} 
        onClose={() => setSelectedTreatment(null)}
        onBook={(id) => {
          setSelectedTreatment(null);
          setIsBookingOpen(true);
        }}
      />

      <BookingSystem 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)}
        initialServiceId={selectedTreatment}
      />
      
      <GeminiAssistant />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
