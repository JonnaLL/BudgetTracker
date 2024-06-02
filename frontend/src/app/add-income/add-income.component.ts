import { Component } from '@angular/core';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent {
  amount: number = 0;
  description: string = '';

  constructor(private budgetService: BudgetService) {}

  addIncome() {
    this.budgetService.addIncome(this.amount, this.description);
    this.amount = 0;
    this.description = '';
  }
}
