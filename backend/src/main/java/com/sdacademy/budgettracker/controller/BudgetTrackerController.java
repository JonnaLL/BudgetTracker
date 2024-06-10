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
    public ResponseEntity<Map<String, String>> addIncome(@Valid @RequestBody Map<String, Object> recordData) {
        Map<String, String> response = new HashMap<>();
        try {
            Double amount = Double.valueOf(recordData.get("amount").toString());
            Long userId = Long.valueOf(recordData.get("userId").toString());
            budgetTrackerService.addAdditionalIncome(amount, userId);
            Double totalIncome = budgetTrackerService.getTotalIncome(userId);
            response.put("message", "Income saved successfully!");
            response.put("totalIncome", totalIncome.toString());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Failed to save income: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @GetMapping("/total-income/{userId}")
    public ResponseEntity<Map<String, String>> getTotalIncome(@PathVariable Long userId) {
        Map<String, String> response = new HashMap<>();
        try {
            Double totalIncome = budgetTrackerService.getTotalIncome(userId);
            response.put("totalIncome", totalIncome.toString());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Failed to fetch total income: " + e.getMessage());
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
            System.out.println("Received BudgetTrackerRecordDTO: " + recordDTO);
            budgetTrackerService.addExpense(recordDTO);
            response.put("message", "Expense added successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Failed to add expense: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }


    @GetMapping("/overview/{userId}")
    public ResponseEntity<Map<String, Object>> getOverview(@PathVariable Long userId) {
        try {
            Map<String, Object> overview = budgetTrackerService.getOverviewOfExpenses(userId);
            return ResponseEntity.ok(overview);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Failed to get overview: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @GetMapping("/check-savings/{userId}")
    public ResponseEntity<Map<String, Object>> checkSavings(@PathVariable Long userId) {
        try {
            Map<String, Object> savingsStatus = budgetTrackerService.checkSavingsStatus(userId);
            return ResponseEntity.ok(savingsStatus);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Failed to check savings status: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

}