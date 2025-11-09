package com.example.springsecurity.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    // 🌸 New method to send HTML emails
    public void sendHtmlEmail(String to, String subject, String resetUrl) throws MessagingException, java.io.UnsupportedEncodingException {


        String htmlContent = """
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Poppins', sans-serif;
              background-color: #fce9ea;
              padding: 40px;
              color: #333;
            }
            .card {
              background-color: #fff;
              border-radius: 16px;
              padding: 30px;
              max-width: 500px;
              margin: auto;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              text-align: center;
            }
            .logo {
              width: 80px;
              margin-bottom: 10px;
            }
            .btn {
              display: inline-block;
              margin-top: 25px;
              background: linear-gradient(90deg,#cda48f,#b68572);
              color: white !important;
              text-decoration: none;
              padding: 12px 25px;
              border-radius: 10px;
              font-weight: 600;
              transition: 0.3s;
            }
            .btn:hover {
              background: linear-gradient(90deg,#b68572,#9c6a5e);
            }
            .footer {
              margin-top: 25px;
              font-size: 13px;
              color: #a38d8d;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png" alt="JasmineTrip Logo" class="logo">
            <h2>Bienvenue sur JasmineTrip Guide 🌸</h2>
            <p>Bonjour,</p>
            <p>Ceci est un exemple d'email stylé envoyé depuis votre application <b>JasmineTrip Guide</b>.</p>
            <a href="%s" class="btn">Visiter le site</a>
            <p class="footer">© 2025 JasmineTrip Guide</p>
          </div>
        </body>
        </html>
        """.formatted(resetUrl);

        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);

        // 💌 THIS IS THE MOST IMPORTANT LINE
        helper.setFrom("ayachaieb266@gmail.com", "JasmineTrip Guide");

        emailSender.send(message);
    }
}
