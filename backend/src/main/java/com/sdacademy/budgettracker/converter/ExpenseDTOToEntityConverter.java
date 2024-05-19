package com.sdacademy.budgettracker.converter;

import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.entity.Expense;
import com.sdacademy.budgettracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ExpenseDTOToEntityConverter {

    @Autowired
    private UserService userService;

    public Expense convert(BudgetTrackerRecordDTO dto) {
        Expense expense = new Expense();
        expense.setCategory(dto.getCategory());
        expense.setAmount(dto.getAmount());
        expense.setUser(userService.getCurrentUser(dto.getUserId()));
        return expense;
    }
}