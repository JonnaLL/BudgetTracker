package com.sdacademy.budgettracker.entity;

import com.sdacademy.budgettracker.entity.User;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Expenses")
public class Expense {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category")
    private String category;

    @Column(name = "amount")
    private double amount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}