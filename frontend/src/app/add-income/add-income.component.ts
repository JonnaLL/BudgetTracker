import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {
  incomeForm: FormGroup = this.fb.group({
    amount: ['', Validators.required]
  });
  successMessage: string = '';
  errorMessage: string = '';
  totalIncome: number = 0;

  constructor(private fb: FormBuilder, private budgetService: BudgetService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getTotalIncome();
  }

  getTotalIncome() {
    const userId = this.authService.getCurrentUserId();
    if (userId !== null) {
      this.budgetService.getTotalIncome(userId).subscribe(
        (total: number) => {
          this.totalIncome = total;
        },
        (error: any) => {
          this.errorMessage = 'Failed to load total income';
        }
      );
    }
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      const { amount } = this.incomeForm.value;
      const userId = this.authService.getCurrentUserId();
      if (userId !== null) {
        this.budgetService.addIncome({ amount, userId }).subscribe(
          (response: any) => {
            this.successMessage = 'Income saved successfully!';
            this.errorMessage = '';
            this.getTotalIncome(); // Update total income after adding
          },
          (error: any) => {
            this.errorMessage = 'Failed to save income';
            this.successMessage = '';
          }
        );
      } else {
        this.errorMessage = 'User not authenticated';
      }
    }
  }

  addAnotherIncome() {
    this.incomeForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }
}
