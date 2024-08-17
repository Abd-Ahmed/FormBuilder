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
    this.formFields = this.formulaire.formFields;
  }

  shouldHavePlaceholder(fieldType: string): boolean {
    return ['text', 'number'].includes(fieldType);
  }

  shouldHaveOptions(fieldType: string): boolean {
    return ['dropdown', 'radio'].includes(fieldType);
  }

  hasLengthValidation(fieldType: string): boolean {
    return fieldType === 'text';
  }

  hasNumberValidation(fieldType: string): boolean {
    return fieldType === 'number';
  }

  updateOptions(field: any, options: string) {
    field.options = options.split(',').map(option => option.trim());
  }

  addField(fieldType: string) {
    this.formFields.push({ fieldType, label: '', placeholder: '', required: false });
  }

  removeField(index: number) {
    this.formFields.splice(index, 1);
  }

  save() {
    this.formulaire.formName = this.formName;
    this.formulaire.description = this.description;
    this.formulaire.formFields = this.formFields;

    this.FS.updateFormulaire(this.formulaire.id, this.formulaire).subscribe(
      (updatedFormulaire) => {
        this.modalCtrl.dismiss(updatedFormulaire);
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
