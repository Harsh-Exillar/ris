import React, { useState } from 'react';
import SalesForm from './SalesForm';
import ExpensesForm from './ExpensesForm';
import ExpensesStaffForm from './ExpensesStaffForm';
import ExpensesStoreForm from './ExpensesStoreForm';
import ExpensesAdministrativeHQForm from './ExpensesAdministrativeHQForm';
import OtherExpensesOBForm from './OtherExpensesOBForm';
import OtherIncomeForm from './OtherIncomeForm';
import ProfitLossForm from './ProfitLossForm';
import { isFormValid } from '../utils/validation';

export interface SalesData {
  grossSales: string;
  minusVat: string;
  netSales: string;
  minusCostOfSales: string;
}

export interface ExpensesData {
  cleaningMaterialsLaundry: string;
  consumablePackaging: string;
  cutleryCrockery: string;
  obVouchers: string;
  pestControl: string;
  printingStationery: string;
  promotionsPensionersDiscounts: string;
}

export interface ExpensesStaffData {
  casualWages: string;
  protectiveClothingUniforms: string;
  salariesWagesBonus: string;
  salariesWagesKitchenFOH: string;
  salariesWagesManagers: string;
  salariesOwner: string;
  salariesWagesOtherUIF: string;
  staffMealsKitchenCrew: string;
  staffMealsManagersWaiters: string;
  staffMedicalCost: string;
  staffTransport: string;
  training: string;
}

export interface ExpensesStoreData {
  electricity: string;
  water: string;
  gas: string;
  insurance: string;
  insurancePartners: string;
  licenseLiquorAnnualFee: string;
  rentGrossBasicRent: string;
  rentGrossInsurance: string;
  rentGrossOpsCosts: string;
  rentGrossMarketing: string;
  rentGrossRates: string;
  rentGrossRentTO: string;
  repairsMaintenance: string;
  securityAlarmsGuards: string;
  telephone: string;
}

export interface ExpensesAdministrativeHQData {
  advertisingOwn: string;
  auditFees: string;
  bankCreditCardCharges: string;
  computerRepairsSoftwareRental: string;
  consultingFeesFCSAudits: string;
  depreciationComputerEquipment: string;
  depreciationOtherShopfitting: string;
  interestOnLoanPaid: string;
  partnersInvestmentPolicies: string;
  entertainment: string;
  equipmentRental: string;
  fixedAssetsUnder1000: string;
  generatorLease: string;
  professionalLegalFees: string;
  televisionMNETSatellite: string;
}

export interface OtherExpensesOBData {
  franchiseFee: string;
  marketingOBHO: string;
}

export interface OtherIncomeData {
  fixedAssetDisposal: string;
  totalOtherIncome: string;
}

