package com.sdacademy.budgettracker.service;

import com.sdacademy.budgettracker.entity.Category;
import com.sdacademy.budgettracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();

    }

    public void addCategory(Category category) throws Exception {
        try {
            categoryRepository.save(category);

        } catch (DataIntegrityViolationException e) {
            throw new Exception("Failed to add category: " + e.getMessage());
        }
    }
}
