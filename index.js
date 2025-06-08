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
  port: 587,
  secure: false, // TLS
  auth: {
    user: "sait@ageinvest.am",
    pass: "552065Gor!", // пароль от ящика или пароль приложения (если включена 2FA)
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Обработка POST-запроса с формы
app.post("/send", (req, res) => {
  const { formName, formPhone, formMessage } = req.body;

  const mailOptions = {
    from: "sait@ageinvest.am",
    to: "info@ageinvest.am",
    subject: `Новое сообщение от ${formName}`,
    text: `Имя: ${formName}\nТелефон: ${formPhone}\nСообщение: ${formMessage}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Ошибка отправки почты:", error);
      return res.status(500).json({ message: "Ошибка при отправке письма" });
    }
    console.log("Письмо успешно отправлено:", info.response);
    res.json({ message: "Сообщение отправлено!" });
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
