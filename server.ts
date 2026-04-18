import 'dotenv/config';
import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import { createGzip, createBrotliCompress, constants as zlibConstants } from "zlib";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import Anthropic from "@anthropic-ai/sdk";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, Timestamp } from "firebase/firestore";
import { google } from "googleapis";

// Firebase initialization
const _require = createRequire(import.meta.url);
const _fbConfig = _require("./firebase-applet-config.json");
const _fbApp = getApps().length ? getApps()[0] : initializeApp(_fbConfig);
const firestoreDb = getFirestore(_fbApp, _fbConfig.firestoreDatabaseId);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // ── Gzip/Brotli compression (built-in zlib, no extra dependency) ──────────
  // Only compresses compressible text types; skips already-compressed assets.
  const COMPRESSIBLE = /^(text\/|application\/(javascript|json|xml)|image\/svg)/;
  app.use((req, res, next) => {
    if (process.env.NODE_ENV !== 'production') return next();
    if (req.method === 'HEAD') return next();
    const ae = (req.headers['accept-encoding'] as string) || '';
    if (!ae.includes('gzip') && !ae.includes('br')) return next();

    const origWrite = res.write.bind(res);
    const origEnd = res.end.bind(res);
    const origWriteHead = res.writeHead.bind(res);

    // Intercept writeHead to decide whether to compress based on Content-Type
    (res as any).writeHead = function (code: number, headers?: any) {
      const ct = res.getHeader('Content-Type') as string || '';
      const ce = res.getHeader('Content-Encoding') as string || '';
      if (ce || !COMPRESSIBLE.test(ct)) {
        // Not compressible — pass through
        return origWriteHead(code, headers);
      }
      let gz: ReturnType<typeof createGzip>;
      if (ae.includes('br')) {
        gz = createBrotliCompress({ params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 4 } }) as any;
        res.setHeader('Content-Encoding', 'br');
      } else {
        gz = createGzip({ level: 6 });
        res.setHeader('Content-Encoding', 'gzip');
      }
      res.removeHeader('Content-Length');
      gz.on('data', (chunk: Buffer) => origWrite(chunk));
      gz.on('end', () => origEnd());
      gz.on('error', () => origEnd());
      res.write = function (chunk: any, enc?: any, cb?: any) { return gz.write(chunk, enc, cb); } as any;
      res.end = function (chunk?: any, enc?: any, cb?: any) {
        if (chunk) gz.write(chunk, enc as any);
        gz.end();
        return this as any;
      };
      return origWriteHead(code, headers);
    };
    next();
  });
  // ─────────────────────────────────────────────────────────────────────────

  // ─── Redirects 301 desde URLs viejas de WordPress ───────────────────────
  const redirects: Record<string, string> = {
    // WordPress service pages → new React English URLs
    '/relaxing-massage':                      '/massages/relaxing-massage',
    '/relaxing-massage/':                     '/massages/relaxing-massage',
    '/deep-tissue-massage':                   '/massages/deep-tissue-massage',
    '/deep-tissue-massage/':                  '/massages/deep-tissue-massage',
    '/four-hands-massage':                    '/massages/four-hands-massage',
    '/four-hands-massage/':                   '/massages/four-hands-massage',
    '/botica-massage':                        '/massages/botica-signature',
    '/botica-massage/':                       '/massages/botica-signature',
    '/personalized-massage':                  '/massages/personalized-massage',
    '/personalized-massage/':                 '/massages/personalized-massage',
    '/facial':                                '/massages/revitalizing-facial',
    '/facial/':                               '/massages/revitalizing-facial',

    // WordPress structural pages
    '/services':                              '/massages',
    '/services/':                             '/massages',
    '/wellness-center':                       '/massages',
    '/wellness-center/':                      '/massages',
    '/home':                                  '/',
    '/home/':                                 '/',
    '/contact/':                              '/contact',
    '/thank-you':                             '/booking/success',
    '/thank-you/':                            '/booking/success',
    '/cancellation-and-rescheduling-policy':  '/#faq',
    '/cancellation-and-rescheduling-policy/': '/#faq',

    // Legacy Spanish URLs (in case /masajes was crawled before cutover)
    '/masajes':                               '/massages',
    '/masajes/':                              '/massages',
    '/masajes/relaxing-massage':              '/massages/relaxing-massage',
    '/masajes/deep-tissue-massage':           '/massages/deep-tissue-massage',
    '/masajes/four-hands-massage':            '/massages/four-hands-massage',
    '/masajes/botica-signature':              '/massages/botica-signature',
    '/masajes/personalized-massage':          '/massages/personalized-massage',
    '/masajes/revitalizing-facial':           '/massages/revitalizing-facial',
  };

  Object.entries(redirects).forEach(([from, to]) => {
    app.get(from, (_req, res) => res.redirect(301, to));
  });

  // Redirect blog viejo /?page_id=100
  app.get('/', (req, res, next) => {
    if (req.query['page_id'] === '100') {
      return res.redirect(301, '/blog');
    }
    next();
  });
  // ────────────────────────────────────────────────────────────────────────

  // API routes
  app.post("/api/send-confirmation", async (req, res) => {
    const { customerEmail, customerName, serviceName, date, time, address, price, language } = req.body;

    if (!customerEmail) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Lazy initialization of transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const isEn = language === 'en';
    const subject = isEn ? `Booking Confirmation - Botica Spa` : `Confirmación de Reserva - Botica Spa`;
    
    const html = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1a1a1a; background-color: #f9f8f6;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="font-weight: 500; font-size: 28px; letter-spacing: 1px;">Botica Spa</h1>
          <p style="font-style: italic; color: #666;">${isEn ? 'Bespoke Wellness Rituals' : 'Rituales de Bienestar a Medida'}</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 30px; border-radius: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
          <h2 style="font-size: 22px; margin-bottom: 20px;">${isEn ? `Hello, ${customerName}` : `Hola, ${customerName}`}</h2>
          <p style="line-height: 1.6; margin-bottom: 25px;">
            ${isEn 
              ? 'Thank you for choosing Botica Spa. Your booking has been received and is currently being processed.' 
              : 'Gracias por elegir Botica Spa. Tu reserva ha sido recibida y está siendo procesada.'}
          </p>
          
          <div style="border-top: 1px solid #eee; border-bottom: 1px solid #eee; padding: 20px 0; margin-bottom: 25px;">
            <p style="margin: 5px 0;"><strong>${isEn ? 'Service' : 'Servicio'}:</strong> ${serviceName}</p>
            <p style="margin: 5px 0;"><strong>${isEn ? 'Date' : 'Fecha'}:</strong> ${date}</p>
            <p style="margin: 5px 0;"><strong>${isEn ? 'Time' : 'Hora'}:</strong> ${time}</p>
            <p style="margin: 5px 0;"><strong>${isEn ? 'Location' : 'Ubicación'}:</strong> ${address}</p>
            <p style="margin: 5px 0;"><strong>${isEn ? 'Price' : 'Precio'}:</strong> $${price} MXN</p>
          </div>
          
          <p style="font-size: 14px; color: #666; line-height: 1.6;">
            ${isEn 
              ? 'Our team will contact you shortly via WhatsApp or phone to confirm the final details and therapist availability.' 
              : 'Nuestro equipo se pondrá en contacto contigo a la brevedad vía WhatsApp o teléfono para confirmar los detalles finales y la disponibilidad de terapeutas.'}
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">
          <p>Botica Spa • Playa del Carmen, Mexico</p>
        </div>
      </div>
    `;

    try {
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("SMTP credentials missing. Email not sent.");
        return res.status(200).json({ status: "success", note: "Email not sent due to missing credentials" });
      }

      await transporter.sendMail({
        from: `"Botica Spa" <${process.env.SMTP_USER}>`,
        to: customerEmail,
        subject: subject,
        html: html,
      });

      res.status(200).json({ status: "success" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Mercado Pago Checkout Session
  app.post("/api/create-checkout-session", async (req, res) => {
    const { amount, bookingData } = req.body;

    if (!process.env.MP_ACCESS_TOKEN) {
      return res.status(500).json({ error: "Mercado Pago not configured" });
    }

    const mpClient = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
    const appUrl = process.env.APP_URL || "http://localhost:3000";

    try {
      const serviceTitle = bookingData.guests
        ?.map((g: { serviceName: string; duration: string }) => `${g.serviceName} (${g.duration})`)
        .join(', ') || 'Botica Spa Service';

      const preference = new Preference(mpClient);
      const response = await preference.create({
        body: {
          items: [
            {
              id: bookingData.guests?.[0]?.serviceId || 'spa-service',
              title: `Botica Spa — ${serviceTitle}`,
              description: `Depósito 30% · ${bookingData.date} a las ${bookingData.time}`,
              quantity: 1,
              unit_price: amount,
              currency_id: 'MXN',
            },
          ],
          payer: {
            name: bookingData.customerName,
            email: bookingData.customerEmail,
            phone: { number: bookingData.customerPhone },
          },
          back_urls: {
            success: `${appUrl}/booking/success`,
            failure: `${appUrl}`,
            pending: `${appUrl}/booking/success`,
          },
          auto_return: 'approved',
          external_reference: JSON.stringify(bookingData),
          statement_descriptor: 'Botica Spa',
        },
      });

      const checkoutUrl = response.init_point || response.sandbox_init_point;
      res.json({ url: checkoutUrl });
    } catch (error) {
      console.error("Mercado Pago error:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // Tina AI chat endpoint (Claude Haiku)
  app.post("/api/chat", async (req, res) => {
    const { messages, userMessage } = req.body;

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: "Anthropic API key not configured" });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const TINA_SYSTEM_PROMPT = `Eres Tina, asistente virtual de Botica Spa en Playa del Carmen.

PERSONALIDAD:
- Eres mujer, cálida, genuinamente entusiasta del bienestar y lo orgánico
- Adoras Botica Spa con el corazón — no como vendedora, sino como creyente
- Eres amable pero nunca presionas ni haces venta agresiva
- Usas un tono cercano, con emojis ocasionales (🌿✨💆‍♀️)
- Respondes en el idioma en que te escriben (español o inglés)

REGLA CRÍTICA — NO INVENTAS NADA:
Solo das información que está en esta lista. Si te preguntan algo que no está aquí, dices honestamente que no tienes esa información y ofreces mandar al WhatsApp para que el equipo ayude.

INFORMACIÓN REAL DE BOTICA SPA:

**Servicio:** In-home spa — llevamos todo a tu hotel, villa o Airbnb en Playa del Carmen, Tulum, Cancún, Akumal y Puerto Morelos. (Aplica cargo de traslado fuera de Playa del Carmen.)

**Terapeutas:** Certificadas, expertas, seleccionadas a mano.

**Productos:** Aceites orgánicos premium, aromaterapia artesanal, ingredientes locales.

**PRECIOS (MXN):**
- Facial Revitalizante (máximo 60 min): 60min $1,700
- Relaxing Massage: 60min $1,700 | 90min $2,100 | 120min $2,500
- Deep Tissue Massage: 60min $1,700 | 90min $2,100 | 120min $2,500
- Botica Signature (el favorito, mínimo 90 min): 90min $2,100 | 120min $2,500
- Personalized Massage: 60min $1,700 | 90min $2,100 | 120min $2,500
- Four-Hands Massage (2 terapeutas, mínimo 90 min): 90min $3,900
- Masaje en pareja (2 personas juntas): 60min $3,200 | 90min $4,000 | 120min $4,600
- Especial del mes: 2 masajes Four-Hands por $7,399

**Reservas:** Se requiere 30% de depósito para confirmar. El resto se paga el día del servicio.
**Contacto/Email:** hola@boticaspa.com

CUANDO ALGUIEN QUIERE RESERVAR:
Responde algo como: "¡Qué buena elección! 🌿 Para confirmar tu reserva, nuestro equipo te atiende directamente por WhatsApp: https://wa.me/529842687428 — ahí te ayudan con disponibilidad, fecha y todos los detalles. ¡Te va a encantar! ✨"

No recolectes datos de reserva tú misma. Siempre manda al WhatsApp para reservar.`;

    try {
      const history = (messages || []).map((m: { role: string; content: string }) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
      })) as Anthropic.MessageParam[];

      const response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: TINA_SYSTEM_PROMPT,
        messages: [...history, { role: 'user', content: userMessage }],
      });

      const text = response.content[0].type === 'text' ? response.content[0].text : '';
      res.json({ text });
    } catch (error) {
      console.error("Anthropic error:", error);
      res.status(500).json({ error: "Failed to get response" });
    }
  });

  // ── Reservas (Firebase Firestore) ─────────────────────────────

  // POST /api/reservas — Crear nueva reserva
  app.post("/api/reservas", async (req, res) => {
    try {
      const booking = {
        ...req.body,
        status: req.body.status || "confirmed",
        createdAt: Timestamp.now(),
      };
      const docRef = await addDoc(collection(firestoreDb, "bookings"), booking);
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      console.error("Firestore error (create):", error);
      res.status(500).json({ error: "Failed to save booking" });
    }
  });

  // GET /api/reservas — Listar reservas (protegido con X-Admin-Key)
  app.get("/api/reservas", async (req, res) => {
    const adminKey = process.env.ADMIN_API_KEY;
    if (adminKey && req.headers["x-admin-key"] !== adminKey) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const snapshot = await getDocs(collection(firestoreDb, "bookings"));
      const bookings = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      res.json(bookings);
    } catch (error) {
      console.error("Firestore error (list):", error);
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // DELETE /api/reservas/:id — Cancelar reserva (cambia status a "cancelled")
  app.delete("/api/reservas/:id", async (req, res) => {
    const adminKey = process.env.ADMIN_API_KEY;
    if (adminKey && req.headers["x-admin-key"] !== adminKey) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    try {
      const bookingRef = doc(firestoreDb, "bookings", req.params.id);
      await updateDoc(bookingRef, { status: "cancelled" });
      res.json({ id: req.params.id, status: "cancelled" });
    } catch (error) {
      console.error("Firestore error (cancel):", error);
      res.status(500).json({ error: "Failed to cancel booking" });
    }
  });

  // POST /api/leads — Captura de email al inicio del booking
  app.post("/api/leads", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required" });
    try {
      await addDoc(collection(firestoreDb, "leads"), {
        email,
        createdAt: new Date().toISOString(),
        source: "booking_form",
      });
      res.json({ ok: true });
    } catch (error) {
      console.error("Lead save error:", error);
      res.status(500).json({ error: "Failed to save lead" });
    }
  });

  // ── WhatsApp Cloud API ─────────────────────────────────────────

  // POST /api/whatsapp — Enviar mensaje de confirmación
  app.post("/api/whatsapp", async (req, res) => {
    const { to, name, fecha, hora, servicio } = req.body;

    if (!process.env.WHATSAPP_TOKEN || !process.env.WHATSAPP_PHONE_ID) {
      return res.json({ status: "skipped", note: "WhatsApp not configured" });
    }

    try {
      const url = `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_ID}/messages`;
      const payload = {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          body: `Hola ${name}, tu reserva en Botica Spa ha sido confirmada 🌿\n\n📅 Fecha: ${fecha}\n⏰ Hora: ${hora}\n🧖 Servicio: ${servicio}\n\nTe esperamos pronto. ¡Cualquier duda estamos aquí!`,
        },
      };
      const r = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await r.json();
      res.json(data);
    } catch (error) {
      console.error("WhatsApp error:", error);
      res.status(500).json({ error: "Failed to send WhatsApp message" });
    }
  });

  // ── Google Reviews (Places API) — real reviews + rating, cached 1h ────────
  let _reviewsCache: { data: object; ts: number } | null = null;
  const REVIEWS_CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 1 semana

  app.get("/api/reviews", async (_req, res) => {
    if (_reviewsCache && Date.now() - _reviewsCache.ts < REVIEWS_CACHE_TTL) {
      return res.json(_reviewsCache.data);
    }
    const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY || process.env.VITE_GOOGLE_MAPS_KEY;
    if (!apiKey) {
      return res.json({ rating: 4.9, total: 47, reviews: [], source: 'static' });
    }
    try {
      // Text Search — encuentra el negocio por nombre, sin necesitar Place ID hardcodeado
      const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=Botica+Spa+Playa+del+Carmen&key=${apiKey}`;
      const searchRes = await fetch(searchUrl);
      const searchData = await searchRes.json() as { results?: { place_id: string }[] };
      const placeId = searchData.results?.[0]?.place_id;
      if (!placeId) return res.json({ rating: 4.9, total: 47, reviews: [], source: 'static' });

      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,reviews&language=en&key=${apiKey}`;
      const r = await fetch(url);
      const data = await r.json() as { result?: { rating?: number; user_ratings_total?: number; reviews?: any[] } };
      const result = data.result;
      const reviews = (result?.reviews || []).map((rv: any) => ({
        author: rv.author_name,
        text: rv.text,
        rating: rv.rating,
        photo: rv.profile_photo_url,
        time: rv.relative_time_description,
      }));
      const payload = {
        rating: result?.rating ?? 4.9,
        total: result?.user_ratings_total ?? 47,
        reviews,
      };
      _reviewsCache = { data: payload, ts: Date.now() };
      return res.json(payload);
    } catch {
      return res.json({ rating: 4.9, total: 47, reviews: [], source: 'static' });
    }
  });

  // ── Google Search Console API ─────────────────────────────────────────────
  app.get("/api/admin/gsc", async (_req, res) => {
    const credPath = process.env.GSC_CREDENTIALS_PATH;
    const tokenPath = process.env.GSC_TOKEN_PATH;
    const siteUrl = process.env.GSC_SITE_URL || 'sc-domain:boticaspa.com';

    if (!credPath || !fs.existsSync(credPath)) {
      return res.status(503).json({ error: 'GSC credentials not configured. Set GSC_CREDENTIALS_PATH in .env' });
    }
    if (!tokenPath || !fs.existsSync(tokenPath)) {
      return res.status(503).json({ error: 'GSC token not found. Run the OAuth setup script first.' });
    }

    try {
      const creds = JSON.parse(fs.readFileSync(credPath, 'utf8'));
      const token = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
      const { client_id, client_secret, redirect_uris } = creds.installed || creds.web;

      const oauth2 = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
      oauth2.setCredentials(token);

      // Auto-refresh and persist updated token
      oauth2.on('tokens', (newToken) => {
        const updated = { ...token, ...newToken };
        fs.writeFileSync(tokenPath, JSON.stringify(updated, null, 2));
      });

      const sc = google.searchconsole({ version: 'v1', auth: oauth2 });
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const [summary, keywords] = await Promise.all([
        sc.searchanalytics.query({
          siteUrl,
          requestBody: { startDate, endDate, dimensions: [] },
        }),
        sc.searchanalytics.query({
          siteUrl,
          requestBody: { startDate, endDate, dimensions: ['query'], rowLimit: 10 },
        }),
      ]);

      const s = summary.data.rows?.[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
      const kwRows = (keywords.data.rows || []).map((r) => ({
        query: (r.keys || [])[0] || '',
        clicks: r.clicks || 0,
        impressions: r.impressions || 0,
        position: r.position || 0,
      }));

      res.json({
        clicks: s.clicks || 0,
        impressions: s.impressions || 0,
        ctr: s.ctr || 0,
        position: s.position || 0,
        keywords: kwRows,
        errors: [],
      });
    } catch (err: any) {
      console.error('GSC error:', err?.message);
      res.status(500).json({ error: err?.message || 'GSC API error' });
    }
  });

  // ─── Server-side meta injection ──────────────────────────────────────────
  // Injects correct <title>, <meta description>, canonical and hreflang into
  // the HTML shell before sending, so Google never needs JS to read SEO tags.
  const B = 'https://boticaspa.com';

  interface PageMeta { title: string; desc: string; enUrl: string; esUrl: string; }

  const STATIC_META: Record<string, PageMeta> = {
    '/':    { title: 'In-Home Spa Playa del Carmen | Massage Delivered to Your Hotel | Botica Spa', desc: 'In-home spa in Playa del Carmen. We bring certified therapists to your hotel, Airbnb, or villa. Relaxing, deep tissue, four-hands & more. Book now.', enUrl: `${B}/`, esUrl: `${B}/es/` },
    '/es/': { title: 'Spa a Domicilio Playa del Carmen | Masaje en tu Hotel | Botica Spa', desc: 'Spa a domicilio en Playa del Carmen. Llevamos terapeutas certificados a tu hotel, Airbnb o villa. Masajes relajantes, tejido profundo, cuatro manos y más. Reserva ahora.', enUrl: `${B}/`, esUrl: `${B}/es/` },
    '/es':  { title: 'Spa a Domicilio Playa del Carmen | Masaje en tu Hotel | Botica Spa', desc: 'Spa a domicilio en Playa del Carmen. Llevamos terapeutas certificados a tu hotel, Airbnb o villa. Masajes relajantes, tejido profundo, cuatro manos y más. Reserva ahora.', enUrl: `${B}/`, esUrl: `${B}/es/` },

    '/massages':    { title: 'Massage Playa del Carmen | All In-Home Treatments | Botica Spa', desc: 'Choose from relaxing, deep tissue, four-hands, herbal and signature massages — delivered to your hotel, villa or Airbnb in Playa del Carmen. Book same-day or in advance.', enUrl: `${B}/massages`, esUrl: `${B}/es/masajes` },
    '/es/masajes':  { title: 'Masaje a Domicilio Playa del Carmen | Todos los Tratamientos | Botica Spa', desc: 'Masaje relajante, tejido profundo, cuatro manos y más — a domicilio en tu hotel, villa o Airbnb en Playa del Carmen. Reserva el mismo día o con anticipación.', enUrl: `${B}/massages`, esUrl: `${B}/es/masajes` },

    '/about':               { title: 'About Botica Spa | Gina Agassini & Our Story | In-Home Spa Playa del Carmen', desc: 'Meet Gina Agassini, founder of Botica Spa. Born from years of luxury resort experience in the Riviera Maya, built around one belief: the best massage happens in your own space.', enUrl: `${B}/about`, esUrl: `${B}/es/sobre-nosotros` },
    '/es/sobre-nosotros':   { title: 'Sobre Botica Spa | Gina Agassini y Nuestra Historia | Spa a Domicilio Playa del Carmen', desc: 'Conoce a Gina Agassini, fundadora de Botica Spa. Nacida de años de experiencia en resorts de lujo en la Riviera Maya, construida alrededor de una creencia: el mejor masaje ocurre en tu propio espacio.', enUrl: `${B}/about`, esUrl: `${B}/es/sobre-nosotros` },

    '/blog':    { title: 'Wellness Blog | Botica Spa Playa del Carmen', desc: 'Tips, guides and stories about in-home spa, wellness and travel in Playa del Carmen and the Riviera Maya.', enUrl: `${B}/blog`, esUrl: `${B}/es/blog` },
    '/es/blog': { title: 'Blog de Bienestar | Botica Spa Playa del Carmen', desc: 'Consejos, guías e historias sobre spa a domicilio, bienestar y viajes en Playa del Carmen y la Riviera Maya.', enUrl: `${B}/blog`, esUrl: `${B}/es/blog` },

    '/massage-tulum':    { title: 'Massage Tulum | In-Home Spa Delivered to You | Botica Spa', desc: 'Professional in-home massage in Tulum. Certified therapists delivered to your villa, hotel or Airbnb. Book same-day or in advance. Travel fee applies.', enUrl: `${B}/massage-tulum`, esUrl: `${B}/es/masaje-tulum` },
    '/es/masaje-tulum':  { title: 'Masaje a Domicilio en Tulum | Botica Spa', desc: 'Masaje profesional a domicilio en Tulum. Terapeutas certificados en tu villa, hotel o Airbnb. Reserva el mismo día o con anticipación.', enUrl: `${B}/massage-tulum`, esUrl: `${B}/es/masaje-tulum` },

    '/massage-cancun':   { title: 'Massage Cancún | In-Home Spa Hotel Zone & Downtown | Botica Spa', desc: 'In-home massage in Cancún — Hotel Zone, downtown and beyond. Certified therapists delivered to your hotel or Airbnb. Travel fee applies.', enUrl: `${B}/massage-cancun`, esUrl: `${B}/es/masaje-cancun` },
    '/es/masaje-cancun': { title: 'Masaje a Domicilio en Cancún | Botica Spa', desc: 'Masaje a domicilio en Cancún — Zona Hotelera y centro. Terapeutas certificados en tu hotel o Airbnb.', enUrl: `${B}/massage-cancun`, esUrl: `${B}/es/masaje-cancun` },

    '/massage-akumal':   { title: 'Massage Akumal | In-Home Spa Akumal Bay | Botica Spa', desc: 'Professional in-home massage in Akumal. Certified therapists delivered to your villa or Airbnb in Akumal Bay and surroundings.', enUrl: `${B}/massage-akumal`, esUrl: `${B}/es/masaje-akumal` },
    '/es/masaje-akumal': { title: 'Masaje a Domicilio en Akumal | Botica Spa', desc: 'Masaje profesional a domicilio en Akumal Bay. Terapeutas certificados en tu villa o Airbnb en Akumal.', enUrl: `${B}/massage-akumal`, esUrl: `${B}/es/masaje-akumal` },

    '/contact':     { title: 'Contact Botica Spa | Book Your In-Home Massage Playa del Carmen', desc: 'Contact Botica Spa to book your in-home massage in Playa del Carmen. Reach us via WhatsApp, email or phone. We serve Playa del Carmen, Tulum, Cancún and the Riviera Maya.', enUrl: `${B}/contact`, esUrl: `${B}/es/contacto` },
    '/es/contacto': { title: 'Contacto Botica Spa | Reserva tu Masaje a Domicilio Playa del Carmen', desc: 'Contacta a Botica Spa para reservar tu masaje a domicilio en Playa del Carmen. Escríbenos por WhatsApp, email o teléfono. Servicio en toda la Riviera Maya.', enUrl: `${B}/contact`, esUrl: `${B}/es/contacto` },

    '/massage-playacar':   { title: 'Massage Playacar | In-Home Spa Phase 1 & 2 | Botica Spa', desc: 'In-home massage in Playacar — Phase 1 & Phase 2. Certified therapists delivered to your villa or hotel. No travel fee.', enUrl: `${B}/massage-playacar`, esUrl: `${B}/es/masaje-playacar` },
    '/es/masaje-playacar': { title: 'Masaje a Domicilio en Playacar | Botica Spa', desc: 'Masaje a domicilio en Playacar Fase 1 y Fase 2. Terapeutas certificados en tu villa u hotel. Sin cargo de traslado.', enUrl: `${B}/massage-playacar`, esUrl: `${B}/es/masaje-playacar` },
  };

  const SERVICE_META: Record<string, { en: { title: string; desc: string }; es: { title: string; desc: string } }> = {
    'relaxing-massage':    { en: { title: 'Relaxing Massage Playa del Carmen | In-Home Spa | Botica Spa', desc: 'Book a professional relaxing massage at your hotel, villa or Airbnb in Playa del Carmen. Certified therapists, organic oils, delivered to your door. From $1,700 MXN.' }, es: { title: 'Masaje Relajante a Domicilio en Playa del Carmen | Botica Spa', desc: 'Reserva un masaje relajante profesional en tu hotel, villa o Airbnb en Playa del Carmen. Terapeutas certificadas, aceites orgánicos.' } },
    'deep-tissue-massage': { en: { title: 'Deep Tissue Massage Playa del Carmen | In-Home | Botica Spa', desc: 'Expert deep tissue massage delivered to your villa, hotel or Airbnb in Playa del Carmen. Release chronic tension with certified therapists. From $1,700 MXN.' }, es: { title: 'Masaje de Tejido Profundo a Domicilio Playa del Carmen | Botica Spa', desc: 'Masaje de tejido profundo a domicilio en Playa del Carmen. Libera la tensión crónica con terapeutas certificadas.' } },
    'four-hands-massage':  { en: { title: 'Four-Hands Massage Playa del Carmen | Two Therapists | Botica Spa', desc: 'Experience a luxury four-hands massage at your villa or hotel in Playa del Carmen. Two certified therapists in perfect synchronicity. From $3,900 MXN.' }, es: { title: 'Masaje a Cuatro Manos en Playa del Carmen | Botica Spa', desc: 'Masaje a cuatro manos a domicilio en Playa del Carmen. Dos terapeutas certificadas en perfecta sincronía.' } },
    'botica-signature':    { en: { title: 'Botica Signature Massage Playa del Carmen | Luxury In-Home Spa', desc: 'Our exclusive signature ritual blending Swedish, Deep Tissue and Aromatherapy. The ultimate in-home spa experience in Playa del Carmen. From $1,700 MXN.' }, es: { title: 'Masaje Botica Signature Playa del Carmen | Spa a Domicilio de Lujo', desc: 'Nuestro ritual exclusivo que combina sueco, tejido profundo y aromaterapia. La experiencia de spa a domicilio más completa en Playa del Carmen.' } },
    'personalized-massage':{ en: { title: 'Personalized Massage Playa del Carmen | Custom In-Home Therapy | Botica Spa', desc: 'A custom-tailored massage designed for your unique needs, delivered to your hotel or Airbnb in Playa del Carmen. Certified therapists. From $1,700 MXN.' }, es: { title: 'Masaje Personalizado a Domicilio Playa del Carmen | Botica Spa', desc: 'Masaje personalizado a domicilio en Playa del Carmen. Tu terapeuta diseña la sesión según tus necesidades únicas.' } },
    'revitalizing-facial': { en: { title: 'Revitalizing Facial Treatment Playa del Carmen | In-Home | Botica Spa', desc: "Professional organic facial treatment delivered to your villa or hotel in Playa del Carmen. Restore your skin's natural glow after a day at the beach. From $1,700 MXN." }, es: { title: 'Facial Revitalizante a Domicilio Playa del Carmen | Botica Spa', desc: 'Tratamiento facial orgánico a domicilio en Playa del Carmen. Restaura el brillo de tu piel después de un día en la playa.' } },
  };

  function getPageMeta(pathname: string): PageMeta {
    if (STATIC_META[pathname]) return STATIC_META[pathname];

    const enService = pathname.match(/^\/massages\/([^/]+)$/);
    if (enService) {
      const sm = SERVICE_META[enService[1]];
      if (sm) return { title: sm.en.title, desc: sm.en.desc, enUrl: `${B}/massages/${enService[1]}`, esUrl: `${B}/es/masajes/${enService[1]}` };
    }

    const esService = pathname.match(/^\/es\/masajes\/([^/]+)$/);
    if (esService) {
      const sm = SERVICE_META[esService[1]];
      if (sm) return { title: sm.es.title, desc: sm.es.desc, enUrl: `${B}/massages/${esService[1]}`, esUrl: `${B}/es/masajes/${esService[1]}` };
    }

    return STATIC_META['/'];
  }

  function injectMeta(html: string, pathname: string): string {
    const meta = getPageMeta(pathname);
    const isEs = pathname.startsWith('/es');
    const lang = isEs ? 'es' : 'en';
    const canonical = isEs ? meta.esUrl : meta.enUrl;
    const hreflang = `\n    <link rel="canonical" href="${canonical}">\n    <link rel="alternate" hreflang="en" href="${meta.enUrl}">\n    <link rel="alternate" hreflang="es" href="${meta.esUrl}">\n    <link rel="alternate" hreflang="x-default" href="${meta.enUrl}">`;

    return html
      .replace(/(<html[^>]*lang=")[^"]*(")/i, `$1${lang}$2`)
      .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
      .replace(/<meta name="description"[^>]*\/?>/, `<meta name="description" content="${meta.desc}">`)
      .replace(/<link rel="canonical"[^>]*\/?>/, '')
      .replace('</head>', `${hreflang}\n  </head>`);
  }
  // ─────────────────────────────────────────────────────────────────────────

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    const indexHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
    // Immutable cache for hashed assets (JS/CSS chunks), no-cache for HTML
    app.use(express.static(distPath, {
      maxAge: '1y',
      immutable: true,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        } else if (/\.(js|css|woff2?|webp|png|jpg|svg)$/.test(filePath)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      },
    }));
    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.send(injectMeta(indexHtml, req.path));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
