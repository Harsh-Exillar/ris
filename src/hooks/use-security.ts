import { useEffect, useState } from 'react';
import { validateEnvironmentVariables } from '@/utils/security';

/**
 * Custom hook to validate and monitor security configuration
 */
export const useSecurity = () => {
  const [isSecure, setIsSecure] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const validateSecurity = () => {
      const securityErrors: string[] = [];

      // Validate environment variables
      if (!validateEnvironmentVariables()) {
        securityErrors.push('Environment variables not configured properly');
      }

      // Check if running in development with proper setup
      if (import.meta.env.DEV) {
        if (!import.meta.env.VITE_SUPABASE_URL?.startsWith('https://')) {
          securityErrors.push('Supabase URL must use HTTPS');
        }
      }

      // Validate that we're not exposing sensitive data
      if (typeof window !== 'undefined') {
        // Check for exposed credentials in window object
        const dangerousProps = ['SUPABASE_SERVICE_KEY', 'DATABASE_URL', 'PRIVATE_KEY'];
        dangerousProps.forEach(prop => {
          if ((window as any)[prop]) {
            securityErrors.push(`Sensitive data exposed in window.${prop}`);
          }
        });
      }

      setErrors(securityErrors);
      setIsSecure(securityErrors.length === 0);
    };

    validateSecurity();
  }, []);

  return {
    isSecure,
    errors,
    validateSecurity: () => validateEnvironmentVariables()
  };
};

/**
 * Hook for rate limiting functionality
 */
export const useRateLimit = (maxAttempts = 5, windowMs = 15 * 60 * 1000) => {
  const [attempts, setAttempts] = useState(0);
  const [lastAttempt, setLastAttempt] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const canAttempt = (): boolean => {
    const now = Date.now();
    
    // Reset attempts if outside the window
    if (now - lastAttempt > windowMs) {
      setAttempts(0);
      setIsBlocked(false);
    }

    return attempts < maxAttempts && !isBlocked;
  };

  const recordAttempt = (): void => {
    const now = Date.now();
    setLastAttempt(now);
    setAttempts(prev => prev + 1);
    
    if (attempts + 1 >= maxAttempts) {
      setIsBlocked(true);
    }
  };

  const getRemainingTime = (): number => {
    return Math.ceil((windowMs - (Date.now() - lastAttempt)) / 60000);
  };

  const reset = (): void => {
    setAttempts(0);
    setLastAttempt(0);
    setIsBlocked(false);
  };

  return {
    canAttempt,
    recordAttempt,
    getRemainingTime,
    reset,
    isBlocked,
    remainingAttempts: Math.max(0, maxAttempts - attempts)
  };
};
