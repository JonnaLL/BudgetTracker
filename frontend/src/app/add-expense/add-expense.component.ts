import { Component } from '@angular/core';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {
  description: string = '';
  amount: number = 0;

  constructor() { }

  addExpense(): void {
    console.log(`Description: ${this.description}, Amount: ${this.amount}`);
  }
}
