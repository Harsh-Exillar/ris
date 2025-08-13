
export const validateNumericInput = (value: string): boolean => {
  // Allow empty string, integers, and floats with up to 2 decimal places
  // Also allow leading zeros and handle edge cases
  if (value === '') return true;
  return /^\d*\.?\d{0,2}$/.test(value) && !isNaN(parseFloat(value));
};

export const isFormValid = (data: any): boolean => {
  return Object.entries(data).every(([key, value]) => {
    const v = String(value).trim();
    if (v === '') return false;
    // Skip numeric validation for non-numeric fields
    if (key === 'month' || key.toLowerCase().includes('comment')) return true;
    // Ensure numeric fields are valid numbers
    return validateNumericInput(v) && (v === '0' || parseFloat(v) >= 0);
  });
};

export const getEmptyFields = (data: any): string[] => {
  return Object.entries(data)
    .filter(([_, value]) => (value as string).trim() === '')
    .map(([key, _]) => key);
};
