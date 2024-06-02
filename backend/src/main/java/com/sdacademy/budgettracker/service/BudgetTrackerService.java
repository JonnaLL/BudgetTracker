package com.sdacademy.budgettracker.service;

import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.entity.User;

public interface BudgetTrackerService {
    void createRecord(BudgetTrackerRecordDTO recordDTO);
    void login(String username, String password);
    void registerUser(User user);
    void enterInitialIncome(Double totalIncome, Long userId);
    void setSavingsGoal(double goalPercentage, Long userId);
    Double getTotalIncome(Long userId);
    Double calculateTotalExpenses(Long userId);
    void addExpense(BudgetTrackerRecordDTO recordDTO);
    void addAdditionalIncome(BudgetTrackerRecordDTO recordDTO);
    void checkSavingsStatus(Long userId);
    Object getOverviewOfExpenses(Long userId);
}