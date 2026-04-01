# PostgreSQL Database Schema
## Spiritual Guidance Platform

**Version:** 1.0  
**Date:** April 1, 2026  
**Status:** LOCKED AND FINAL  
**Database:** PostgreSQL (Supabase)

---

## Table Definitions

### 1. users

```
Table: users
Description: Stores user (seeker) account information

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- email                 VARCHAR(255) UNIQUE NOT NULL
- phone                 VARCHAR(20) UNIQUE NOT NULL
- name                  VARCHAR(100) NOT NULL
- dob                   DATE
- wallet_balance        DECIMAL(10,2) DEFAULT 0.00 NOT NULL
- is_active             BOOLEAN DEFAULT true NOT NULL
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
- updated_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- users_pkey PRIMARY KEY (id)
- users_email_unique UNIQUE (email)
- users_phone_unique UNIQUE (phone)
- users_wallet_balance_check CHECK (wallet_balance >= 0)

Indexes:
- idx_users_email ON users(email)
- idx_users_phone ON users(phone)
- idx_users_created_at ON users(created_at)
```

### 2. readers

```
Table: readers
Description: Stores reader (service provider) profiles

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- user_id               UUID UNIQUE NOT NULL
- specialization        VARCHAR(100) NOT NULL
- experience_years      INTEGER NOT NULL
- bio                   TEXT
- photo_url             VARCHAR(500)
- per_minute_rate       DECIMAL(10,2) NOT NULL
- is_online             BOOLEAN DEFAULT false NOT NULL
- is_verified           BOOLEAN DEFAULT false NOT NULL
- rating                DECIMAL(3,2) DEFAULT 0.00
- total_reviews         INTEGER DEFAULT 0
- total_earnings        DECIMAL(12,2) DEFAULT 0.00
- pending_payout        DECIMAL(12,2) DEFAULT 0.00
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
- updated_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- readers_pkey PRIMARY KEY (id)
- readers_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- readers_user_id_unique UNIQUE (user_id)
- readers_per_minute_rate_check CHECK (per_minute_rate > 0)
- readers_rating_check CHECK (rating >= 0 AND rating <= 5)

Indexes:
- idx_readers_user_id ON readers(user_id)
- idx_readers_specialization ON readers(specialization)
- idx_readers_is_online ON readers(is_online)
- idx_readers_is_verified ON readers(is_verified)
- idx_readers_rating ON readers(rating DESC)
- idx_readers_per_minute_rate ON readers(per_minute_rate)
```

### 3. reader_availability

```
Table: reader_availability
Description: Stores reader availability schedule

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- reader_id             UUID NOT NULL
- day_of_week           INTEGER NOT NULL (0=Sunday, 6=Saturday)
- start_time            TIME NOT NULL
- end_time              TIME NOT NULL
- is_available          BOOLEAN DEFAULT true NOT NULL
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
- updated_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- reader_availability_pkey PRIMARY KEY (id)
- reader_availability_reader_id_fkey FOREIGN KEY (reader_id) REFERENCES readers(id) ON DELETE CASCADE
- reader_availability_time_check CHECK (end_time > start_time)
- reader_availability_day_check CHECK (day_of_week >= 0 AND day_of_week <= 6)

Indexes:
- idx_reader_availability_reader_id ON reader_availability(reader_id)
- idx_reader_availability_day ON reader_availability(day_of_week)
```

### 4. sessions

```
Table: sessions
Description: Stores chat/call session records

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- user_id               UUID NOT NULL
- reader_id             UUID NOT NULL
- type                  VARCHAR(20) NOT NULL (chat, call)
- status                VARCHAR(20) DEFAULT 'active' NOT NULL (active, completed, cancelled)
- start_time            TIMESTAMP WITH TIME ZONE NOT NULL
- end_time              TIMESTAMP WITH TIME ZONE
- duration_minutes      INTEGER DEFAULT 0
- total_cost            DECIMAL(10,2) DEFAULT 0.00
- platform_commission   DECIMAL(10,2) DEFAULT 0.00
- reader_earnings       DECIMAL(10,2) DEFAULT 0.00
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
- updated_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- sessions_pkey PRIMARY KEY (id)
- sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- sessions_reader_id_fkey FOREIGN KEY (reader_id) REFERENCES readers(id) ON DELETE CASCADE
- sessions_type_check CHECK (type IN ('chat', 'call'))
- sessions_status_check CHECK (status IN ('active', 'completed', 'cancelled'))

Indexes:
- idx_sessions_user_id ON sessions(user_id)
- idx_sessions_reader_id ON sessions(reader_id)
- idx_sessions_status ON sessions(status)
- idx_sessions_start_time ON sessions(start_time DESC)
- idx_sessions_user_reader ON sessions(user_id, reader_id)
```

