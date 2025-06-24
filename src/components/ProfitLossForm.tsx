
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ProfitLossData } from './MultiStepForm';

interface ProfitLossFormProps {
  data: ProfitLossData;
  setData: (data: ProfitLossData) => void;
  onBack: () => void;
}

const ProfitLossForm: React.FC<ProfitLossFormProps> = ({ data, setData, onBack }) => {
  const handleInputChange = (field: keyof ProfitLossData, value: string) => {
    setData({
      ...data,
      [field]: value
    });
  };

  const handleSubmit = () => {
    console.log('Form submitted with all data');
    // Handle final submission logic here
  };

  return (
    <div className="p-8">
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-2xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Fjalla One, sans-serif' }}>
          PROFIT & LOSS
        </h1>
        <p className="text-gray-500 mt-2" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
          Please Enter your Profit & Loss details here
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Add back Depreciation (non cash item)
          </label>
          <input
            type="text"
            value={data.addBackDepreciation}
            onChange={(e) => handleInputChange('addBackDepreciation', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Loan Capital Portion
          </label>
          <input
            type="text"
            value={data.loanCapitalPortion}
            onChange={(e) => handleInputChange('loanCapitalPortion', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>
      </div>

      <div className="mt-12 flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 px-8 py-3 rounded-full transition-colors"
          style={{ backgroundColor: '#EBEBEB', color: '#003A70' }}
        >
          <ArrowLeft size={20} />
          <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>Back</span>
        </button>
        <button
          onClick={handleSubmit}
          className="flex items-center space-x-2 px-8 py-3 rounded-full transition-colors"
          style={{ backgroundColor: '#FFF091', color: '#003A70' }}
        >
          <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>Submit</span>
        </button>
      </div>
    </div>
  );
};

export default ProfitLossForm;
