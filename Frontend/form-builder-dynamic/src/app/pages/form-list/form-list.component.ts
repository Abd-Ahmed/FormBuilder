import { Component, OnInit } from '@angular/core';
import { FormulaireService } from '../../services/formulaire.service';
import { Formulaire } from 'src/model/Formulaire';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
})
export class FormListComponent implements OnInit {
  formulaires: Formulaire[] = [];

  constructor(private FS: FormulaireService) {}

  ngOnInit() {
    this.loadFormulaires();
  }

  loadFormulaires() {
    this.FS.getAllFormulaires().subscribe(
      (r: Formulaire[]) => {
        this.formulaires = r;
      },
      (error) => {
        console.error('Error fetching formulaires', error);
      }
    );
  }

  deleteFormulaire(id: number) {
    this.FS.deleteFormulaire(id).subscribe(
      () => {
        this.loadFormulaires();
      },
      (error) => {
        console.error('Error deleting formulaire', error);
      }
    );
  }
}