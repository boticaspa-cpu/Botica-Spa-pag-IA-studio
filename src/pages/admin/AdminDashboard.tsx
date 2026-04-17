import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { StatCard } from '../../components/admin/StatCard';
import { Users, Star, TrendingUp, AlertCircle, LogOut, CheckSquare, Square } from 'lucide-react';

interface Booking {
  id: string;
  date: string;
  status: string;
  serviceName?: string;
}

interface SEOTask {
  id: string;
  text: string;
  done: boolean;
}

const SEO_TASKS: SEOTask[] = [
  { id: '1', text: 'Configurar Google Business Profile como área de servicio', done: false },
  { id: '2', text: 'Corregir las 50 fichas inconsistentes en directorios', done: false },
  { id: '3', text: 'Agregar reseñas de clientes recurrentes a Google', done: false },
  { id: '4', text: 'Revisar las 3 URLs con error 404 en Search Console', done: false },
  { id: '5', text: 'Solicitar reindexación tras cambios de hoy', done: true },
  { id: '6', text: 'Publicar nuevo post de blog (keywords Tulum)', done: false },
];

export const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rating, setRating] = useState<{ rating: number; total: number } | null>(null);
  const [tasks, setTasks] = useState<SEOTask[]>(SEO_TASKS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, 'bookings'));
        setBookings(snap.docs.map(d => ({ id: d.id, ...d.data() } as Booking)));
      } catch {}

      try {
        const res = await fetch('/api/reviews');
        const data = await res.json();
        if (data.rating) setRating({ rating: data.rating, total: data.total });
      } catch {}

      setLoading(false);
    };
    load();
  }, []);

  const now = new Date();
  const thisMonth = bookings.filter(b => {
    const d = new Date(b.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const lastMonth = bookings.filter(b => {
    const d = new Date(b.date);
    const lm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return d.getMonth() === lm.getMonth() && d.getFullYear() === lm.getFullYear();
  });

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const pending = tasks.filter(t => !t.done).length;

  return (
    <div className="min-h-screen bg-[#F5F2ED]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="Botica Spa" className="w-8 h-8 object-contain" />
          <div>
            <h1 className="font-serif text-lg text-[#1A1A1A]">Panel Botica Spa</h1>
            <p className="text-xs text-gray-400">Administración privada</p>
          </div>
        </div>
        <nav className="flex items-center gap-6">
          <Link to="/admin/dashboard" className="text-xs uppercase tracking-widest text-[#5A5A40] font-semibold">Dashboard</Link>
          <Link to="/admin/clientes" className="text-xs uppercase tracking-widest text-gray-400 hover:text-[#1A1A1A] transition-colors">Clientes</Link>
          <Link to="/admin/seo" className="text-xs uppercase tracking-widest text-gray-400 hover:text-[#1A1A1A] transition-colors">SEO</Link>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Salir
          </button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-serif text-[#1A1A1A]">Resumen</h2>
          <p className="text-gray-400 text-sm mt-1">{now.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            label="Reservas este mes"
            value={loading ? '...' : thisMonth.length}
            sub={lastMonth.length > 0 ? `${lastMonth.length} el mes pasado` : undefined}
            trend={thisMonth.length >= lastMonth.length ? 'up' : 'down'}
            icon={<Users className="w-5 h-5" />}
          />
          <StatCard
            label="Total reservas"
            value={loading ? '...' : bookings.length}
            sub="en Firestore"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            label="Rating Google"
            value={rating ? `★ ${rating.rating.toFixed(1)}` : '...'}
            sub={rating ? `${rating.total} reseñas` : 'cargando'}
            trend="up"
            icon={<Star className="w-5 h-5" />}
          />
          <StatCard
            label="Tareas SEO"
            value={`${pending} pendientes`}
            sub={`${tasks.length - pending} completadas`}
            trend={pending > 3 ? 'down' : 'up'}
            icon={<AlertCircle className="w-5 h-5" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Últimas reservas */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-lg text-[#1A1A1A]">Últimas reservas</h3>
              <Link to="/admin/clientes" className="text-xs uppercase tracking-widest text-[#5A5A40] font-semibold hover:underline">
                Ver todas
              </Link>
            </div>
            {loading ? (
              <p className="text-gray-400 text-sm">Cargando...</p>
            ) : bookings.length === 0 ? (
              <p className="text-gray-400 text-sm">Sin reservas registradas aún.</p>
            ) : (
              <div className="space-y-3">
                {bookings.slice(-5).reverse().map(b => (
                  <div key={b.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-[#1A1A1A]">{b.serviceName || 'Servicio'}</p>
                      <p className="text-xs text-gray-400">{b.date}</p>
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full ${
                      b.status === 'confirmed' ? 'bg-green-50 text-green-500' :
                      b.status === 'cancelled' ? 'bg-red-50 text-red-400' :
                      'bg-amber-50 text-amber-500'
                    }`}>
                      {b.status || 'pendiente'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tareas SEO */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-serif text-lg text-[#1A1A1A]">Tareas SEO</h3>
              <Link to="/admin/seo" className="text-xs uppercase tracking-widest text-[#5A5A40] font-semibold hover:underline">
                Ver métricas
              </Link>
            </div>
            <div className="space-y-3">
              {tasks.map(task => (
                <button
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className="w-full flex items-start gap-3 text-left group"
                >
                  {task.done
                    ? <CheckSquare className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    : <Square className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5 group-hover:text-[#5A5A40] transition-colors" />
                  }
                  <span className={`text-sm ${task.done ? 'line-through text-gray-300' : 'text-[#1A1A1A]'}`}>
                    {task.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
