import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://localhost:8080/api/budget';

  constructor(private http: HttpClient) { }

  enterInitialIncome(totalIncome: number, userId: number): Observable<any> {
    const body = { amount: totalIncome, user: { id: userId } };
    return this.http.post<{ message: string }>(`${this.apiUrl}/income`, body).pipe(
      catchError(error => {
        console.error('Error during HTTP request', error);
        return throwError(error);
      })
    );
  }

  setSavingsGoal(goalPercentage: number, userId: number): Observable<any> {
    const body = { savingsGoalPercentage: goalPercentage, user: { id: userId } };
    return this.http.post<{ message: string }>(`${this.apiUrl}/savings`, body).pipe(
      catchError(error => {
        console.error('Error during HTTP request', error);
        return throwError(error);
      })
    );
  }
}
