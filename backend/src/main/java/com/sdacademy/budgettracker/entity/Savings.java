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

    @Column(name = "savings_goal_percentage", nullable = false)
    private double savingsGoalPercentage;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getSavingsGoalPercentage() {
        return savingsGoalPercentage;
    }

    public void setSavingsGoalPercentage(double savingsGoalPercentage) {
        this.savingsGoalPercentage = savingsGoalPercentage;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
