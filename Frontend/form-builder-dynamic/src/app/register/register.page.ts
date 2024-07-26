import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Assuming you have this service
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastController: ToastController
  ) {}

  async register() {
    try {
      const result = await this.authService.register(this.firstName, this.lastName, this.email, this.password);
      console.log('Registration successful', result);
      this.presentToast('Registration successful. Please login.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Registration failed', error);
      this.presentToast('Registration failed. Please try again.');
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
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