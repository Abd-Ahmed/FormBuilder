import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Submission } from '../model/Submission';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private apiUrl = 'http://localhost:8080/submission';

  constructor(private http: HttpClient) { }

  saveSubmission(formId: number, formData: { [key: string]: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/${formId}`, formData);
  }
  getUserSubmissions(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }
  getSubmissionsByForm(formId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/form/${formId}`);
  }
  getSubmission(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}