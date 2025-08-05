import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { OtherIncomeData } from './MultiStepForm';
import { validateNumericInput, isFormValid, getEmptyFields } from '../utils/validation';

interface OtherIncomeFormProps {
  data: OtherIncomeData;
  setData: (data: OtherIncomeData) => void;
  onNext: () => void;
  onBack: () => void;
}

const OtherIncomeForm: React.FC<OtherIncomeFormProps> = ({ data, setData, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emptyFieldsHighlighted, setEmptyFieldsHighlighted] = useState<string[]>([]);

  const handleInputChange = (field: keyof OtherIncomeData, value: string) => {
    if (field === 'otherIncomeComment') {
      // Allow any text for comment field
      setData({
        ...data,
        [field]: value
      });
      setErrors(prev => ({ ...prev, [field]: '' }));
      setEmptyFieldsHighlighted(prev => prev.filter(f => f !== field));
    } else if (value === '' || validateNumericInput(value)) {
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
    // Custom validation for Other Income form
    const isValidForm = Object.entries(data).every(([key, value]) => {
      if (key === 'otherIncomeComment') {
        return (value as string).trim() !== '';
      } else {
        return (value as string).trim() !== '' && validateNumericInput(value as string);
      }
    });

    if (isValidForm) {
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
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold tracking-wide mb-4" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
              💸 OTHER INCOME
            </h1>
          </div>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="bg-emerald-500 rounded-full p-2 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  💰 Document Additional Income Sources
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

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Fixed Asset Disposal *
            </label>
            <input
              type="text"
              value={data.fixedAssetDisposal}
              onChange={(e) => handleInputChange('fixedAssetDisposal', e.target.value)}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                isFieldEmpty('fixedAssetDisposal') ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter numerical value or 0 (e.g., 126.33)"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
            {errors.fixedAssetDisposal && (
              <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {errors.fixedAssetDisposal}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Other Income *
            </label>
            <input
              type="text"
              value={data.totalOtherIncome}
              onChange={(e) => handleInputChange('totalOtherIncome', e.target.value)}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                isFieldEmpty('totalOtherIncome') ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter numerical value or 0 (e.g., 126.33)"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
            {errors.totalOtherIncome && (
              <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {errors.totalOtherIncome}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Comment about Other Income *
            </label>
            <textarea
              value={data.otherIncomeComment}
              onChange={(e) => handleInputChange('otherIncomeComment', e.target.value)}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all min-h-[100px] ${
                isFieldEmpty('otherIncomeComment') ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Please describe what this other income is about..."
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
            {errors.otherIncomeComment && (
              <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {errors.otherIncomeComment}
              </p>
            )}
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
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>Submit</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherIncomeForm;
