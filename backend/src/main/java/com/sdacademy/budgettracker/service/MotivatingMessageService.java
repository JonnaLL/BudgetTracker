package com.sdacademy.budgettracker.service;

import com.sdacademy.budgettracker.entity.MotivatingMessage;
import com.sdacademy.budgettracker.repository.MotivatingMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
public class MotivatingMessageService {

    @Autowired
    private MotivatingMessageRepository repository;

    public MotivatingMessage getRandomMessage() {
        List<MotivatingMessage> messages = repository.findAll();
        if (messages.isEmpty()) {
            return null;
        }
        Random random = new Random();
        return messages.get(random.nextInt(messages.size()));
    }
}
