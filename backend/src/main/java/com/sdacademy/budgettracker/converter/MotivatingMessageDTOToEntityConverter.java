package com.sdacademy.budgettracker.converter;

import com.sdacademy.budgettracker.dto.MotivatingMessageDTO;
import com.sdacademy.budgettracker.entity.MotivatingMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MotivatingMessageDTOToEntityConverter {

    public MotivatingMessageDTO convert(MotivatingMessage message) {
        if (message == null) {
            return null;
        }
        MotivatingMessageDTO dto = new MotivatingMessageDTO();
        dto.setId(message.getId());
        dto.setMessage(message.getMessage());
        dto.setAuthor(message.getAuthor());
        return dto;
    }
}
