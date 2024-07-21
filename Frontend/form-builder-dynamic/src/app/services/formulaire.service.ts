import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formulaire } from 'src/model/Formulaire';

@Injectable({
  providedIn: 'root'
})
export class FormulaireService {
  private apiUrl = 'http://localhost:8080/formulaire';

  constructor(private http: HttpClient) { }

  getAllFormulaires(): Observable<Formulaire[]> {
    return this.http.get<Formulaire[]>(`${this.apiUrl}/all`);
  }

  getFormulaireById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createFormulaire(formulaire: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, formulaire);
  }

  deleteFormulaire(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
}