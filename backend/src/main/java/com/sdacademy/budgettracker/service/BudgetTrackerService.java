package com.sdacademy.budgettracker.service;

import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;

public interface BudgetTrackerService {
    void createRecord(BudgetTrackerRecordDTO recordDTO);
    void login(String username, String password);
    void registerUser(String username, String email, String password);
    void enterInitialIncome(double totalIncome, Long userId);
    void setSavingsGoal(double goalPercentage, Long userId);
    double getTotalIncome(Long userId);
    double calculateTotalExpenses(Long userId);
    void addExpense(BudgetTrackerRecordDTO recordDTO);
    void addAdditionalIncome(BudgetTrackerRecordDTO recordDTO);
    void checkSavingsStatus(Long userId);
    void getOverviewOfExpenses(Long userId);
}