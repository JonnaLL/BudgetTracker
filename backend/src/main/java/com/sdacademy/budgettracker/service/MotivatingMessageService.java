package com.sdacademy.budgettracker.service;

import com.sdacademy.budgettracker.converter.MotivatingMessageDTOToEntityConverter;
import com.sdacademy.budgettracker.dto.MotivatingMessageDTO;
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

    @Autowired
    private MotivatingMessageDTOToEntityConverter converter;

    public MotivatingMessageDTO getRandomMessage() {
     MotivatingMessage message = repository.findRandomMessage();
     return converter.convert(message);
    }
}
