package com.sdacademy.budgettracker.controller;

import com.sdacademy.budgettracker.converter.UserDTOToEntityConverter;
import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.entity.User;
import com.sdacademy.budgettracker.service.BudgetTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/security")
public class SecurityController {

    @Autowired
    private BudgetTrackerService budgetTrackerService;

    @Autowired
    private UserDTOToEntityConverter userDTOToEntityConverter;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        Map<String, String> response = new HashMap<>();
        try {
            budgetTrackerService.login(username, password);
            response.put("message", "Login successful! Welcome, " + username + "!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Invalid username or password. Please try again.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody BudgetTrackerRecordDTO userDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            User user = userDTOToEntityConverter.convert(userDTO);
            budgetTrackerService.registerUser(user);
            response.put("message", "User registered successfully!");
            response.put("userId", user.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Failed to register user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

}