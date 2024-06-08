import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  private setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  private removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  setToken(token: string): void {
    this.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.getItem(this.tokenKey);
  }

  removeToken(): void {
    this.removeItem(this.tokenKey);
  }

  setRefreshToken(refreshToken: string): void {
    this.setItem(this.refreshTokenKey, refreshToken);
  }

  getRefreshToken(): string | null {
    return this.getItem(this.refreshTokenKey);
  }

  removeRefreshToken(): void {
    this.removeItem(this.refreshTokenKey);
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
        if (response.refreshToken) {
          this.setRefreshToken(response.refreshToken);
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getCurrentUserId(): number | null {
    const userId = this.getItem('userId');
    return userId ? Number(userId) : null;
  }

  logout(): void {
    this.removeToken();
    this.removeRefreshToken();
    localStorage.removeItem('userId');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
