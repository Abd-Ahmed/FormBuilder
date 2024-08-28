import { Component,OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Formulaire } from 'app/model/Formulaire';
import { FormulaireService } from '../../services/formulaire.service';
import { FormField } from 'app/model/FormField';
import { FormTemplate } from 'app/model/FormTemplate';

@Component({
  selector: 'app-form-edit-modal',
  templateUrl: './form-edit-modal.component.html',
  styleUrls: ['./form-edit-modal.component.scss'],
})
export class FormEditModalComponent implements OnInit {
  formId: number;
  formName: string = '';
  description: string = '';
  formFields: FormField[] = [];
  availableTemplates: FormTemplate[] = [];

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private FS: FormulaireService
  ) {
    this.formId = this.navParams.get('formId');
  }

  ngOnInit() {
    this.loadFormTemplates();
    this.loadFormData();
  }

  loadFormTemplates() {
    this.FS.getFormTemplates().subscribe(
      (templates: FormTemplate[]) => {
        this.availableTemplates = templates;
      },
      (error) => {
        console.error('Error loading form templates:', error);
      }
    );
  }

  loadFormData() {
    this.FS.getFormulaireById(this.formId).subscribe(
      (form: Formulaire) => {
        this.formName = form.formName;
        this.description = form.description;
        this.formFields = form.formFields;
      },
      (error) => {
        console.error('Error loading form data:', error);
      }
    );
  }

  removeField(index: number) {
    this.formFields.splice(index, 1);
  }

  saveForm() {
    const updatedForm: Formulaire = {
      id: this.formId,
      formName: this.formName,
      description: this.description,
      formFields: this.formFields
    };
  
    this.FS.updateFormulaire(this.formId, updatedForm).subscribe(
      () => {
        this.modalCtrl.dismiss(true);
      },
      (error) => {
        console.error('Error updating form:', error);
      }
    );
  }

  cancel() {
    this.modalCtrl.dismiss(false);
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
  
}