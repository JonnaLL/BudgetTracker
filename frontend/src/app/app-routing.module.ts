import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { InitialSetupComponent } from './initial-setup/initial-setup.component';
import { HomeComponent } from './home/home.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { OverviewComponent } from './overview/overview.component';
import { SavingsComponent } from './savings/savings.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'welcome', component: WelcomeComponent, canActivate: [AuthGuard] },
  { path: 'initial-setup', component: InitialSetupComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'add-income', component: AddIncomeComponent, canActivate: [AuthGuard] },
  { path: 'add-expense', component: AddExpenseComponent, canActivate: [AuthGuard] },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'savings', component: SavingsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
