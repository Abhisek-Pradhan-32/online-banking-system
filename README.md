# 🏦 Online Banking System

A modern, full-stack online banking application built with **Spring Boot** backend and **React** frontend, featuring secure authentication, account management, and transaction processing.

![Language Composition](https://img.shields.io/badge/JavaScript-41.6%25-yellow) ![Java](https://img.shields.io/badge/Java-31.3%25-orange) ![CSS](https://img.shields.io/badge/CSS-25.8%25-blue) ![HTML](https://img.shields.io/badge/HTML-1.2%25-red) ![Dockerfile](https://img.shields.io/badge/Dockerfile-0.1%25-lightgrey)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Docker Deployment](#docker-deployment)
- [Security Features](#security-features)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### Authentication & Security
- 🔐 **User Registration & Login** - Secure account creation and authentication
- 🔑 **JWT Authentication** - Token-based session management
- 🛡️ **Spring Security Integration** - Enterprise-grade security framework
- 📝 **Forgot Password OTP Reset** - Secure password recovery

### Banking Operations
- 💰 **Balance Check** - View current account balance in real-time
- 💸 **Money Transfer** - Secure peer-to-peer fund transfers
- 📊 **Transaction History** - Complete transaction records and audit trail
- 📥 **CSV Statement Export** - Download statements for record-keeping

### Payment Integration
- 💳 **Razorpay Payment Gateway** - Third-party payment processing
- 🔄 **Secure Transactions** - Encrypted payment handling

---

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 4.0.5
- **Language**: Java 21
- **Database**: MySQL
- **Security**: Spring Security + JWT (JJWT 0.13.0)
- **ORM**: Spring Data JPA (Hibernate)
- **Validation**: Spring Validation
- **Payment**: Razorpay Java SDK 1.4.8
- **Build**: Maven

### Frontend
- **Library**: React 19.2.5
- **Build Tool**: Vite 8.0.9
- **Styling**: Tailwind CSS 4.2.4 + Styled Components 6.4.1
- **HTTP Client**: Axios 1.15.2
- **Routing**: React Router DOM 7.14.2
- **Animations**: Framer Motion 12.38.0
- **Icons**: Lucide React 1.14.0 + React Icons 5.6.0

### DevOps & Tools
- **Containerization**: Docker
- **Version Control**: Git
- **Container Image**: Eclipse Temurin JDK 21

---

## 📁 Project Structure

```
online-banking-system/
├── banking-backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/
│   │   │   │       ├── controller/  # REST API endpoints
│   │   │   │       ├── service/     # Business logic
│   │   │   │       ├── repository/  # Database access
│   │   │   │       ├── entity/      # JPA entities
│   │   │   │       ├── dto/         # Data Transfer Objects
│   │   │   │       ├── security/    # JWT & Security config
│   │   │   │       └── exception/   # Custom exceptions
│   │   │   └── resources/
│   │   │       └── application.properties  # Configuration
│   │   └── test/                    # Unit & Integration tests
│   ├── pom.xml                      # Maven dependencies
│   └── Dockerfile                   # Backend container config
│
├── banking-frontend/                # React frontend
│   ├── src/
│   │   ├── components/              # React components
│   │   ├── pages/                   # Page components
│   │   ├── services/                # API communication
│   │   ├── context/                 # Context API state
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── styles/                  # Global & component styles
│   │   ├── assets/                  # Images & static files
│   │   └── App.jsx                  # Main app component
│   ├── public/                      # Public assets
│   ├── package.json                 # NPM dependencies
│   ├── vite.config.js               # Vite configuration
│   └── tailwind.config.js           # Tailwind CSS config
│
├── README.md                        # This file
└── .gitignore                       # Git ignore rules
```

---

## 📦 Prerequisites

### System Requirements
- **Java**: JDK 21 or higher
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **MySQL**: 8.0 or higher
- **Docker**: Optional (for containerization)
- **Git**: For version control

### Accounts Required
- Razorpay Account (for payment gateway integration)

---

## 🚀 Installation & Setup

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd banking-backend
   ```

2. **Configure Database**
   
   Create a MySQL database:
   ```sql
   CREATE DATABASE banking_system;
   ```

   Update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/banking_system
   spring.datasource.username=root
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```

3. **Configure Razorpay Keys** (in application.properties)
   ```properties
   razorpay.key-id=your_key_id
   razorpay.key-secret=your_key_secret
   ```

4. **Build the project**
   ```bash
   mvn clean install
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd banking-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Backend URL**
   
   Create `.env` file or update API configuration in `src/services/api.js`:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/api';
   ```

---

## ▶️ Running the Application

### Option 1: Manual Setup

#### Start Backend
```bash
cd banking-backend
mvn spring-boot:run
```
Backend will run on: `http://localhost:8080`

#### Start Frontend (in new terminal)
```bash
cd banking-frontend
npm run dev
```
Frontend will run on: `http://localhost:5173`

### Option 2: Using Docker

#### Build Backend Image
```bash
cd banking-backend
mvn clean package
docker build -t banking-backend:latest .
docker run -p 8080:8080 --network host banking-backend:latest
```

#### Build Frontend Image
```bash
cd banking-frontend
docker build -t banking-frontend:latest .
docker run -p 3000:3000 banking-frontend:latest
```

### Option 3: Docker Compose (if available)
```bash
docker-compose up -d
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user & get JWT |
| POST | `/auth/forgot-password` | Request password reset OTP |
| POST | `/auth/reset-password` | Reset password with OTP |

### Account Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/accounts/balance` | Get account balance |
| GET | `/accounts/profile` | Get user profile |
| PUT | `/accounts/profile` | Update user profile |

### Transaction Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/transactions/transfer` | Transfer funds |
| GET | `/transactions/history` | Get transaction history |
| GET | `/transactions/history/export` | Export as CSV |

### Payment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payments/create` | Create payment order |
| POST | `/payments/verify` | Verify payment |

---

## 🗄️ Database Schema

### Key Tables

**users**
- user_id (PK)
- email (UNIQUE)
- password (encrypted)
- full_name
- phone
- created_at
- updated_at

**accounts**
- account_id (PK)
- user_id (FK)
- balance
- account_number
- created_at

**transactions**
- transaction_id (PK)
- from_account_id (FK)
- to_account_id (FK)
- amount
- type (TRANSFER/PAYMENT)
- status
- timestamp

---

## 🐳 Docker Deployment

### Backend Dockerfile
```dockerfile
FROM eclipse-temurin:21
COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
```

### Build & Run
```bash
# Build
mvn clean package
docker build -t banking-backend:1.0 .

# Run
docker run -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/banking_system banking-backend:1.0
```

---

## 🔒 Security Features

- ✅ **JWT Token-based Authentication** - Stateless session management
- ✅ **Password Encryption** - BCrypt password hashing
- ✅ **CORS Configuration** - Cross-origin request handling
- ✅ **Input Validation** - Server-side validation for all inputs
- ✅ **SQL Injection Prevention** - Parameterized queries via JPA
- ✅ **XSS Protection** - Secure headers and output encoding
- ✅ **Rate Limiting** - Protection against brute force attacks
- ✅ **HTTPS Support** - SSL/TLS encryption

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow Java naming conventions
- Use meaningful commit messages
- Add tests for new features
- Update documentation as needed

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- Open an Issue on GitHub
- Contact: [Your Email]
- Visit: [Your Website/Portfolio]

---

## 🎯 Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Advanced Analytics Dashboard
- [ ] Multi-currency Support
- [ ] Biometric Authentication
- [ ] Investment Features
- [ ] AI-powered Fraud Detection
- [ ] Scheduled Transfers
- [ ] Bill Payments

---

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [MySQL Documentation](https://dev.mysql.com/doc/)

---

**Last Updated**: June 2026  
**Version**: 1.0.0  
**Status**: Active Development 🚀
