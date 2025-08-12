
export const validateNumericInput = (value: string): boolean => {
  // Allow empty string, integers, and floats with up to 2 decimal places
  return /^\d*\.?\d{0,2}$/.test(value);
};

export const isFormValid = (data: any): boolean => {
  return Object.values(data).every(value => (value as string).trim() !== '' && validateNumericInput(value as string));
};

export const getEmptyFields = (data: any): string[] => {
  return Object.entries(data)
    .filter(([_, value]) => (value as string).trim() === '')
    .map(([key, _]) => key);
};
