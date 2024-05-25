package com.sdacademy.budgettracker.converter;

import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.entity.Income;
import org.springframework.stereotype.Component;

@Component
public class IncomeDTOToEntityConverter {

    public Income convert(BudgetTrackerRecordDTO dto) {
        Income income = new Income();
        income.setAmount(dto.getAmount());
        return income;
    }
}


