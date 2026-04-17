import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export const ES_PATHS: Record<string, string> = {
  '/':                    '/es/',
  '/massages':            '/es/masajes',
  '/about':               '/es/sobre-nosotros',
  '/blog':                '/es/blog',
  '/massage-tulum':       '/es/masaje-tulum',
  '/massage-cancun':      '/es/masaje-cancun',
  '/massage-akumal':      '/es/masaje-akumal',
  '/massage-playacar':    '/es/masaje-playacar',
  '/contact':             '/es/contacto',
};

export function toLangPath(path: string, language: string): string {
  if (language !== 'es') return path;
  if (ES_PATHS[path]) return ES_PATHS[path];
  // Handle dynamic paths: /massages/:slug → /es/masajes/:slug
  if (path.startsWith('/massages/')) return path.replace('/massages/', '/es/masajes/');
  if (path.startsWith('/blog/'))     return path.replace('/blog/', '/es/blog/');
  return `/es${path}`;
}

export const LangLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, ...props }, ref) => {
    const { language } = useLanguage();
    const resolved = typeof to === 'string' ? toLangPath(to, language) : to;
    return <Link ref={ref} to={resolved} {...props} />;
  }
);
LangLink.displayName = 'LangLink';
