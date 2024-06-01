package com.sdacademy.budgettracker.repository;

import com.sdacademy.budgettracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Double> {
    Optional<User> findByUsernameAndPassword(String username, String password);
}