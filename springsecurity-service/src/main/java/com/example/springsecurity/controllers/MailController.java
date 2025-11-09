package com.example.springsecurity.controllers;

import com.example.springsecurity.utils.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping(value = "/email")
@CrossOrigin("*")
public class MailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendMail")
    public String sendMail() throws MessagingException, UnsupportedEncodingException {
        System.out.println("🌸 Sending JasmineTrip HTML Email 🌸");

        String to = "ayachaieb266@gmail.com";
        String subject = "Welcome to JasmineTrip Guide ✨";
        String link = "https://www.jasminetrip.com"; // can be any link

        emailService.sendHtmlEmail(to, subject, link);

        return "ok";
    }
}
