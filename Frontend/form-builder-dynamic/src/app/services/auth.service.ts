import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private tokenSubject: BehaviorSubject<string | null>;
  private currentUser: any = null;

  constructor(private http: HttpClient, private router: Router) {
    this.tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.currentUser = response.user;
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.tokenSubject.next(response.token);
          const userRole = this.getUserRole();
          if (userRole === 'admin') {
            this.router.navigate(['/form-builder']);
          } else if (userRole === 'user') {
            this.router.navigate(['/user-form-list']);
          }
        }
      })
    );
  }

  register(firstname: string, lastname: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { firstname, lastname, email, password });
  }
  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);

  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getCurrentUser(): any {
    if (!this.currentUser) {
      // If currentUser is not in memory, try to get it from localStorage
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  getUserRole(): string {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }


}