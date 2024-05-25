package com.sdacademy.budgettracker.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Getter
@Setter

@Table(name = "Income")
public class Income {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Double id;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
