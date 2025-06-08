const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Настройка SMTP Zoho Europe
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  port: 587, // или 465 с secure: true
  secure: false, // TLS
  auth: {
    user: "sait@ageinvest.am",
    pass: "552065Gor!", // пароль от ящика или пароль приложения (если 2FA)
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Обработка POST-запроса с формы
app.post("/send", (req, res) => {
  const { formName, formPhone, formMessage } = req.body;
  // ...
});
