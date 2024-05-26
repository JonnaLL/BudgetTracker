package com.sdacademy.budgettracker.controller;

import com.sdacademy.budgettracker.entity.Category;
import com.sdacademy.budgettracker.repository.CategoryRepository;
import com.sdacademy.budgettracker.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @GetMapping
    public List<Category>getAllCategories() {
        return service.getAllCategories();
    }

    @PostMapping
    public Category addCategory(@RequestBody Category category) {
        return service.addCategory(category);
    }
}
