
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { OtherIncomeData } from './MultiStepForm';

interface OtherIncomeFormProps {
  data: OtherIncomeData;
  setData: (data: OtherIncomeData) => void;
  onNext: () => void;
  onBack: () => void;
}

const OtherIncomeForm: React.FC<OtherIncomeFormProps> = ({ data, setData, onNext, onBack }) => {
  const handleInputChange = (field: keyof OtherIncomeData, value: string) => {
    setData({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="p-8">
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-2xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Fjalla One, sans-serif' }}>
          OTHER INCOME
        </h1>
        <p className="text-gray-500 mt-2" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
          Please Enter your Other Income details here
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Fixed Asset Disposal
          </label>
          <input
            type="text"
            value={data.fixedAssetDisposal}
            onChange={(e) => handleInputChange('fixedAssetDisposal', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            TOTAL OTHER INCOME
          </label>
          <input
            type="text"
            value={data.totalOtherIncome}
            onChange={(e) => handleInputChange('totalOtherIncome', e.target.value)}
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
          onClick={onNext}
          className="flex items-center space-x-2 px-8 py-3 rounded-full transition-colors"
          style={{ backgroundColor: '#FFF091', color: '#003A70' }}
        >
          <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>Next</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default OtherIncomeForm;
