# UI/UX System Design Document
## Spiritual Guidance Platform

**Version:** 1.0  
**Date:** April 1, 2026  
**Status:** LOCKED AND FINAL  
**Theme:** Light, Spiritual Premium  
**Inspiration:** thedivinetarotonline.com

---

## 1. Design System

### 1.1 Colors

```
Primary Colors:
- Primary: #6B46C1 (Deep Purple) - Main brand color
- Primary Light: #9F7AEA (Light Purple) - Hover states, accents
- Primary Dark: #553C9A (Dark Purple) - Active states

Secondary Colors:
- Secondary: #D69E2E (Gold) - Premium accents, CTAs
- Secondary Light: #ECC94B (Light Gold) - Highlights
- Secondary Dark: #B7791F (Dark Gold) - Hover states

Neutral Colors:
- White: #FFFFFF - Backgrounds
- Gray 50: #F9FAFB - Light backgrounds
- Gray 100: #F3F4F6 - Card backgrounds
- Gray 200: #E5E7EB - Borders
- Gray 300: #D1D5DB - Disabled states
- Gray 400: #9CA3AF - Placeholder text
- Gray 500: #6B7280 - Secondary text
- Gray 600: #4B5563 - Body text
- Gray 700: #374151 - Headings
- Gray 800: #1F2937 - Dark headings
- Gray 900: #111827 - Primary text

Status Colors:
- Success: #10B981 (Green)
- Warning: #F59E0B (Amber)
- Error: #EF4444 (Red)
- Info: #3B82F6 (Blue)

Background Colors:
- Main Background: #FFFFFF
- Card Background: #F9FAFB
- Section Background: #F3F4F6
- Overlay: rgba(0, 0, 0, 0.5)
```

### 1.2 Typography

```
Font Family:
- Primary: 'Playfair Display' (Serif) - Headings, spiritual feel
- Secondary: 'Inter' (Sans-serif) - Body text, UI elements

Font Sizes:
- Heading 1: 48px / 3rem (Hero sections)
- Heading 2: 36px / 2.25rem (Section titles)
- Heading 3: 30px / 1.875rem (Card titles)
- Heading 4: 24px / 1.5rem (Subsections)
- Heading 5: 20px / 1.25rem (Small headings)
- Heading 6: 18px / 1.125rem (Labels)
- Body Large: 18px / 1.125rem (Important text)
- Body: 16px / 1rem (Default body)
- Body Small: 14px / 0.875rem (Secondary text)
- Caption: 12px / 0.75rem (Captions, timestamps)

Font Weights:
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

Line Heights:
- Tight: 1.25 (Headings)
- Normal: 1.5 (Body text)
- Relaxed: 1.75 (Long content)

Letter Spacing:
- Tight: -0.025em (Headings)
- Normal: 0 (Body)
- Wide: 0.025em (Small caps, labels)
```

### 1.3 Spacing

```
Spacing Scale (Base unit: 4px):
- 0: 0px
- 1: 4px
- 2: 8px
- 3: 12px
- 4: 16px
- 5: 20px
- 6: 24px
- 8: 32px
- 10: 40px
- 12: 48px
- 16: 64px
- 20: 80px
- 24: 96px

Container Widths:
- Small: 640px
- Medium: 768px
- Large: 1024px
- XLarge: 1280px
- 2XLarge: 1536px

Section Padding:
- Mobile: 32px (py-8)
- Tablet: 48px (py-12)
- Desktop: 64px (py-16)

Card Padding:
- Small: 16px (p-4)
- Medium: 24px (p-6)
- Large: 32px (p-8)

Gap:
- Small: 8px (gap-2)
- Medium: 16px (gap-4)
- Large: 24px (gap-6)
- XLarge: 32px (gap-8)
```

### 1.4 Components

```
Border Radius:
- Small: 4px (rounded)
- Medium: 8px (rounded-lg)
- Large: 12px (rounded-xl)
- XLarge: 16px (rounded-2xl)
- Full: 9999px (rounded-full)

Shadows:
- Small: 0 1px 2px 0 rgba(0, 0, 0, 0.05) (shadow-sm)
- Medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1) (shadow-md)
- Large: 0 10px 15px -3px rgba(0, 0, 0, 0.1) (shadow-lg)
- XLarge: 0 20px 25px -5px rgba(0, 0, 0, 0.1) (shadow-xl)

Transitions:
- Fast: 150ms ease-in-out
- Normal: 300ms ease-in-out
- Slow: 500ms ease-in-out

Border Width:
- Thin: 1px
- Medium: 2px
- Thick: 4px

Opacity:
- Disabled: 0.5
- Hover: 0.8
- Overlay: 0.7
```

---

## 2. Page List

