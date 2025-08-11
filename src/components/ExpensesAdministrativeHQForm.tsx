import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ExpensesAdministrativeHQData } from './MultiStepForm';
import { validateNumericInput, isFormValid, getEmptyFields } from '../utils/validation';

interface ExpensesAdministrativeHQFormProps {
  data: ExpensesAdministrativeHQData;
  setData: (data: ExpensesAdministrativeHQData) => void;
  onNext: () => void;
  onBack: () => void;
}

const ExpensesAdministrativeHQForm: React.FC<ExpensesAdministrativeHQFormProps> = ({ data, setData, onNext, onBack }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emptyFieldsHighlighted, setEmptyFieldsHighlighted] = useState<string[]>([]);

  const handleInputChange = (field: keyof ExpensesAdministrativeHQData, value: string) => {
    if (value === '' || validateNumericInput(value)) {
      setData({
        ...data,
        [field]: value
      });
      setErrors(prev => ({ ...prev, [field]: '' }));
      setEmptyFieldsHighlighted(prev => prev.filter(f => f !== field));
    } else {
      setErrors(prev => ({ ...prev, [field]: 'Please enter numerical value only (up to 2 decimal places)' }));
    }
  };

  const handleNext = () => {
    if (isFormValid(data)) {
      onNext();
    } else {
      const emptyFields = getEmptyFields(data);
      setEmptyFieldsHighlighted(emptyFields);
    }
  };

  const isFieldEmpty = (field: string) => emptyFieldsHighlighted.includes(field);

  const fieldLabels = {
    advertisingOwn: 'Advertising Own *',
    auditFees: 'Audit Fees *',
    bankCreditCardCharges: 'Bank & Credit Card Charges *',
    computerRepairs: 'Computer Repairs *',
    softwareRental: 'Software Rental *',
    consultingFeesFCSAudits: 'Consulting Fees *',
    depreciationComputerEquipment: 'Depreciation - Computer Equipment *',
    depreciationOtherShopfitting: 'Depreciation - Other (Shopfitting etc) *',
    interestPaid: 'Interest Paid *',
    entertainment: 'Entertainment *',
    equipmentRental: 'Equipment Rental *',
    fixedAssetsUnder7000: 'Fixed assets < R1000 *',
    generatorLease: 'Generator Lease *',
    professionalLegalFees: 'Professional & Legal Fees *',
    television: 'Television *'
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="p-8">
        <div className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-4xl font-bold tracking-wide" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
            EXPENSES ADMINISTRATIVE HQ
          </h1>
          <div className="bg-red-50 p-4 rounded-lg mt-3">
            <p className="text-gray-700 text-sm leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
              Enter your Administrative HQ expense details below. All amounts must exclude VAT.
            </p>
            <p className="text-gray-600 text-xs mt-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Note: Enter "0" for any field where you don't have data
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(fieldLabels).map(([field, label]) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-2" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                {label}
              </label>
              <input
                type="text"
                value={data[field as keyof ExpensesAdministrativeHQData]}
                onChange={(e) => handleInputChange(field as keyof ExpensesAdministrativeHQData, e.target.value)}
                className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all ${
                  isFieldEmpty(field) ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter numerical value or 0 (e.g., 126.33)"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {errors[field]}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-8 py-3 rounded-full transition-colors"
            style={{ backgroundColor: '#B8C2CB', color: '#003A70' }}
          >
            <ArrowLeft size={20} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>Back</span>
          </button>
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

export default ExpensesAdministrativeHQForm;
