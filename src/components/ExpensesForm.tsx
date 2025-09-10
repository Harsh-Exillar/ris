
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
    // Comment fields can be any text, expense fields must be whole numbers only
    if (field.includes('Comment') || value === '' || validateNumericInput(value)) {
      setData({
        ...data,
        [field]: value
      });
      setErrors(prev => ({ ...prev, [field]: '' }));
      setEmptyFieldsHighlighted(prev => prev.filter(f => f !== field));
    } else {
      setErrors(prev => ({ ...prev, [field]: 'Please enter whole numbers only (no decimals)' }));
    }
  };

  const handleNext = () => {
    // Clear any previous errors
    setErrors({});

    if (isFormValid(data)) {
      onNext();
    } else {
      const emptyFields = getEmptyFields(data);
      setEmptyFieldsHighlighted(emptyFields);
    }
  };

  const isFieldEmpty = (field: string) => emptyFieldsHighlighted.includes(field);

  const inputFields = [
    { key: 'cleaningMaterialsLaundry', label: 'Cleaning Material & Laundry *' },
    { key: 'consumablePackaging', label: 'Consumable & Packaging *' },
    { key: 'cutleryCrockery', label: 'Cutlery & Crockery *' },
    { key: 'obVouchers', label: 'In Store Vouchers - Redeemed *' },
    { key: 'pestControl', label: 'Pest Control *' },
    { key: 'printingStationery', label: 'Printing & Stationery *' },
    { key: 'promotions', label: 'Promotions *' }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="p-8">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-4xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
            EXPENSES OPERATIONAL
          </h1>
          <div className="bg-orange-50 p-4 rounded-lg mt-3">
            <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
              Enter your operational expense details below. All amounts must exclude VAT.
            </p>
            <p className="text-gray-600 text-xs mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Note: Enter "0" for any field where you don't have data
            </p>
          </div>
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
                placeholder="Enter your value"
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

        {/* Other Operational Expenses Section */}
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif' }}>
            Other Operational Expenses
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Other Operational Expense 1
              </label>
              <input
                type="number"
                value={data.otherOperationalExpense1}
                onChange={(e) => handleInputChange('otherOperationalExpense1', e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty('otherOperationalExpense1') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your value"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors.otherOperationalExpense1 && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors.otherOperationalExpense1}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Other Operational Expense 2
              </label>
              <input
                type="number"
                value={data.otherOperationalExpense2}
                onChange={(e) => handleInputChange('otherOperationalExpense2', e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty('otherOperationalExpense2') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your value"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors.otherOperationalExpense2 && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors.otherOperationalExpense2}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Other Operational Expense 1 Comment
              </label>
              <textarea
                value={data.otherOperationalExpense1Comment}
                onChange={(e) => handleInputChange('otherOperationalExpense1Comment', e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty('otherOperationalExpense1Comment') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter comment for Other Operational Expense 1"
                rows={3}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors.otherOperationalExpense1Comment && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors.otherOperationalExpense1Comment}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Other Operational Expense 2 Comment
              </label>
              <textarea
                value={data.otherOperationalExpense2Comment}
                onChange={(e) => handleInputChange('otherOperationalExpense2Comment', e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty('otherOperationalExpense2Comment') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter comment for Other Operational Expense 2"
                rows={3}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors.otherOperationalExpense2Comment && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors.otherOperationalExpense2Comment}
                </p>
              )}
            </div>
          </div>
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
