import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Assuming you have this service
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async login() {
    if (!this.email || !this.password) {
      this.presentToast('Both email and password are required.');
      return;
    }
  
    try {
      const result = await this.authService.login(this.email, this.password).toPromise();
      console.log('Login successful', result);
      this.router.navigate(['/form-list']); // Navigate to home page after successful login
    } catch (error) {
      console.error('Login failed', error);
      this.presentToast('Login failed. Please check your credentials.');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}