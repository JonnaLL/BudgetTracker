import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  overview: { category: string, amount: number }[] = [];
  savingsGoal: number | null = null;

  constructor(private budgetService: BudgetService, private location: Location) { }

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

  goBack() {
    this.location.back();
  }
}
