import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
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
  vat: string;
  netSales: string;
  costOfSales: string;
}

export interface ExpensesData {
  cleaningMaterialLaundry: string;
  consumablePackaging: string;
  cutleryCrockery: string;
  obVouchers: string;
  pestControl: string;
  printingStationery: string;
  promotions: string;
}

export interface ExpensesStaffData {
  casualWages: string;
  uniforms: string;
  salariesWagesBonus: string;
  salariesWagesBOH: string;
  salariesWagesFOH: string;
  salariesWagesManagers: string;
  salariesOwner: string;
  salariesWagesStatutoryDeductions: string;
  staffMealsKitchenCrew: string;
  staffMealsManagersWaiters: string;
  staffMealsOwners: string;
  staffMedicalCost: string;
  staffTransport: string;
  training: string;
}

export interface ExpensesStoreData {
  electricity: string;
  water: string;
  gas: string;
  insurance: string;
  licenses: string;
  rent: string;
  operationalCosts: string;
  marketing: string;
  rates: string;
  otherRentalExpenses: string;
  repairsMaintenance: string;
  securityAlarmsGuards: string;
  telephone: string;
}

export interface ExpensesAdministrativeHQData {
  advertisingOwn: string;
  auditFees: string;
  bankCreditCardCharges: string;
  computerRepairs: string;
  softwareRental: string;
  consultingFeesFCSAudits: string;
  depreciationComputerEquipment: string;
  depreciationOther: string;
  interestPaid: string;
  entertainment: string;
  equipmentRental: string;
  fixedAssetsUnder7000: string;
  generatorLease: string;
  professionalLegalFees: string;
  television: string;
}

export interface HeadOfficeExpensesData {
  obRoyaltyFees: string;
  obMarketingFees: string;
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
      const payload = {
        timestamp: new Date().toISOString(),
        ...allData
      };
      
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
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
    <div className="min-h-screen" style={{ backgroundColor: '#00263A' }}>
      {/* Mobile Navigation Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold" style={{ color: '#00263A', fontFamily: 'Montserrat, sans-serif' }}>
            Step {currentStep}: {navigationItems.find(item => item.id === currentStep)?.title}
          </h2>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg"
            style={{ backgroundColor: '#FFC801' }}
          >
            {isMobileMenuOpen ? <X size={24} color="#00263A" /> : <Menu size={24} color="#00263A" />}
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-t shadow-lg max-h-80 overflow-y-auto">
            {navigationItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (isStepAccessible(item.id)) {
                    handleStepClick(item.id);
                    setIsMobileMenuOpen(false);
                  }
                }}
                className={`flex items-center space-x-3 p-4 border-b cursor-pointer transition-colors ${
                  item.isActive 
                    ? '' 
                    : isStepAccessible(item.id)
                      ? 'hover:bg-gray-50' 
                      : 'opacity-50 cursor-not-allowed'
                }`}
                style={{ 
                  backgroundColor: item.isActive ? '#FFC801' : 'white',
                  color: item.isActive ? '#00263A' : '#666'
                }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold`}
                  style={{ 
                    backgroundColor: item.isActive ? '#00263A' : completedSteps.includes(item.id) ? '#003A70' : '#FFC801',
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
        )}
      </div>

      {/* Desktop & Mobile Layout */}
      <div className="flex min-h-screen">
        {/* Desktop Sidebar Navigation */}
        <div className="hidden md:block w-80 text-white p-6">
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
                    backgroundColor: item.isActive ? '#00263A' : completedSteps.includes(item.id) ? '#003A70' : '#FFC801',
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
        <div className="flex-1 pt-20 md:pt-8 p-4 md:p-8" style={{ backgroundColor: '#2E5D8A' }}>
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
    </div>
  );
};

export default MultiStepForm;
