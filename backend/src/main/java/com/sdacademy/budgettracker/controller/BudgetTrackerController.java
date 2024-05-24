package com.sdacademy.budgettracker.controller;

import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.service.BudgetTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

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
    public ResponseEntity<String> enterInitialIncome(@RequestParam Double totalIncome, @RequestParam Double userId) {
        try {
            budgetTrackerService.enterInitialIncome(totalIncome, userId);
            return ResponseEntity.ok("Income saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to save income: " + e.getMessage());
        }
    }

    @PostMapping("/savings")
    public ResponseEntity<String> setSavingsGoal(@RequestParam Double goalPercentage, @RequestParam Double userId) {
        try {
            budgetTrackerService.setSavingsGoal(goalPercentage, userId);
            return ResponseEntity.ok("Savings goal percentage saved successfully! With your savings goal, you'll be able to save " + (budgetTrackerService.getTotalIncome(userId) * goalPercentage / 100) + " euros monthly! That's great!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to save savings goal percentage: " + e.getMessage());
        }
    }

    @PostMapping("/expense")
    public ResponseEntity<String> addExpense(@Valid @RequestBody BudgetTrackerRecordDTO recordDTO) {
        try {
            budgetTrackerService.addExpense(recordDTO);
            return ResponseEntity.ok("Expense added successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add expense: " + e.getMessage());
        }
    }
    @GetMapping("/overview/{userId}")
    public ResponseEntity<?> getOverview(@PathVariable Double userId) {
        try {
            return ResponseEntity.ok(budgetTrackerService.getOverviewOfExpenses(userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to get overview: " + e.getMessage());
        }
    }
}

