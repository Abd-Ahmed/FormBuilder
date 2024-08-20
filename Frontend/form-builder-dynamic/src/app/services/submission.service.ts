import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { Submission } from '../model/Submission';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private apiUrl = 'http://localhost:8080/submission';

  constructor(private http: HttpClient, private authService: AuthService) { }
  private refreshSubject = new Subject<boolean>();

  refreshSubmissions$ = this.refreshSubject.asObservable();

  triggerRefresh() {
    this.refreshSubject.next(true);
  }

  saveSubmission(formId: number, formData: { [key: string]: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create/${formId}`, formData).pipe(
      tap((submission: any) => {
        this.authService.addSubmissionToUser(submission);
        this.triggerRefresh();
      })
    );
  }
  getUserSubmissions(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`).pipe(
      tap(submissions => {
        const currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.id === userId) {
          currentUser.submissions = submissions;
          this.authService.updateCurrentUserData(currentUser);
        }
      })
    );
  }
  getSubmissionsByForm(formId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/form/${formId}`);
  }
  getSubmission(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}