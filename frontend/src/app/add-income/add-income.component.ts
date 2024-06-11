import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {
  incomeForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  totalIncome: number = 0;

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private authService: AuthService,
    private location: Location
  ) {
    this.incomeForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.getTotalIncome();
  }

  getTotalIncome() {
    const userId = this.authService.getCurrentUserId();
    if (userId !== null) {
      this.budgetService.getTotalIncome(userId).subscribe(
        (total: any) => {
          this.totalIncome = total.totalIncome;
          console.log(`Total income: ${this.totalIncome}`);
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
            this.getTotalIncome();
          },
          (error: any) => {
            this.errorMessage = 'Failed to save income';
            this.successMessage = '';
          }
        );
      } else {
        this.errorMessage = 'User not authenticated';
      }
    } else {
      this.markFormGroupTouched(this.incomeForm);
      this.errorMessage = 'Please enter a valid amount.';
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  addAnotherIncome() {
    this.incomeForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }

  goback() {
    this.location.back();
  }
}