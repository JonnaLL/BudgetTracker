package com.sdacademy.budgettracker.controller;

import com.sdacademy.budgettracker.converter.UserDTOToEntityConverter;
import com.sdacademy.budgettracker.dto.BudgetTrackerRecordDTO;
import com.sdacademy.budgettracker.entity.User;
import com.sdacademy.budgettracker.service.BudgetTrackerService;
import com.sdacademy.budgettracker.util.JwtTokenUtil;
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
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDTOToEntityConverter userDTOToEntityConverter; // Add this line

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");
        Map<String, Object> response = new HashMap<>();
        try {
            User user = budgetTrackerService.login(username, password);
            String token = jwtTokenUtil.generateToken(username);
            response.put("message", "Login successful! Welcome, " + username + "!");
            response.put("token", token);
            response.put("userId", user.getId());
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
            String token = jwtTokenUtil.generateToken(user.getUsername());
            response.put("message", "User registered successfully!");
            response.put("userId", user.getId());
            response.put("token", token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("message", "Failed to register user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> tokenData) {
        String refreshToken = tokenData.get("refreshToken");
        try {
            if (jwtTokenUtil.isTokenExpired(refreshToken)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token has expired.");
            }
            String username = jwtTokenUtil.getUsernameFromToken(refreshToken);
            String newToken = jwtTokenUtil.generateToken(username);
            Map<String, Object> response = new HashMap<>();
            response.put("token", newToken);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token.");
        }
    }
}
