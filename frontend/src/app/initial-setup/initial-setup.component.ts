import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-setup',
  templateUrl: './initial-setup.component.html',
  styleUrls: ['./initial-setup.component.css']
})
export class InitialSetupComponent implements OnInit {
  setupForm: FormGroup;
  @ViewChild('message', { static: true }) message!: ElementRef;
  userId: number = 1; 

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.setupForm = this.fb.group({
      initialIncome: ['', Validators.required],
      savingsGoal: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.setupForm.valid) {
      const income = this.setupForm.get('initialIncome')?.value;
      const savingsGoal = this.setupForm.get('savingsGoal')?.value;

      this.userService.enterInitialIncome(income, this.userId).subscribe(response => {
        this.message.nativeElement.innerHTML = "<div id='success'>Income saved successfully!</div>";
      }, error => {
        this.message.nativeElement.innerHTML = "<div id='error'>Error saving income. Please try again later.</div>";
      });

      this.userService.setSavingsGoal(savingsGoal, this.userId).subscribe(response => {
        this.message.nativeElement.innerHTML = `<div id='success'>Savings goal percentage saved successfully! With your savings goal, you'll be able to save ${response} euros monthly! That's great!</div>`;
      }, error => {
        this.message.nativeElement.innerHTML = "<div id='error'>Error saving savings goal. Please try again later.</div>";
      });
    }
  }
}
