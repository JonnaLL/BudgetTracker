import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MotivationService {
  private apiUrl = 'http://localhost:8080/api/motivation';

  constructor(private http: HttpClient) {}

  getRandomMessage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/random-message`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error.message || 'Server Error');
  }
}
