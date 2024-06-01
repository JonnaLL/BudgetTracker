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
    console.log('Registering user...');
    this.registrationService.registerUser(this.username, this.email, this.password).subscribe({
      next: () => {
        console.log('Registration successful!');
        // Redirect to the welcome component after successful registration
        this.router.navigate(['/welcome'], { queryParams: { username: this.username } })
          .then(() => console.log('Navigated to dashboard'))
          .catch(error => console.error('Navigation error:', error));
      },
      error: error => {
        console.error('Registration failed:', error);
        this.errorMessage = error.message;
      }
    }
    );
  }
}