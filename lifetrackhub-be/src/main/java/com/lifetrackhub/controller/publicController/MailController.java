package com.lifetrackhub.controller.publicController;

import com.lifetrackhub.service.MailService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.*;

@RestController
public class MailController extends PublicBaseController {
    private final MailService mailService;

    public MailController(final MailService mailService) {
        this.mailService = mailService;
    }

    @PostMapping("/email/sent/text")
    public void sendEmail() {
        String[] to = new String[]{"noyoncse310197@gmail.com"};
        String[] cc = null;
        String[] bcc = null;

        String subject = "Test email subject";
        String body = "Test email body";


        List<File> attachments = new ArrayList<>();
        boolean isMultipart = false;
        boolean isHtml = false;

        mailService.sendEmailAsync(to, cc, null, subject, body, attachments, isMultipart, isHtml);
    }

    @PostMapping("/email/sent/template")
    public void sendEmailWithTemplate() {
        String[] to = new String[]{"noyoncse310197@gmail.com"};
        String[] cc = null;
        String[] bcc = null;

        String subject = "Test email subject";
        //String templatePath = "password-reset-email.html";
        String templatePath = "dummy-text.txt";

        List<File> attachments = new ArrayList<>();
        Map<String, Object> templateVariables = new HashMap<>();
        templateVariables.put("resetLink", "https://google.com");
        templateVariables.put("expirationTime", "15 minutes");

        mailService.sendEmailWithTemplateAsync(to, null, null, templatePath, subject, attachments, templateVariables);
    }
}
