package com.example.banking_backend.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class OtpService {

    private Map<String, String> otpMap = new HashMap<>();

    public void saveOtp(String email, String otp) {
        otpMap.put(email, otp);
    }

    public boolean verifyOtp(String email, String otp) {
        return otp.equals(otpMap.get(email));
    }

    public void removeOtp(String email) {
        otpMap.remove(email);
    }
}
