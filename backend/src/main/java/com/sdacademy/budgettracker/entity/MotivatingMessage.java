package com.sdacademy.budgettracker.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity

@Table(name = "motivating_message")
public class MotivatingMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long message_id;
    private String message;
    private String author;
}
