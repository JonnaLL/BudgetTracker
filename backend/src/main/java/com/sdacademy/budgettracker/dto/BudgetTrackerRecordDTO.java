package com.sdacademy.budgettracker.dto;

import com.sdacademy.budgettracker.entity.User;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@ToString
@Getter
@Setter
@Data
public class BudgetTrackerRecordDTO {

    @NotBlank(message = "Category is mandatory")
    private String category;

    @Positive(message = "Amount must be positive")
    private Double amount;

    @NotBlank(message = "Date is mandatory")
    private String date;

    private User user;
    private String username;
    private String email;
    private String password;
    private Double savingsGoalPercentage;
    private Long userId;

}