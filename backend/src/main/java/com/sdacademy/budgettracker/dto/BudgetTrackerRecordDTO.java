package com.sdacademy.budgettracker.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BudgetTrackerRecordDTO {
    private String category;
    private double amount;
    private String date;
    private String description;
}
