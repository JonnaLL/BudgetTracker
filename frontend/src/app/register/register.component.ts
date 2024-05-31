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

  constructor(private registrationService: RegistrationService, private router: Router) {}

  goBack(): void {
    this.router.navigate(['/']);
  }

  register(): void {
    // Call registerUser method from RegistrationService
    this.registrationService.registerUser(this.username, this.email, this.password).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      error => {
        this.errorMessage = error.message; 
      }
    );
  }
}
