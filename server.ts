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
    '/about':                                 '/#about',
    '/about/':                                '/#about',
    '/contact':                               '/#about',
    '/contact/':                              '/#about',
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

  // ── Google Reviews rating (Places API) ──────────────────────────────────
  // Returns cached rating from Google Maps Places details
  app.get("/api/reviews", async (_req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_SERVER_KEY || process.env.VITE_GOOGLE_MAPS_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID || 'ChIJN1t_tDeuEmsRUsoyG83frY4'; // fallback placeholder
    if (!apiKey) {
      return res.json({ rating: 4.9, total: 47, source: 'static' });
    }
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total&key=${apiKey}`;
      const r = await fetch(url);
      const data = await r.json() as { result?: { rating?: number; user_ratings_total?: number } };
      const result = data.result;
      if (result?.rating) {
        return res.json({ rating: result.rating, total: result.user_ratings_total || 0 });
      }
      res.json({ rating: 4.9, total: 47, source: 'static' });
    } catch {
      res.json({ rating: 4.9, total: 47, source: 'static' });
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
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
    app.get('*', (_req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
