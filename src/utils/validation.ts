
/**
 * Sanitizes input by removing potentially harmful characters
 */
export const sanitizeInput = (value: string): string => {
  return value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Validates and sanitizes numeric input - NO DECIMALS ALLOWED
 */
export const validateNumericInput = (value: string): boolean => {
  const sanitized = sanitizeInput(value);
  // Allow empty string and integers only (no decimals)
  if (sanitized === '') return true;
  return /^\d+$/.test(sanitized) && !isNaN(parseInt(sanitized));
};

/**
 * Validates OBID format (should be alphanumeric)
 */
export const validateObid = (obid: string): boolean => {
  const sanitized = sanitizeInput(obid);
  return /^[a-zA-Z0-9]{3,20}$/.test(sanitized);
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  const sanitized = sanitizeInput(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitized);
};

export const isFormValid = (data: any): boolean => {
  const isOptionalOtherField = (key: string) => {
    const k = key.toLowerCase();
    // Optional if it is one of the new Other Expense fields (1/2) or their comments
    // Examples: otherSalesExpense1, otherSalesExpense1Comment, otherOperationalExpense2, otherStoreExpense2Comment, otheradministrativehqexpense1, otherheadofficeexpense2comment
    return /other[a-z]*expense[12](comment)?$/i.test(key);
  };

  return Object.entries(data).every(([key, value]) => {
    const v = sanitizeInput(String(value));

    // Comments are always optional across forms
    if (key.toLowerCase().includes('comment')) {
      return true;
    }

    // Month is required and must be non-empty
    if (key === 'month') {
      return v !== '';
    }

    // New Other Expense fields are optional when empty
    if (isOptionalOtherField(key)) {
      if (v === '') return true; // optional empty
      // if provided, must be valid integer (already enforced by validateNumericInput)
      return validateNumericInput(v) && (v === '0' || parseFloat(v) >= 0);
    }

    // All other fields are required and must be valid numbers (whole numbers only)
    if (v === '') return false;
    return validateNumericInput(v) && (v === '0' || parseFloat(v) >= 0);
  });
};

export const getEmptyFields = (data: any): string[] => {
  const isOptionalOtherField = (key: string) => /other[a-z]*expense[12](comment)?$/i.test(key);

  return Object.entries(data)
    .filter(([key, value]) => {
      const v = sanitizeInput(String(value));
      // Skip optional fields (comments and new other expense fields)
      if (key.toLowerCase().includes('comment')) return false;
      if (isOptionalOtherField(key)) return false;
      return v === '';
    })
    .map(([key, _]) => key);
};
