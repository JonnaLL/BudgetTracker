import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  private apiUrl = '/api/security/register';

  registerUser(username: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, email, password });
  }
}
