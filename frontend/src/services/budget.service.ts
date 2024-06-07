import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:8080/api/budget';

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

  enterInitialIncome(amount: number, userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { amount, userId };
    return this.http.post(`${this.apiUrl}/income`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  setSavingsGoal(goalPercentage: number, userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { savingsGoalPercentage: goalPercentage, userId };
    return this.http.post(`${this.apiUrl}/savings`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addIncome(income: { amount: number, userId: number }): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/income`, income, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getTotalIncome(userId: number): Observable<number> {
    const headers = this.getAuthHeaders();
    return this.http.get<number>(`${this.apiUrl}/total-income/${userId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getAllCategories(): Observable<string[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<string[]>(`${this.apiUrl}/categories`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addExpense(amount: number, category: string, userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const expenseData = { amount, category, userId };
    return this.http.post<any>(`${this.apiUrl}/expense`, expenseData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server Error');
  }

  getOverview(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/overview/${userId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  checkSavings(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/check-savings/${userId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getMotivationalQuote(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/motivation/random-message`, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
