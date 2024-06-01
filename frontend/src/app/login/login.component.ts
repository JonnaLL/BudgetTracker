import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs/operators';

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
    this.authService.login(this.username, this.password).pipe(
      tap(() => {
        this.router.navigate(['/welcome'], { queryParams: { username: this.username } });
      })
    ).subscribe(
      () => {},
      error => {
        this.errorMessage = error.error.message || 'Login failed';
      }
    );
  }
}
