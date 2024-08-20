import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private tokenSubject: BehaviorSubject<string | null>;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router) {
    this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
    
    let storedUser = null;
    try {
      const storedUserString = localStorage.getItem('currentUser');
      storedUser = storedUserString ? JSON.parse(storedUserString) : null;
    } catch (e) {
      console.error('Error parsing currentUser from localStorage', e);
      localStorage.removeItem('currentUser');
    }
    
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUser(): Observable<User | null> {
    if (this.currentUserValue) {
      return of(this.currentUserValue);
    } else {
      return this.http.get<User>(`${this.apiUrl}/current-user`).pipe(
        tap(user => this.updateCurrentUserData(user)),
        catchError(error => {
          console.error('Error fetching current user', error);
          return of(null);
        })
      );
    }
  }
  updateCurrentUserData(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  addSubmissionToUser(submission: any) {
    const currentUser = this.currentUserValue;
    if (currentUser) {
      currentUser.submissions = currentUser.submissions || [];
      currentUser.submissions.push(submission);
      this.updateCurrentUserData(currentUser);
    }
  }
  isAdmin(): boolean {
    const user = this.currentUserValue;
    return user !== null && user.role.name === 'ADMIN';
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.tokenSubject.next(response.token);
          this.getCurrentUser().subscribe(); // Fetch and store the user data
        }
      })
    );
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { firstName, lastName, email, password });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.tokenSubject.next(null);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
}