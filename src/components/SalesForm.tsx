
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
        <h1 className="text-2xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Fjalla One, sans-serif' }}>
          SALES
        </h1>
        <p className="text-gray-500 mt-2" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
          Please Enter your sales detail here
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Gross Sales *
          </label>
          <input
            type="text"
            value={data.grossSales}
            onChange={(e) => handleInputChange('grossSales', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            style={{ focusRingColor: '#003A70' }}
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Minus VAT *
          </label>
          <input
            type="text"
            value={data.minusVat}
            onChange={(e) => handleInputChange('minusVat', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            style={{ focusRingColor: '#003A70' }}
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Net Sales *
          </label>
          <input
            type="text"
            value={data.netSales}
            onChange={(e) => handleInputChange('netSales', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            style={{ focusRingColor: '#003A70' }}
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Minus Cost of Sales *
          </label>
          <input
            type="text"
            value={data.minusCostOfSales}
            onChange={(e) => handleInputChange('minusCostOfSales', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            style={{ focusRingColor: '#003A70' }}
            placeholder=""
          />
        </div>
      </div>

      <div className="mt-12 flex justify-end">
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

export default SalesForm;
