import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  expenseForm: FormGroup = this.fb.group({
    amount: ['', Validators.required],
    category: ['', Validators.required]
  });
  categories: string[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private budgetService: BudgetService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.budgetService.getAllCategories().subscribe(
      (data: string[]) => {
        this.categories = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load categories';
      }
    );
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const { amount, category } = this.expenseForm.value;
      const userId = this.authService.getCurrentUserId();
      if (userId !== null) {
        this.budgetService.addExpense(amount, category, userId).subscribe(
          (response) => {
            this.successMessage = 'Expense added successfully!';
            this.errorMessage = '';
          },
          (error) => {
            this.errorMessage = 'Failed to add expense';
            this.successMessage = '';
          }
        );
      } else {
        this.errorMessage = 'User not authenticated';
      }
    }
  }
}
