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

interface MultiStepFormProps {
  onSubmissionComplete: () => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onSubmissionComplete }) => {
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

  const sendWebhookData = async (allData: any) => {
    try {
      const webhookUrl = 'https://exillar-n8n-u48653.vm.elestio.app/webhook-test/Restaurant Income Statement';
      const params = new URLSearchParams({
        timestamp: new Date().toISOString(),
        ...Object.entries(allData).reduce((acc, [key, value]) => {
          if (typeof value === 'object') {
            Object.entries(value).forEach(([subKey, subValue]) => {
              acc[`${key}_${subKey}`] = String(subValue);
            });
          } else {
            acc[key] = String(value);
          }
          return acc;
        }, {} as Record<string, string>)
      });
      
      await fetch(`${webhookUrl}?${params}`, {
        method: 'GET',
      });
      console.log('Webhook data sent successfully');
    } catch (error) {
      console.error('Error sending webhook data:', error);
    }
  };

  const handleFinalSubmit = async () => {
    const allData = {
      salesData,
      expensesData,
      expensesStaffData,
      expensesStoreData,
      expensesAdministrativeHQData,
      otherExpensesOBData,
      otherIncomeData,
      profitLossData
    };
    
    console.log('Final submission data:', allData);
    
    // Send data to webhook
    await sendWebhookData(allData);
    
    onSubmissionComplete();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: '#00263A' }}>
      {/* Sidebar Navigation */}
      <div className="w-full md:w-80 text-white p-4 md:p-6 order-2 md:order-1">
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
                backgroundColor: item.isActive ? '#FFC801' : 'transparent',
                borderLeftColor: item.isActive ? '#FFC801' : 'transparent',
                color: item.isActive ? '#00263A' : 'white'
              }}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold`}
                style={{ 
                  backgroundColor: item.isActive ? '#00263A' : completedSteps.includes(item.id) ? '#10B981' : '#FFC801',
                  color: item.isActive ? 'white' : completedSteps.includes(item.id) ? 'white' : '#00263A'
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
      <div className="flex-1 p-4 md:p-8 order-1 md:order-2" style={{ backgroundColor: '#EBEBEB' }}>
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
              onSubmit={handleFinalSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
