package com.sdacademy.budgettracker.converter;

import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserDTOToEntityConverter {

    public User convert(BudgetTrackerRecordDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        return user;
    }
}

