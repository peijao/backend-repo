import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) console.error("SMTP error:", error);
  else console.log("SMTP ready to send messages");
});

app.post("/send", (req, res) => {
  const { formName, formPhone, formMessage } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "info@ageinvest.am",
    subject: `Новое сообщение от ${formName}`,
    text: `Имя: ${formName}\nТелефон: ${formPhone}\nСообщение: ${formMessage}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Ошибка отправки:", error);
      return res.status(500).json({ message: "Ошибка при отправке письма" });
    }
    console.log("Письмо отправлено:", info.response);
    res.json({ message: "Сообщение отправлено!" });
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
