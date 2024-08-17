import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormulaireService } from 'app/services/formulaire.service';

@Component({
  selector: 'app-user-form-list',
  templateUrl: './user-form-list.component.html',
  styleUrls: ['./user-form-list.component.scss'],
})
export class UserFormListComponent  implements OnInit {
  forms: any[] = [];

  constructor(private formulaireService: FormulaireService, private router: Router) { }

  ngOnInit() {
    this.loadForms();
  }

  loadForms() {
    this.formulaireService.getAllFormulaires().subscribe(
      (data) => {
        this.forms = data;
      },
      (error) => {
        console.error('Error fetching forms:', error);
      }
    );
  }

  openFormPreview(formId: number) {
    this.router.navigate(['/form-preview', formId]);
  }
}