import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormCanvasPageRoutingModule } from './form-canvas-routing.module';

import { FormCanvasPage } from './form-canvas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormCanvasPageRoutingModule
  ],
  declarations: [FormCanvasPage]
})
export class FormCanvasPageModule {}
