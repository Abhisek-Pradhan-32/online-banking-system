package com.example.banking_backend.dto;

import lombok.Data;

@Data
public class TransferRequest {
    private String receiverEmail;
    private Double amount;
}