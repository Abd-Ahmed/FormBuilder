import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FieldSelectionPage } from './field-selection.page';

const routes: Routes = [
  {
    path: '',
    component: FieldSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FieldSelectionPageRoutingModule {}
