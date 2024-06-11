import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AddExpenseComponent } from './add-expense.component';
import { BudgetService, Category } from '../../services/budget.service';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

describe('AddExpenseComponent', () => {
  let component: AddExpenseComponent;
  let fixture: ComponentFixture<AddExpenseComponent>;
  let budgetServiceMock: any;
  let authServiceMock: any;
  let locationMock: any;

  beforeEach(async () => {
    budgetServiceMock = jasmine.createSpyObj('BudgetService', ['getAllCategories', 'addExpense']);
    authServiceMock = jasmine.createSpyObj('AuthService', ['getCurrentUserId']);
    locationMock = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [AddExpenseComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: BudgetService, useValue: budgetServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Location, useValue: locationMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseComponent);
    component = fixture.componentInstance;
    budgetServiceMock.getAllCategories.and.returnValue(of([])); // Ensure it returns an observable
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    const categories: Category[] = [{ id: 1, name: 'Food', expenses: [] }];
    budgetServiceMock.getAllCategories.and.returnValue(of(categories));
    component.ngOnInit();
    expect(component.categories).toEqual(categories);
    expect(budgetServiceMock.getAllCategories).toHaveBeenCalled();
  });

  it('should handle error when loading categories', () => {
    budgetServiceMock.getAllCategories.and.returnValue(throwError('Failed to load categories'));
    component.ngOnInit();
    expect(component.errorMessage).toBe('Failed to load categories');
  });

  it('should submit valid expense', () => {
    const userId = 1;
    authServiceMock.getCurrentUserId.and.returnValue(userId);
    budgetServiceMock.addExpense.and.returnValue(of({ message: 'Expense added successfully!' }));

    component.expenseForm.setValue({ amount: 50, category: '1' });
    component.onSubmit();

    expect(budgetServiceMock.addExpense).toHaveBeenCalledWith(50, '1', userId);
    expect(component.successMessage).toBe('Expense added successfully!');
  });

  it('should handle error when adding expense', () => {
    const userId = 1;
    authServiceMock.getCurrentUserId.and.returnValue(userId);
    budgetServiceMock.addExpense.and.returnValue(throwError('Failed to add expense'));

    component.expenseForm.setValue({ amount: 50, category: '1' });
    component.onSubmit();

    expect(budgetServiceMock.addExpense).toHaveBeenCalledWith(50, '1', userId);
    expect(component.errorMessage).toBe('Failed to add expense');
  });

  it('should not submit invalid expense', () => {
    component.expenseForm.setValue({ amount: '', category: '' });
    component.onSubmit();
    expect(budgetServiceMock.addExpense).not.toHaveBeenCalled();
  });

  it('should navigate back', () => {
    component.goBack();
    expect(locationMock.back).toHaveBeenCalled();
  });
});
