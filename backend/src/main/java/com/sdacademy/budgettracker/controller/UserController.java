package com.sdacademy.budgettracker.controller;

import com.sdacademy.budgettracker.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}/username")
    public ResponseEntity<String> getUsername(@PathVariable Long userId) {
        try {
            String username = userService.findUsernameById(userId);
            return ResponseEntity.ok(username);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to get username: " + e.getMessage());
        }
    }
}
