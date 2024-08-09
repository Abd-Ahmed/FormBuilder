import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formulaire } from '../model/Formulaire';
import { FormTemplate } from '../model/FormTemplate';

@Injectable({
  providedIn: 'root'
})
export class FormulaireService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllFormulaires(): Observable<Formulaire[]> {
    return this.http.get<Formulaire[]>(`${this.apiUrl}/formulaire/all`);
  }

  getFormulaireById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/formulaire/${id}`);
  }

  createFormulaire(formulaire: any): Observable<Formulaire> {
    return this.http.post<any>(`${this.apiUrl}/formulaire/create`, formulaire);
  }

  deleteFormulaire(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/formulaire/delete/${id}`);
  }
  updateFormulaire(id: number, formulaire: Formulaire): Observable<Formulaire> {
    return this.http.put<Formulaire>(`${this.apiUrl}/formulaire/update/${id}`, formulaire);
  }
  getFormTemplates(): Observable<FormTemplate[]> {
    return this.http.get<FormTemplate[]>(`${this.apiUrl}/formtemplate/all`);
  }
}