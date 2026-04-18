import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

const WHATSAPP_NUMBER = '529842687428';

export function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Mercado Pago returns: ?collection_status=approved&external_reference={bookingData JSON}
    const status = searchParams.get('collection_status') || searchParams.get('status');
    const externalRef = searchParams.get('external_reference');

    if (!externalRef) {
      navigate('/');
      return;
    }

    try {
      const booking = JSON.parse(externalRef);
      const depositAmount = booking.depositAmount
        ? parseFloat(booking.depositAmount).toFixed(2)
        : '0';

      // Guardar reserva en Firestore
      const paymentId = searchParams.get('payment_id') || searchParams.get('collection_id') || '';
      fetch('/api/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...booking, paymentId, status: 'confirmed' }),
      }).catch(err => console.warn('Could not save booking to Firestore:', err));

      const guestLines = Array.isArray(booking.guests)
        ? booking.guests.map(
            (g: { serviceName: string; duration: string }, i: number) =>
              `   Invitado ${i + 1}: ${g.serviceName}, ${g.duration}`
          )
        : [];

      const msg = [
        `Hola! Me gustaría confirmar mi sesión en Botica Spa:`,
        ``,
        ...(guestLines.length > 0 ? [`🧖 Tratamientos:`, ...guestLines] : []),
        `📅 Fecha: ${booking.date}`,
        `⏰ Hora: ${booking.time}`,
        `📍 Dirección: ${booking.address}`,
        ...(booking.mapsUrl ? [`🗺️ Google Maps: ${booking.mapsUrl}`] : []),
        `👤 Nombre: ${booking.customerName}`,
        `📧 Email: ${booking.customerEmail}`,
        `📱 Teléfono: ${booking.customerPhone}`,
        ``,
        `✅ Depósito 30% pagado: $${depositAmount} MXN${status ? ` (${status})` : ''}`,
      ].join('\n');

      const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

      const timer = setTimeout(() => {
        window.location.href = waUrl;
      }, 2500);

      return () => clearTimeout(timer);
    } catch {
      navigate('/');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-serif mb-4">¡Pago Confirmado!</h1>
        <p className="text-gray-500 mb-2">Tu depósito ha sido recibido.</p>
        <p className="text-gray-400 text-sm">Te estamos redirigiendo a WhatsApp para completar tu reserva…</p>
        <div className="mt-8 flex justify-center">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}
