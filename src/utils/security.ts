// Security configuration and utilities for the Ocean Basket Restaurant Income Statement app

/**
 * Content Security Policy configuration
 */
export const CSP_CONFIG = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", 'https://cdnjs.cloudflare.com'],
  'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'img-src': ["'self'", 'data:', 'https:'],
  'connect-src': ["'self'", 'https://osfjlftoxaptnakviryr.supabase.co', 'https://exillar-n8n-u48653.vm.elestio.app'],
  'frame-ancestors': ["'none'"],
  'form-action': ["'self'"],
  'upgrade-insecure-requests': []
};

/**
 * Rate limiting configuration
 */
export const RATE_LIMIT_CONFIG = {
  maxAttempts: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  blockDuration: 60 * 60 * 1000 // 1 hour
};

/**
 * Input validation patterns
 */
export const VALIDATION_PATTERNS = {
  obid: /^[a-zA-Z0-9]{3,20}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  numeric: /^\d*\.?\d{0,2}$/,
  safeText: /^[a-zA-Z0-9\s\-_.,!?()]+$/
};

/**
 * Sanitization rules for different input types
 */
export const SANITIZATION_RULES = {
  removeScriptTags: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  removeHtmlTags: /<[^>]*>/g,
  removeJavascriptProtocol: /javascript:/gi,
  removeEventHandlers: /on\w+\s*=/gi,
  allowedChars: /[^a-zA-Z0-9\s\-_.,!?()@]/g
};

/**
 * Security headers for API requests
 */
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), location=()'
};

/**
 * Validate environment variables
 */
export const validateEnvironmentVariables = (): boolean => {
  const requiredEnvVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];

  const missing = requiredEnvVars.filter(envVar => !import.meta.env[envVar]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    return false;
  }
  
  return true;
};

/**
 * Enhanced input sanitization with configurable rules
 */
export const sanitizeInputAdvanced = (
  input: string, 
  type: 'text' | 'numeric' | 'email' | 'obid' = 'text'
): string => {
  let sanitized = input.trim();
  
  // Remove script tags and dangerous content
  sanitized = sanitized.replace(SANITIZATION_RULES.removeScriptTags, '');
  sanitized = sanitized.replace(SANITIZATION_RULES.removeJavascriptProtocol, '');
  sanitized = sanitized.replace(SANITIZATION_RULES.removeEventHandlers, '');
  
  // Type-specific sanitization
  switch (type) {
    case 'numeric':
      sanitized = sanitized.replace(/[^0-9.]/g, '');
      break;
    case 'email':
      sanitized = sanitized.replace(/[^a-zA-Z0-9@._-]/g, '');
      break;
    case 'obid':
      sanitized = sanitized.replace(/[^a-zA-Z0-9]/g, '');
      break;
    default:
      sanitized = sanitized.replace(SANITIZATION_RULES.allowedChars, '');
  }
  
  return sanitized;
};

/**
 * Generate CSP header string
 */
export const generateCSPHeader = (): string => {
  return Object.entries(CSP_CONFIG)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
};
