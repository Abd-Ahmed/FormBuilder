import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getFormulaires(): Observable<any> {
    return this.http.get(`${this.apiUrl}/formulaire/all`);
  }

  createFormulaire(formulaire: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/formulaire/create`, formulaire);
  }

  getFormulaireById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/formulaire/${id}`);
  }

  deleteFormulaire(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/formulaire/delete/${id}`);
  }
}
