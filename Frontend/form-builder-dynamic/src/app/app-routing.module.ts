import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'; // Import the guard
import { FormBuilderComponent } from './pages/form-builder/form-builder.component';
import { FormListComponent } from './pages/form-list/form-list.component';
import { FormPreviewComponent } from './pages/form-preview/form-preview.component';
import { UserFormListComponent } from './pages/user-form-list/user-form-list.component';
import { UserSubmissionComponent } from './pages/user-submission/user-submission.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'form-builder',
    component: FormBuilderComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'form-list',
    component: FormListComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'form-preview/:id',
    component: FormPreviewComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'user-form-list',
    component: UserFormListComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'user-submissions',
    component: UserSubmissionComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
