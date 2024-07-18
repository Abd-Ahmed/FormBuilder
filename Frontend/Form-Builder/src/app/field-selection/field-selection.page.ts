import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-field-selection',
  templateUrl: './field-selection.page.html',
  styleUrls: ['./field-selection.page.scss'],
})
export class FieldSelectionPage {

  constructor(private navCtrl: NavController) { }

  selectField(fieldType: string) {
    const field = {
      fieldType: fieldType,
      label: fieldType.charAt(0).toUpperCase() + fieldType.slice(1),
      placeholder: `Enter your ${fieldType}`
    };

    this.navCtrl.navigateBack('form-canvas', {
      state: { field: field }
    });
  }
}
