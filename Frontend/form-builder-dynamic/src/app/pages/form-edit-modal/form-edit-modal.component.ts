import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Formulaire } from 'app/model/Formulaire';
import { FormulaireService } from '../../services/formulaire.service';

@Component({
  selector: 'app-form-edit-modal',
  templateUrl: './form-edit-modal.component.html',
  styleUrls: ['./form-edit-modal.component.scss'],
})
export class FormEditModalComponent implements OnInit {
  @Input() formulaire!: Formulaire;
  
  formName!: string;
  description!: string;
  formFields: any[] = [];
  availableFieldTypes: string[] = ['text', 'number', 'dropdown', 'radio', 'checkbox'];

  constructor(private modalCtrl: ModalController, private FS: FormulaireService) {}

  ngOnInit() {
    this.formName = this.formulaire.formName;
    this.description = this.formulaire.description;
    this.formFields = [...this.formulaire.formFields]; // Create a copy of the formFields
  }

  shouldHavePlaceholder(fieldType: string): boolean {
    return ['text', 'number'].includes(fieldType);
  }

  shouldHaveOptions(fieldType: string): boolean {
    return ['dropdown', 'radio', 'checkbox'].includes(fieldType);
  }

  hasLengthValidation(fieldType: string): boolean {
    return fieldType === 'text';
  }

  hasNumberValidation(fieldType: string): boolean {
    return fieldType === 'number';
  }

  updateOptions(field: any, event: CustomEvent) {
    const options = (event.detail.value as string) || '';
    field.options = options.split(',').map(option => option.trim());
  }

  addField(fieldType: string) {
    this.formFields.push({
      fieldType,
      label: '',
      placeholder: '',
      required: false,
      options: [],
      minLength: null,
      maxLength: null,
      min: null,
      max: null,
      pattern: null
    });
  }

  removeField(index: number) {
    this.formFields.splice(index, 1);
  }
  save() {
    const updatedFormulaire = {
      id: this.formulaire.id,
      formName: this.formName,
      description: this.description,
      formFields: this.formFields.map(field => ({
        ...field,
        form: null, // Set to null to avoid circular reference
        template: field.template ? { code: field.template.code } : null // Only send the template code
      }))
    };
  
    this.FS.updateFormulaire(updatedFormulaire.id, updatedFormulaire).subscribe(
      (updatedForm) => {
        this.modalCtrl.dismiss(updatedForm);
      },
      (error) => {
        console.error('Error updating formulaire', error);
      }
    );
  }
  close() {
    this.modalCtrl.dismiss();
  }
}