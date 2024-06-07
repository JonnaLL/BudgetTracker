import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userId', response.userId ? response.userId.toString() : '');
        console.log('Token stored in localStorage after login:', localStorage.getItem('authToken'));
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.error('Login failed', error);
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
