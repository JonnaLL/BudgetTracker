package com.sdacademy.budgettracker.service;

import com.sdacademy.budgettracker.converter.ExpenseDTOToEntityConverter;
import com.sdacademy.budgettracker.converter.IncomeDTOToEntityConverter;
import com.sdacademy.budgettracker.converter.SavingsDTOToEntityConverter;
import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.entity.Expense;
import com.sdacademy.budgettracker.entity.Income;
import com.sdacademy.budgettracker.entity.Savings;
import com.sdacademy.budgettracker.entity.User;
import com.sdacademy.budgettracker.repository.ExpenseRepository;
import com.sdacademy.budgettracker.repository.IncomeRepository;
import com.sdacademy.budgettracker.repository.SavingsRepository;
import com.sdacademy.budgettracker.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BudgetTrackerServiceImpl implements BudgetTrackerService {
    @Autowired
    private ExpenseDTOToEntityConverter expenseConverter;

    @Autowired
    private IncomeDTOToEntityConverter incomeConverter;

    @Autowired
    private SavingsDTOToEntityConverter savingsConverter;

    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private IncomeRepository incomeRepository;

    @Autowired
    private SavingsRepository savingsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Override
    @Transactional
    public void createRecord(BudgetTrackerRecordDTO recordDTO) {
        if (recordDTO.getCategory() != null) {
            Expense expense = expenseConverter.convert(recordDTO);
            expenseRepository.save(expense);
        } else if (recordDTO.getSavingsGoalPercentage() != 0) {
            Savings savings = savingsConverter.convert(recordDTO);
            savingsRepository.save(savings);
        } else {
            Income income = incomeConverter.convert(recordDTO);
            incomeRepository.save(income);
        }
    }

    @Override
    public void login(String username, String password) {
        userService.login(username, password);
    }

    @Override
    public void registerUser(User user) {
        userRepository.save(user);
    }

    public void enterInitialIncome(Double totalIncome, Double userId) {
        Income income = new Income();
        income.setAmount(totalIncome);
        income.setUser(userService.getCurrentUser(userId));
        incomeRepository.save(income);
    }

    @Override
    public void setSavingsGoal(double goalPercentage, Double userId) {
        Savings savings = new Savings();
        savings.setSavingsGoalPercentage(goalPercentage);
        savings.setUser(userService.getCurrentUser(userId));
        savingsRepository.save(savings);
    }

    @Override
    public Double getTotalIncome(Double userId) {
        return incomeRepository.findTotalIncomeByUserId(userId).orElse(0.0);
    }

    @Override
    public Double calculateTotalExpenses(Double userId) {
        return expenseRepository.findTotalExpensesByUserId(userId).orElse(0.0);
    }

    @Override
    public void addExpense(BudgetTrackerRecordDTO recordDTO) {
        Expense expense = expenseConverter.convert(recordDTO);
        expenseRepository.save(expense);
    }

    @Override
    public void addAdditionalIncome(BudgetTrackerRecordDTO recordDTO) {
        Income income = incomeConverter.convert(recordDTO);
        incomeRepository.save(income);
    }

    @Override
    public void checkSavingsStatus(Double userId) {
        double totalIncome = getTotalIncome(userId);
        double totalExpenses = calculateTotalExpenses(userId);
        double savingsPercentage = 100 - (totalExpenses * 100 / totalIncome);
        double savingsAmount = totalIncome - totalExpenses;

        // Display savings status
        System.out.println("At the moment your savings percentage is " + savingsPercentage
                + "% and you have saved " + savingsAmount + " euros");
    }

    @Override
    public Object getOverviewOfExpenses(Double userId) {
        List<Expense> expenses = expenseRepository.findAllByUserId(userId);
        return expenses.stream()
                .map(expense -> "Category: " + expense.getCategory() + ", Amount: " + expense.getAmount())
                .collect(Collectors.toList());
    }
}
