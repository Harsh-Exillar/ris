
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { OtherExpensesOBData } from './MultiStepForm';
import { validateNumericInput, isFormValid, getEmptyFields } from '../utils/validation';

interface OtherExpensesOBFormProps {
  data: OtherExpensesOBData;
  setData: (data: OtherExpensesOBData) => void;
  onNext: () => void;
  onBack: () => void;
}

const OtherExpensesOBForm: React.FC<OtherExpensesOBFormProps> = ({ data, setData, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emptyFieldsHighlighted, setEmptyFieldsHighlighted] = useState<string[]>([]);

  const handleInputChange = (field: keyof OtherExpensesOBData, value: string) => {
    if (value === '' || validateNumericInput(value)) {
      setData({
        ...data,
        [field]: value
      });
      setErrors(prev => ({ ...prev, [field]: '' }));
      setEmptyFieldsHighlighted(prev => prev.filter(f => f !== field));
    } else {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numerical value only' }));
    }
  };

  const handleNext = () => {
    if (isFormValid(data)) {
      onNext();
    } else {
      const emptyFields = getEmptyFields(data);
      setEmptyFieldsHighlighted(emptyFields);
    }
  };

  const isFieldEmpty = (field: string) => emptyFieldsHighlighted.includes(field);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="p-8">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-4xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Amatic SC, cursive' }}>
            OTHER EXPENSE OB
          </h1>
          <p className="text-gray-500 mt-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
            Please Enter your Other OB Expense details here
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Franchise Fee
            </label>
            <input
              type="text"
              value={data.franchiseFee}
              onChange={(e) => handleInputChange('franchiseFee', e.target.value)}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                isFieldEmpty('franchiseFee') ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter numerical value"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
            {errors.franchiseFee && (
              <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {errors.franchiseFee}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Marketing - OB HO
            </label>
            <input
              type="text"
              value={data.marketingOBHO}
              onChange={(e) => handleInputChange('marketingOBHO', e.target.value)}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                isFieldEmpty('marketingOBHO') ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter numerical value"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
            {errors.marketingOBHO && (
              <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {errors.marketingOBHO}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-8 py-3 rounded-full transition-colors"
            style={{ backgroundColor: '#EBEBEB', color: '#003A70' }}
          >
            <ArrowLeft size={20} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>Back</span>
          </button>
          <button
            onClick={handleNext}
            disabled={!isFormValid(data)}
            className={`flex items-center space-x-2 px-8 py-3 rounded-full transition-colors ${
              isFormValid(data)
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>Next</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherExpensesOBForm;
