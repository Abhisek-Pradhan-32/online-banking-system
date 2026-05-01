package com.example.banking_backend.dto;

import lombok.Data;

@Data
public class PaymentSuccessRequest {

    private String paymentId;
    private Double amount;
}

