import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService, private securityService: SecurityService) { }

  isLoggedIn(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      const isLoggedIn = !!this.securityService.getToken();
      observer.next(isLoggedIn);
      observer.complete();
    });
  }

  login(username: string, password: string): Observable<any> {
    return this.apiService.post('/security/login', { username, password }).pipe(
      map((response: any) => {
        this.securityService.setToken(response.token);
        localStorage.setItem('userId', response.userId);
        return response;
      })
    );
  }

  register(userDTO: any): Observable<any> {
    return this.apiService.post('/security/register', userDTO).pipe(
      map((response: any) => {
        this.securityService.setToken(response.token);
        localStorage.setItem('userId', response.userId);
        return response;
      })
    );
  }

  logout() {
    this.securityService.removeToken();
    localStorage.removeItem('userId');
  }
}
