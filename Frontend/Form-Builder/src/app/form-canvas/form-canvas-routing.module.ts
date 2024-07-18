import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormCanvasPage } from './form-canvas.page';

const routes: Routes = [
  {
    path: '',
    component: FormCanvasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormCanvasPageRoutingModule {}
