package com.example.banking_backend.controller;

import com.example.banking_backend.dto.PaymentSuccessRequest;
import com.example.banking_backend.dto.VerifyPaymentRequest;
import com.example.banking_backend.entity.User;
import com.example.banking_backend.repository.UserRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private UserRepository userRepository;

    @Value("${razorpay.key}")
    private String key;

    @Value("${razorpay.secret}")
    private String secret;

    @PostMapping("/create-order")
    public String createOrder(
            @RequestParam int amount
    ) throws Exception {

        RazorpayClient client =
                new RazorpayClient(key, secret);

        JSONObject options =
                new JSONObject();

        options.put("amount", amount * 100);
        options.put("currency", "INR");

        Order order =
                client.orders.create(options);

        return order.toString();
    }

    @PostMapping("/success")
    public String paymentSuccess(
            @RequestBody PaymentSuccessRequest request,
            Authentication auth
    ) {
        String email = auth.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        user.setBalance(
                user.getBalance() + request.getAmount()
        );

        userRepository.save(user);

        return "Balance Updated";
    }

    @PostMapping("/verify")
    public String verifyPayment(
            @RequestBody VerifyPaymentRequest request,
            Authentication auth
    ) throws Exception {

        String generatedSignature =
                HmacSHA256(
                        request.getOrderId() + "|" + request.getPaymentId(),
                        secret
                );

        if (!generatedSignature.equals(request.getSignature())) {
            return "Invalid Payment";
        }

        String email = auth.getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow();

        if(user.getBalance() == null){
            user.setBalance(0.0);
        }

        user.setBalance(
                user.getBalance() + request.getAmount()
        );

        userRepository.save(user);

        return "Payment Verified & Balance Updated";
    }

    private String HmacSHA256(String data, String secret)
            throws Exception {

        javax.crypto.Mac sha256Hmac =
                javax.crypto.Mac.getInstance("HmacSHA256");

        javax.crypto.spec.SecretKeySpec secretKey =
                new javax.crypto.spec.SecretKeySpec(
                        secret.getBytes(),
                        "HmacSHA256"
                );

        sha256Hmac.init(secretKey);

        byte[] hash =
                sha256Hmac.doFinal(data.getBytes());

        StringBuilder sb = new StringBuilder();

        for (byte b : hash) {
            sb.append(String.format("%02x", b));
        }

        return sb.toString();
    }
}