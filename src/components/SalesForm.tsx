
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SalesData } from './MultiStepForm';
import { validateNumericInput, isFormValid, getEmptyFields } from '../utils/validation';

interface SalesFormProps {
  data: SalesData;
  setData: (data: SalesData) => void;
  onNext: () => void;
}

const SalesForm: React.FC<SalesFormProps> = ({ data, setData, onNext }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emptyFieldsHighlighted, setEmptyFieldsHighlighted] = useState<string[]>([]);

  const handleInputChange = (field: keyof SalesData, value: string) => {
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
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold tracking-wide mb-4" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
              💰 SALES
            </h1>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="bg-blue-500 rounded-full p-2 mt-1">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  📊 Enter Your Sales Information
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
              Gross Sales (incl Vat) *
            </label>
            <input
              type="text"
              value={data.grossSales}
              onChange={(e) => handleInputChange('grossSales', e.target.value)}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                isFieldEmpty('grossSales') ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter numerical value or 0 (e.g., 126.33)"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
            {errors.grossSales && (
              <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {errors.grossSales}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              VAT *
            </label>
            <input
              type="text"
              value={data.vat}
              onChange={(e) => handleInputChange('vat', e.target.value)}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                isFieldEmpty('vat') ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter numerical value or 0 (e.g., 126.33)"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
            {errors.vat && (
              <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {errors.vat}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Net Sales *
            </label>
            <input
              type="text"
              value={data.netSales}
              onChange={(e) => handleInputChange('netSales', e.target.value)}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                isFieldEmpty('netSales') ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter numerical value or 0 (e.g., 126.33)"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
            {errors.netSales && (
              <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {errors.netSales}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Cost of Sales (ex Vat) *
            </label>
            <input
              type="text"
              value={data.costOfSales}
              onChange={(e) => handleInputChange('costOfSales', e.target.value)}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                isFieldEmpty('costOfSales') ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter numerical value or 0 (e.g., 126.33)"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
            {errors.costOfSales && (
              <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {errors.costOfSales}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex justify-end">
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

export default SalesForm;
