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
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

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
    public Formulaire editFormulaire(Long id, Formulaire updatedFormulaire) {
        Formulaire existingFormulaire = formulaireRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Formulaire not found with id: " + id));

        existingFormulaire.setFormName(updatedFormulaire.getFormName());
        existingFormulaire.setDescription(updatedFormulaire.getDescription());

        // Create a set of updated field IDs
        Set<Long> updatedFieldIds = updatedFormulaire.getFormFields().stream()
                .map(FormField::getId)
                .filter(Objects::nonNull)
                .collect(Collectors.toSet());

        existingFormulaire.getFormFields().removeIf(field -> field.getId() != null && !updatedFieldIds.contains(field.getId()));

        for (FormField updatedField : updatedFormulaire.getFormFields()) {
            if (updatedField.getId() != null) {
                FormField fieldToUpdate = existingFormulaire.getFormFields().stream()
                        .filter(field -> field.getId().equals(updatedField.getId()))
                        .findFirst()
                        .orElseThrow(() -> new EntityNotFoundException("FormField not found with id: " + updatedField.getId()));

                updateFieldProperties(fieldToUpdate, updatedField);
            } else {
                updatedField.setForm(existingFormulaire);
                if (updatedField.getTemplate() != null && updatedField.getTemplate().getCode() != null) {
                    FormTemplate template = formTemplateRepo.findByCode(updatedField.getTemplate().getCode())
                            .orElseThrow(() -> new EntityNotFoundException("FormTemplate not found with code: " + updatedField.getTemplate().getCode()));
                    updatedField.setTemplate(template);
                }
                existingFormulaire.getFormFields().add(updatedField);
            }
        }

        return formulaireRepo.save(existingFormulaire);
    }

    private void updateFieldProperties(FormField target, FormField source) {
        target.setLabel(source.getLabel());
        target.setPlaceholder(source.getPlaceholder());
        target.setOptions(source.getOptions());
        target.setRequired(source.isRequired());
        target.setMinLength(source.getMinLength());
        target.setMaxLength(source.getMaxLength());
        target.setMin(source.getMin());
        target.setMax(source.getMax());
    }
}
