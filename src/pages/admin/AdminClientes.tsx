import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { LogOut, Search, Download } from 'lucide-react';

interface Booking {
  id: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceName?: string;
  date?: string;
  time?: string;
  status?: string;
  address?: string;
  notes?: string;
}

export const AdminClientes: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getDocs(collection(db, 'bookings'))
      .then(snap => setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() } as Booking))))
      .finally(() => setLoading(false));
  }, []);

  const filtered = bookings.filter(b => {
    const matchSearch = !search ||
      b.customerName?.toLowerCase().includes(search.toLowerCase()) ||
      b.customerEmail?.toLowerCase().includes(search.toLowerCase()) ||
      b.serviceName?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || b.status === filter;
    return matchSearch && matchFilter;
  });

  const exportCSV = () => {
    const rows = [
      ['Nombre', 'Email', 'Teléfono', 'Servicio', 'Fecha', 'Hora', 'Estado', 'Dirección', 'Notas'],
      ...filtered.map(b => [
        b.customerName || '', b.customerEmail || '', b.customerPhone || '',
        b.serviceName || '', b.date || '', b.time || '',
        b.status || '', b.address || '', b.notes || ''
      ])
    ];
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'clientes-botica-spa.csv'; a.click();
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      <header className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Botica Spa" className="w-8 h-8 object-contain" />
          <h1 className="font-serif text-lg text-[#1A1A1A]">Panel Botica Spa</h1>
        </div>
        <nav className="flex items-center gap-6">
          <Link to="/admin/dashboard" className="text-xs uppercase tracking-widest text-gray-400 hover:text-[#1A1A1A] transition-colors">Dashboard</Link>
          <Link to="/admin/clientes" className="text-xs uppercase tracking-widest text-[#5A5A40] font-semibold">Clientes</Link>
          <Link to="/admin/seo" className="text-xs uppercase tracking-widest text-gray-400 hover:text-[#1A1A1A] transition-colors">SEO</Link>
          <button onClick={() => signOut(auth)} className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif text-[#1A1A1A]">Clientes & Reservas</h2>
            <p className="text-gray-400 text-sm mt-1">{bookings.length} registros en total</p>
          </div>
          <button onClick={exportCSV} className="flex items-center gap-2 bg-white border border-gray-200 text-sm px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> Exportar CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
            <input
              type="text"
              placeholder="Buscar por nombre, email..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#5A5A40]"
            />
          </div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#5A5A40] bg-white"
          >
            <option value="all">Todos los estados</option>
            <option value="confirmed">Confirmados</option>
            <option value="pending">Pendientes</option>
            <option value="cancelled">Cancelados</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400 text-sm">Cargando reservas...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">No hay reservas que coincidan.</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F9F8F6]">
                  {['Cliente', 'Servicio', 'Fecha', 'Teléfono', 'Estado'].map(h => (
                    <th key={h} className="text-left px-6 py-4 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={b.id} className={`border-b border-gray-50 last:border-0 ${i % 2 === 0 ? '' : 'bg-[#FAFAFA]'}`}>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-[#1A1A1A]">{b.customerName || '—'}</p>
                      <p className="text-xs text-gray-400">{b.customerEmail || ''}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{b.serviceName || '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {b.date || '—'}{b.time ? ` · ${b.time}` : ''}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{b.customerPhone || '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${
                        b.status === 'confirmed' ? 'bg-green-50 text-green-500' :
                        b.status === 'cancelled' ? 'bg-red-50 text-red-400' :
                        'bg-amber-50 text-amber-500'
                      }`}>
                        {b.status || 'pendiente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};
