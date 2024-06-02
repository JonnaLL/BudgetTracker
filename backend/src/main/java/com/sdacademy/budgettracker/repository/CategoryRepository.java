package com.sdacademy.budgettracker.repository;

import com.sdacademy.budgettracker.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {

}
