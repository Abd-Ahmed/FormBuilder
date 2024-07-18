import { Component, OnInit } from '@angular/core';
import { FormulaireService } from '../../services/formulaire.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
})
export class FormListComponent implements OnInit {
  formulaires: any[] = [];

  constructor(private formulaireService: FormulaireService) {}

  ngOnInit() {
    this.loadFormulaires();
  }

  loadFormulaires() {
    this.formulaireService.getAllFormulaires().subscribe(
      (data) => {
        this.formulaires = data;
      },
      (error) => {
        console.error('Error fetching formulaires', error);
      }
    );
  }

  deleteFormulaire(id: number) {
    this.formulaireService.deleteFormulaire(id).subscribe(
      () => {
        this.loadFormulaires();
      },
      (error) => {
        console.error('Error deleting formulaire', error);
      }
    );
  }
}