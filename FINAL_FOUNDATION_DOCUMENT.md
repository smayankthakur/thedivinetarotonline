# Final Foundation Document
## Spiritual Guidance Platform

**Version:** 1.0  
**Date:** April 1, 2026  
**Status:** LOCKED  
**Purpose:** Phase 0 Completion Summary

---

## 1. Product Summary

**Product Type:** Spiritual guidance platform similar to Astrotalk/Tarotoo

**Core Modules (11 Total):**
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

**User Roles (3 Total):**
- User (Seeker): Registers, recharges wallet, browses readers, initiates sessions, books sessions, purchases products, submits reviews
- Reader (Service Provider): Registers, sets pricing, configures availability, accepts sessions, conducts sessions, receives earnings
- Admin (Platform Operator): Manages accounts, verifies readers, monitors transactions, manages content, handles disputes

**Monetization Model:**
- Per-minute chat billing with real-time wallet deduction
- Wallet recharge system via payment gateways
- Product sales through ecommerce store

**Non-Functional Requirements:**
- Performance: Chat < 100ms, API < 200ms, Payment < 3s, Page load < 2s
- Scalability: Horizontal scaling, concurrent sessions support
- Security: Authentication, PCI DSS compliance, encryption
- Availability: 99.9% uptime
- Compliance: Data privacy, financial regulations

---

## 2. Architecture Summary

**Tech Stack (Locked):**
- Frontend: Next.js (App Router) + Tailwind CSS + Shadcn UI
- Backend: FastAPI (Python)
- Database: PostgreSQL (Supabase)
- Realtime: WebSockets (FastAPI)
- Caching: Redis
- AI: OpenAI API
- Payments: Razorpay (India), PayPal (International)
- Hosting: Frontend on Vercel, Backend on Railway

**High-Level Architecture:**
- Client Layer: Next.js on Vercel
- API Gateway: FastAPI on Railway
- Core Services: User, Reader, Session, Payment, Chat, AI, Review, Ecom
- Data Layer: PostgreSQL (Supabase), Redis, S3, OpenAI API

**Component Structure:**
- Frontend: App Router with (auth), (user), (reader), (admin) route groups
- Backend: FastAPI with /api/v1/, /core/, /models/, /services/, /websocket/
- Database: 15 tables with full relationships

**Data Flows:**
- User Registration: Email/phone → OTP → JWT tokens
- Session Initiation: Select reader → Validate wallet → WebSocket → Per-minute billing
- Payment: Create order → Gateway → Webhook → Credit wallet
- AI Guidance: Submit query → OpenAI API → Store response → Display

**API Layer:**
- Authentication: 5 endpoints
- User: 8 endpoints
- Reader: 8 endpoints
- Session: 4 endpoints
- Booking: 4 endpoints
- Payment: 3 endpoints
- Review: 2 endpoints
- Store: 5 endpoints
- Blog: 3 endpoints
- AI: 2 endpoints
- Admin: 11 endpoints

**Realtime System:**
- WebSocket endpoint: /ws/{session_id}
- Message types: chat_message, typing_indicator, session_timer, wallet_balance, session_end, booking_reminder
- Redis usage: Session timer, wallet cache, reader availability, online readers, WebSocket connections, rate limiting

**Payment Architecture:**
- Razorpay: Order creation → Checkout → Webhook → Verification → Credit
- PayPal: Order creation → Approval → Capture → Credit
- Session billing: Cron job every 60 seconds → Deduct wallet → Calculate commission → Update earnings

**Deployment:**
- Frontend: Vercel with custom domain
- Backend: Railway with auto-scaling
- Database: Supabase PostgreSQL with connection pooling
- Redis: Railway/Upstash
- Media: AWS S3 with CloudFront CDN

---

## 3. Database Summary

**Database:** PostgreSQL (Supabase)

**Tables (15 Total):**

1. **users** - User account information
   - Columns: id, email, phone, name, dob, wallet_balance, is_active, created_at, updated_at
   - Indexes: email, phone, created_at

