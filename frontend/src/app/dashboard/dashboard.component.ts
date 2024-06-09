import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MotivationModalComponent } from '../motivation-modal/motivation-modal.component';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId: number | null = null;
  welcomeMessage: string = '';
  userInfo: any;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private budgetService: BudgetService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.fetchUsername();
    } else {
      this.router.navigate(['/home']);
    }
  }

  fetchUsername() {
    if (this.userId !== null) {
      this.userService.getUsername(this.userId).subscribe(
        username => {
          this.welcomeMessage = `Hello, ${username}!`;
        },
        error => {
          console.error('Error fetching username:', error);
        }
      );
    }
  }

  openMotivationModal(): void {
    this.budgetService.getMotivationalQuote().subscribe(quoteData => {
      this.dialog.open(MotivationModalComponent, {
        data: quoteData
      });
    }, error => {
      console.error('Error fetching motivational quote:', error);
    });
  }
  openIncomeModal(): void {
    // Logic to open the modal for adding additional income
    // You can implement similar logic as in openMotivationModal()
  }

  logout(): void {
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
}

