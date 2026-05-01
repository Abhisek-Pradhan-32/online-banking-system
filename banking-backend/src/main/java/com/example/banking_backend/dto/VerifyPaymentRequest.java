package com.example.banking_backend.dto;

import lombok.Data;

@Data
public class VerifyPaymentRequest {

        private String paymentId;
        private String orderId;
        private String signature;
        private Double amount;
    }