2. **readers** - Reader profiles
   - Columns: id, user_id, specialization, experience_years, bio, photo_url, per_minute_rate, is_online, is_verified, rating, total_reviews, total_earnings, pending_payout, created_at, updated_at
   - Indexes: user_id, specialization, is_online, is_verified, rating, per_minute_rate

3. **reader_availability** - Reader schedule
   - Columns: id, reader_id, day_of_week, start_time, end_time, is_available, created_at, updated_at
   - Indexes: reader_id, day_of_week

4. **sessions** - Chat/call session records
   - Columns: id, user_id, reader_id, type, status, start_time, end_time, duration_minutes, total_cost, platform_commission, reader_earnings, created_at, updated_at
   - Indexes: user_id, reader_id, status, start_time, user_reader

5. **transactions** - Financial transactions
   - Columns: id, user_id, reader_id, type, amount, balance_after, reference_id, reference_type, payment_method, gateway_transaction_id, status, description, created_at
   - Indexes: user_id, reader_id, type, status, created_at, reference

6. **wallet** - Wallet transaction history
   - Columns: id, user_id, type, amount, balance_after, reference_id, reference_type, description, created_at
   - Indexes: user_id, type, created_at, reference

7. **reviews** - User reviews and ratings
   - Columns: id, user_id, reader_id, session_id, rating, comment, is_visible, created_at, updated_at
   - Indexes: user_id, reader_id, session_id, rating, created_at

8. **products** - Ecommerce product catalog
   - Columns: id, name, description, price, image_url, category, stock, is_active, created_at, updated_at
   - Indexes: category, is_active, price, created_at

9. **orders** - Ecommerce orders
   - Columns: id, user_id, total_amount, status, shipping_address, payment_method, payment_status, gateway_transaction_id, created_at, updated_at
   - Indexes: user_id, status, payment_status, created_at

10. **order_items** - Order line items
    - Columns: id, order_id, product_id, quantity, price, created_at
    - Indexes: order_id, product_id

11. **bookings** - Scheduled session bookings
    - Columns: id, user_id, reader_id, scheduled_at, duration_minutes, status, total_cost, notes, created_at, updated_at
    - Indexes: user_id, reader_id, status, scheduled_at, user_reader

12. **ai_queries** - AI guidance queries
    - Columns: id, user_id, query_type, query_text, response_text, tokens_used, created_at
    - Indexes: user_id, query_type, created_at

13. **blog_posts** - Blog/content posts
    - Columns: id, title, content, author_id, category, image_url, is_published, created_at, updated_at
    - Indexes: author_id, category, is_published, created_at

14. **favorites** - User favorite readers
    - Columns: id, user_id, reader_id, created_at
    - Indexes: user_id, reader_id

15. **reader_payouts** - Reader payout records
    - Columns: id, reader_id, amount, status, payout_method, payout_details, processed_at, created_at, updated_at
    - Indexes: reader_id, status, created_at

**Relationships:**
- users → readers (1:1)
- readers → reader_availability (1:N)
- users → sessions (1:N)
- readers → sessions (1:N)
- sessions → reviews (1:1)
- users → transactions (1:N)
- readers → transactions (1:N)
- users → wallet (1:N)
- users → orders (1:N)
- orders → order_items (1:N)
- products → order_items (1:N)
- users → bookings (1:N)
- readers → bookings (1:N)
- users → ai_queries (1:N)
- users → blog_posts (1:N)
- users → favorites (1:N)
- readers → favorites (1:N)
- readers → reader_payouts (1:N)

---

## 4. UI Summary

**Design System:**
- Colors: Primary #6B46C1 (Purple), Secondary #D69E2E (Gold), Neutral grays, Status colors
- Typography: Playfair Display (headings), Inter (body), Complete size scale
- Spacing: 4px base unit, Container widths, Section/card padding
- Components: Border radius, Shadows, Transitions, Borders, Opacity

