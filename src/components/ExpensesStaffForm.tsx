
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ExpensesStaffData } from './MultiStepForm';

interface ExpensesStaffFormProps {
  data: ExpensesStaffData;
  setData: (data: ExpensesStaffData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ExpensesStaffForm: React.FC<ExpensesStaffFormProps> = ({ data, setData, onNext, onBack }) => {
  const handleInputChange = (field: keyof ExpensesStaffData, value: string) => {
    setData({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="p-8">
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-2xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Fjalla One, sans-serif' }}>
          EXPENSE STAFF
        </h1>
        <p className="text-gray-500 mt-2" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
          Please Enter your Staff Expense details here
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Casual Wages
          </label>
          <input
            type="text"
            value={data.casualWages}
            onChange={(e) => handleInputChange('casualWages', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Protective Clothing & Uniforms
          </label>
          <input
            type="text"
            value={data.protectiveClothingUniforms}
            onChange={(e) => handleInputChange('protectiveClothingUniforms', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Salaries & Wages Bonus
          </label>
          <input
            type="text"
            value={data.salariesWagesBonus}
            onChange={(e) => handleInputChange('salariesWagesBonus', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Salaries & Wages Kitchen and FOH
          </label>
          <input
            type="text"
            value={data.salariesWagesKitchenFOH}
            onChange={(e) => handleInputChange('salariesWagesKitchenFOH', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Salaries & Wages Managers
          </label>
          <input
            type="text"
            value={data.salariesWagesManagers}
            onChange={(e) => handleInputChange('salariesWagesManagers', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Salaries: Owner
          </label>
          <input
            type="text"
            value={data.salariesOwner}
            onChange={(e) => handleInputChange('salariesOwner', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Salaries & Wages Other "U.I.F,RSC ,etc."
          </label>
          <input
            type="text"
            value={data.salariesWagesOtherUIF}
            onChange={(e) => handleInputChange('salariesWagesOtherUIF', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Staff Meals Kitchen Crew
          </label>
          <input
            type="text"
            value={data.staffMealsKitchenCrew}
            onChange={(e) => handleInputChange('staffMealsKitchenCrew', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Staff Meals Managers & Waiters
          </label>
          <input
            type="text"
            value={data.staffMealsManagersWaiters}
            onChange={(e) => handleInputChange('staffMealsManagersWaiters', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Staff Medical Cost (First Aid)
          </label>
          <input
            type="text"
            value={data.staffMedicalCost}
            onChange={(e) => handleInputChange('staffMedicalCost', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Staff Transport
          </label>
          <input
            type="text"
            value={data.staffTransport}
            onChange={(e) => handleInputChange('staffTransport', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Training
          </label>
          <input
            type="text"
            value={data.training}
            onChange={(e) => handleInputChange('training', e.target.value)}
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

export default ExpensesStaffForm;
