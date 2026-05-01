package com.example.banking_backend.controller;

import com.example.banking_backend.entity.User;
import com.example.banking_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    @Autowired
    private UserRepository userRepo;

    @GetMapping("/balance")
    public Double getBalance(Authentication auth) {

        User user = userRepo.findByEmail(
                auth.getName()
        ).orElseThrow();

        if (user.getBalance() == null) {
            user.setBalance(50000.0);
            userRepo.save(user);
        }

        return user.getBalance();
    }
}