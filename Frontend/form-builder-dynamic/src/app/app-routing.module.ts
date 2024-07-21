import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './pages/form-builder/form-builder.component';
import { FormListComponent } from './pages/form-list/form-list.component';
import { FormPreviewComponent } from './pages/form-preview/form-preview.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form-builder',
    pathMatch: 'full'
  },
  {
    path: 'form-builder',
    component: FormBuilderComponent
  },
  {
    path: 'form-list',
    component: FormListComponent
  },
  { path: 'form-preview/:id',
    component: FormPreviewComponent 
  }


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
