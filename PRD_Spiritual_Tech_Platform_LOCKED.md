# Product Requirement Document (PRD)
## Spiritual Guidance Platform

**Version:** 1.0  
**Date:** April 1, 2026  
**Status:** LOCKED  
**Author:** Senior Product Architect

---

## 1. Product Overview

A spiritual guidance platform similar to Astrotalk/Tarotoo providing real-time spiritual guidance through readers, AI-based guidance, and a spiritual products ecommerce store. The platform operates on a per-minute chat billing model with wallet-based payment system.

---

## 2. Core Modules

1. User to Reader Chat (paid per minute)
2. Audio/Call sessions
3. AI-based guidance (LLM responses)
4. Wallet system (recharge, deduction)
5. Reader profiles with pricing & availability
6. Booking system (scheduled sessions)
7. Reviews & ratings
8. Ecommerce store (spiritual products)
9. Blog/content section
10. User dashboard
11. Reader dashboard

---

## 3. User Roles

### 3.1 User (Seeker)
- Registers and creates profile
- Recharges wallet
- Browses reader profiles
- Initiates chat/call sessions
- Books scheduled sessions
- Purchases products from ecommerce store
- Submits reviews and ratings
- Accesses user dashboard

### 3.2 Reader (Service Provider)
- Registers and creates profile with specialization
- Sets per-minute pricing
- Configures availability schedule
- Accepts chat/call sessions
- Conducts scheduled sessions
- Receives earnings in wallet
- Accesses reader dashboard

### 3.3 Admin (Platform Operator)
- Manages user and reader accounts
- Verifies reader credentials
- Monitors transactions
- Manages platform content
- Handles disputes
- Accesses admin panel

---

## 4. Feature Breakdown

### 4.1 User to Reader Chat
- Text-based real-time chat
- Per-minute billing with real-time wallet deduction
- Session timer display
- Chat history preservation
- Auto-termination on low balance

### 4.2 Audio/Call Sessions
- Voice call integration
- Per-minute billing
- Session timer
- Auto-termination on low balance

### 4.3 AI-Based Guidance
- LLM-powered spiritual guidance
- User query input
- AI-generated responses
- Session-based interaction

### 4.4 Wallet System
- Wallet recharge via payment gateway
- Real-time balance display
- Per-minute deduction during sessions
- Transaction history
- Low balance warnings

### 4.5 Reader Profiles
- Profile creation (name, photo, specialization, experience, bio)
- Per-minute rate configuration
- Availability calendar management
- Online/Offline status toggle
- Rating and review display

### 4.6 Booking System
- Scheduled session booking
- Calendar-based time slot selection
- Booking confirmation
- Session reminders

### 4.7 Reviews & Ratings
- Post-session rating (1-5 stars)
- Written review submission
- Reader aggregate rating display
- Review visibility on reader profile

### 4.8 Ecommerce Store
- Product catalog (spiritual products)
- Product details and images
- Cart functionality
- Checkout and payment
- Order management

### 4.9 Blog/Content Section
- Blog post display
- Content categories
- Article reading interface

### 4.10 User Dashboard
- Wallet balance display
- Session history
- Upcoming bookings
- Favorite readers
- Transaction history

### 4.11 Reader Dashboard
- Earnings summary
- Session history
- Availability management
- Client feedback
- Payout information

---

## 5. Monetization Logic

### 5.1 Per-Minute Chat Billing
- Reader sets per-minute rate
- User wallet deducted every minute during session
- Platform commission deducted from reader earnings
- Real-time billing with session timer

### 5.2 Wallet Recharge System
- User adds funds to wallet via payment gateway
- Multiple payment methods supported
- Wallet balance used for session payments
- Transaction recorded in ledger

### 5.3 Product Sales
- Ecommerce store for spiritual products
- Standard ecommerce payment processing
- Revenue from product margins

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Chat message delivery: < 100ms
- API response time: < 200ms
- Payment processing: < 3 seconds
- Page load time: < 2 seconds

### 6.2 Scalability
- Support concurrent chat sessions
- Horizontal scaling capability
- Database optimization for read/write operations

### 6.3 Security
- User authentication and authorization
- Payment data security (PCI DSS compliance)
- Data encryption in transit and at rest
- Session isolation and security

### 6.4 Availability
- Platform uptime: 99.9%
- Real-time chat service availability
- Payment gateway reliability

### 6.5 Compliance
- Data privacy regulations
- Financial transaction compliance
- Content moderation policies

---

## 7. FINAL LOCK STATEMENT

THIS PRD IS LOCKED AND MUST NOT BE MODIFIED DURING DEVELOPMENT
