# Security Guide

## Environment Variables

This project uses environment variables to store sensitive configuration. Never commit `.env` files to version control.

### Required Environment Variables

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_WEBHOOK_URL=your_webhook_url (optional)
```

### Setup Instructions

1. Copy `.env.example` to `.env`
2. Fill in your actual values
3. Restart the development server

## Security Features Implemented

### 1. Environment Variable Protection
- Moved all sensitive credentials to environment variables
- Added `.env` to `.gitignore`
- Created `.env.example` template

### 2. Input Validation & Sanitization
- Added comprehensive input sanitization
- Implemented OBID validation
- Enhanced form validation with security checks

### 3. Content Security Policy (CSP)
- Implemented strict CSP headers
- Restricted script sources
- Prevented XSS attacks

### 4. Security Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: enabled
- Referrer-Policy: strict-origin-when-cross-origin

### 5. TypeScript Security
- Enabled strict mode
- Added security-focused lint rules
- Disabled dangerous TypeScript options

### 6. Build Security
- Disabled source maps in production
- Added security-focused build configuration

## Security Best Practices

1. **Never log passwords** - Passwords are redacted in webhook calls
2. **Sanitize all user inputs** - All form inputs are sanitized
3. **Validate data types** - Numeric fields are validated
4. **Use environment variables** - No hardcoded secrets
5. **Regular security audits** - Run `npm run security-check`

## Development Security

Run these commands regularly:

```bash
# Check for vulnerabilities
npm run security-check

# Fix linting issues
npm run lint:fix

# Type check
npm run type-check
```
