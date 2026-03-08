import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    mailUserExists: !!process.env.MAIL_USER,
    mailPassExists: !!process.env.MAIL_PASS,
  });
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await transporter.verify();

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    return res.status(200).json({ ok: true, message: "Email sent" });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return res.status(500).json({
      error: error.message || "Failed to send email",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});