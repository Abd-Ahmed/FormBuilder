package io.iovision.FromBuilder.service;

import io.iovision.FromBuilder.model.FormTemplate;
import io.iovision.FromBuilder.model.Formulaire;
import io.iovision.FromBuilder.repo.FormTemplateRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormTemplateService {
    private final FormTemplateRepo fromTemplateRepo;


    public FormTemplateService(FormTemplateRepo fromTemplateRepo) {
        this.fromTemplateRepo = fromTemplateRepo;
    }

    public List<FormTemplate> getAllTemplates() {
        return fromTemplateRepo.findAll();
    }
}
