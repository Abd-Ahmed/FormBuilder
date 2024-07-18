import { Component } from '@angular/core';

interface Field {
  type: string;
  label: string;
  placeholder: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  fields: Field[] = [];

  addField(type: string) {
    this.fields.push({ type, label: '', placeholder: '' });
  }
}
