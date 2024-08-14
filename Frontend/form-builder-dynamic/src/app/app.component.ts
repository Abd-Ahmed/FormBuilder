import { Component, OnInit } from '@angular/core';
import { AuthService } from '../app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Form Builder', url: '/form-builder', icon: 'create' },
    { title: 'Form List', url: '/form-list', icon: 'list' },
  ];

  constructor(private AS : AuthService, private router : Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  logout() {
    this.AS.logout(); // This method should handle your logout logic, e.g., clearing tokens, etc.
    this.router.navigate(['/login']); // Navigate to the login page after logout
  }

}