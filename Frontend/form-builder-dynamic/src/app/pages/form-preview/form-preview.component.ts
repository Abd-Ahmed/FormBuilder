import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormulaireService } from '../../services/formulaire.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Formulaire } from 'src/app/model/Formulaire';
import { FormField } from 'src/app/model/FormField';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss'],
})
export class FormPreviewComponent implements OnInit {
  formulaire!: Formulaire;
  previewForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private FS: FormulaireService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const formId = this.route.snapshot.paramMap.get('id');
    this.loadForm(Number(formId));
  }

  loadForm(formId: number) {
    this.FS.getFormulaireById(formId).subscribe(
      (form: Formulaire) => {
        this.formulaire = form;
        this.buildForm();
      },
      (error) => {
        console.error('Error loading form:', error);
      }
    );
  }

  buildForm() {
    const formGroup: { [key: string]: AbstractControl } = {};
    this.formulaire.formFields.forEach(field => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.minLength) validators.push(Validators.minLength(field.minLength));
      if (field.maxLength) validators.push(Validators.maxLength(field.maxLength));
      if (field.min) validators.push(Validators.min(field.min));
      if (field.max) validators.push(Validators.max(field.max));
      if (field.template.type === 'Email') validators.push(Validators.email);

      formGroup[field.label] = this.formBuilder.control('', validators);
    });
    this.previewForm = this.formBuilder.group(formGroup);
  }

  onSubmit() {
    if (this.previewForm.valid) {
      console.log('Form submitted:', this.previewForm.value);
      // Here you can add logic to handle the form submission
    } else {
      console.log('Form is invalid');
    }
  }

  getFieldType(fieldType: string): string {
    switch (fieldType) {
      case 'Number':
        return 'number';
      case 'Email':
        return 'email';
      case 'Password':
        return 'password';
      case 'URL':
        return 'url';
      default:
        return 'text';
    }
  }
}