### 5. transactions

```
Table: transactions
Description: Stores all financial transactions (wallet recharges, session payments, payouts)

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- user_id               UUID
- reader_id             UUID
- type                  VARCHAR(30) NOT NULL (wallet_recharge, session_payment, reader_payout, refund)
- amount                DECIMAL(10,2) NOT NULL
- balance_after         DECIMAL(10,2)
- reference_id          UUID (session_id, order_id, or payout_id)
- reference_type        VARCHAR(30) (session, order, payout)
- payment_method        VARCHAR(30) (razorpay, paypal, wallet)
- gateway_transaction_id VARCHAR(100)
- status                VARCHAR(20) DEFAULT 'completed' NOT NULL (pending, completed, failed, refunded)
- description           TEXT
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- transactions_pkey PRIMARY KEY (id)
- transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
- transactions_reader_id_fkey FOREIGN KEY (reader_id) REFERENCES readers(id) ON DELETE SET NULL
- transactions_type_check CHECK (type IN ('wallet_recharge', 'session_payment', 'reader_payout', 'refund'))
- transactions_status_check CHECK (status IN ('pending', 'completed', 'failed', 'refunded'))

Indexes:
- idx_transactions_user_id ON transactions(user_id)
- idx_transactions_reader_id ON transactions(reader_id)
- idx_transactions_type ON transactions(type)
- idx_transactions_status ON transactions(status)
- idx_transactions_created_at ON transactions(created_at DESC)
- idx_transactions_reference ON transactions(reference_id, reference_type)
```

### 6. wallet

```
Table: wallet
Description: Stores wallet transaction history and balance snapshots

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- user_id               UUID NOT NULL
- type                  VARCHAR(30) NOT NULL (credit, debit)
- amount                DECIMAL(10,2) NOT NULL
- balance_after         DECIMAL(10,2) NOT NULL
- reference_id          UUID (session_id, transaction_id)
- reference_type        VARCHAR(30) (session, recharge, refund)
- description           TEXT
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- wallet_pkey PRIMARY KEY (id)
- wallet_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- wallet_type_check CHECK (type IN ('credit', 'debit'))

Indexes:
- idx_wallet_user_id ON wallet(user_id)
- idx_wallet_type ON wallet(type)
- idx_wallet_created_at ON wallet(created_at DESC)
- idx_wallet_reference ON wallet(reference_id, reference_type)
```

### 7. reviews

```
Table: reviews
Description: Stores user reviews and ratings for readers

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- user_id               UUID NOT NULL
- reader_id             UUID NOT NULL
- session_id            UUID NOT NULL
- rating                INTEGER NOT NULL
- comment               TEXT
- is_visible            BOOLEAN DEFAULT true NOT NULL
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
- updated_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- reviews_pkey PRIMARY KEY (id)
- reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- reviews_reader_id_fkey FOREIGN KEY (reader_id) REFERENCES readers(id) ON DELETE CASCADE
- reviews_session_id_fkey FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
- reviews_rating_check CHECK (rating >= 1 AND rating <= 5)
- reviews_unique UNIQUE (user_id, session_id)

Indexes:
- idx_reviews_user_id ON reviews(user_id)
- idx_reviews_reader_id ON reviews(reader_id)
- idx_reviews_session_id ON reviews(session_id)
- idx_reviews_rating ON reviews(rating)
- idx_reviews_created_at ON reviews(created_at DESC)
```

### 8. products

