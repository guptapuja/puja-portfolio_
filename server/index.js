import dns from "node:dns";
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
    origin: [
      "http://localhost:5173",
      "https://puja-gupta-portfolio.pages.dev",
    ],
  })
);

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
});

const gmailHost = await dns.promises.lookup("smtp.gmail.com", { family: 4 });
const transporter = nodemailer.createTransport({
  host: gmailHost.address,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    servername: "smtp.gmail.com",
  },
  connectionTimeout: 60000,
  greetingTimeout: 60000,
  socketTimeout: 60000,
});


// await transporter.sendMail({
//   from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
//   to: process.env.MAIL_TO || process.env.MAIL_USER,
//   replyTo: email,
//   subject: `Portfolio Contact from ${name}`,
//   text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
// });

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
// app.post("/api/contact", async (req, res) => {
//   try {
//     const { name, email, message } = req.body || {};

//     if (!name || !email || !message) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // const transporter = nodemailer.createTransport({
//     //   service: "gmail",
//     //   auth: {
//     //     user: process.env.MAIL_USER,
//     //     pass: process.env.MAIL_PASS,
//     //   },
//     // });
//     const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true, // true for 465
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS, // Gmail App Password (16 chars, no spaces)
//   },
//   connectionTimeout: 60000,
//   greetingTimeout: 60000,
//   socketTimeout: 60000,
// });

//     await transporter.verify();

//     await transporter.sendMail({
//       from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
//       to: process.env.MAIL_TO || process.env.MAIL_USER,
//       replyTo: email,
//       subject: `Portfolio Contact from ${name}`,
//       text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
//     });

//     return res.json({ ok: true, message: "Email sent successfully" });
//   } catch (error) {
//     console.error("CONTACT API ERROR:", error);
//     return res.status(500).json({
//       error: "Email failed",
//       details: error?.message || "Unknown error",
//     });
//   }
// });


// app.post("/api/contact", async (req, res) => {
//   try {
//     const { name, email, message } = req.body || {};

//     if (!name || !email || !message) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const gmailHost = await dns.promises.lookup("smtp.gmail.com", { family: 4 });

//     const transporter = nodemailer.createTransport({
//       host: gmailHost.address,
//       port: 465,
//       secure: true,
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//       tls: {
//         servername: "smtp.gmail.com",
//       },
//       connectionTimeout: 60000,
//       greetingTimeout: 60000,
//       socketTimeout: 60000,
//     });

//     await transporter.sendMail({
//       from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
//       to: process.env.MAIL_TO || process.env.MAIL_USER,
//       replyTo: email,
//       subject: `Portfolio Contact from ${name}`,
//       text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
//     });

//     return res.json({ ok: true, message: "Email sent successfully" });
//   } catch (error) {
//     console.error("CONTACT API ERROR:", error);
//     return res.status(500).json({
//       error: "Email failed",
//       details: error?.message || "Unknown error",
//     });
//   }
// });


app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    res.json({ ok: true });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    res.status(500).json({
      error: "Email failed",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});