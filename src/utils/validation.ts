
export const validateNumericInput = (value: string): boolean => {
  return /^\d*\.?\d*$/.test(value) && value !== '';
};

export const isFormValid = (data: Record<string, string>): boolean => {
  return Object.values(data).every(value => value.trim() !== '' && validateNumericInput(value));
};

export const getEmptyFields = (data: Record<string, string>): string[] => {
  return Object.entries(data)
    .filter(([_, value]) => value.trim() === '')
    .map(([key, _]) => key);
};
