import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormulaireService } from '../../services/formulaire.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField } from 'src/model/FormField'; // Adjust the import path as necessary

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss'],
})
export class FormPreviewComponent implements OnInit {
  formulaire: any;
  dynamicForm!: FormGroup;
  availableFieldTypes = ['text', 'number', 'dropdown', 'radio', 'checkbox'];

  constructor(
    private route: ActivatedRoute,
    private formulaireService: FormulaireService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFormulaire(+id);
    }
  }

  loadFormulaire(id: number) {
    this.formulaireService.getFormulaireById(id).subscribe(
      (data) => {
        this.formulaire = data;
        this.createDynamicForm();
      },
      (error) => {
        console.error('Error fetching formulaire', error);
      }
    );
  }

  createDynamicForm() {
    const formGroup: { [key: string]: any } = {};
    this.formulaire.formFields.forEach((field: FormField) => {
      formGroup[field.label] = ['', this.getValidators(field)];
    });
    this.dynamicForm = this.formBuilder.group(formGroup);
  }

  getValidators(field: FormField) {
    const validators = [];
    
    if (field.required) {
      validators.push(Validators.required);
    }
  
    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }
  
    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }
  
    if (field.min) {
      validators.push(Validators.min(field.min));
    }
  
    if (field.max) {
      validators.push(Validators.max(field.max));
    }
  
    if (field.pattern) {
      validators.push(Validators.pattern(field.pattern));
    }
  
    switch (field.fieldType) {
      case 'email':
        validators.push(Validators.email); // Ensure valid email format
        break;
      case 'url':
        validators.push(Validators.pattern('https?://.+')); // Ensure valid URL format
        break;
      case 'number':
        validators.push(Validators.pattern('^[0-9]*$')); // Only allow numeric input
        break;
      case 'tel':
        validators.push(Validators.pattern('^[0-9-+() ]*$')); // Allow valid phone numbers
        break;
      // Add more cases for other field types if needed
    }
  
    return validators;
  }
  

  onSubmit() {
    if (this.dynamicForm.valid) {
      console.log(this.dynamicForm.value);
      // Handle form submission
    } else {
      console.log('Form is invalid');
    }
  }
}
