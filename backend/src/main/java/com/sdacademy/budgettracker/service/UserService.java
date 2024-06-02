package com.sdacademy.budgettracker.service;

import com.sdacademy.budgettracker.entity.User;
import com.sdacademy.budgettracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getCurrentUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User login(String username, String password) {
        Optional<User> user = userRepository.findByUsernameAndPassword(username, password);
        if (user.isPresent()) {
            return user.get();
        } else {
            throw new RuntimeException("Invalid username or password");
        }
    }

    public void registerUser(User user) {
        userRepository.save(user);
    }
}
