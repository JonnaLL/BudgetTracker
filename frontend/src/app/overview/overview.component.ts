import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../services/budget.service';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  transactions: any[] = [];

  constructor(private budgetService: BudgetService) {}

  ngOnInit() {
    this.transactions = this.budgetService.getTransactions();
  }
}
