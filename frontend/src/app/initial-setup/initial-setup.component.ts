import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../../services/budget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-setup',
  templateUrl: './initial-setup.component.html',
  styleUrls: ['./initial-setup.component.css']
})
export class InitialSetupComponent implements OnInit {
  incomeForm: FormGroup;
  savingsForm: FormGroup;
  incomeErrorMessage: string = '';
  incomeSuccessMessage: string = '';
  savingsErrorMessage: string = '';
  savingsSuccessMessage: string = '';
  incomeSubmitted: boolean = false;
  savingsSubmitted: boolean = false;
  userId: number = 0;

  constructor(private fb: FormBuilder, private budgetService: BudgetService, private router: Router) {
    this.incomeForm = this.fb.group({
      amount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
    this.savingsForm = this.fb.group({
      savingsGoalPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = Number(storedUserId);
      console.log('User ID:', this.userId);
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void { }

  onSubmitIncome(): void {
    if (this.incomeForm.valid) {
      const amount = this.incomeForm.value.amount;
      this.budgetService.enterInitialIncome(amount, this.userId).subscribe({
        next: (response) => {
          this.incomeSuccessMessage = 'Income added successfully!';
          this.incomeErrorMessage = '';
          this.incomeSubmitted = true;
          this.checkCompletion();
        },
        error: (error) => {
          console.error('Error adding income:', error);
          this.incomeErrorMessage = 'Error adding income: ' + (error.error?.message || 'Unknown error');
          this.incomeSuccessMessage = '';
        }
      });
    }
  }

  onSubmitSavingsGoal(): void {
    if (this.savingsForm.valid) {
      const goalPercentage = this.savingsForm.value.savingsGoalPercentage;
      this.budgetService.setSavingsGoal(goalPercentage, this.userId).subscribe({
        next: (response) => {
          this.savingsSuccessMessage = response.message;
          this.savingsErrorMessage = '';
          this.savingsSubmitted = true;
          this.checkCompletion();
        },
        error: (error) => {
          console.error('Error setting savings goal:', error);
          this.savingsErrorMessage = 'Error setting savings goal: ' + (error.error.message || 'Unknown error');
          this.savingsSuccessMessage = '';
        },
      });
    }
  }

  checkCompletion(): void {
    console.log('Income submitted:', this.incomeSubmitted, 'Savings submitted:', this.savingsSubmitted);
    if (this.incomeSubmitted && this.savingsSubmitted) {
      console.log('Savings goal set. Waiting for user to continue...');
    }
  }

  onStart(): void {
    console.log('Navigating to dashboard');
    this.router.navigate(['/dashboard'], { queryParams: { userId: this.userId } });
  }
}
