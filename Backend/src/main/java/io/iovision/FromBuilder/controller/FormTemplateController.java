package io.iovision.FromBuilder.controller;

import io.iovision.FromBuilder.model.FormTemplate;
import io.iovision.FromBuilder.service.FormTemplateService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:8101")
@RequestMapping("/formtemplate")
public class FormTemplateController {
    private final FormTemplateService formTemplateService;

    public FormTemplateController(FormTemplateService formTemplateService) {
        this.formTemplateService = formTemplateService;
    }

    @RequestMapping("/all")
    public List<FormTemplate> getAllTemplates() {
        return formTemplateService.getAllTemplates();
    }
}
