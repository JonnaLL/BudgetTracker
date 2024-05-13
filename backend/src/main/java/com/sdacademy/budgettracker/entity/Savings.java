package com.sdacademy.budgettracker.entity;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "Savings")
public class Savings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "savings_goal_percentage")
    private double savingsGoalPercentage;
}
