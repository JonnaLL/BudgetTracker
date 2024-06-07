import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private budgetService: BudgetService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      this.fetchUserData();
      this.openMotivationModal();  
      
    } else {
      this.router.navigate(['/home']);
    }
  }

  fetchUserData() {
    if (this.userId !== null) {
      this.userService.getUserData(this.userId).subscribe(userData => {
        this.userInfo = userData;
        this.welcomeMessage = `Hi, ${userData.username}!`;
      }, error => {
        console.error('Error fetching user data:', error);
      });
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

  logout(): void {
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
}
