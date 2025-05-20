package com.lifetrackhub.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.Map;

@Service
public interface MailService {
    void sendEmailAsync(String[] to, String[] cc, String[] bcc, String subject, String content, List<File> attachments, boolean isMultipart, boolean isHtml);

    void sendEmailWithTemplateAsync(String[] to, String[] cc, String[] bcc, String templateName, String subject, List<File> attachments, Map<String, Object> templateVariables);
}
