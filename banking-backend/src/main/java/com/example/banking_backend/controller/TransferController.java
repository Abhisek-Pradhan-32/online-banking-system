package com.example.banking_backend.controller;

import com.example.banking_backend.dto.TransferRequest;
import com.example.banking_backend.entity.Transaction;
import com.example.banking_backend.repository.TransactionRepository;
import com.example.banking_backend.service.TransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transfer")
public class TransferController {

    @Autowired
    private TransferService service;

    @Autowired
    private TransactionRepository txRepo;

    @PostMapping
    public String transfer(
            Authentication auth,
            @RequestBody TransferRequest request) {

        return service.transfer(auth.getName(), request);
    }

    @GetMapping("/history")
    public List<Transaction> history(Authentication auth) {

        return txRepo.findBySenderEmailOrReceiverEmail(
                auth.getName(),
                auth.getName()
        );
    }
}