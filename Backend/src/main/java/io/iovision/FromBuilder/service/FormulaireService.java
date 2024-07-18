package io.iovision.FromBuilder.service;

import io.iovision.FromBuilder.model.Formulaire;
import io.iovision.FromBuilder.repo.FormulaireRepo;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormulaireService {
    private final FormulaireRepo formulaireRepo;

    public FormulaireService(FormulaireRepo formulaireRepo) {
        this.formulaireRepo = formulaireRepo;
    }

    public List<Formulaire> getAllFormulaires() {
        return formulaireRepo.findAll();
    }

    public Formulaire getFormulaireById(Long id) {
        return formulaireRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Formulaire not found with id: " + id));
    }

    public Formulaire saveFormulaire(Formulaire formulaire) {
        return formulaireRepo.save(formulaire);
    }

    public void deleteFormulaire(Long id) {
        formulaireRepo.deleteById(id);
    }
}
