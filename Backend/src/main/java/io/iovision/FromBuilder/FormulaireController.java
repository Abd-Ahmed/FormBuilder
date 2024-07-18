package io.iovision.FromBuilder;

import io.iovision.FromBuilder.model.Formulaire;
import io.iovision.FromBuilder.service.FormulaireService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/formulaire")
public class FormulaireController {
    private final FormulaireService formulaireService;

    public FormulaireController(FormulaireService formulaireService) {
        this.formulaireService = formulaireService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Formulaire>> getAllFormulaires() {
        List<Formulaire> formulaires = formulaireService.getAllFormulaires();
        return ResponseEntity.ok(formulaires);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Formulaire> getFormulaireById(@PathVariable("id") Long id) {
        Formulaire formulaire = formulaireService.getFormulaireById(id);
        return ResponseEntity.ok(formulaire);
    }

    @PostMapping("/create")
    public ResponseEntity<Formulaire> createFormulaire(@RequestBody Formulaire formulaire) {
        Formulaire createdFormulaire = formulaireService.saveFormulaire(formulaire);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFormulaire);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteFormulaire(@PathVariable("id") Long id) {
        formulaireService.deleteFormulaire(id);
        return ResponseEntity.ok().build();
    }
}
