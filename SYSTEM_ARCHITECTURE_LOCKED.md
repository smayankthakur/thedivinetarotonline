# System Architecture Document
## Spiritual Guidance Platform

**Version:** 1.0  
**Date:** April 1, 2026  
**Status:** FINAL AND LOCKED  
**Author:** Senior System Architect

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                         │
│  Next.js (App Router) + Tailwind CSS + Shadcn UI           │
│  Deployed on Vercel                                         │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY                            │
│  FastAPI Backend (Python)                                   │
│  Deployed on Railway                                        │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    CORE SERVICES                            │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │   User   │ │  Reader  │ │ Session  │ │ Payment  │      │
│  │ Service  │ │ Service  │ │ Service  │ │ Service  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │   Chat   │ │    AI    │ │  Review  │ │   Ecom   │      │
│  │ Service  │ │  Service │ │ Service  │ │ Service  │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                            │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │PostgreSQL│ │  Redis   │ │   S3     │ │  OpenAI  │      │
│  │(Supabase)│ │ (Cache)  │ │ (Media)  │ │   API    │      │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Component Breakdown

### 2.1 Frontend Components (Next.js App Router)

```
app/
├── (auth)/
│   ├── login/
│   ├── register/
│   └── verify-otp/
├── (user)/
│   ├── dashboard/
│   ├── readers/
│   ├── sessions/
│   ├── bookings/
│   ├── wallet/
│   ├── store/
│   ├── blog/
│   └── ai-guide/
├── (reader)/
│   ├── dashboard/
│   ├── sessions/
│   ├── earnings/
│   ├── availability/
│   └── profile/
├── (admin)/
│   ├── dashboard/
│   ├── users/
│   ├── readers/
│   ├── transactions/
│   └── content/
├── api/
│   └── [...nextauth]/
└── layout.tsx
```

### 2.2 Backend Services (FastAPI)

```
app/
├── api/
│   ├── v1/
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── readers.py
│   │   ├── sessions.py
│   │   ├── payments.py
│   │   ├── reviews.py
│   │   ├── store.py
│   │   ├── blog.py
│   │   └── ai.py
│   └── deps.py
├── core/
│   ├── config.py
│   ├── security.py
│   └── database.py
├── models/
│   ├── user.py
│   ├── reader.py
│   ├── session.py
│   ├── payment.py
│   ├── review.py
│   ├── product.py
│   └── blog.py
├── services/
│   ├── auth_service.py
│   ├── user_service.py
│   ├── reader_service.py
│   ├── session_service.py
│   ├── payment_service.py
│   ├── review_service.py
│   ├── store_service.py
│   ├── blog_service.py
│   └── ai_service.py
├── websocket/
│   ├── manager.py
│   └── handlers.py
└── main.py
```

### 2.3 Database Schema (PostgreSQL/Supabase)

```
Tables:
- users (id, email, phone, name, dob, wallet_balance, created_at, updated_at)
- readers (id, user_id, specialization, experience, bio, photo_url, per_minute_rate, is_online, rating, total_reviews, created_at, updated_at)
- reader_availability (id, reader_id, day_of_week, start_time, end_time, is_available)
- sessions (id, user_id, reader_id, type, status, start_time, end_time, duration_minutes, total_cost, platform_commission, reader_earnings, created_at)
- bookings (id, user_id, reader_id, scheduled_at, duration_minutes, status, created_at)
- payments (id, user_id, amount, payment_method, gateway, gateway_order_id, gateway_payment_id, status, created_at)
- wallet_transactions (id, user_id, type, amount, balance_after, reference_id, reference_type, created_at)
- reviews (id, user_id, reader_id, session_id, rating, comment, created_at)
- products (id, name, description, price, image_url, category, stock, is_active, created_at, updated_at)
- orders (id, user_id, total_amount, status, shipping_address, created_at, updated_at)
- order_items (id, order_id, product_id, quantity, price, created_at)
- blog_posts (id, title, content, author_id, category, image_url, is_published, created_at, updated_at)
- reader_payouts (id, reader_id, amount, status, payout_date, created_at)
```

---

## 3. Data Flow (Step-by-Step)

### 3.1 User Registration Flow

```
Step 1: User submits email/phone → Frontend sends POST /api/v1/auth/register
Step 2: Backend validates input → Creates user record in PostgreSQL
Step 3: Backend generates OTP → Sends via SMS/Email
Step 4: User submits OTP → Frontend sends POST /api/v1/auth/verify-otp
Step 5: Backend validates OTP → Generates JWT access + refresh tokens
Step 6: Tokens returned to frontend → Stored in secure cookies
Step 7: User redirected to dashboard
```

