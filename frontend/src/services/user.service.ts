import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/security/login`, { username, password });
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/security/register`, { username, email, password });
  }

  getUserData(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/budget/overview/${userId}`);
  }

  enterInitialIncome(totalIncome: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/budget/income`, { totalIncome, userId });
  }

  setSavingsGoal(goalPercentage: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/budget/savings`, { goalPercentage, userId });
  }
}
