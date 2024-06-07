import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/security';
  private tokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';

  constructor(private http: HttpClient) { }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.refreshTokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        this.setToken(response.token);
        this.setRefreshToken(response.refreshToken);
        localStorage.setItem('userId', response.userId.toString());
        return response;
      }),
      catchError(this.handleError)
    );
  }

  register(userDTO: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userDTO).pipe(
      map(response => {
        this.setToken(response.token);
        this.setRefreshToken(response.refreshToken);
        localStorage.setItem('userId', response.userId.toString());
        return response;
      }),
      catchError(this.handleError)
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      map(response => {
        this.setToken(response.token);
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getCurrentUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? Number(userId) : null;
  }

  logout() {
    this.removeToken();
    this.removeRefreshToken();
    localStorage.removeItem('userId');
  }

  private handleError(error: any) {
    return throwError(error.message || 'Server Error');
  }
}