### 3.2 Session Initiation Flow

```
Step 1: User selects reader → Frontend sends POST /api/v1/sessions/initiate
Step 2: Backend validates user wallet balance (minimum 5 minutes)
Step 3: Backend checks reader availability (Redis cache)
Step 4: Backend creates session record (status: active)
Step 5: Backend establishes WebSocket connection
Step 6: Session timer starts (Redis)
Step 7: Every 60 seconds → Backend deducts wallet (PostgreSQL transaction)
Step 8: Real-time balance updates via WebSocket
Step 9: Low balance warning at < 1 minute rate
Step 10: Session auto-terminates at 0 balance
Step 11: Backend calculates commission → Updates reader earnings
Step 12: Session receipt generated → Sent via WebSocket
```

### 3.3 Payment Flow

```
Step 1: User initiates wallet recharge → Frontend sends POST /api/v1/payments/create-order
Step 2: Backend creates Razorpay/PayPal order → Returns order_id
Step 3: Frontend opens payment gateway (Razorpay/PayPal SDK)
Step 4: User completes payment on gateway
Step 5: Gateway sends webhook → Backend receives POST /api/v1/payments/webhook
Step 6: Backend verifies payment signature
Step 7: Backend credits user wallet (PostgreSQL transaction)
Step 8: Backend creates wallet transaction record
Step 9: Backend sends confirmation via WebSocket
Step 10: Frontend updates wallet balance display
```

### 3.4 AI Guidance Flow

```
Step 1: User submits query → Frontend sends POST /api/v1/ai/guidance
Step 2: Backend validates user session/credits
Step 3: Backend constructs prompt with spiritual context
Step 4: Backend calls OpenAI API (GPT-4)
Step 5: Backend receives AI response
Step 6: Backend stores conversation in database
Step 7: Backend returns response to frontend
Step 8: Frontend displays AI guidance to user
```

---

## 4. API Layer Structure

### 4.1 Authentication Endpoints

```
POST   /api/v1/auth/register          - User registration
POST   /api/v1/auth/verify-otp        - OTP verification
POST   /api/v1/auth/login             - User login
POST   /api/v1/auth/refresh           - Token refresh
POST   /api/v1/auth/logout            - User logout
```

### 4.2 User Endpoints

```
GET    /api/v1/users/me               - Get current user profile
PUT    /api/v1/users/me               - Update user profile
GET    /api/v1/users/wallet           - Get wallet balance
GET    /api/v1/users/transactions     - Get transaction history
GET    /api/v1/users/sessions         - Get session history
GET    /api/v1/users/bookings         - Get bookings
POST   /api/v1/users/favorites/{reader_id} - Add favorite reader
DELETE /api/v1/users/favorites/{reader_id} - Remove favorite reader
```

### 4.3 Reader Endpoints

```
POST   /api/v1/readers/register       - Reader registration
GET    /api/v1/readers                - List readers (with filters)
GET    /api/v1/readers/{id}           - Get reader profile
PUT    /api/v1/readers/me             - Update reader profile
PUT    /api/v1/readers/availability   - Update availability
PUT    /api/v1/readers/status         - Update online/offline status
GET    /api/v1/readers/earnings       - Get earnings summary
GET    /api/v1/readers/sessions       - Get session history
```

### 4.4 Session Endpoints

```
POST   /api/v1/sessions/initiate      - Initiate chat/call session
POST   /api/v1/sessions/{id}/end      - End session
GET    /api/v1/sessions/{id}          - Get session details
GET    /api/v1/sessions/{id}/messages - Get session messages
```

### 4.5 Booking Endpoints

```
POST   /api/v1/bookings               - Create booking
GET    /api/v1/bookings/{id}          - Get booking details
PUT    /api/v1/bookings/{id}/cancel   - Cancel booking
GET    /api/v1/readers/{id}/slots     - Get available slots
```

### 4.6 Payment Endpoints

```
POST   /api/v1/payments/create-order  - Create payment order
POST   /api/v1/payments/webhook       - Payment gateway webhook
GET    /api/v1/payments/transactions  - Get payment transactions
```

### 4.7 Review Endpoints

```
POST   /api/v1/reviews                - Submit review
GET    /api/v1/readers/{id}/reviews   - Get reader reviews
```

### 4.8 Store Endpoints

```
GET    /api/v1/store/products         - List products
GET    /api/v1/store/products/{id}    - Get product details
POST   /api/v1/store/orders           - Create order
GET    /api/v1/store/orders/{id}      - Get order details
GET    /api/v1/store/orders           - Get user orders
```

