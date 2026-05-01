package com.example.banking_backend.service;

import com.example.banking_backend.dto.TransferRequest;
import com.example.banking_backend.entity.Transaction;
import com.example.banking_backend.entity.User;
import com.example.banking_backend.repository.TransactionRepository;
import com.example.banking_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TransferService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private TransactionRepository txRepo;

    public String transfer(String senderEmail,
                           TransferRequest request) {

        User sender = userRepo.findByEmail(senderEmail)
                .orElse(null);

        User receiver = userRepo.findByEmail(
                request.getReceiverEmail()
        ).orElse(null);

        if (sender == null) {
            return "Sender not found";
        }

        if (receiver == null) {
            return "Receiver not registered";
        }

        if (request.getAmount() == null ||
                request.getAmount() <= 0) {
            return "Invalid amount";
        }

        if (sender.getBalance() < request.getAmount()) {
            return "Insufficient Balance";
        }

        sender.setBalance(
                sender.getBalance() - request.getAmount()
        );

        receiver.setBalance(
                receiver.getBalance() + request.getAmount()
        );

        userRepo.save(sender);
        userRepo.save(receiver);

        Transaction tx = new Transaction();
        tx.setSenderEmail(senderEmail);
        tx.setReceiverEmail(request.getReceiverEmail());
        tx.setAmount(request.getAmount());
        tx.setCreatedAt(LocalDateTime.now());

        txRepo.save(tx);

        return "Transfer Successful";
    }
}





