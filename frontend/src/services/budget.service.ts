import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private transactions: any[] = [];
  private totalIncome: number = 0;
  private totalExpenses: number = 0;

  constructor() {
  
  }

  addExpense(amount: number, description: string) {
   
  }

  addIncome(amount: number, description: string) {
    
  }

  getTotalIncome(): number {
    
    return this.totalIncome;
  }

  getTotalExpenses(): number {
    
    return this.totalExpenses;
  }

  getTransactions(): any[] {
    
    return this.transactions;
  }
}
