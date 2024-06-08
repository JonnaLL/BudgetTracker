package com.sdacademy.budgettracker.controller;

import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.service.BudgetTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/budget")
public class BudgetTrackerController {
    @Autowired
    private BudgetTrackerService budgetTrackerService;

    @PostMapping("/record")
    public void createRecord(@Valid @RequestBody BudgetTrackerRecordDTO recordDTO) {
        budgetTrackerService.createRecord(recordDTO);
    }

    @PostMapping("/income")
    public ResponseEntity<Map<String, String>> enterInitialIncome(@Valid @RequestBody Map<String, Object> recordData) {
        Map<String, String> response = new HashMap<>();
        try {
            Double amount = Double.valueOf(recordData.get("amount").toString());
            Long userId = Long.valueOf(recordData.get("userId").toString());
            budgetTrackerService.enterInitialIncome(amount, userId);
            response.put("message", "Income saved successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Failed to save income: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/savings")
    public ResponseEntity<Map<String, String>> setSavingsGoal(@Valid @RequestBody BudgetTrackerRecordDTO recordDTO) {
        Map<String, String> response = new HashMap<>();
        try {
            budgetTrackerService.setSavingsGoal(recordDTO.getSavingsGoalPercentage(), recordDTO.getUserId());
            double totalSavings = budgetTrackerService.getTotalIncome(recordDTO.getUserId()) * recordDTO.getSavingsGoalPercentage() / 100;
            response.put("message", "Savings goal percentage saved successfully! With your savings goal, you'll be able to save " + totalSavings + " euros monthly! That's great!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Failed to save savings goal percentage: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/expense")
    public ResponseEntity<Map<String, String>> addExpense(@Valid @RequestBody BudgetTrackerRecordDTO recordDTO) {
        Map<String, String> response = new HashMap<>();
        try {
            budgetTrackerService.addExpense(recordDTO);
            response.put("message", "Expense added successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Failed to add expense: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/overview/{userId}")
    public ResponseEntity<?> getOverview(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(budgetTrackerService.getOverviewOfExpenses(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to get overview: " + e.getMessage());
        }
    }
}
