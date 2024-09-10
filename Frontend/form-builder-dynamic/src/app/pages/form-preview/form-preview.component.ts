import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormulaireService } from '../../services/formulaire.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Formulaire } from 'app/model/Formulaire';
import { SubmissionService } from 'app/services/submission.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss'],
})
export class FormPreviewComponent implements OnInit {
  formulaire!: Formulaire;
  previewForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private FS: FormulaireService,
    private formBuilder: FormBuilder,
    private submissionService: SubmissionService,
    private toastController: ToastController
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
      this.isSubmitting = true;
      const formData = this.previewForm.value;
      Object.keys(formData).forEach(key => {
        const value = formData[key];
        if (value instanceof Date) {
          formData[key] = value.toISOString();
        }
      });
      this.submissionService.saveSubmission(this.formulaire.id, formData).subscribe(
        (response) => {
          this.isSubmitting = false;
          this.presentToast('Submission saved successfully');
          this.submissionService.triggerRefresh(); 
          this.router.navigateByUrl('/user-submissions', { replaceUrl: true });
        },
        (error) => {
          this.isSubmitting = false;
          console.error('Error saving submission:', error);
          this.presentToast('Error saving submission. Please try again.');
        }
      );
    } else {
      this.presentToast('Please fill all required fields');
    }
  }
  onDateChange(event: any, fieldLabel: string) {
    const dateValue = event.detail.value;
    if (dateValue) {
      const formattedDate = new Date(dateValue).toISOString().split('T')[0]; 
      this.previewForm.get(fieldLabel)?.setValue(formattedDate);
    }
  }
  
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}