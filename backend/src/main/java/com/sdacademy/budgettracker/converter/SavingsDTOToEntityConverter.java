package com.sdacademy.budgettracker.converter;

import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.entity.Savings;
import org.springframework.stereotype.Component;

@Component
public class SavingsDTOToEntityConverter {

    public Savings convert(BudgetTrackerRecordDTO dto) {
        Savings savings = new Savings();
        savings.setUser(dto.getUser());
        savings.setSavingsGoalPercentage(dto.getSavingsGoalPercentage());
        return savings;
    }
}

