import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { SavingsComponent } from './savings/savings.component';
import { BudgetService } from './services/budget.service';

@NgModule({
  declarations: [
    AppComponent,
    AddIncomeComponent,
    AddExpenseComponent,
    DashboardComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, children: [
        { path: 'add-income', component: AddIncomeComponent },
        { path: 'add-expense', component: AddExpenseComponent },
        { path: 'overview', component: OverviewComponent },
        { path: 'savings', component: SavingsComponent }
      ]}
    ])
  ],
  providers: [BudgetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
