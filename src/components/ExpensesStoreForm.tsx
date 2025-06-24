
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ExpensesStoreData } from './MultiStepForm';

interface ExpensesStoreFormProps {
  data: ExpensesStoreData;
  setData: (data: ExpensesStoreData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ExpensesStoreForm: React.FC<ExpensesStoreFormProps> = ({ data, setData, onNext, onBack }) => {
  const handleInputChange = (field: keyof ExpensesStoreData, value: string) => {
    setData({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="p-8">
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-2xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Fjalla One, sans-serif' }}>
          EXPENSE STORE
        </h1>
        <p className="text-gray-500 mt-2" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
          Please Enter your Store Expense details here
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Electricity
          </label>
          <input
            type="text"
            value={data.electricity}
            onChange={(e) => handleInputChange('electricity', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Water
          </label>
          <input
            type="text"
            value={data.water}
            onChange={(e) => handleInputChange('water', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Gas
          </label>
          <input
            type="text"
            value={data.gas}
            onChange={(e) => handleInputChange('gas', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Insurance
          </label>
          <input
            type="text"
            value={data.insurance}
            onChange={(e) => handleInputChange('insurance', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Insurance Partners
          </label>
          <input
            type="text"
            value={data.insurancePartners}
            onChange={(e) => handleInputChange('insurancePartners', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            License Liquor Annual Fee
          </label>
          <input
            type="text"
            value={data.licenseLiquorAnnualFee}
            onChange={(e) => handleInputChange('licenseLiquorAnnualFee', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div className="border-l-4 border-yellow-400 pl-4">
          <h3 className="text-lg font-semibold mb-4" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Rent Gross
          </h3>
          <div className="space-y-4 ml-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
                Basic Rent
              </label>
              <input
                type="text"
                value={data.rentGrossBasicRent}
                onChange={(e) => handleInputChange('rentGrossBasicRent', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
                Insurance
              </label>
              <input
                type="text"
                value={data.rentGrossInsurance}
                onChange={(e) => handleInputChange('rentGrossInsurance', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
                Ops Costs
              </label>
              <input
                type="text"
                value={data.rentGrossOpsCosts}
                onChange={(e) => handleInputChange('rentGrossOpsCosts', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
                Marketing
              </label>
              <input
                type="text"
                value={data.rentGrossMarketing}
                onChange={(e) => handleInputChange('rentGrossMarketing', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
                Rates
              </label>
              <input
                type="text"
                value={data.rentGrossRates}
                onChange={(e) => handleInputChange('rentGrossRates', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
                Rent TO
              </label>
              <input
                type="text"
                value={data.rentGrossRentTO}
                onChange={(e) => handleInputChange('rentGrossRentTO', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
                placeholder=""
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Repairs & Maintenance
          </label>
          <input
            type="text"
            value={data.repairsMaintenance}
            onChange={(e) => handleInputChange('repairsMaintenance', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Security Alarms & Guards
          </label>
          <input
            type="text"
            value={data.securityAlarmsGuards}
            onChange={(e) => handleInputChange('securityAlarmsGuards', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Telephone
          </label>
          <input
            type="text"
            value={data.telephone}
            onChange={(e) => handleInputChange('telephone', e.target.value)}
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

export default ExpensesStoreForm;
