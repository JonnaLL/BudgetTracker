package com.sdacademy.budgettracker.repository;

import com.sdacademy.budgettracker.entity.MotivatingMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MotivatingMessageRepository extends JpaRepository<MotivatingMessage, Long> {

    @Query(value = "SELECT * FROM motivating_message ORDER BY RAND() LIMIT 1",nativeQuery = true)
    MotivatingMessage findRandomMessage();
}

