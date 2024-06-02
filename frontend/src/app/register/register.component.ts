import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private registrationService: RegistrationService, private router: Router) { }

  goBack(): void {
    this.router.navigate(['/']);
  }

  register(): void {
    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'All fields are required';
      return;
    }

    this.registrationService.registerUser(this.username, this.email, this.password).subscribe({
      next: (response) => {
        const userId = response.userId; // Ensure backend returns userId
        this.router.navigate(['/welcome'], { queryParams: { userId: userId } });
      },
      error: error => {
        this.errorMessage = error.error.message || 'Registration failed';
      }
    });
  }
}

