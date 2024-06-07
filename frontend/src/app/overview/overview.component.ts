import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  overview: any[] = [];
  savingsGoal: number | null = null;

  constructor(private budgetService: BudgetService) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.budgetService.getOverview(userId).subscribe({
      next: (data: any) => this.overview = data,
      error: (error: any) => console.error('Error fetching overview:', error)
    });
    this.budgetService.checkSavings(userId).subscribe({
      next: (goal: any) => this.savingsGoal = goal,
      error: (error: any) => console.error('Error fetching savings goal:', error)
    });
  }
}
