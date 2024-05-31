package com.sdacademy.budgettracker.controller;

import com.sdacademy.budgettracker.entity.Category;
import com.sdacademy.budgettracker.repository.CategoryRepository;
import com.sdacademy.budgettracker.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @GetMapping
    public List<Category> getAllCategories() {

        return service.getAllCategories();
    }

    @PostMapping
    public ResponseEntity<String> addCategory(@Valid @RequestBody Category category, BindingResult result) {
        try {
            service.addCategory(category);
            return ResponseEntity.ok("Category added successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add category: " + e.getMessage());
        }
    }
}
