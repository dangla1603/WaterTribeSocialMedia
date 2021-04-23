package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service("emailService")
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;


    /**
     * Author: Nick Haselden
     *
     * Sends an email
     *
     * @param to - the email address that is recieving the message
     * @param subject - the subject of the email
     * @param body - the contents of the email
     */
    public void sendMail(String to, String subject, String body)
    {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
