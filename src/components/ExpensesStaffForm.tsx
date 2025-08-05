import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ExpensesStaffData } from './MultiStepForm';
import { validateNumericInput, isFormValid, getEmptyFields } from '../utils/validation';

interface ExpensesStaffFormProps {
  data: ExpensesStaffData;
  setData: (data: ExpensesStaffData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ExpensesStaffForm: React.FC<ExpensesStaffFormProps> = ({ data, setData, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emptyFieldsHighlighted, setEmptyFieldsHighlighted] = useState<string[]>([]);

  const handleInputChange = (field: keyof ExpensesStaffData, value: string) => {
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
    { key: 'casualWages', label: 'Casual Wages *' },
    { key: 'uniforms', label: 'Uniforms *' },
    { key: 'salariesWagesBonus', label: 'Salaries & Wages Bonus *' },
    { key: 'salariesWagesBOH', label: 'Salaries & Wages BOH (Back of House) *' },
    { key: 'salariesWagesFOH', label: 'Salaries & Wages FOH (Front of House) *' },
    { key: 'salariesWagesManagers', label: 'Salaries & Wages Managers *' },
    { key: 'salariesOwner', label: 'Salaries Owner *' },
    { key: 'salariesWagesStatutoryDeductions', label: 'Salaries & Wages Statutory deductions (UIF, SDL), etc *' },
    { key: 'staffMealsKitchenCrew', label: 'Staff Meals Kitchen Crew *' },
    { key: 'staffMealsManagersWaiters', label: 'Staff Meals Managers & Waiters *' },
    { key: 'staffMealsOwners', label: 'Staff Meals Owners *' },
    { key: 'staffMedicalCost', label: 'Staff Medical Cost ( First Aid ) *' },
    { key: 'staffTransport', label: 'Staff Transport *' },
    { key: 'training', label: 'Training *' }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="p-8">
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold tracking-wide mb-4" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
              👥 EXPENSES STAFF
            </h1>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="bg-purple-500 rounded-full p-2 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  💼 Record Staff-Related Costs
                </h3>
                <div className="space-y-2 text-sm text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <div className="flex items-center space-x-2">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Important</span>
                    <span>All values must exclude VAT</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Tip</span>
                    <span>Enter 0 for any field you don't have data for</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map(({ key, label }) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                {label}
              </label>
              <input
                type="text"
                value={data[key as keyof ExpensesStaffData]}
                onChange={(e) => handleInputChange(key as keyof ExpensesStaffData, e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty(key) ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter numerical value or 0 (e.g., 126.33)"
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

export default ExpensesStaffForm;
