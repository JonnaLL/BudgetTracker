import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalIncome: number = 0;
  totalExpenses: number = 0;
  netBalance: number = 0;

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.totalIncome = this.budgetService.getTotalIncome();
    this.totalExpenses = this.budgetService.getTotalExpenses();
    this.netBalance = this.totalIncome - this.totalExpenses;
  }
}
