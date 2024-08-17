import { Component, OnInit } from '@angular/core';
import { FormulaireService } from '../../services/formulaire.service';
import { Formulaire } from 'app/model/Formulaire';
import { FormEditModalComponent } from '../form-edit-modal/form-edit-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
})
export class FormListComponent implements OnInit {
  formulaires: Formulaire[] = [];

  constructor(private FS: FormulaireService,    private modalCtrl: ModalController  ) {}

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

  async editFormulaire(formulaire: Formulaire) {
    const modal = await this.modalCtrl.create({
      component: FormEditModalComponent,
      componentProps: {
        formulaire: { ...formulaire }
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.loadFormulaires();
    }
  }
}