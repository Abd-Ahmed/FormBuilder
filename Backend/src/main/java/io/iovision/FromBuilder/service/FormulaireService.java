package io.iovision.FromBuilder.service;

import io.iovision.FromBuilder.model.FormField;
import io.iovision.FromBuilder.model.FormTemplate;
import io.iovision.FromBuilder.model.Formulaire;
import io.iovision.FromBuilder.repo.FormTemplateRepo;
import io.iovision.FromBuilder.repo.FormulaireRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FormulaireService {
    private final FormulaireRepo formulaireRepo;
    private final FormTemplateRepo formTemplateRepo;

    public FormulaireService(FormulaireRepo formulaireRepo, FormTemplateRepo formTemplateRepo) {
        this.formTemplateRepo = formTemplateRepo;
        this.formulaireRepo = formulaireRepo;
    }

    public List<Formulaire> getAllFormulaires() {
        return formulaireRepo.findAll();
    }

    public Formulaire getFormulaireById(Long id) {
        return formulaireRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Formulaire not found with id: " + id));
    }

    @Transactional
    public Formulaire saveFormulaire(Formulaire formulaire) {
        for (FormField field : formulaire.getFormFields()) {
            field.setForm(formulaire);
            if (field.getTemplate() != null && field.getTemplate().getCode() != null) {
                FormTemplate template = formTemplateRepo.findByCode(field.getTemplate().getCode())
                        .orElseThrow(() -> new EntityNotFoundException("FormTemplate not found with code: " + field.getTemplate().getCode()));
                field.setTemplate(template);
            }
        }
        return formulaireRepo.save(formulaire);
    }

    public void deleteFormulaire(Long id) {
        formulaireRepo.deleteById(id);
    }

    @Transactional
    public Formulaire updateFormulaire(Long id, Formulaire formulaire) {
        Formulaire existingFormulaire = formulaireRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Formulaire not found with id: " + id));

        existingFormulaire.setFormName(formulaire.getFormName());
        existingFormulaire.setDescription(formulaire.getDescription());

        // Remove old form fields and add new ones
        existingFormulaire.getFormFields().clear();
        for (FormField field : formulaire.getFormFields()) {
            field.setForm(existingFormulaire);
            if (field.getTemplate() != null && field.getTemplate().getCode() != null) {
                FormTemplate template = formTemplateRepo.findByCode(field.getTemplate().getCode())
                        .orElseThrow(() -> new EntityNotFoundException("FormTemplate not found with code: " + field.getTemplate().getCode()));
                field.setTemplate(template);
            }
            existingFormulaire.getFormFields().add(field);
        }

        return formulaireRepo.save(existingFormulaire);
    }
}