**Pages (42 Total):**
- Public: Homepage, Reader Listing, Reader Profile, Store, Product Page, Blog, Blog Post, Contact, About
- Authentication: Login, Register, Verify OTP, Forgot Password
- User Dashboard: Overview, Sessions, Bookings, Wallet, Favorites, Orders, Profile, Settings
- Reader Dashboard: Overview, Sessions, Earnings, Availability, Profile, Settings
- Session: Chat UI, Call UI, AI Guidance
- Payment: Wallet Recharge, Checkout, Payment Success, Payment Failed
- Admin: Dashboard, Users, Readers, Transactions, Sessions, Products, Blog, Settings

**Component Library:**
- Navigation: Header, Sidebar, Footer, Breadcrumbs, Pagination, Tabs, Mobile Menu
- Cards: Reader, Product, Blog, Session, Booking, Order, Transaction, Review, Testimonial, Stats
- Forms: Input, Textarea, Select, Checkbox, Radio, Toggle, Date Picker, Time Picker, File Upload, Search, Range Slider, Quantity Selector
- Buttons: Primary, Secondary, Outline, Ghost, Icon, Button Group, Loading, Disabled
- Feedback: Alert, Toast, Modal, Dialog, Tooltip, Popover, Progress Bar, Spinner, Skeleton Loader, Badge, Status Indicator
- Data Display: Table, List, Grid, Avatar, Rating Stars, Price Display, Timer Display, Wallet Balance Display, Status Tag, Category Tag
- Session: Chat Message Bubble, Chat Input, Typing Indicator, Session Timer, Wallet Balance Widget, Call Controls, Call Status, Session Summary
- Layout: Container, Section, Grid Layout, Flex Layout, Divider, Spacer, Card, Panel

**UX Rules:**
- Navigation: Desktop/mobile navigation, breadcrumbs, dashboard sidebar
- CTA Placement: Primary/secondary hierarchy, placement rules, sizing (44px minimum)
- Mobile Behavior: Responsive breakpoints, mobile layout rules, touch targets, performance optimization
- General: Loading states, error handling, accessibility (4.5:1 contrast), performance (< 2s load)

---

## 5. Development Rules

**Scope Control:**
- No feature addition after Phase 0
- No UI change after lock
- No backend restructuring after architecture lock
- Formal change request process required

**Development Discipline:**
- Phase-based execution only (5 phases)
- No skipping dependencies
- API-first development mandatory
- Phase completion requires formal sign-off

**Code Standards:**
- Folder structure consistency (Next.js and FastAPI)
- Naming conventions (files, variables, functions, classes, database)
- API versioning (/api/v1/)

**Testing Rules:**
- Each module must be tested before next module
- Unit, integration, end-to-end, performance, security tests required
- Minimum 80% test coverage
- No untested deployment to production

**Deployment Rules:**
- Staging before production mandatory
- Minimum 24 hours staging testing
- Logging mandatory for all services
- Monitoring and alerting required

**Failure Conditions:**
- 15 system integrity breakers defined
- 10 code quality violations defined
- 10 process violations defined

---

## 6. Execution Readiness Checklist

**Phase 0 Completion Status:**

- [x] Product Requirement Document (PRD) locked
- [x] System Architecture locked
- [x] Database Schema locked
- [x] UI/UX System locked
- [x] Development Rules locked
- [x] All dependencies identified
- [x] Tech stack finalized
- [x] API endpoints defined
- [x] Data models designed
- [x] Component library defined
- [x] Testing strategy established
- [x] Deployment architecture planned
- [x] Security requirements documented
- [x] Performance benchmarks set
- [x] Compliance requirements identified

**Ready for Phase 1: Core Infrastructure**

All planning documents are locked and finalized. No changes allowed during development.

---

## PHASE 0 IS COMPLETE. DEVELOPMENT CAN BEGIN. NO CHANGES ALLOWED.
