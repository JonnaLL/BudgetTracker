import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InitialSetupComponent } from './initial-setup/initial-setup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { OverviewComponent } from './overview/overview.component';
import { SavingsComponent } from './savings/savings.component';
import { MotivationModalComponent } from './motivation-modal/motivation-modal.component';

import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { BudgetService } from '../services/budget.service';
import { AuthInterceptor } from './auth.interceptor'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    InitialSetupComponent,
    AddExpenseComponent,
    WelcomeComponent,
    HomeComponent,
    AddIncomeComponent,
    OverviewComponent,
    SavingsComponent,
    MotivationModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [
    AuthService,
    UserService,
    BudgetService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
