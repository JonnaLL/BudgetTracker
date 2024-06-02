import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetService } from '../../services/budget.service';

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
  userId: number | null = null;
  incomeSubmitted: boolean = false;
  savingsSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.incomeForm = this.fb.group({
      initialIncome: [null, [Validators.required, Validators.min(0)]]
    });

    this.savingsForm = this.fb.group({
      savingsGoal: [null, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId'];
    });
  }

  onSubmitIncome(): void {
    this.incomeErrorMessage = '';
    this.incomeSuccessMessage = '';
    if (this.incomeForm.valid && this.userId !== null) {
      const initialIncome = this.incomeForm.controls['initialIncome'].value;
      this.budgetService.enterInitialIncome(initialIncome, this.userId).subscribe({
        next: response => {
          console.log('Response from server:', response);
          this.incomeSuccessMessage = response.message;
          this.incomeSubmitted = true;
          this.incomeForm.controls['initialIncome'].disable();
        },
        error: error => {
          console.log('Error from server:', error);
          this.incomeErrorMessage = error.error.message || 'Failed to save income';
        }
      });
    } else {
      this.incomeErrorMessage = 'Please fill out the initial income correctly.';
    }
  }

  onSubmitSavingsGoal(): void {
    this.savingsErrorMessage = '';
    this.savingsSuccessMessage = '';
    if (this.savingsForm.valid && this.userId !== null) {
      const savingsGoal = this.savingsForm.controls['savingsGoal'].value;
      this.budgetService.setSavingsGoal(savingsGoal, this.userId).subscribe({
        next: response => {
          console.log('Response from server:', response);
          this.savingsSuccessMessage = response.message;
          this.savingsSubmitted = true;
        },
        error: error => {
          console.log('Error from server:', error);
          this.savingsErrorMessage = error.error.message || 'Failed to set savings goal';
        }
      });
    } else {
      this.savingsErrorMessage = 'Please fill out the savings goal percentage correctly.';
    }
  }

  onStart(): void {
    this.router.navigate(['/dashboard']);
  }
}
