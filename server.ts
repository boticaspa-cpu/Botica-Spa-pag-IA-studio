import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
