import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-submission-modal',
  templateUrl: './submission-modal.component.html',
  styleUrls: ['./submission-modal.component.scss']
})
export class SubmissionModalComponent {
  @Input() formData: any;
  @Input() formName: string | undefined;
  @Input() submittedAt: string | undefined;

  get formDataKeys() {
    return Object.keys(this.formData || {});
  }

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }
}