
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
    // Month field doesn't need numerical validation, comment fields can be any text
    if (field === 'month' || field.includes('Comment') || value === '' || validateNumericInput(value)) {
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

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="p-8">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-4xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
            SALES
          </h1>

          <div className="bg-blue-50 p-4 rounded-lg mt-3">
            <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
              Enter your sales figures below. All amounts must exclude VAT.
            </p>
            <p className="text-gray-600 text-xs mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Note: Enter "0" for any field where you don't have data
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              Month *
            </label>
            <select
              value={data.month}
              onChange={(e) => handleInputChange('month', e.target.value)}
              className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                isFieldEmpty('month') ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <option value="">Select a month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            {errors.month && (
              <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {errors.month}
              </p>
            )}
          </div>

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
              placeholder="Enter your value"
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
              placeholder="Enter your value"
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
              placeholder="Enter your value"
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
              placeholder="Enter your value"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
            {errors.costOfSales && (
              <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {errors.costOfSales}
              </p>
            )}
          </div>
        </div>

        {/* Other Sales Expenses Section */}
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif' }}>
            Other Sales Expenses
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Other Sales Expense 1
              </label>
              <input
                type="number"
                value={data.otherSalesExpense1}
                onChange={(e) => handleInputChange('otherSalesExpense1', e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty('otherSalesExpense1') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your value"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors.otherSalesExpense1 && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors.otherSalesExpense1}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Other Sales Expense 2
              </label>
              <input
                type="number"
                value={data.otherSalesExpense2}
                onChange={(e) => handleInputChange('otherSalesExpense2', e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty('otherSalesExpense2') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your value"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors.otherSalesExpense2 && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors.otherSalesExpense2}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Other Sales Expense 1 Comment
              </label>
              <textarea
                value={data.otherSalesExpense1Comment}
                onChange={(e) => handleInputChange('otherSalesExpense1Comment', e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty('otherSalesExpense1Comment') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter comment for Other Sales Expense 1"
                rows={3}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors.otherSalesExpense1Comment && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors.otherSalesExpense1Comment}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                Other Sales Expense 2 Comment
              </label>
              <textarea
                value={data.otherSalesExpense2Comment}
                onChange={(e) => handleInputChange('otherSalesExpense2Comment', e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty('otherSalesExpense2Comment') ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter comment for Other Sales Expense 2"
                rows={3}
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors.otherSalesExpense2Comment && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors.otherSalesExpense2Comment}
                </p>
              )}
            </div>
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
