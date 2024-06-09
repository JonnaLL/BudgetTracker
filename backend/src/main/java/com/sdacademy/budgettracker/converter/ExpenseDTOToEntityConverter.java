package com.sdacademy.budgettracker.converter;

import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.entity.Category;
import com.sdacademy.budgettracker.entity.Expense;
import com.sdacademy.budgettracker.repository.CategoryRepository;
import com.sdacademy.budgettracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ExpenseDTOToEntityConverter {

    @Autowired
    private UserService userService;

    @Autowired
    private CategoryRepository categoryRepository;

    public Expense convert(BudgetTrackerRecordDTO dto) {
        Expense expense = new Expense();
        expense.setAmount(dto.getAmount());
        expense.setUser(userService.getCurrentUser(dto.getUserId()));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        expense.setCategory(category);

        return expense;
    }
}
