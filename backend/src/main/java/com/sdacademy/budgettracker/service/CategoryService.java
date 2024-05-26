package com.sdacademy.budgettracker.service;

import com.sdacademy.budgettracker.entity.Category;
import com.sdacademy.budgettracker.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();

    }
    public Category addCategory(Category category){
        return categoryRepository.save(category);
    }

}
