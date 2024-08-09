import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Formulaire } from 'src/app/model/Formulaire';
import { AuthService } from 'src/app/services/auth.service';
import { FormulaireService } from 'src/app/services/formulaire.service';
import { SubmissionService } from 'src/app/services/submission.service';

@Component({
  selector: 'app-user-form-fill',
  templateUrl: './user-form-fill.component.html',
  styleUrls: ['./user-form-fill.component.scss'],
})
export class UserFormFillComponent  implements OnInit {
  formulaire!: Formulaire;
  userForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private FS: FormulaireService,
    private submissionService: SubmissionService,
    private authService: AuthService,
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
    this.userForm = this.formBuilder.group(formGroup);
  }

  onSubmit() {
    if (this.userForm.valid) {
      const currentUser = this.authService.getCurrentUser();
      const submission = {
        form: { id: this.formulaire.id },
        user: { id: currentUser.id },
        formData: JSON.stringify(this.userForm.value)
      };

      this.submissionService.saveSubmission(submission).subscribe(
        (response: any) => {
          console.log('Form submitted successfully', response);
          // Navigate to the submitted forms page or show a success message
          this.router.navigate(['/submitted-forms']);
        },
        (error: any) => {
          console.error('Error submitting form', error);
          // Handle error (e.g., show an error message to the user)
        }
      );
    } else {
      console.log('Form is invalid');
      // Optionally, you can mark all fields as touched to show validation errors
      Object.values(this.userForm.controls).forEach(control => {
        control.markAsTouched();
      });
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