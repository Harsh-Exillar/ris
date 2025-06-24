
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SalesData } from './MultiStepForm';

interface SalesFormProps {
  data: SalesData;
  setData: (data: SalesData) => void;
  onNext: () => void;
}

const SalesForm: React.FC<SalesFormProps> = ({ data, setData, onNext }) => {
  const handleInputChange = (field: keyof SalesData, value: string) => {
    setData({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="p-8">
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">SALES</h1>
        <p className="text-gray-500 mt-2">Please Enter your sales detail here</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gross Sales *
          </label>
          <input
            type="text"
            value={data.grossSales}
            onChange={(e) => handleInputChange('grossSales', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minus Value *
          </label>
          <input
            type="text"
            value={data.minusVat}
            onChange={(e) => handleInputChange('minusVat', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Net Sales *
          </label>
          <input
            type="text"
            value={data.netSales}
            onChange={(e) => handleInputChange('netSales', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Cost Of Sales *
          </label>
          <input
            type="text"
            value={data.minusCostOfSales}
            onChange={(e) => handleInputChange('minusCostOfSales', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>
      </div>

      <div className="mt-12 flex justify-end">
        <button
          onClick={onNext}
          className="flex items-center space-x-2 px-8 py-3 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <span>Next</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default SalesForm;
