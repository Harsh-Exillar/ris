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
    console.log('Submit button clicked in OtherIncomeForm');
    console.log('Current data:', JSON.stringify(data, null, 2));
    
    // Check if all required fields are filled
    const requiredFields = ['fixedAssetDisposal', 'totalOtherIncome', 'otherIncomeComment'];
    const emptyFields = requiredFields.filter(field => {
      const value = data[field as keyof OtherIncomeData];
      const isEmpty = !value || value.toString().trim() === '';
      console.log(`Field ${field}: "${value}" isEmpty: ${isEmpty}`);
      return isEmpty;
    });

    console.log('Empty fields count:', emptyFields.length, 'Empty fields:', emptyFields);

    if (emptyFields.length === 0) {
      console.log('All fields are filled, calling onNext()');
      console.log('About to call onNext function...');
      onNext(); // This will trigger the final submission
      console.log('onNext function called successfully');
    } else {
      console.log('Some fields are empty, highlighting:', emptyFields);
      setEmptyFieldsHighlighted(emptyFields);
      // Show user-friendly validation message
      const fieldNames = emptyFields.map(field => {
        switch(field) {
          case 'fixedAssetDisposal': return 'Fixed Asset Disposal';
          case 'totalOtherIncome': return 'Other Income';
          case 'otherIncomeComment': return 'Comment about Other Income';
          default: return field;
        }
      }).join(', ');
      
      alert(`Please fill in the following required fields: ${fieldNames}`);
    }
  };

  const isFieldEmpty = (field: string) => emptyFieldsHighlighted.includes(field);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="p-8">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-4xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
            OTHER INCOME
          </h1>
          <div className="bg-teal-50 p-4 rounded-lg mt-3">
            <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
              Enter your other income details below. All amounts must exclude VAT.
            </p>
            <p className="text-gray-600 text-xs mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Note: Enter "0" for any field where you don't have data
            </p>
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
