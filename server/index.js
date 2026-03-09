import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://puja-gupta-portfolio.pages.dev",
    ],
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
});

app.use("/api/contact", limiter);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return res.status(200).json({
      ok: true,
      id: response.data?.id,
    });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return res.status(500).json({
      error: error?.message || "Failed to send email",
    });
  }
});

app.get("/api/contact", (_req, res) => {
  res.status(405).send("Method not allowed");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

