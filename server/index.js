import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json({ limit: "200kb" }));

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});

app.use("/api/contact", limiter);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

// app.post("/api/contact", async (req, res) => {
//   try {
//     const { name, email, message } = req.body || {};

//     if (!name || !email || !message) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
//       console.error("Missing MAIL_USER or MAIL_PASS in .env");
//       return res.status(500).json({ error: "Mail configuration missing" });
//     }

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//     });

//     await transporter.verify();

//     await transporter.sendMail({
//       from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
//       to: process.env.MAIL_TO || process.env.MAIL_USER,
//       replyTo: email,
//       subject: `Portfolio Contact from ${name}`,
//       text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
//       html: `
//         <h2>New Portfolio Contact</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message.replace(/\n/g, "<br/>")}</p>
//       `,
//     });

//     return res.json({ ok: true, message: "Email sent successfully" });
//   } catch (error) {
//     console.error("CONTACT API ERROR:", error);
//     return res.status(500).json({
//       error: "Failed to send email",
//       details: error.message,
//     });
//   }
// });
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return res.json({ ok: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return res.status(500).json({
      error: "Email failed",
      details: error?.message || "Unknown error",
    });
  }
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});