### 2.1 Public Pages
1. Homepage
2. Reader Listing
3. Reader Profile
4. Store
5. Product Page
6. Blog
7. Blog Post
8. Contact
9. About

### 2.2 Authentication Pages
10. Login
11. Register
12. Verify OTP
13. Forgot Password

### 2.3 User Dashboard Pages
14. User Dashboard (Overview)
15. User Sessions
16. User Bookings
17. User Wallet
18. User Favorites
19. User Orders
20. User Profile
21. User Settings

### 2.4 Reader Dashboard Pages
22. Reader Dashboard (Overview)
23. Reader Sessions
24. Reader Earnings
25. Reader Availability
26. Reader Profile
27. Reader Settings

### 2.5 Session Pages
28. Chat UI
29. Call UI
30. AI Guidance

### 2.6 Payment Pages
31. Wallet Recharge
32. Checkout
33. Payment Success
34. Payment Failed

### 2.7 Admin Pages
35. Admin Dashboard
36. Admin Users
37. Admin Readers
38. Admin Transactions
39. Admin Sessions
40. Admin Products
41. Admin Blog
42. Admin Settings

---

## 3. Section Breakdown for Each Page

### 3.1 Homepage

```
Sections:
1. Header
   - Logo (left)
   - Navigation menu (center)
   - Login/Register buttons (right)
   - Mobile hamburger menu

2. Hero Section
   - Headline: "Connect with Spiritual Guides"
   - Subheadline: "Get personalized guidance from certified readers"
   - CTA Button: "Find Your Reader"
   - Background: Spiritual imagery with gradient overlay

3. Featured Readers Section
   - Section title: "Top Rated Readers"
   - Reader cards (3-4 cards)
   - Each card: Photo, name, specialization, rating, price
   - CTA: "View All Readers"

4. How It Works Section
   - Section title: "How It Works"
   - 3 steps with icons:
     * Step 1: "Choose a Reader"
     * Step 2: "Start a Session"
     * Step 3: "Get Guidance"
   - CTA: "Get Started"

5. AI Guidance Section
   - Section title: "AI Spiritual Guide"
   - Description: "Instant guidance powered by AI"
   - CTA: "Try AI Guide"
   - Background: Subtle gradient

6. Testimonials Section
   - Section title: "What Our Users Say"
   - Testimonial cards (3-4 cards)
   - Each card: Quote, user name, rating

7. Store Preview Section
   - Section title: "Spiritual Products"
   - Product cards (4-6 cards)
   - Each card: Image, name, price
   - CTA: "Visit Store"

8. Blog Preview Section
   - Section title: "Latest Articles"
   - Blog cards (3 cards)
   - Each card: Image, title, excerpt, date
   - CTA: "Read More"

9. Footer
   - Logo
   - Navigation links
   - Social media icons
   - Contact information
   - Copyright notice
```

### 3.2 Reader Listing

```
Sections:
1. Header
   - Logo
   - Navigation
   - User menu (if logged in)

2. Page Header
   - Title: "Find Your Reader"
   - Subtitle: "Browse our certified spiritual guides"

3. Filters Sidebar
   - Specialization filter (checkboxes)
   - Price range filter (slider)
   - Rating filter (stars)
   - Availability filter (online now)
   - Language filter
   - Clear filters button

4. Reader Grid
   - Reader cards (grid layout)
   - Each card:
     * Reader photo
     * Name
     * Specialization
     * Rating (stars)
     * Price per minute
     * Online status indicator
     * "View Profile" button

5. Pagination
   - Page numbers
   - Previous/Next buttons

6. Footer
```

### 3.3 Reader Profile

```
Sections:
1. Header

2. Reader Header Section
   - Large reader photo
   - Name
   - Specialization
   - Rating (stars + count)
   - Online status
   - Price per minute
   - "Start Chat" button
   - "Book Session" button
   - "Add to Favorites" button

3. About Section
   - Section title: "About"
   - Reader bio
   - Experience years
   - Languages spoken

4. Availability Section
   - Section title: "Availability"
   - Weekly calendar view
   - Available time slots
   - Online/offline status

5. Reviews Section
   - Section title: "Reviews"
   - Overall rating summary
   - Review cards (list)
   - Each card: User name, rating, comment, date
   - "Write Review" button (if session completed)

6. Related Readers Section
   - Section title: "Similar Readers"
   - Reader cards (3-4 cards)

7. Footer
```

### 3.4 Chat UI

```
Sections:
1. Chat Header
   - Reader photo (small)
   - Reader name
   - Online status
   - Session timer
   - Wallet balance
   - End session button

2. Chat Messages Area
   - Message bubbles (user and reader)
   - Timestamps
   - Typing indicator
   - Scroll to bottom button

3. Chat Input Area
   - Text input field
   - Send button
   - Attachment button (optional)
   - Low balance warning (if applicable)

4. Session Info Panel (collapsible)
   - Session duration
   - Cost so far
   - Reader per-minute rate
```

