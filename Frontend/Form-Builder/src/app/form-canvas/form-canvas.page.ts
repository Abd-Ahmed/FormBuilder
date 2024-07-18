import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilderService } from "src/services/form-builder.service";

@Component({
  selector: 'app-form-canvas',
  templateUrl: './form-canvas.page.html',
  styleUrls: ['./form-canvas.page.scss'],
})
export class FormCanvasPage {
  formFields: any[] = [];

  constructor(private router: Router, private formBuilderService: FormBuilderService) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const field = navigation.extras.state['field'];
      if (field) {
        this.addField(field);
      }
    }
  }

  addField(field: any) {
    this.formFields.push(field);
  }

  saveForm() {
    const form = {
      formName: 'My Form', // You can replace this with a dynamic name
      description: 'Form description', // You can replace this with a dynamic description
      formFields: this.formFields
    };

    this.formBuilderService.createFormulaire(form).subscribe(response => {
      console.log('Form saved successfully', response);
    }, (error: any) => {
      console.error('Error saving form', error);
    });
  }
}
