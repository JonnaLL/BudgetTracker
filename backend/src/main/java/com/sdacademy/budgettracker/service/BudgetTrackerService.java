package com.sdacademy.budgettracker.service;

import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.entity.User;

public interface BudgetTrackerService {
    void createRecord(BudgetTrackerRecordDTO recordDTO);
    void login(String username, String password);
    void registerUser(User user);
    void enterInitialIncome(Double totalIncome, Double userId);
    void setSavingsGoal(double goalPercentage, Double userId);
    Double getTotalIncome(Double userId);
    Double calculateTotalExpenses(Double userId);
    void addExpense(BudgetTrackerRecordDTO recordDTO);
    void addAdditionalIncome(BudgetTrackerRecordDTO recordDTO);
    void checkSavingsStatus(Double userId);
    Object getOverviewOfExpenses(Double userId);
}