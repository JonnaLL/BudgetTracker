package com.sdacademy.budgettracker.repository;

import com.sdacademy.budgettracker.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IncomeRepository extends JpaRepository<Income, Double> {
    @Query("SELECT SUM(i.amount) FROM Income i WHERE i.user.id = :userId")
    Optional<Double> findTotalIncomeByUserId(@Param("userId") Long userId);
}
