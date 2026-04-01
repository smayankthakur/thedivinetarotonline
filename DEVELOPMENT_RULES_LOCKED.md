# Development Rules Document
## Spiritual Guidance Platform

**Version:** 1.0  
**Date:** April 1, 2026  
**Status:** LOCKED AND ENFORCED  
**Authority:** Technical Project Controller

---

## 1. Scope Control Rules

### 1.1 Feature Addition Rules
- No feature addition after Phase 0 completion
- All features must be defined in PRD before development starts
- Any feature request after Phase 0 requires formal change request process
- Change request must be approved by all stakeholders
- Change request must include impact analysis on timeline and budget

### 1.2 UI/UX Change Rules
- No UI change after UI system lock
- All UI components must follow design system exactly
- No custom components outside approved component library
- No color changes outside approved color palette
- No typography changes outside approved font system
- No spacing changes outside approved spacing scale

### 1.3 Backend Restructuring Rules
- No backend restructuring after architecture lock
- All services must follow approved architecture
- No database schema changes after schema lock
- No API endpoint changes after API definition
- No technology stack changes after stack lock

---

## 2. Development Discipline

### 2.1 Phase-Based Execution
- Development must follow defined phases strictly
- Phase 0: Planning and Setup
- Phase 1: Core Infrastructure
- Phase 2: User and Reader Systems
- Phase 3: Session and Payment Systems
- Phase 4: Store and Content Systems
- Phase 5: Testing and Deployment
- No phase skipping allowed
- Each phase must be completed before next begins
- Phase completion requires formal sign-off

### 2.2 Dependency Management
- No skipping dependencies
- All dependencies must be documented
- Dependencies must be resolved in order
- Blocked dependencies must be escalated immediately
- No workarounds without approval

### 2.3 API-First Development
- All APIs must be defined before frontend development
- API documentation must be complete and accurate
- API contracts must be finalized before implementation
- No frontend development without API specification
- API changes require version increment

---

## 3. Code Standards

### 3.1 Folder Structure Consistency
```
Frontend (Next.js):
/app
  /(auth)
  /(user)
  /(reader)
  /(admin)
  /api
/components
  /ui
  /forms
  /cards
  /layout
/lib
/hooks
/types
/styles

Backend (FastAPI):
/app
  /api
    /v1
  /core
  /models
  /services
  /schemas
  /websocket
/tests
```

### 3.2 Naming Conventions
```
Files:
- Components: PascalCase (UserProfile.tsx)
- Utilities: camelCase (formatDate.ts)
- API routes: kebab-case (user-profile.ts)
- Database tables: snake_case (user_profiles)

Variables:
- JavaScript/TypeScript: camelCase (userId)
- Python: snake_case (user_id)
- Constants: UPPER_SNAKE_CASE (MAX_RETRIES)

Functions:
- JavaScript/TypeScript: camelCase (getUserById)
- Python: snake_case (get_user_by_id)

Classes:
- All languages: PascalCase (UserService)

Database:
- Tables: snake_case (user_profiles)
- Columns: snake_case (created_at)
- Indexes: idx_table_column (idx_users_email)
```

### 3.3 API Versioning
- All APIs must be versioned (/api/v1/)
- No breaking changes without version increment
- Deprecated endpoints must be marked
- Old versions supported for minimum 6 months
- Version documentation required

---

## 4. Testing Rules

### 4.1 Module Testing Requirements
- Each module must be tested before next module begins
- Unit tests required for all functions
- Integration tests required for all APIs
- End-to-end tests required for critical flows
- Test coverage minimum: 80%

### 4.2 Testing Sequence
```
1. Unit Tests
   - All service functions
   - All utility functions
   - All validation functions

2. Integration Tests
   - All API endpoints
   - Database operations
   - External service integrations

3. End-to-End Tests
   - User registration flow
   - Session initiation flow
   - Payment flow
   - Order placement flow

4. Performance Tests
   - Load testing
   - Stress testing
   - API response time testing

5. Security Tests
   - Authentication testing
   - Authorization testing
   - Input validation testing
   - SQL injection testing
   - XSS testing
```

### 4.3 Deployment Testing
- No untested deployment to production
- All tests must pass before deployment
- Staging environment testing required
- User acceptance testing required
- Rollback plan required

---

## 5. Deployment Rules

### 5.1 Staging Before Production
- All code must be deployed to staging first
- Staging environment must mirror production
- Minimum 24 hours staging testing
- All tests must pass on staging
- Performance benchmarks must be met on staging

### 5.2 Logging Requirements
- Logging mandatory for all services
- Log levels: DEBUG, INFO, WARNING, ERROR, CRITICAL
- All API requests must be logged
- All errors must be logged with stack trace
- All financial transactions must be logged
- Log retention: minimum 90 days
- Log aggregation required (ELK Stack)

### 5.3 Monitoring Requirements
- Uptime monitoring required
- Performance monitoring required
- Error rate monitoring required
- Alert thresholds must be defined
- On-call rotation required

---

## 6. FAILURE CONDITIONS

### 6.1 System Integrity Breakers
```
The following actions will break system integrity and are FORBIDDEN:

1. Deploying untested code to production
2. Modifying database schema without migration script
3. Changing API contracts without version increment
4. Adding features outside defined scope
5. Modifying UI components outside design system
6. Skipping security testing
7. Deploying without logging
8. Deploying without monitoring
9. Deploying without rollback plan
10. Modifying locked configuration files
11. Bypassing authentication/authorization
12. Storing sensitive data unencrypted
13. Exposing internal APIs publicly
14. Using deprecated dependencies
15. Ignoring error handling
```

### 6.2 Code Quality Violations
```
The following code quality violations are NOT ACCEPTABLE:

1. Code without tests
2. Code without documentation
3. Code with hardcoded secrets
4. Code with SQL injection vulnerabilities
5. Code with XSS vulnerabilities
6. Code without error handling
7. Code without input validation
8. Code with performance issues
9. Code with memory leaks
10. Code with race conditions
```

### 6.3 Process Violations
```
The following process violations will halt development:

1. Skipping phase sign-off
2. Deploying without approval
3. Modifying locked documents
4. Adding unauthorized dependencies
5. Bypassing code review
6. Ignoring test failures
7. Deploying during peak hours without notice
8. Modifying production database directly
9. Sharing credentials
10. Ignoring security alerts
```

---

## ALL DEVELOPMENT RULES ARE LOCKED AND ENFORCED
