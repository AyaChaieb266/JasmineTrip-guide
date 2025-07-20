package com.example.springsecurity.controllers;


import com.example.springsecurity.models.Mail;
import com.example.springsecurity.utils.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/email")
@CrossOrigin("*")
public class MailController {

        @Autowired
        private EmailService emailService;


        @PostMapping("/sendMail")
        public String sendMail(){
            System.out.println("Spring Mail - Sending Simple Email with JavaMailSender Example");
            Mail mail = new Mail();
            mail.setFrom("******@gmail.com");
            mail.setTo("chetouiiftikhar@gmail.com");
            mail.setSubject("Sending Simple Email with JavaMailSender Example");
            mail.setContent("This tutorial demonstrates how to send a simple email using Spring Framework.");
            emailService.sendSimpleMessage(mail);
            return "ok";
        }

}

