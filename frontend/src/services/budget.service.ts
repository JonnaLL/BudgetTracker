import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Category {
  id: number;
  name: string;
  expenses: any[];
}

export interface CategoryOverview {
  category: string;
  amount: number;
  percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log('Authorization Headers:', headers); 
    return headers;
  }

  enterInitialIncome(amount: number, userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { amount, userId };
    return this.http.post(`${this.apiUrl}/budget/income`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  setSavingsGoal(goalPercentage: number, userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const body = { savingsGoalPercentage: goalPercentage, userId };
    return this.http.post(`${this.apiUrl}/budget/savings`, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addIncome(recordData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/budget/income`, recordData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getTotalIncome(userId: number): Observable<any> { 
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/budget/total-income/${userId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`).pipe(
      catchError(this.handleError)
    );
  }

  addExpense(amount: number, categoryId: number, userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    const expense = { amount, categoryId, userId };
    return this.http.post(`${this.apiUrl}/budget/expense`, expense, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getOverview(userId: number): Observable<{ totalExpenses: number; categories: CategoryOverview[] }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ totalExpenses: number; categories: CategoryOverview[] }>(`${this.apiUrl}/budget/overview/${userId}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  checkSavings(userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/budget/check-savings/${userId}`, { headers }).pipe(
        catchError(this.handleError)
    );
}


  getMotivationalQuote(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/motivation/random-message`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error); 
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
