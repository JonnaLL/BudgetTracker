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

  goBack(): void {
    this.router.navigate(['/']); 
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      () => {
        // Navigate to dashboard or desired route upon successful login
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.errorMessage = error.error.message; // Adjust this to match your error response structure
      }
    );
  }
}