### 4.9 Blog Endpoints

```
GET    /api/v1/blog/posts             - List blog posts
GET    /api/v1/blog/posts/{id}        - Get blog post details
GET    /api/v1/blog/categories        - Get blog categories
```

### 4.10 AI Endpoints

```
POST   /api/v1/ai/guidance            - Get AI guidance
GET    /api/v1/ai/history             - Get AI conversation history
```

### 4.11 Admin Endpoints

```
GET    /api/v1/admin/users            - List users
GET    /api/v1/admin/readers          - List readers
PUT    /api/v1/admin/readers/{id}/verify - Verify reader
GET    /api/v1/admin/transactions     - List transactions
GET    /api/v1/admin/sessions         - List sessions
POST   /api/v1/admin/blog/posts       - Create blog post
PUT    /api/v1/admin/blog/posts/{id}  - Update blog post
DELETE /api/v1/admin/blog/posts/{id}  - Delete blog post
POST   /api/v1/admin/store/products   - Create product
PUT    /api/v1/admin/store/products/{id} - Update product
DELETE /api/v1/admin/store/products/{id} - Delete product
```

---

## 5. Realtime System Design

### 5.1 WebSocket Implementation (FastAPI)

```
WebSocket Endpoint: /ws/{session_id}

Connection Flow:
1. Client connects to /ws/{session_id} with JWT token
2. Backend validates token and session ownership
3. Backend adds connection to WebSocketManager
4. Connection stored in Redis (session_id -> connection_id)
5. Real-time message exchange enabled

Message Types:
- chat_message: Text message between user and reader
- typing_indicator: Typing status
- session_timer: Timer update (every second)
- wallet_balance: Real-time balance update
- session_end: Session termination notification
- booking_reminder: Scheduled session reminder

WebSocket Manager:
- Manages active connections
- Broadcasts messages to session participants
- Handles connection/disconnection
- Stores connection state in Redis
```

### 5.2 Redis Usage

```
Redis Data Structures:

1. Session Timer (Hash)
   Key: session:{session_id}:timer
   Fields: start_time, duration, status

2. User Wallet Cache (String)
   Key: user:{user_id}:wallet_balance
   Value: balance (cached for 5 minutes)

3. Reader Availability (Set)
   Key: reader:{reader_id}:available_slots
   Members: time slots

4. Online Readers (Set)
   Key: online_readers
   Members: reader_ids

5. WebSocket Connections (Hash)
   Key: ws:connections
   Fields: connection_id -> session_id

6. Rate Limiting (String)
   Key: rate_limit:{user_id}:{endpoint}
   Value: request_count (TTL: 60 seconds)
```

---

## 6. Payment Flow Architecture

### 6.1 Razorpay Integration (India)

```
Payment Flow:
1. Frontend requests order creation → POST /api/v1/payments/create-order
2. Backend creates Razorpay order (amount, currency, receipt)
3. Backend returns order_id + Razorpay key to frontend
4. Frontend initializes Razorpay checkout
5. User completes payment on Razorpay
6. Razorpay sends webhook to /api/v1/payments/webhook
7. Backend verifies payment signature (HMAC SHA256)
8. Backend credits user wallet
9. Backend creates transaction record
10. Backend sends confirmation to frontend

Webhook Verification:
- Verify signature using Razorpay webhook secret
- Verify payment status = 'captured'
- Verify amount matches order amount
- Idempotency check (prevent duplicate processing)
```

### 6.2 PayPal Integration (International)

```
Payment Flow:
1. Frontend requests order creation → POST /api/v1/payments/create-order
2. Backend creates PayPal order (amount, currency, return_url, cancel_url)
3. Backend returns order_id + approval_url to frontend
4. Frontend redirects user to PayPal approval_url
5. User approves payment on PayPal
6. PayPal redirects back to frontend with order_id
7. Frontend sends capture request → POST /api/v1/payments/capture
8. Backend captures payment from PayPal
9. Backend credits user wallet
10. Backend creates transaction record
11. Backend sends confirmation to frontend
```

### 6.3 Session Billing

```
Billing Flow:
1. Session starts → Backend creates session record
2. Backend sets Redis timer (session:{id}:timer)
3. Cron job runs every 60 seconds:
   - Fetch active sessions from Redis
   - For each session:
     * Deduct reader's per-minute rate from user wallet
     * Calculate platform commission (20-30%)
     * Update reader earnings
     * Create wallet transaction record
     * Broadcast balance update via WebSocket
4. If wallet balance < 1 minute rate:
   - Send low balance warning via WebSocket
5. If wallet balance = 0:
   - Auto-terminate session
   - Update session record (status: completed)
   - Send session end notification via WebSocket
```

