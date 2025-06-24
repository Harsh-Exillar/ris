
import React from 'react';
import { ExpensesData } from './MultiStepForm';

interface ExpensesFormProps {
  data: ExpensesData;
  setData: (data: ExpensesData) => void;
}

const ExpensesForm: React.FC<ExpensesFormProps> = ({ data, setData }) => {
  const handleInputChange = (field: keyof ExpensesData, value: string) => {
    setData({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="p-8">
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">EXPENSE OPERATIONAL MAIN</h1>
        <p className="text-gray-500 mt-2">Please Enter your Expense detail here</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pest Control
          </label>
          <input
            type="text"
            value={data.pestControl}
            onChange={(e) => handleInputChange('pestControl', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Printing And Stationery
          </label>
          <input
            type="text"
            value={data.printingStationery}
            onChange={(e) => handleInputChange('printingStationery', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Promotion 10% PENSIONERS DISCOUNTS
          </label>
          <input
            type="text"
            value={data.promotionsPensionersDiscounts}
            onChange={(e) => handleInputChange('promotionsPensionersDiscounts', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cleaning Material And
          </label>
          <input
            type="text"
            value={data.cleaningMaterialsLaundry}
            onChange={(e) => handleInputChange('cleaningMaterialsLaundry', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Consumable And Packaging
          </label>
          <input
            type="text"
            value={data.consumablePackaging}
            onChange={(e) => handleInputChange('consumablePackaging', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cutlery And Crockery
          </label>
          <input
            type="text"
            value={data.cutleryCrockery}
            onChange={(e) => handleInputChange('cutleryCrockery', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>
      </div>
    </div>
  );
};

export default ExpensesForm;
