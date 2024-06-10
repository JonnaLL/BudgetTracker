import { Component, OnInit } from '@angular/core';
import { BudgetService, CategoryOverview } from '../../services/budget.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  overview: CategoryOverview[] = [];
  totalExpenses: number = 0;
  savingsGoal: number | null = null;

  constructor(private budgetService: BudgetService, private location: Location) { }

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId'));
    this.budgetService.getOverview(userId).subscribe({
      next: (data: any) => {
        this.overview = data.categories;
        this.totalExpenses = data.totalExpenses; 
      },
      error: (error: any) => console.error('Error fetching overview:', error)
    });
  }

  goBack() {
    this.location.back();
  }
}
