import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css']
})
export class SavingsComponent implements OnInit {
  savingsStatus: any = {};
  userId: number | null = null;

  constructor(private budgetService: BudgetService, private location: Location) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    if (this.userId) {
      this.budgetService.checkSavings(this.userId).subscribe({
        next: (data: any) => this.savingsStatus = data,
        error: (error: any) => console.error('Error fetching savings status:', error)
      });
    } else {
      console.error('User ID not found');
    }
  }

  goBack() {
    this.location.back();
  }
}
