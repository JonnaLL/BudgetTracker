package com.sdacademy.budgettracker.entity;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "Income")
public class Income {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "amount")
    private double amount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}