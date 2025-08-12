
export const validateNumericInput = (value: string): boolean => {
  // Allow empty string, integers, and floats with up to 2 decimal places
  return /^\d*\.?\d{0,2}$/.test(value);
};

export const isFormValid = (data: any): boolean => {
  return Object.entries(data).every(([key, value]) => {
    const v = String(value).trim();
    if (v === '') return false;
    // Skip numeric validation for non-numeric fields
    if (key === 'month' || key.toLowerCase().includes('comment')) return true;
    return validateNumericInput(v);
  });
};

export const getEmptyFields = (data: any): string[] => {
  return Object.entries(data)
    .filter(([_, value]) => (value as string).trim() === '')
    .map(([key, _]) => key);
};
