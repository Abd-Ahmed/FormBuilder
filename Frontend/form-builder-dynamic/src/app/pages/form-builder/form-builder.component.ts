import { Component } from '@angular/core';
import { FormulaireService } from '../../services/formulaire.service';
import { Router } from '@angular/router';
import { FormField } from 'src/model/FormField';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent {
  formName: string = '';
  description: string = '';
  formFields: FormField[] = [];
  availableFieldTypes = [
    'text', 'number', 'email', 'password', 'date', 'textarea', 
    'url', 'file', 'dropdown', 'radio', 'checkbox'
  ];

  constructor(private FS: FormulaireService, private router: Router) {}

  addField(fieldType: string) {
    const newField: FormField = {
      fieldType: fieldType,
      label: '',
      placeholder: this.shouldHavePlaceholder(fieldType) ? '' : undefined,
      options: this.shouldHaveOptions(fieldType) ? [] : undefined,
      required: false,
      minLength: fieldType === 'text' || fieldType === 'textarea' ? 0 : undefined,
      maxLength: fieldType === 'text' || fieldType === 'textarea' ? undefined : undefined,
      min: fieldType === 'number' ? undefined : undefined,
      max: fieldType === 'number' ? undefined : undefined,
      pattern: undefined
    };
    this.formFields.push(newField);
  }

  removeField(index: number) {
    this.formFields.splice(index, 1);
  }

  saveForm() {
    const formToSave = {
      formName: this.formName,
      description: this.description,
      formFields: this.formFields
    };

    this.FS.createFormulaire(formToSave).subscribe(() => {
      this.router.navigate(['/form-list']);
    });
  }

  updateOptions(field: FormField, optionsString: string) {
    field.options = optionsString.split(',').map(option => option.trim());
  }

  shouldHavePlaceholder(fieldType: string): boolean {
    return ['text', 'number', 'email', 'password', 'url', 'textarea'].includes(fieldType);
  }

  shouldHaveOptions(fieldType: string): boolean {
    return ['dropdown', 'radio', 'checkbox'].includes(fieldType);
  }

  hasLengthValidation(fieldType: string): boolean {
    return ['text', 'textarea', 'password'].includes(fieldType);
  }

  hasNumberValidation(fieldType: string): boolean {
    return fieldType === 'number';
  }
}