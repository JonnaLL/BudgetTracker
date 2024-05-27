import { Component } from '@angular/core';
import { BudgetService } from '../services/budget.service';


@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {
  amount: number = 0;
  description: string = '';

  constructor(private budgetService: BudgetService) {}

  addExpense() {
    this.budgetService.addExpense(this.amount, this.description);
    this.amount = 0;
    this.description = '';
  }
}

