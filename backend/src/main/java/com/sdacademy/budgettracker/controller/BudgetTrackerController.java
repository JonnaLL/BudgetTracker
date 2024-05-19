package com.sdacademy.budgettracker.controller;

import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.service.BudgetTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/login")
    public void login(@RequestParam String username, @RequestParam String password) {
        budgetTrackerService.login(username, password);
    }

    @PostMapping("/register")
    public void registerUser(@RequestParam String username, @RequestParam String email, @RequestParam String password) {
        budgetTrackerService.registerUser(username, email, password);
    }

    @PostMapping("/income")
    public void enterInitialIncome(@RequestParam double totalIncome, @RequestParam Long userId) {
        budgetTrackerService.enterInitialIncome(totalIncome, userId);
    }

    @PostMapping("/savings")
    public void setSavingsGoal(@RequestParam double goalPercentage, @RequestParam Long userId) {
        budgetTrackerService.setSavingsGoal(goalPercentage, userId);
    }
}