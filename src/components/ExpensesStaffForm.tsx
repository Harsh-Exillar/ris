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
    { key: 'casualWages', label: 'Casual Wages *' },
    { key: 'uniforms', label: 'Uniforms *' },
    { key: 'salariesWagesBonus', label: 'Salaries & Wages Bonus *' },
    { key: 'salariesWagesBOH', label: 'Salaries & Wages BOH (Back of House) *' },
    { key: 'salariesWagesFOH', label: 'Salaries & Wages FOH (Front of House) *' },
    { key: 'salariesWagesManagers', label: 'Salaries & Wages Managers *' },
    { key: 'salariesOwner', label: 'Salaries Owner *' },
    { key: 'salariesWagesStatutoryDeductions', label: 'Salaries & Wages Statutory deductions (UIF, SDL), etc *' },
    { key: 'bargainingCouncil', label: 'Bargaining Council *' },
    { key: 'coida', label: 'COIDA *' },
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
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-4xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
            EXPENSES STAFF
          </h1>
          <div className="bg-purple-50 p-4 rounded-lg mt-3">
            <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
              Enter your staff expense details below. All amounts must exclude VAT.
            </p>
            <p className="text-gray-600 text-xs mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Note: Enter "0" for any field where you don't have data
            </p>
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

        {/* Other Staff Expenses Section */}
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif' }}>
            Other Staff Expenses
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Other Staff Expense 1
              </label>
              <input
                type="number"
                value={data.otherStaffExpense1}
                onChange={(e) => handleInputChange('otherStaffExpense1', e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty('otherStaffExpense1') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your value"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors.otherStaffExpense1 && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors.otherStaffExpense1}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Other Staff Expense 2
              </label>
              <input
                type="number"
                value={data.otherStaffExpense2}
                onChange={(e) => handleInputChange('otherStaffExpense2', e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty('otherStaffExpense2') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your value"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors.otherStaffExpense2 && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors.otherStaffExpense2}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Other Staff Expense 1 Comment
              </label>
              <textarea
                value={data.otherStaffExpense1Comment}
                onChange={(e) => handleInputChange('otherStaffExpense1Comment', e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty('otherStaffExpense1Comment') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter comment for Other Staff Expense 1"
                rows={3}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors.otherStaffExpense1Comment && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors.otherStaffExpense1Comment}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Other Staff Expense 2 Comment
              </label>
              <textarea
                value={data.otherStaffExpense2Comment}
                onChange={(e) => handleInputChange('otherStaffExpense2Comment', e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty('otherStaffExpense2Comment') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter comment for Other Staff Expense 2"
                rows={3}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors.otherStaffExpense2Comment && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors.otherStaffExpense2Comment}
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

export default ExpensesStaffForm;