### 3.5 Call UI

```
Sections:
1. Call Header
   - Reader photo (large)
   - Reader name
   - Call status (connecting, active, ended)
   - Session timer

2. Call Controls
   - Mute button
   - Speaker button
   - End call button

3. Call Info
   - Wallet balance
   - Cost per minute
   - Low balance warning

4. Post-Call Screen
   - Session summary
   - Total cost
   - Duration
   - "Rate Reader" button
   - "Return to Dashboard" button
```

### 3.6 AI Guidance Page

```
Sections:
1. Header

2. Page Header
   - Title: "AI Spiritual Guide"
   - Subtitle: "Get instant spiritual guidance"

3. Guidance Type Selection
   - Tarot Reading button
   - Horoscope button
   - General Guidance button

4. Chat Interface
   - AI messages
   - User messages
   - Input field
   - Send button
   - Query counter (free tier)

5. Guidance History
   - Section title: "Previous Readings"
   - History cards (list)
   - Each card: Date, type, preview

6. Footer
```

### 3.7 Store Page

```
Sections:
1. Header

2. Page Header
   - Title: "Spiritual Products"
   - Subtitle: "Curated items for your spiritual journey"

3. Filters Sidebar
   - Category filter
   - Price range filter
   - Availability filter

4. Product Grid
   - Product cards (grid layout)
   - Each card:
     * Product image
     * Name
     * Price
     * "Add to Cart" button

5. Pagination

6. Footer
```

### 3.8 Product Page

```
Sections:
1. Header

2. Product Section
   - Product images (gallery)
   - Product name
   - Price
   - Description
   - Stock status
   - Quantity selector
   - "Add to Cart" button
   - "Buy Now" button

3. Product Details
   - Specifications
   - Materials
   - Dimensions

4. Related Products
   - Section title: "You May Also Like"
   - Product cards (4-6 cards)

5. Footer
```

### 3.9 User Dashboard

```
Sections:
1. Sidebar Navigation
   - Dashboard link
   - Sessions link
   - Bookings link
   - Wallet link
   - Favorites link
   - Orders link
   - Profile link
   - Settings link

2. Main Content Area
   - Welcome message
   - Stats cards:
     * Wallet balance
     * Total sessions
     * Upcoming bookings
   - Recent sessions list
   - Upcoming bookings list

3. Quick Actions
   - "Find a Reader" button
   - "Recharge Wallet" button
   - "View AI Guide" button
```

### 3.10 Reader Dashboard

```
Sections:
1. Sidebar Navigation
   - Dashboard link
   - Sessions link
   - Earnings link
   - Availability link
   - Profile link
   - Settings link

2. Main Content Area
   - Welcome message
   - Stats cards:
     * Total earnings
     * Pending payout
     * Total sessions
     * Rating
   - Recent sessions list
   - Upcoming bookings list

3. Quick Actions
   - "Update Availability" button
   - "View Earnings" button
   - "Go Online" toggle
```

### 3.11 Blog Page

```
Sections:
1. Header

2. Page Header
   - Title: "Blog"
   - Subtitle: "Spiritual insights and guidance"

3. Featured Post
   - Large featured post card
   - Image, title, excerpt, date, author

4. Blog Grid
   - Blog cards (grid layout)
   - Each card: Image, title, excerpt, date, category

5. Categories Sidebar
   - Category list with post counts

6. Pagination

7. Footer
```

### 3.12 Auth Pages (Login/Register)

```
Sections:
1. Auth Container
   - Logo
   - Form title
   - Form fields:
     * Email/Phone input
     * Password input (login)
     * Name input (register)
     * DOB input (register)
   - Submit button
   - Social login buttons
   - Link to other auth page
   - Terms and conditions link (register)
```

### 3.13 Payment Pages

```
Wallet Recharge:
1. Header
2. Amount Selection
   - Predefined amounts
   - Custom amount input
3. Payment Method Selection
   - Razorpay (India)
   - PayPal (International)
4. "Proceed to Pay" button

Checkout (Store):
1. Header
2. Order Summary
   - Product list
   - Subtotal
   - Shipping
   - Total
3. Shipping Address Form
4. Payment Method Selection
5. "Place Order" button

Payment Success:
1. Success icon
2. "Payment Successful" message
3. Transaction details
4. "Continue" button

Payment Failed:
1. Error icon
2. "Payment Failed" message
3. Error details
4. "Try Again" button
```

---

## 4. Component List (Reusable)

### 4.1 Navigation Components

