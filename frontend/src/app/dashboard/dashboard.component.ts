import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userDataForm: FormGroup;
  @ViewChild('message', { static: true }) message!: ElementRef;
  userId: number = 1; 

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.userDataForm = this.fb.group({
      initialIncome: ['', Validators.required],
      savingsGoal: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData() {
    this.userService.getUserData(this.userId).subscribe(userData => {
      this.userDataForm.patchValue({
        initialIncome: userData.initialIncome,
        savingsGoal: userData.savingsGoal
      });
    }, error => {
      console.error('Error fetching user data:', error);
    });
  }

  onSubmit() {
    if (this.userDataForm.valid) {
      const income = this.userDataForm.get('initialIncome')?.value;
      const savingsGoal = this.userDataForm.get('savingsGoal')?.value;

      this.userService.enterInitialIncome(income!, this.userId).subscribe(response => {
        this.message.nativeElement.innerHTML = "<div id='success'>Income saved successfully!</div>";
      }, error => {
        this.message.nativeElement.innerHTML = "<div id='error'>Error saving income. Please try again later.</div>";
      });

      this.userService.setSavingsGoal(savingsGoal!, this.userId).subscribe(response => {
        this.message.nativeElement.innerHTML = `<div id='success'>Savings goal percentage saved successfully! With your savings goal, you'll be able to save ${response} euros monthly! That's great!</div>`;
      }, error => {
        this.message.nativeElement.innerHTML = "<div id='error'>Error saving savings goal. Please try again later.</div>";
      });
    }
  }
}
