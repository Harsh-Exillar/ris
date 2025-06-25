
export const validateNumericInput = (value: string): boolean => {
  return /^\d*\.?\d*$/.test(value) && value !== '';
};

export const isFormValid = (data: any): boolean => {
  return Object.values(data).every(value => (value as string).trim() !== '' && validateNumericInput(value as string));
};

export const getEmptyFields = (data: any): string[] => {
  return Object.entries(data)
    .filter(([_, value]) => (value as string).trim() === '')
    .map(([key, _]) => key);
};
