package com.sdacademy.budgettracker.dto;

import com.sdacademy.budgettracker.entity.User;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@ToString
public class BudgetTrackerRecordDTO {

    @NotBlank(message = "Category is mandatory")
    private String category;

    @Positive(message = "Amount must be positive")
    private double amount;

    @NotBlank(message = "Date is mandatory")
    private String date;

    private User user;
    private String username;
    private String email;
    private String password;
    private double savingsGoalPercentage;
    private Long userId;

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public double getSavingsGoalPercentage() {
        return savingsGoalPercentage;
    }

    public void setSavingsGoalPercentage(double savingsGoalPercentage) {
        this.savingsGoalPercentage = savingsGoalPercentage;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}