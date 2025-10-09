package com.lifetrackhub.service.impl;

import com.lifetrackhub.service.MailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.eclipse.angus.mail.util.MailConnectException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.retry.RetryContext;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.retry.support.RetrySynchronizationManager;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.File;
import java.net.ConnectException;
import java.net.SocketException;
import java.net.SocketTimeoutException;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class MailServiceImpl implements MailService {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Value("${app.email.from}")
    private String fromEmail;

    @Autowired
    public MailServiceImpl(
            JavaMailSender javaMailSender,
            TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    @Async
    @Retryable(
            retryFor = {
                    MessagingException.class, ConnectException.class,
                    UnknownHostException.class,
                    SocketTimeoutException.class,
                    MailSendException.class,
                    MailConnectException.class,
                    SocketException.class,
                    MailException.class
            },
            maxAttemptsExpression = "${mail.retry.max.attempts}",
            backoff = @Backoff(delayExpression = "${mail.retry.max.delay}")
    )
    public void sendEmailAsync(
            String[] to, String[] cc, String[] bcc,
            String subject, String content,
            List<File> attachments, boolean isMultipart, boolean isHtml
    ) {
        log.info("Sending email with subjects: {}", subject);

        logRetryAttemptsCount(to);

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, isMultipart, StandardCharsets.UTF_8.name());

            if (to != null && to.length > 0) mimeMessageHelper.setTo(to);
            if (cc != null && cc.length > 0) mimeMessageHelper.setCc(cc);
            if (bcc != null && bcc.length > 0) mimeMessageHelper.setBcc(bcc);
            if (content != null) mimeMessageHelper.setText(content, isHtml);

            if (attachments != null && !attachments.isEmpty()) {
                for (File file : attachments) {
                    mimeMessageHelper.addAttachment(file.getName(), file);
                }
            }

            mimeMessageHelper.setFrom(new InternetAddress(fromEmail));
            mimeMessageHelper.setSubject(subject);
            javaMailSender.send(mimeMessage);
            log.info("Email sent to given recipients.");
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    @Async
    @Retryable(
            retryFor = {
                    MessagingException.class, ConnectException.class,
                    UnknownHostException.class,
                    SocketTimeoutException.class,
                    MailSendException.class,
                    MailConnectException.class,
                    SocketException.class,
                    MailException.class
            },
            maxAttemptsExpression = "${mail.retry.max.attempts}",
            backoff = @Backoff(delayExpression = "${mail.retry.max.delay}")
    )
    public void sendEmailWithTemplateAsync(
            String[] to, String[] cc, String[] bcc,
            String templateName, String subject,
            List<File> attachments, Map<String, Object> templateVariables
    ) {
        Context context = new Context(Locale.getDefault());

        if (templateVariables != null) {
            for (Map.Entry<String, Object> entry : templateVariables.entrySet()) {
                context.setVariable(entry.getKey(), entry.getValue());
            }
        }

        String content = templateEngine.process(templateName, context);
        sendEmailAsync(to, cc, bcc, subject, content, attachments, true, true);
    }

    private void logRetryAttemptsCount(String[] to) {
        RetryContext context = RetrySynchronizationManager.getContext();
        int attempt = context != null ? context.getRetryCount() + 1 : 1;
        log.info("Attempt #{} to send email to {}", attempt, Arrays.toString(to));
    }
}
