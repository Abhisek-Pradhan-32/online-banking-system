package com.example.banking_backend.repository;

import com.example.banking_backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findBySenderEmailOrReceiverEmail(
            String sender,
            String receiver
    );
}






