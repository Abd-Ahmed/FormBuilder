import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormulaireService } from '../../services/formulaire.service';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss'],
})
export class FormPreviewComponent implements OnInit {
  formulaire: any;

  constructor(
    private route: ActivatedRoute,
    private formulaireService: FormulaireService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFormulaire(+id);
    }
  }

  loadFormulaire(id: number) {
    this.formulaireService.getFormulaireById(id).subscribe(
      (data) => {
        this.formulaire = data;
      },
      (error) => {
        console.error('Error fetching formulaire', error);
      }
    );
  }
}