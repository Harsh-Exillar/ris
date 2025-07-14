import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { OtherExpensesData } from './MultiStepForm';
import { validateNumericInput, isFormValid, getEmptyFields } from '../utils/validation';

interface OtherExpensesFormProps {
  data: OtherExpensesData;
  setData: (data: OtherExpensesData) => void;
  onNext: () => void;
  onBack: () => void;
}

const OtherExpensesForm: React.FC<OtherExpensesFormProps> = ({ data, setData, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emptyFieldsHighlighted, setEmptyFieldsHighlighted] = useState<string[]>([]);

  const handleInputChange = (field: keyof OtherExpensesData, value: string) => {
    if (String(field).includes('Comment') || value === '' || validateNumericInput(value)) {
      setData({
        ...data,
        [field]: value
      });
      setErrors(prev => ({ ...prev, [field]: '' }));
      setEmptyFieldsHighlighted(prev => prev.filter(f => f !== field));
    } else {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numerical value only (up to 2 decimal places)' }));
    }
  };

  const handleNext = () => {
    // Custom validation for Other Expenses
    const requiredFields: string[] = [];
    
    // Check each expense field and make comment required if expense is filled
    for (let i = 1; i <= 10; i++) {
      const expenseField = `otherExpenses${i}`;
      const commentField = `otherExpenses${i}Comment`;
      const expenseValue = data[expenseField as keyof OtherExpensesData];
      const commentValue = data[commentField as keyof OtherExpensesData];
      
      if (expenseValue && expenseValue.trim() !== '' && (!commentValue || commentValue.trim() === '')) {
        requiredFields.push(commentField);
      }
    }
    
    if (requiredFields.length === 0) {
      onNext();
    } else {
      setEmptyFieldsHighlighted(requiredFields);
    }
  };

  const isFieldEmpty = (field: string) => emptyFieldsHighlighted.includes(field);

  const expenseFields = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="p-8">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-4xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
            OTHER EXPENSES
          </h1>
          <p className="text-gray-500 mt-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
            Please enter your Other Expense details here (All values to exclude vat where applicable)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {expenseFields.map((num) => (
            <React.Fragment key={num}>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                  Other Expenses {num}
                </label>
                <input
                  type="text"
                  value={data[`otherExpenses${num}` as keyof OtherExpensesData]}
                  onChange={(e) => handleInputChange(`otherExpenses${num}` as keyof OtherExpensesData, e.target.value)}
                  className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                    isFieldEmpty(`otherExpenses${num}`) ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter numerical value (e.g., 126.33)"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
                {errors[`otherExpenses${num}`] && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {errors[`otherExpenses${num}`]}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                  Other Expenses {num} Comment {data[`otherExpenses${num}` as keyof OtherExpensesData] ? '*' : ''}
                </label>
                <textarea
                  value={data[`otherExpenses${num}Comment` as keyof OtherExpensesData]}
                  onChange={(e) => handleInputChange(`otherExpenses${num}Comment` as keyof OtherExpensesData, e.target.value)}
                  className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all resize-none ${
                    isFieldEmpty(`otherExpenses${num}Comment`) ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter description or comment"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                  rows={3}
                />
                {errors[`otherExpenses${num}Comment`] && (
                  <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {errors[`otherExpenses${num}Comment`]}
                  </p>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="mt-12 flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-8 py-3 rounded-full transition-colors"
            style={{ backgroundColor: '#B8C2CB', color: '#003A70' }}
          >
            <ArrowLeft size={20} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>Back</span>
          </button>
          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-8 py-3 rounded-full transition-colors text-black"
            style={{ backgroundColor: '#FFF091' }}
          >
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>Next</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherExpensesForm;