package com.example.banking_backend.service;

import com.example.banking_backend.dto.*;
import com.example.banking_backend.entity.User;
import com.example.banking_backend.repository.UserRepository;
import com.example.banking_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(RegisterRequest request) {

        if (repo.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));

        repo.save(user);

        return "Registration successful";
    }

    public LoginResponse login(LoginRequest request) {

        User user = repo.findByEmail(request.getEmail())
                .orElseThrow();

        if (encoder.matches(request.getPassword(), user.getPassword())) {

            String token = jwtUtil.generateToken(user.getEmail());

            return new LoginResponse(token);
        }

        throw new RuntimeException("Invalid credentials");
    }
}
