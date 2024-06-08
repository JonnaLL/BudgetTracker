import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getUserData(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/budget/overview/${userId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getUsername(userId: number): Observable<string> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/user/${userId}/username`, { headers, responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  enterInitialIncome(totalIncome: number, userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/budget/income`, { totalIncome, userId }, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  setSavingsGoal(goalPercentage: number, userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/budget/savings`, { goalPercentage, userId }, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addExpense(expense: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.baseUrl}/budget/expense`, expense, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getMotivationalQuote(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/motivation/random-message`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  checkSavingsStatus(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/budget/savings-status/${userId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getOverviewOfExpenses(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.baseUrl}/budget/overview/${userId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server Error');
  }
}
