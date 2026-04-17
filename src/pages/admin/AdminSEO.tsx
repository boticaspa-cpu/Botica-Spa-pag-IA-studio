import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { StatCard } from '../../components/admin/StatCard';
import { LogOut, TrendingUp, Eye, MousePointer, AlertTriangle, ExternalLink } from 'lucide-react';

interface GSCData {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  keywords: { query: string; clicks: number; impressions: number; position: number }[];
  errors: { url: string; type: string }[];
}

export const AdminSEO: React.FC = () => {
  const [data, setData] = useState<GSCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/gsc')
      .then(r => r.json())
      .then(d => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError('No se pudo conectar con Search Console'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <header className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Botica Spa" className="w-8 h-8 object-contain" />
          <h1 className="font-serif text-lg text-[#1A1A1A]">Panel Botica Spa</h1>
        </div>
        <nav className="flex items-center gap-6">
          <Link to="/admin/dashboard" className="text-xs uppercase tracking-widest text-gray-400 hover:text-[#1A1A1A] transition-colors">Dashboard</Link>
          <Link to="/admin/clientes" className="text-xs uppercase tracking-widest text-gray-400 hover:text-[#1A1A1A] transition-colors">Clientes</Link>
          <Link to="/admin/seo" className="text-xs uppercase tracking-widest text-[#5A5A40] font-semibold">SEO</Link>
          <button onClick={() => signOut(auth)} className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-10">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-serif text-[#1A1A1A]">SEO & Search Console</h2>
            <p className="text-gray-400 text-sm mt-1">Últimos 28 días · boticaspa.com</p>
          </div>
          <a
            href="https://search.google.com/search-console"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#5A5A40] font-semibold hover:underline"
          >
            Abrir GSC <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="w-6 h-6 border-2 border-[#5A5A40] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <p className="text-amber-700 text-sm font-medium mb-1">Search Console no conectado aún</p>
            <p className="text-amber-600 text-xs">{error}</p>
            <p className="text-amber-600 text-xs mt-2">
              Para conectar: asegúrate de que el archivo de credenciales OAuth esté en la ruta configurada en el servidor.
            </p>
          </div>
        )}

        {data && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard label="Clicks (28d)" value={data.clicks.toLocaleString()} icon={<MousePointer className="w-5 h-5" />} />
              <StatCard label="Impresiones" value={data.impressions.toLocaleString()} icon={<Eye className="w-5 h-5" />} />
              <StatCard label="CTR promedio" value={`${(data.ctr * 100).toFixed(1)}%`} icon={<TrendingUp className="w-5 h-5" />} />
              <StatCard label="Posición media" value={data.position.toFixed(1)} sub="1 = mejor posición" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-serif text-lg text-[#1A1A1A] mb-5">Top Keywords</h3>
                <div className="space-y-3">
                  {data.keywords.map((kw, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-300 w-5">#{i + 1}</span>
                        <span className="text-sm text-[#1A1A1A]">{kw.query}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-[#5A5A40]">#{kw.position.toFixed(0)}</span>
                        <span className="text-xs text-gray-400 ml-2">{kw.clicks} clicks</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-serif text-lg text-[#1A1A1A] mb-5 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Errores 404
                </h3>
                {data.errors.length === 0 ? (
                  <p className="text-green-500 text-sm">Sin errores detectados</p>
                ) : (
                  <div className="space-y-3">
                    {data.errors.map((e, i) => (
                      <div key={i} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                        <span className="text-[10px] bg-red-50 text-red-400 font-bold px-2 py-1 rounded-full uppercase">404</span>
                        <span className="text-xs text-gray-500 break-all">{e.url}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Siempre mostrar links útiles */}
        {!loading && (
          <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-serif text-lg text-[#1A1A1A] mb-4">Links rápidos</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Search Console', url: 'https://search.google.com/search-console' },
                { label: 'Google Business', url: 'https://business.google.com' },
                { label: 'PageSpeed', url: 'https://pagespeed.web.dev/?url=https://boticaspa.com' },
                { label: 'Rich Results', url: 'https://search.google.com/test/rich-results?url=https://boticaspa.com' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 bg-[#F9F8F6] rounded-xl text-sm text-[#1A1A1A] hover:bg-[#F0EDE6] transition-colors"
                >
                  {link.label}
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
