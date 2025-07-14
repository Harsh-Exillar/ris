import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ExpensesStoreData } from './MultiStepForm';
import { validateNumericInput, isFormValid, getEmptyFields } from '../utils/validation';

interface ExpensesStoreFormProps {
  data: ExpensesStoreData;
  setData: (data: ExpensesStoreData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ExpensesStoreForm: React.FC<ExpensesStoreFormProps> = ({ data, setData, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emptyFieldsHighlighted, setEmptyFieldsHighlighted] = useState<string[]>([]);

  const handleInputChange = (field: keyof ExpensesStoreData, value: string) => {
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

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="p-8">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-4xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
            EXPENSES STORE
          </h1>
          <p className="text-gray-500 mt-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
            Please enter your restaurant expense details here (All values to exclude vat where applicable)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { key: 'electricity', label: 'Electricity' },
            { key: 'water', label: 'Water' },
            { key: 'gas', label: 'Gas' },
            { key: 'insurance', label: 'Insurance' },
            { key: 'licenses', label: 'Licenses' },
            { key: 'rent', label: 'Rent' },
            { key: 'operationalCosts', label: 'Operational Costs' },
            { key: 'marketing', label: 'Marketing' },
            { key: 'rates', label: 'Rates' },
            { key: 'otherRentalExpenses', label: 'Other Rental Expenses' },
            { key: 'repairsMaintenance', label: 'Repairs & Maintenance' },
            { key: 'securityAlarmsGuards', label: 'Security Alarms & Guards' },
            { key: 'telephone', label: 'Telephone' }
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                {label}
              </label>
              <input
                type="text"
                value={data[key as keyof ExpensesStoreData]}
                onChange={(e) => handleInputChange(key as keyof ExpensesStoreData, e.target.value)}
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

export default ExpensesStoreForm;