```
- Header (Desktop)
- Header (Mobile)
- Sidebar Navigation
- Footer
- Breadcrumbs
- Pagination
- Tabs
- Mobile Menu
```

### 4.2 Card Components

```
- Reader Card
- Product Card
- Blog Card
- Session Card
- Booking Card
- Order Card
- Transaction Card
- Review Card
- Testimonial Card
- Stats Card
```

### 4.3 Form Components

```
- Input Field
- Textarea
- Select Dropdown
- Checkbox
- Radio Button
- Toggle Switch
- Date Picker
- Time Picker
- File Upload
- Search Input
- Range Slider
- Quantity Selector
```

### 4.4 Button Components

```
- Primary Button
- Secondary Button
- Outline Button
- Ghost Button
- Icon Button
- Button Group
- Loading Button
- Disabled Button
```

### 4.5 Feedback Components

```
- Alert
- Toast Notification
- Modal
- Dialog
- Tooltip
- Popover
- Progress Bar
- Spinner
- Skeleton Loader
- Badge
- Status Indicator
```

### 4.6 Data Display Components

```
- Table
- List
- Grid
- Avatar
- Rating Stars
- Price Display
- Timer Display
- Wallet Balance Display
- Status Tag
- Category Tag
```

### 4.7 Session Components

```
- Chat Message Bubble
- Chat Input
- Typing Indicator
- Session Timer
- Wallet Balance Widget
- Call Controls
- Call Status
- Session Summary
```

### 4.8 Layout Components

```
- Container
- Section
- Grid Layout
- Flex Layout
- Divider
- Spacer
- Card
- Panel
```

---

## 5. UX Rules

### 5.1 Navigation

```
Primary Navigation:
- Logo always links to homepage
- Main navigation items: Home, Readers, Store, Blog, AI Guide
- User menu (when logged in): Dashboard, Profile, Wallet, Logout
- Login/Register buttons (when logged out)

Mobile Navigation:
- Hamburger menu for primary navigation
- Bottom navigation bar for key actions:
  * Home
  * Readers
  * AI Guide
  * Store
  * Profile (if logged in)

Breadcrumb Navigation:
- Show on all inner pages
- Format: Home > Category > Page
- Clickable links

Dashboard Navigation:
- Sidebar navigation (left side)
- Collapsible on mobile
- Active state highlighting
- Icons with labels
```

### 5.2 CTA Placement

```
Primary CTAs:
- "Find Your Reader" - Homepage hero, prominent placement
- "Start Chat" - Reader profile, above fold
- "Book Session" - Reader profile, next to "Start Chat"
- "Recharge Wallet" - Dashboard, wallet page
- "Add to Cart" - Product cards, product page

Secondary CTAs:
- "View Profile" - Reader cards
- "Read More" - Blog cards
- "Learn More" - Information sections
- "Try AI Guide" - AI section

CTA Hierarchy:
- Primary: Filled button (purple background)
- Secondary: Outline button (purple border)
- Tertiary: Text link (purple text)

CTA Placement Rules:
- Primary CTA always visible above fold
- Sticky CTA on mobile (bottom of screen)
- CTA buttons minimum size: 44px height
- CTA spacing: 16px between buttons
```

### 5.3 Mobile Behavior

```
Responsive Breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

Mobile Layout Rules:
- Single column layout
- Stack filters vertically (accordion style)
- Hide sidebar, show hamburger menu
- Larger touch targets (minimum 44px)
- Simplified navigation
- Bottom sticky CTA for key actions

Mobile Components:
- Collapsible sections
- Swipeable carousels
- Bottom sheet for filters
- Modal full-screen on mobile
- Touch-friendly inputs

Mobile Performance:
- Lazy load images
- Infinite scroll for lists
- Skeleton loaders for content
- Optimized images (WebP format)
- Minimal JavaScript bundles

Mobile-Specific Features:
- Pull to refresh
- Swipe gestures
- Touch feedback
- Haptic feedback (optional)
- Native-like transitions
```

### 5.4 General UX Rules

```
Loading States:
- Show skeleton loaders during data fetch
- Show spinner for button actions
- Show progress bar for multi-step processes

Error Handling:
- Display clear error messages
- Provide retry options
- Show fallback content
- Log errors for debugging

Success Feedback:
- Show toast notifications
- Display success messages
- Update UI immediately
- Provide next steps

Accessibility:
- Minimum contrast ratio: 4.5:1
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators
- Alt text for images

Performance:
- Page load time < 2 seconds
- Smooth animations (60fps)
- Optimized images
- Minimal HTTP requests
- Caching strategies

User Flow:
- Minimum steps to complete actions
- Clear progress indicators
- Easy back navigation
- Save user progress
- Confirmation for destructive actions
```

---

## THIS UI SYSTEM IS LOCKED AND FINAL
