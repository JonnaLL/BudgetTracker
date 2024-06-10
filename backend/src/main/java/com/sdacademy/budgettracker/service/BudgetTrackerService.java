package com.sdacademy.budgettracker.service;

import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.entity.User;

import java.util.Map;

public interface BudgetTrackerService {
    void createRecord(BudgetTrackerRecordDTO recordDTO);
    User login(String username, String password);
    void registerUser(User user);
    void enterInitialIncome(Double totalIncome, Long userId);
    void setSavingsGoal(double goalPercentage, Long userId);
    Double getTotalIncome(Long userId);
    Double calculateTotalExpenses(Long userId);
    void addExpense(BudgetTrackerRecordDTO recordDTO);
    void addAdditionalIncome(Double amount, Long userId);
    Map<String, Object> checkSavingsStatus(Long userId);
    Map<String, Object> getOverviewOfExpenses(Long userId);
}
