package com.example.banking_backend.controller;

import com.example.banking_backend.dto.*;
import com.example.banking_backend.entity.User;
import com.example.banking_backend.repository.UserRepository;
import com.example.banking_backend.service.AuthService;
import com.example.banking_backend.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private OtpService otpService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return service.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return service.login(request);
    }

    @PostMapping("/send-otp")
    public String sendOtp(@RequestParam String email) {

        String otp =
                String.valueOf(
                        (int)(Math.random()*900000)+100000
                );

        otpService.saveOtp(email, otp);

        System.out.println("OTP = " + otp);

        return "OTP Sent";
    }

    @PostMapping("/reset-password")
    public String resetPassword(
            @RequestParam String email,
            @RequestParam String otp,
            @RequestParam String newPassword
    ) {

        if(!otpService.verifyOtp(email, otp)) {
            return "Invalid OTP";
        }

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        user.setPassword(
                passwordEncoder.encode(newPassword)
        );

        userRepository.save(user);

        otpService.removeOtp(email);

        return "Password Reset Successful";
    }
}
