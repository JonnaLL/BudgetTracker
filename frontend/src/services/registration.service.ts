import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private apiService: ApiService) { }

  registerUser(username: string, email: string, password: string): Observable<any> {
    return this.apiService.post('/security/register', { username, email, password }).pipe(
      map((response: any) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userId', response.userId.toString());
        return response;
      })
    );
  }
}
