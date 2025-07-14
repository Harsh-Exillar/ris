
import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ExpensesData } from './MultiStepForm';
import { validateNumericInput, isFormValid, getEmptyFields } from '../utils/validation';

interface ExpensesFormProps {
  data: ExpensesData;
  setData: (data: ExpensesData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ExpensesForm: React.FC<ExpensesFormProps> = ({ data, setData, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emptyFieldsHighlighted, setEmptyFieldsHighlighted] = useState<string[]>([]);

  const handleInputChange = (field: keyof ExpensesData, value: string) => {
    if (value === '' || validateNumericInput(value)) {
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
    if (isFormValid(data)) {
      onNext();
    } else {
      const emptyFields = getEmptyFields(data);
      setEmptyFieldsHighlighted(emptyFields);
    }
  };

  const isFieldEmpty = (field: string) => emptyFieldsHighlighted.includes(field);

  const inputFields = [
    { key: 'cleaningMaterialsLaundry', label: 'Cleaning Materials & Laundry' },
    { key: 'consumablePackaging', label: 'Consumable & Packaging' },
    { key: 'cutleryCrockery', label: 'Cutlery & Crockery' },
    { key: 'obVouchers', label: 'OB Vouchers' },
    { key: 'pestControl', label: 'Pest Control' },
    { key: 'printingStationery', label: 'Printing & Stationery' },
    { key: 'promotions', label: 'Promotions' }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="p-8">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-4xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
            EXPENSES OPERATIONAL
          </h1>
          <p className="text-gray-500 mt-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
            Please enter your expense details here (All values to exclude vat where applicable)
          </p>
        </div>

        <div className="space-y-6">
          {inputFields.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                {label}
              </label>
              <input
                type="text"
                value={data[key as keyof ExpensesData]}
                onChange={(e) => handleInputChange(key as keyof ExpensesData, e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty(key) ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter numerical value (e.g., 126.33)"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors[key] && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors[key]}
                </p>
              )}
            </div>
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

export default ExpensesForm;
