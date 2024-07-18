import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Form Builder', url: '/form-builder', icon: 'create' },
    { title: 'Form List', url: '/form-list', icon: 'list' },
  ];

  constructor() {}
}