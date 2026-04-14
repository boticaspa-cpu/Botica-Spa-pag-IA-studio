import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-white py-20 px-4 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/logo.png"
                alt="Botica Spa Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <h2 className="text-3xl font-sans font-bold tracking-tight">Botica Spa</h2>
            </div>
            <p className="text-gray-500 max-w-sm leading-relaxed mb-8">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              <a 
                href={t.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand hover:border-brand transition-all"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={t.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand hover:border-brand transition-all"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-6">{t.footer.quickLinks}</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><Link to="/" className="hover:text-black transition-colors">{t.footer.home}</Link></li>
              <li><Link to="/massages" className="hover:text-black transition-colors">{t.nav.treatments}</Link></li>
              <li><Link to="/blog" className="hover:text-black transition-colors">{t.nav.blog}</Link></li>
              <li><Link to="/massage-tulum" className="hover:text-black transition-colors">Massage in Tulum</Link></li>
              <li><Link to="/massage-cancun" className="hover:text-black transition-colors">Massage in Cancún</Link></li>
              <li><a href={t.social.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">{t.footer.contact}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest font-semibold mb-6">{t.footer.contact}</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>{t.social.location}</li>
              <li>{t.social.phone}</li>
              <li>{t.social.email}</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">© 2026 Botica Spa. {t.footer.rights}</p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-black transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-black transition-colors">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
