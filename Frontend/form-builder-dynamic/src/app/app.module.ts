import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormListComponent } from './pages/form-list/form-list.component';
import { FormBuilderComponent } from './pages/form-builder/form-builder.component';
import { FormPreviewComponent } from './pages/form-preview/form-preview.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FormEditModalComponent } from './pages/form-edit-modal/form-edit-modal.component';
import { CommonModule } from '@angular/common';
import { UserSubmissionComponent } from './pages/user-submission/user-submission.component';
import { UserFormListComponent } from './pages/user-form-list/user-form-list.component';
import { SubmissionModalComponent } from './pages/submission-modal/submission-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,
    FormBuilderComponent,
    FormPreviewComponent,
    FormEditModalComponent,
    UserSubmissionComponent,
    UserFormListComponent,
    SubmissionModalComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },    {
     provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}