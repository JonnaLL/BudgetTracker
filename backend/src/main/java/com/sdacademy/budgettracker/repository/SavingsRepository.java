package com.sdacademy.budgettracker.repository;

import com.sdacademy.budgettracker.entity.Savings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SavingsRepository extends JpaRepository<Savings, Long> {

    @Query("SELECT s.savingsGoalPercentage FROM Savings s WHERE s.user.id = :userId ORDER BY s.id DESC")
    Optional<Double> findLatestSavingsGoalByUserId(@Param("userId") Long userId);
}