```
Table: products
Description: Stores ecommerce product catalog

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- name                  VARCHAR(200) NOT NULL
- description           TEXT
- price                 DECIMAL(10,2) NOT NULL
- image_url             VARCHAR(500)
- category              VARCHAR(100) NOT NULL
- stock                 INTEGER DEFAULT 0 NOT NULL
- is_active             BOOLEAN DEFAULT true NOT NULL
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
- updated_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- products_pkey PRIMARY KEY (id)
- products_price_check CHECK (price >= 0)
- products_stock_check CHECK (stock >= 0)

Indexes:
- idx_products_category ON products(category)
- idx_products_is_active ON products(is_active)
- idx_products_price ON products(price)
- idx_products_created_at ON products(created_at DESC)
```

### 9. orders

```
Table: orders
Description: Stores ecommerce orders

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- user_id               UUID NOT NULL
- total_amount          DECIMAL(10,2) NOT NULL
- status                VARCHAR(20) DEFAULT 'pending' NOT NULL (pending, confirmed, shipped, delivered, cancelled)
- shipping_address      JSONB NOT NULL
- payment_method        VARCHAR(30) (razorpay, paypal, wallet)
- payment_status        VARCHAR(20) DEFAULT 'pending' NOT NULL (pending, completed, failed, refunded)
- gateway_transaction_id VARCHAR(100)
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
- updated_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- orders_pkey PRIMARY KEY (id)
- orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- orders_total_amount_check CHECK (total_amount >= 0)
- orders_status_check CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'))
- orders_payment_status_check CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded'))

Indexes:
- idx_orders_user_id ON orders(user_id)
- idx_orders_status ON orders(status)
- idx_orders_payment_status ON orders(payment_status)
- idx_orders_created_at ON orders(created_at DESC)
```

### 10. order_items

```
Table: order_items
Description: Stores individual items within an order

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- order_id              UUID NOT NULL
- product_id            UUID NOT NULL
- quantity              INTEGER NOT NULL
- price                 DECIMAL(10,2) NOT NULL
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- order_items_pkey PRIMARY KEY (id)
- order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
- order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
- order_items_quantity_check CHECK (quantity > 0)
- order_items_price_check CHECK (price >= 0)

Indexes:
- idx_order_items_order_id ON order_items(order_id)
- idx_order_items_product_id ON order_items(product_id)
```

### 11. bookings

```
Table: bookings
Description: Stores scheduled session bookings

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- user_id               UUID NOT NULL
- reader_id             UUID NOT NULL
- scheduled_at          TIMESTAMP WITH TIME ZONE NOT NULL
- duration_minutes      INTEGER NOT NULL
- status                VARCHAR(20) DEFAULT 'pending' NOT NULL (pending, confirmed, completed, cancelled)
- total_cost            DECIMAL(10,2) NOT NULL
- notes                 TEXT
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
- updated_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- bookings_pkey PRIMARY KEY (id)
- bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- bookings_reader_id_fkey FOREIGN KEY (reader_id) REFERENCES readers(id) ON DELETE CASCADE
- bookings_duration_check CHECK (duration_minutes > 0)
- bookings_total_cost_check CHECK (total_cost >= 0)
- bookings_status_check CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))

Indexes:
- idx_bookings_user_id ON bookings(user_id)
- idx_bookings_reader_id ON bookings(reader_id)
- idx_bookings_status ON bookings(status)
- idx_bookings_scheduled_at ON bookings(scheduled_at)
- idx_bookings_user_reader ON bookings(user_id, reader_id)
```

### 12. ai_queries

```
Table: ai_queries
Description: Stores AI guidance queries and responses

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- user_id               UUID NOT NULL
- query_type            VARCHAR(30) NOT NULL (tarot, horoscope, general)
- query_text            TEXT NOT NULL
- response_text         TEXT NOT NULL
- tokens_used           INTEGER DEFAULT 0
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- ai_queries_pkey PRIMARY KEY (id)
- ai_queries_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- ai_queries_type_check CHECK (query_type IN ('tarot', 'horoscope', 'general'))

Indexes:
- idx_ai_queries_user_id ON ai_queries(user_id)
- idx_ai_queries_type ON ai_queries(query_type)
- idx_ai_queries_created_at ON ai_queries(created_at DESC)
```

