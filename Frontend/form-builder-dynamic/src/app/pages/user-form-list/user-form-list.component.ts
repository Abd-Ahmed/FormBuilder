import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formulaire } from 'src/app/model/Formulaire';
import { FormulaireService } from 'src/app/services/formulaire.service';

@Component({
  selector: 'app-user-form-list',
  templateUrl: './user-form-list.component.html',
  styleUrls: ['./user-form-list.component.scss'],
})
export class UserFormListComponent  implements OnInit {

  forms: Formulaire[] = [];

  constructor(
    private formulaireService: FormulaireService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadForms();
  }

  loadForms() {
    this.formulaireService.getAllFormulaires().subscribe(
      (forms: Formulaire[]) => {
        this.forms = forms;
      },
      (error: any) => {
        console.error('Error fetching forms', error);
      }
    );
  }

  openForm(formId: number) {
    this.router.navigate(['/fill-form', formId]);
  }
  
}