
import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ExpensesAdministrativeHQData } from './MultiStepForm';

interface ExpensesAdministrativeHQFormProps {
  data: ExpensesAdministrativeHQData;
  setData: (data: ExpensesAdministrativeHQData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ExpensesAdministrativeHQForm: React.FC<ExpensesAdministrativeHQFormProps> = ({ data, setData, onNext, onBack }) => {
  const handleInputChange = (field: keyof ExpensesAdministrativeHQData, value: string) => {
    setData({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="p-8">
      <div className="border-b border-gray-200 pb-4 mb-8">
        <h1 className="text-2xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Fjalla One, sans-serif' }}>
          EXPENSE ADMINISTRATIVE HQ
        </h1>
        <p className="text-gray-500 mt-2" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
          Please Enter your Administrative HQ Expense details here
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Advertising Own
          </label>
          <input
            type="text"
            value={data.advertisingOwn}
            onChange={(e) => handleInputChange('advertisingOwn', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Audit Fees
          </label>
          <input
            type="text"
            value={data.auditFees}
            onChange={(e) => handleInputChange('auditFees', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Bank & Credit Card Charges
          </label>
          <input
            type="text"
            value={data.bankCreditCardCharges}
            onChange={(e) => handleInputChange('bankCreditCardCharges', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Computer Repairs & Software RENTAL
          </label>
          <input
            type="text"
            value={data.computerRepairsSoftwareRental}
            onChange={(e) => handleInputChange('computerRepairsSoftwareRental', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Consulting Fees FCS Audits
          </label>
          <input
            type="text"
            value={data.consultingFeesFCSAudits}
            onChange={(e) => handleInputChange('consultingFeesFCSAudits', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Depreciation - Computer Equipment (3 years)
          </label>
          <input
            type="text"
            value={data.depreciationComputerEquipment}
            onChange={(e) => handleInputChange('depreciationComputerEquipment', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Depreciation - Other (Shopfitting etc) (5 years)
          </label>
          <input
            type="text"
            value={data.depreciationOtherShopfitting}
            onChange={(e) => handleInputChange('depreciationOtherShopfitting', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Interest on Loan Paid
          </label>
          <input
            type="text"
            value={data.interestOnLoanPaid}
            onChange={(e) => handleInputChange('interestOnLoanPaid', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Partners Investment policies
          </label>
          <input
            type="text"
            value={data.partnersInvestmentPolicies}
            onChange={(e) => handleInputChange('partnersInvestmentPolicies', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Entertainment
          </label>
          <input
            type="text"
            value={data.entertainment}
            onChange={(e) => handleInputChange('entertainment', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Equipment Rental
          </label>
          <input
            type="text"
            value={data.equipmentRental}
            onChange={(e) => handleInputChange('equipmentRental', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Fixed assets &lt; R1000
          </label>
          <input
            type="text"
            value={data.fixedAssetsUnder1000}
            onChange={(e) => handleInputChange('fixedAssetsUnder1000', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Generator Lease
          </label>
          <input
            type="text"
            value={data.generatorLease}
            onChange={(e) => handleInputChange('generatorLease', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Professional & Legal Fees
          </label>
          <input
            type="text"
            value={data.professionalLegalFees}
            onChange={(e) => handleInputChange('professionalLegalFees', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:border-transparent outline-none transition-all"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Oswald, sans-serif', fontWeight: 700 }}>
            Television MNET Satellite
          </label>
          <input
            type="text"
            value={data.televisionMNETSatellite}
            onChange={(e) => handleInputChange('televisionMNETSatellite', e.target.value)}
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

export default ExpensesAdministrativeHQForm;
