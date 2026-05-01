# Online Banking System

A full-stack banking application built using React, Spring Boot, MySQL.

## Features

- User Registration & Login
- JWT Authentication
- Balance Check
- Money Transfer
- Transaction History
- CSV Statement Export
- Razorpay Payment Gateway
- Forgot Password OTP Reset

## Tech Stack

Frontend: React, Tailwind CSS  
Backend: Spring Boot, Spring Security  
Database: MySQL  
Tools: Git, Docker

## Run Project

Frontend:
npm install
npm run dev

Backend:
mvn spring-boot:run

## Backend Dockerfile

Inside `banking-backend/`

```dockerfile id="q2w7r6"
FROM eclipse-temurin:21
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]