import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
// import rateLimit from "express-rate-limit";
dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json({ limit: "200kb" }));

const allowOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowOrigin }));

app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 30,
  })
);

app.get("/health", (_, res) => res.json({ ok: true }));

// OPTIONAL: serve resume from backend (more control)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Put resume at: server/assets/resume.pdf  (optional)
app.get("/resume", (req, res) => {
  const filePath = path.join(__dirname, "assets", "resume.pdf");
  res.download(filePath, "Puja_Gupta_Resume.pdf");
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) return res.status(400).json({ error: "Missing fields" });

  try {
    // simplest: email to you
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transport.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      subject: `Portfolio Contact: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Email failed" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on :${PORT}`));