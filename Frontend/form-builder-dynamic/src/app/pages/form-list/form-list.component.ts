import { Component, OnInit } from '@angular/core';
import { FormulaireService } from '../../services/formulaire.service';
import { Formulaire } from 'app/model/Formulaire';
import { FormEditModalComponent } from '../form-edit-modal/form-edit-modal.component';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
})
export class FormListComponent implements OnInit {
  formulaires: Formulaire[] = [];

  constructor(
    private FS: FormulaireService,
    private modalController: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadFormulaires();
  }

  loadFormulaires() {
    this.FS.getAllFormulaires().subscribe(
      (r: Formulaire[]) => {
        this.formulaires = r;
      },
      (error) => {
        console.error('Error fetching formulaires', error);
      }
    );
  }

  async confirmDelete(id: number, formName: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete "${formName}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteFormulaire(id);
          },
        },
      ],
    });

    await alert.present();
  }

  deleteFormulaire(id: number) {
    this.FS.deleteFormulaire(id).subscribe(
      () => {
        this.loadFormulaires();
      },
      (error) => {
        console.error('Error deleting formulaire', error);
      }
    );
  }

  async openEditModal(formId: number) {
    const modal = await this.modalController.create({
      component: FormEditModalComponent,
      componentProps: {
        formId: formId
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.loadFormulaires(); // Assuming you have a method to load the forms
      }
    });

    return await modal.present();
  }

}