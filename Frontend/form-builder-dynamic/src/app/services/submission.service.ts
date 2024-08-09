
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Submission } from '../model/Submission';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private apiUrl = 'http://localhost:8080/submissions';

  constructor(private http: HttpClient) { }

  saveSubmission(submission: Submission): Observable<Submission> {
    return this.http.post<Submission>(this.apiUrl, submission);
  }

  getSubmissions(userId: number, formId: number): Observable<Submission[]> {
    return this.http.get<Submission[]>(`${this.apiUrl}/${userId}/${formId}`);
  }

  getSubmissionById(id: number): Observable<Submission> {
    return this.http.get<Submission>(`${this.apiUrl}/${id}`);
  }

  deleteSubmission(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Additional method to get all submissions for a user
  getUserSubmissions(userId: number): Observable<Submission[]> {
    return this.http.get<Submission[]>(`${this.apiUrl}/user/${userId}`);
  }
}