import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  appPages: {title: string, url: string, icon: string}[] = [];

  constructor(private AS: AuthService, private router: Router) {}

  ngOnInit() {
    this.updateMenu();
    this.AS.currentUser.subscribe(() => {
      this.updateMenu();
    });
  }

  updateMenu() {
    if (this.AS.isAdmin()) {
      this.appPages = [
        { title: 'Form Builder', url: '/form-builder', icon: 'create' },
        { title: 'Form List', url: '/form-list', icon: 'list' },
      ];
    } else {
      this.appPages = [
        { title: 'Available Forms', url: '/user-form-list', icon: 'list' },
        { title: 'My Submissions', url: '/user-submissions', icon: 'document-text' },
      ];
    }
  }

  logout() {
    this.AS.logout();
    this.router.navigate(['/login']);
  }
}