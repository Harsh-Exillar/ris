
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ExpensesData } from './MultiStepForm';

interface ExpensesFormProps {
  data: ExpensesData;
  setData: (data: ExpensesData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ExpensesForm: React.FC<ExpensesFormProps> = ({ data, setData, onNext, onBack }) => {
  const handleInputChange = (field: keyof ExpensesData, value: string) => {
    setData({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="p-8">
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-2xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Fjalla One, sans-serif' }}>
          EXPENSE OPERATIONAL
        </h1>
        <p className="text-gray-500 mt-2" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
          Please Enter your Expense detail here
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Cleaning Materials & Laundry
          </label>
          <input
            type="text"
            value={data.cleaningMaterialsLaundry}
            onChange={(e) => handleInputChange('cleaningMaterialsLaundry', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Consumable & Packaging
          </label>
          <input
            type="text"
            value={data.consumablePackaging}
            onChange={(e) => handleInputChange('consumablePackaging', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Cutlery & Crockery
          </label>
          <input
            type="text"
            value={data.cutleryCrockery}
            onChange={(e) => handleInputChange('cutleryCrockery', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            OB Vouchers
          </label>
          <input
            type="text"
            value={data.obVouchers}
            onChange={(e) => handleInputChange('obVouchers', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Pest Control
          </label>
          <input
            type="text"
            value={data.pestControl}
            onChange={(e) => handleInputChange('pestControl', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Printing & Stationery
          </label>
          <input
            type="text"
            value={data.printingStationery}
            onChange={(e) => handleInputChange('printingStationery', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Promotions 10% PENSIONERS DISCOUNTS
          </label>
          <input
            type="text"
            value={data.promotionsPensionersDiscounts}
            onChange={(e) => handleInputChange('promotionsPensionersDiscounts', e.target.value)}
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

export default ExpensesForm;
