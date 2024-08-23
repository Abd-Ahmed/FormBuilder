import { Component, OnInit } from '@angular/core';
import { FormulaireService } from '../../services/formulaire.service';
import { Router } from '@angular/router';
import { FormField } from 'app/model/FormField';
import { FormTemplate } from 'app/model/FormTemplate';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
})
export class FormBuilderComponent implements OnInit {
  formName: string = '';
  description: string = '';
  formFields: FormField[] = [];
  availableTemplates: FormTemplate[] = [];

  constructor(private FS: FormulaireService, private router: Router) {}

  ngOnInit() {
    this.loadFormTemplates();
    console.log('Initial formFields:', this.formFields);
    this.debugLog();

  }
  loadFormTemplates() {
    this.FS.getFormTemplates().subscribe(
      (templates: FormTemplate[]) => {
        this.availableTemplates = templates;
        console.log('Available templates:', this.availableTemplates);
      },
      (error) => {
        console.error('Error loading form templates:', error);
      }
    );
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

  shouldHavePlaceholder(fieldType: string): boolean {
    return ['Text', 'Number', 'Email', 'Password', 'URL', 'Text Area'].includes(fieldType);
  }
  
  shouldHaveOptions(fieldType: string): boolean {
    return ['Dropdown', 'Radio'].includes(fieldType);
  }
  
  hasLengthValidation(fieldType: string): boolean {
    return ['Text', 'Text Area', 'Password'].includes(fieldType);
  }
  
  hasNumberValidation(fieldType: string): boolean {
    return fieldType === 'Number';
  }
  
  updateOptions(field: FormField, optionsString: string) {
    field.options = optionsString.split(',').map(option => option.trim());
  }
  
  addField(templateCode: string) {
    const template = this.availableTemplates.find(t => t.code === templateCode);
    if (template) {
      const newField: FormField = {
        template: template,
        label: '',
        placeholder: this.shouldHavePlaceholder(template.type) ? '' : undefined,
        options: this.shouldHaveOptions(template.type) ? [] : undefined,
        required: false,
        minLength: this.hasLengthValidation(template.type) ? 0 : undefined,
        maxLength: this.hasLengthValidation(template.type) ? undefined : undefined,
        min: this.hasNumberValidation(template.type) ? undefined : undefined,
        max: this.hasNumberValidation(template.type) ? undefined : undefined,
      };
      this.formFields.push(newField);
    }
  }
  debugLog() {
    console.log('Form Fields:', this.formFields);
    console.log('Available Templates:', this.availableTemplates);
  }
}