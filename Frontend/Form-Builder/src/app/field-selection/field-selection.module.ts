import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FieldSelectionPageRoutingModule } from './field-selection-routing.module';

import { FieldSelectionPage } from './field-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FieldSelectionPageRoutingModule
  ],
  declarations: [FieldSelectionPage]
})
export class FieldSelectionPageModule {}
