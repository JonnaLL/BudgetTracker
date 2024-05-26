package com.sdacademy.budgettracker.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Getter
@Setter

@Table(name = "savings_goal_percentage")
public class Savings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Double id;

    @Column(name = "savings_goal_percentage", nullable = false)
    private Double savingsGoalPercentage;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
