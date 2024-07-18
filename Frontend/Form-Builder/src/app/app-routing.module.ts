import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form-canvas',
    pathMatch: 'full'
  },
  {
    path: 'form-canvas',
    loadChildren: () => import('./form-canvas/form-canvas.module').then( m => m.FormCanvasPageModule)
  },
  {
    path: 'field-selection',
    loadChildren: () => import('./field-selection/field-selection.module').then( m => m.FieldSelectionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
