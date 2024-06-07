import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token || token.split('.').length !== 3) {
      console.error('Invalid JWT token format');
      return new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
    console.log('Token being sent:', `Bearer ${token}`);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  post(endpoint: string, data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log('Headers:', headers);
    return this.http.post(`${this.apiUrl}${endpoint}`, data, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error === 'Token has expired') {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const headers = this.getAuthHeaders();
              return this.http.post(`${this.apiUrl}${endpoint}`, data, { headers });
            }),
            catchError(this.handleError)
          );
        }
        return this.handleError(error);
      })
    );
  }

  get(endpoint: string): Observable<any> {
    const headers = this.getAuthHeaders();
    console.log('Headers:', headers);
    return this.http.get(`${this.apiUrl}${endpoint}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error === 'Token has expired') {
          return this.authService.refreshToken().pipe(
            switchMap(() => {
              const headers = this.getAuthHeaders();
              return this.http.get(`${this.apiUrl}${endpoint}`, { headers });
            }),
            catchError(this.handleError)
          );
        }
        return this.handleError(error);
      })
    );
  }

  getOverview(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/budget/overview/${userId}`, { headers });
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
}
