package com.sdacademy.budgettracker.controller;

import com.sdacademy.budgettracker.entity.MotivatingMessage;
import com.sdacademy.budgettracker.service.MotivatingMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/motivation")
public class MotivatingMessageController {

    @Autowired
    private MotivatingMessageService service;

    @GetMapping("/extra")
    public MotivatingMessage getExtraMotivation() {
        return service.getRandomMessage();
    }
}