### 13. blog_posts

```
Table: blog_posts
Description: Stores blog/content posts

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- title                 VARCHAR(300) NOT NULL
- content               TEXT NOT NULL
- author_id             UUID NOT NULL
- category              VARCHAR(100) NOT NULL
- image_url             VARCHAR(500)
- is_published          BOOLEAN DEFAULT false NOT NULL
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
- updated_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- blog_posts_pkey PRIMARY KEY (id)
- blog_posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE

Indexes:
- idx_blog_posts_author_id ON blog_posts(author_id)
- idx_blog_posts_category ON blog_posts(category)
- idx_blog_posts_is_published ON blog_posts(is_published)
- idx_blog_posts_created_at ON blog_posts(created_at DESC)
```

### 14. favorites

```
Table: favorites
Description: Stores user favorite readers

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- user_id               UUID NOT NULL
- reader_id             UUID NOT NULL
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- favorites_pkey PRIMARY KEY (id)
- favorites_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
- favorites_reader_id_fkey FOREIGN KEY (reader_id) REFERENCES readers(id) ON DELETE CASCADE
- favorites_unique UNIQUE (user_id, reader_id)

Indexes:
- idx_favorites_user_id ON favorites(user_id)
- idx_favorites_reader_id ON favorites(reader_id)
```

### 15. reader_payouts

```
Table: reader_payouts
Description: Stores reader payout records

Columns:
- id                    UUID PRIMARY KEY DEFAULT gen_random_uuid()
- reader_id             UUID NOT NULL
- amount                DECIMAL(10,2) NOT NULL
- status                VARCHAR(20) DEFAULT 'pending' NOT NULL (pending, processing, completed, failed)
- payout_method         VARCHAR(30) NOT NULL (bank_transfer, upi)
- payout_details        JSONB
- processed_at          TIMESTAMP WITH TIME ZONE
- created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
- updated_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL

Constraints:
- reader_payouts_pkey PRIMARY KEY (id)
- reader_payouts_reader_id_fkey FOREIGN KEY (reader_id) REFERENCES readers(id) ON DELETE CASCADE
- reader_payouts_amount_check CHECK (amount > 0)
- reader_payouts_status_check CHECK (status IN ('pending', 'processing', 'completed', 'failed'))

Indexes:
- idx_reader_payouts_reader_id ON reader_payouts(reader_id)
- idx_reader_payouts_status ON reader_payouts(status)
- idx_reader_payouts_created_at ON reader_payouts(created_at DESC)
```

---

## ER Diagram (Text Format)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                    USERS                                        │
│  id (PK)                                                                        │
│  email, phone, name, dob                                                        │
│  wallet_balance, is_active                                                      │
│  created_at, updated_at                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                    │
                    │ 1:1
                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   READERS                                       │
│  id (PK), user_id (FK → users)                                                  │
│  specialization, experience_years, bio, photo_url                               │
│  per_minute_rate, is_online, is_verified                                        │
│  rating, total_reviews, total_earnings, pending_payout                          │
│  created_at, updated_at                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                    │
                    │ 1:N
                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            READER_AVAILABILITY                                  │
│  id (PK), reader_id (FK → readers)                                              │
│  day_of_week, start_time, end_time, is_available                                │
│  created_at, updated_at                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   SESSIONS                                      │
│  id (PK)                                                                        │
│  user_id (FK → users), reader_id (FK → readers)                                 │
│  type, status, start_time, end_time                                             │
│  duration_minutes, total_cost, platform_commission, reader_earnings             │
│  created_at, updated_at                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                    │
                    │ 1:1
                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   REVIEWS                                       │
