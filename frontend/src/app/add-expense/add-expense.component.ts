import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService, Category } from '../../services/budget.service'; 
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  categories: Category[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private authService: AuthService,
    private location: Location
  ) {
    this.expenseForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.budgetService.getAllCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
        console.log('Categories loaded successfully:', data);
      },
      (error) => {
        this.errorMessage = 'Failed to load categories';
        console.error('Error loading categories:', error);
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
            this.expenseForm.reset();
          },
          (error) => {
            this.errorMessage = 'Failed to add expense';
            this.successMessage = '';
            console.error('Error adding expense:', error);
          }
        );
      } else {
        this.errorMessage = 'User not authenticated';
      }
    }
  }

  goBack() {
    this.location.back();
  }
}