export interface ProfitLossData {
  addBackDepreciation: string;
  loanCapitalPortion: string;
}

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const [salesData, setSalesData] = useState<SalesData>({
    grossSales: '',
    minusVat: '',
    netSales: '',
    minusCostOfSales: ''
  });
  
  const [expensesData, setExpensesData] = useState<ExpensesData>({
    cleaningMaterialsLaundry: '',
    consumablePackaging: '',
    cutleryCrockery: '',
    obVouchers: '',
    pestControl: '',
    printingStationery: '',
    promotionsPensionersDiscounts: ''
  });

  const [expensesStaffData, setExpensesStaffData] = useState<ExpensesStaffData>({
    casualWages: '',
    protectiveClothingUniforms: '',
    salariesWagesBonus: '',
    salariesWagesKitchenFOH: '',
    salariesWagesManagers: '',
    salariesOwner: '',
    salariesWagesOtherUIF: '',
    staffMealsKitchenCrew: '',
    staffMealsManagersWaiters: '',
    staffMedicalCost: '',
    staffTransport: '',
    training: ''
  });

  const [expensesStoreData, setExpensesStoreData] = useState<ExpensesStoreData>({
    electricity: '',
    water: '',
    gas: '',
    insurance: '',
    insurancePartners: '',
    licenseLiquorAnnualFee: '',
    rentGrossBasicRent: '',
    rentGrossInsurance: '',
    rentGrossOpsCosts: '',
    rentGrossMarketing: '',
    rentGrossRates: '',
    rentGrossRentTO: '',
    repairsMaintenance: '',
    securityAlarmsGuards: '',
    telephone: ''
  });

  const [expensesAdministrativeHQData, setExpensesAdministrativeHQData] = useState<ExpensesAdministrativeHQData>({
    advertisingOwn: '',
    auditFees: '',
    bankCreditCardCharges: '',
    computerRepairsSoftwareRental: '',
    consultingFeesFCSAudits: '',
    depreciationComputerEquipment: '',
    depreciationOtherShopfitting: '',
    interestOnLoanPaid: '',
    partnersInvestmentPolicies: '',
    entertainment: '',
    equipmentRental: '',
    fixedAssetsUnder1000: '',
    generatorLease: '',
    professionalLegalFees: '',
    televisionMNETSatellite: ''
  });

  const [otherExpensesOBData, setOtherExpensesOBData] = useState<OtherExpensesOBData>({
    franchiseFee: '',
    marketingOBHO: ''
  });

  const [otherIncomeData, setOtherIncomeData] = useState<OtherIncomeData>({
    fixedAssetDisposal: '',
    totalOtherIncome: ''
  });

  const [profitLossData, setProfitLossData] = useState<ProfitLossData>({
    addBackDepreciation: '',
    loanCapitalPortion: ''
  });

  const navigationItems = [
    { id: 1, title: 'Sales', isActive: currentStep === 1 },
    { id: 2, title: 'Expense Operational', isActive: currentStep === 2 },
    { id: 3, title: 'Expense Staff', isActive: currentStep === 3 },
    { id: 4, title: 'Expense Store', isActive: currentStep === 4 },
    { id: 5, title: 'Expense Administrative HQ', isActive: currentStep === 5 },
    { id: 6, title: 'Other Expense OB', isActive: currentStep === 6 },
    { id: 7, title: 'Other Income', isActive: currentStep === 7 },
    { id: 8, title: 'Profit And Loss', isActive: currentStep === 8 }
  ];

  const getFormData = (stepId: number) => {
    switch (stepId) {
      case 1: return salesData;
      case 2: return expensesData;
      case 3: return expensesStaffData;
      case 4: return expensesStoreData;
      case 5: return expensesAdministrativeHQData;
      case 6: return otherExpensesOBData;
      case 7: return otherIncomeData;
      case 8: return profitLossData;
      default: return {};
    }
  };

  const handleNext = () => {
    if (currentStep < 8) {
      const currentFormData = getFormData(currentStep);
      if (isFormValid(currentFormData)) {
        // Mark current step as completed
        if (!completedSteps.includes(currentStep)) {
          setCompletedSteps([...completedSteps, currentStep]);
        }
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    // Allow navigation to current step, previous steps, or next step if current is completed
    if (stepId <= currentStep || completedSteps.includes(stepId - 1)) {
      setCurrentStep(stepId);
    }
  };

  const isStepAccessible = (stepId: number) => {
    return stepId <= currentStep || completedSteps.includes(stepId - 1);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#003A70' }}>
      {/* Sidebar Navigation */}
      <div className="w-80 text-white p-6">
        <div className="space-y-3">
          {navigationItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleStepClick(item.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                item.isActive 
                  ? 'border-l-4' 
                  : isStepAccessible(item.id)
                    ? 'hover:bg-blue-800' 
                    : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ 
                backgroundColor: item.isActive ? '#3B82F6' : 'transparent',
                borderLeftColor: item.isActive ? '#3B82F6' : 'transparent',
                color: item.isActive ? 'white' : 'white'
              }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold`}
                style={{ 
                  backgroundColor: item.isActive ? 'white' : completedSteps.includes(item.id) ? '#10B981' : '#3B82F6',
                  color: item.isActive ? '#003A70' : 'white'
                }}
              >
                {completedSteps.includes(item.id) ? '✓' : item.id}
              </div>
              <span className="text-sm font-medium" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8" style={{ backgroundColor: '#EBEBEB' }}>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {currentStep === 1 && (
            <SalesForm 
              data={salesData} 
              setData={setSalesData} 
              onNext={handleNext} 
            />
          )}
          {currentStep === 2 && (
            <ExpensesForm 
              data={expensesData} 
              setData={setExpensesData} 
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <ExpensesStaffForm 
              data={expensesStaffData} 
              setData={setExpensesStaffData} 
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <ExpensesStoreForm 
              data={expensesStoreData} 
              setData={setExpensesStoreData} 
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 5 && (
            <ExpensesAdministrativeHQForm 
              data={expensesAdministrativeHQData} 
              setData={setExpensesAdministrativeHQData} 
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 6 && (
            <OtherExpensesOBForm 
              data={otherExpensesOBData} 
              setData={setOtherExpensesOBData} 
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 7 && (
            <OtherIncomeForm 
              data={otherIncomeData} 
              setData={setOtherIncomeData} 
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 8 && (
            <ProfitLossForm 
              data={profitLossData} 
              setData={setProfitLossData} 
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
