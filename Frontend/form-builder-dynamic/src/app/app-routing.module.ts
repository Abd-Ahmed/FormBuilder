import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './pages/form-builder/form-builder.component';
import { FormListComponent } from './pages/form-list/form-list.component';
import { FormPreviewComponent } from './pages/form-preview/form-preview.component';
import { RoleGuardService } from './services/role-guard.service';
import { UserFormFillComponent } from './pages/user-form-fill/user-form-fill.component';
import { SubmittedFormsComponent } from './pages/submitted-forms/submitted-forms.component';
import { UserFormListComponent } from './pages/user-form-list/user-form-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'form-builder',
    component: FormBuilderComponent,
    canActivate: [RoleGuardService],
    data: { requiredRole: 'admin' }
  },
  {
    path: 'form-list',
    component: FormListComponent,
    canActivate: [RoleGuardService],
    data: { requiredRole: 'admin' } // Show admin form list
  },
  {
    path: 'user-form-list',
    component: UserFormListComponent, // New component for users
    canActivate: [RoleGuardService],
    data: { requiredRole: 'user' }
  },
  {
    path: 'form-preview/:id',
    component: FormPreviewComponent,
    canActivate: [RoleGuardService],
    data: { requiredRole: 'user' } // Users can preview forms
  },
  {
    path: 'submitted-forms',
    component: SubmittedFormsComponent, // New component for viewing submitted forms
    canActivate: [RoleGuardService],
    data: { requiredRole: 'user' }
  },
  { path: 'fill-form/:id', component: UserFormFillComponent,     data: { requiredRole: 'user' }
},

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
