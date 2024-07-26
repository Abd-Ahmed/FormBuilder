import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms';  // Add this import

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormListComponent } from './pages/form-list/form-list.component';
import { FormBuilderComponent } from './pages/form-builder/form-builder.component';
import { FormPreviewComponent } from './pages/form-preview/form-preview.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptors/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,
    FormBuilderComponent,
    FormPreviewComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
// Add this line
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },    {
     provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}