│  id (PK)                                                                        │
│  user_id (FK → users), reader_id (FK → readers), session_id (FK → sessions)     │
│  rating, comment, is_visible                                                    │
│  created_at, updated_at                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 TRANSACTIONS                                    │
│  id (PK)                                                                        │
│  user_id (FK → users), reader_id (FK → readers)                                 │
│  type, amount, balance_after                                                    │
│  reference_id, reference_type                                                   │
│  payment_method, gateway_transaction_id                                         │
│  status, description                                                            │
│  created_at                                                                     │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   WALLET                                        │
│  id (PK)                                                                        │
│  user_id (FK → users)                                                           │
│  type, amount, balance_after                                                    │
│  reference_id, reference_type, description                                      │
│  created_at                                                                     │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                  PRODUCTS                                       │
│  id (PK)                                                                        │
│  name, description, price, image_url                                            │
│  category, stock, is_active                                                     │
│  created_at, updated_at                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                    │
                    │ N:M (through order_items)
                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   ORDERS                                        │
│  id (PK)                                                                        │
│  user_id (FK → users)                                                           │
│  total_amount, status, shipping_address                                         │
│  payment_method, payment_status, gateway_transaction_id                         │
│  created_at, updated_at                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘
                    │
                    │ 1:N
                    ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                ORDER_ITEMS                                      │
│  id (PK), order_id (FK → orders), product_id (FK → products)                    │
│  quantity, price                                                                │
│  created_at                                                                     │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                  BOOKINGS                                       │
│  id (PK)                                                                        │
│  user_id (FK → users), reader_id (FK → readers)                                 │
│  scheduled_at, duration_minutes, status, total_cost, notes                      │
│  created_at, updated_at                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 AI_QUERIES                                      │
│  id (PK)                                                                        │
│  user_id (FK → users)                                                           │
│  query_type, query_text, response_text, tokens_used                             │
│  created_at                                                                     │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 BLOG_POSTS                                      │
│  id (PK)                                                                        │
│  title, content, author_id (FK → users)                                         │
│  category, image_url, is_published                                              │
│  created_at, updated_at                                                         │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                  FAVORITES                                      │
│  id (PK)                                                                        │
│  user_id (FK → users), reader_id (FK → readers)                                 │
│  created_at                                                                     │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              READER_PAYOUTS                                     │
│  id (PK)                                                                        │
│  reader_id (FK → readers)                                                       │
│  amount, status, payout_method, payout_details                                  │
│  processed_at, created_at, updated_at                                           │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Summary

### User Registration & Authentication Flow
```
users → (registration) → users table
users → (login) → JWT token generation
users → (wallet recharge) → transactions (type: wallet_recharge) → wallet (type: credit) → users.wallet_balance update
```

### Session Flow
```
users + readers → (initiate session) → sessions (status: active)
sessions → (per-minute billing) → transactions (type: session_payment) → wallet (type: debit) → users.wallet_balance update
sessions → (end session) → sessions (status: completed, duration_minutes, total_cost calculated)
sessions → (commission calculation) → readers.total_earnings update
sessions → (review) → reviews
```

### Booking Flow
```
users + readers → (create booking) → bookings (status: pending)
bookings → (confirm) → bookings (status: confirmed)
bookings → (complete) → bookings (status: completed) → sessions (create session record)
bookings → (cancel) → bookings (status: cancelled)
```

### Payment Flow
```
users → (create order) → transactions (type: wallet_recharge, status: pending)
transactions → (webhook verification) → transactions (status: completed) → wallet (type: credit) → users.wallet_balance update
```

### Ecommerce Flow
```
users + products → (create order) → orders (status: pending) + order_items
orders → (payment) → transactions (type: session_payment) → orders (status: confirmed, payment_status: completed)
orders → (ship) → orders (status: shipped)
orders → (deliver) → orders (status: delivered)
```

### Reader Payout Flow
```
readers → (payout request) → reader_payouts (status: pending)
reader_payouts → (process) → reader_payouts (status: completed, processed_at) → readers.pending_payout update
reader_payouts → (create transaction) → transactions (type: reader_payout)
```

### AI Guidance Flow
```
users → (submit query) → ai_queries (query_type, query_text, response_text, tokens_used)
```

### Blog/Content Flow
```
users (admin) → (create post) → blog_posts (is_published: true/false)
blog_posts → (publish) → blog_posts (is_published: true)
```

### Favorites Flow
```
users + readers → (add favorite) → favorites
users + readers → (remove favorite) → favorites (delete)
```

---

## THIS DATABASE SCHEMA IS LOCKED AND FINAL
