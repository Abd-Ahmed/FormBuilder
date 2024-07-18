import { Component } from '@angular/core';
import { FormulaireService } from '../../services/formulaire.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent {
  formName: string = '';
  description: string = '';
  formFields: any[] = [];
  availableFieldTypes = ['text', 'number', 'dropdown', 'radio', 'checkbox'];

  constructor(private formulaireService: FormulaireService) {}

  addField(fieldType: string) {
    this.formFields.push({
      fieldType: fieldType,
      label: '',
      placeholder: ''
    });
  }

  removeField(index: number) {
    this.formFields.splice(index, 1);
  }

  saveForm() {
    const formulaire = {
      formName: this.formName,
      description: this.description,
      formFields: this.formFields
    };

    this.formulaireService.createFormulaire(formulaire).subscribe(
      response => {
        console.log('Form saved successfully', response);
        // Handle success (e.g., show a success message, navigate to form list)
      },
      error => {
        console.error('Error saving form', error);
        // Handle error (e.g., show an error message)
      }
    );
  }
}