---

## 7. AI Integration Flow

### 7.1 OpenAI API Integration

```
AI Guidance Flow:
1. User submits query → POST /api/v1/ai/guidance
2. Backend validates user session/credits
3. Backend constructs system prompt:
   - Spiritual advisor persona
   - Context from user profile (DOB for astrology)
   - Guidance type (tarot, horoscope, general)
4. Backend calls OpenAI API:
   - Model: GPT-4
   - Messages: [system_prompt, user_query]
   - Max tokens: 500
   - Temperature: 0.7
5. Backend receives AI response
6. Backend stores conversation in database:
   - user_id, query, response, timestamp
7. Backend returns response to frontend
8. Frontend displays AI guidance

System Prompt Template:
"You are a spiritual guide providing compassionate and insightful guidance. 
You specialize in {guidance_type}. The user was born on {dob}. 
Provide thoughtful, positive, and helpful spiritual advice. 
Keep responses concise and focused on spiritual growth."
```

---

## 8. Deployment Architecture

### 8.1 Frontend Deployment (Vercel)

```
Deployment Configuration:
- Platform: Vercel
- Framework: Next.js (App Router)
- Build Command: npm run build
- Output Directory: .next
- Environment Variables:
  - NEXT_PUBLIC_API_URL (Backend Railway URL)
  - NEXT_PUBLIC_RAZORPAY_KEY (Razorpay public key)
  - NEXT_PUBLIC_PAYPAL_CLIENT_ID (PayPal client ID)
  - NEXT_PUBLIC_SUPABASE_URL (Supabase URL)
  - NEXT_PUBLIC_SUPABASE_ANON_KEY (Supabase anon key)

Domain Configuration:
- Custom domain: divineconnect.com
- SSL: Automatic (Vercel)
- CDN: Vercel Edge Network
```

### 8.2 Backend Deployment (Railway)

```
Deployment Configuration:
- Platform: Railway
- Runtime: Python 3.11
- Framework: FastAPI
- Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
- Environment Variables:
  - DATABASE_URL (Supabase PostgreSQL connection string)
  - REDIS_URL (Redis connection string)
  - RAZORPAY_KEY_ID (Razorpay key)
  - RAZORPAY_KEY_SECRET (Razorpay secret)
  - RAZORPAY_WEBHOOK_SECRET (Razorpay webhook secret)
  - PAYPAL_CLIENT_ID (PayPal client ID)
  - PAYPAL_CLIENT_SECRET (PayPal client secret)
  - OPENAI_API_KEY (OpenAI API key)
  - SECRET_KEY (JWT secret key)
  - ACCESS_TOKEN_EXPIRE_MINUTES (JWT expiration)
  - REFRESH_TOKEN_EXPIRE_DAYS (Refresh token expiration)

Scaling Configuration:
- Min instances: 1
- Max instances: 5
- CPU: 1 vCPU
- Memory: 2 GB
- Auto-scaling based on CPU/memory usage
```

### 8.3 Database Deployment (Supabase)

```
Deployment Configuration:
- Platform: Supabase
- Database: PostgreSQL 15
- Plan: Pro (scalable)
- Connection Pooling: Enabled (PgBouncer)
- Backups: Daily automated (30-day retention)
- SSL: Required for connections

Supabase Features Used:
- PostgreSQL database
- Authentication (optional, can use custom JWT)
- Storage (for media files)
- Edge Functions (optional, for serverless functions)
```

### 8.4 Redis Deployment

```
Deployment Configuration:
- Platform: Railway Redis / Upstash
- Version: Redis 7
- Memory: 512 MB (scalable)
- Persistence: AOF (Append Only File)
- SSL: Enabled

Usage:
- Session timer management
- Wallet balance caching
- Reader availability caching
- WebSocket connection state
- Rate limiting
```

### 8.5 Media Storage (AWS S3)

```
Deployment Configuration:
- Platform: AWS S3
- Bucket: divine-connect-media
- Region: ap-south-1 (Mumbai)
- Access: Public read, authenticated write
- CDN: CloudFront (optional)

Stored Media:
- User profile photos
- Reader profile photos
- Product images
- Blog post images
- Chat media (images shared during sessions)
```

---

## 9. FINAL LOCK STATEMENT

THIS ARCHITECTURE IS FINAL AND LOCKED
