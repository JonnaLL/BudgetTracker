package com.sdacademy.budgettracker.repository;

import com.sdacademy.budgettracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Double> {
    @Query("SELECT SUM(e.amount) FROM Expense e WHERE e.user.id = :userId")
    Optional<Double> findTotalExpensesByUserId(@Param("userId") Long userId);

    List<Expense> findAllByUserId(Long userId);
}