import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import SalesForm from './SalesForm';
import ExpensesForm from './ExpensesForm';
import ExpensesStaffForm from './ExpensesStaffForm';
import ExpensesStoreForm from './ExpensesStoreForm';
import ExpensesAdministrativeHQForm from './ExpensesAdministrativeHQForm';
import HeadOfficeExpensesForm from './HeadOfficeExpensesForm';
import OtherExpensesForm from './OtherExpensesForm';
import OtherIncomeForm from './OtherIncomeForm';
import ProfitLossForm from './ProfitLossForm';
import OceanBackground from './ui/ocean-background';
import { isFormValid } from '../utils/validation';

export interface SalesData {
  grossSales: string;
  vat: string;
  netSales: string;
  costOfSales: string;
}

export interface ExpensesData {
  cleaningMaterialsLaundry: string;
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
  depreciationOtherShopfitting: string;
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

export interface OtherExpensesData {
  otherExpenses1: string;
  otherExpenses1Comment: string;
  otherExpenses2: string;
  otherExpenses2Comment: string;
  otherExpenses3: string;
  otherExpenses3Comment: string;
  otherExpenses4: string;
  otherExpenses4Comment: string;
  otherExpenses5: string;
  otherExpenses5Comment: string;
  otherExpenses6: string;
  otherExpenses6Comment: string;
  otherExpenses7: string;
  otherExpenses7Comment: string;
  otherExpenses8: string;
  otherExpenses8Comment: string;
  otherExpenses9: string;
  otherExpenses9Comment: string;
  otherExpenses10: string;
  otherExpenses10Comment: string;
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
  userObid: string;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onSubmissionComplete, userObid }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [salesData, setSalesData] = useState<SalesData>({
    grossSales: '',
    vat: '',
    netSales: '',
    costOfSales: ''
  });
  
  const [expensesData, setExpensesData] = useState<ExpensesData>({
    cleaningMaterialsLaundry: '',
    consumablePackaging: '',
    cutleryCrockery: '',
    obVouchers: '',
    pestControl: '',
    printingStationery: '',
    promotions: ''
  });

  const [expensesStaffData, setExpensesStaffData] = useState<ExpensesStaffData>({
    casualWages: '',
    uniforms: '',
    salariesWagesBonus: '',
    salariesWagesBOH: '',
    salariesWagesFOH: '',
    salariesWagesManagers: '',
    salariesOwner: '',
    salariesWagesStatutoryDeductions: '',
    staffMealsKitchenCrew: '',
    staffMealsManagersWaiters: '',
    staffMealsOwners: '',
    staffMedicalCost: '',
    staffTransport: '',
    training: ''
  });

  const [expensesStoreData, setExpensesStoreData] = useState<ExpensesStoreData>({
    electricity: '',
    water: '',
    gas: '',
    insurance: '',
    licenses: '',
    rent: '',
    operationalCosts: '',
    marketing: '',
    rates: '',
    otherRentalExpenses: '',
    repairsMaintenance: '',
    securityAlarmsGuards: '',
    telephone: ''
  });

  const [expensesAdministrativeHQData, setExpensesAdministrativeHQData] = useState<ExpensesAdministrativeHQData>({
    advertisingOwn: '',
    auditFees: '',
    bankCreditCardCharges: '',
    computerRepairs: '',
    softwareRental: '',
    consultingFeesFCSAudits: '',
    depreciationComputerEquipment: '',
    depreciationOtherShopfitting: '',
    interestPaid: '',
    entertainment: '',
    equipmentRental: '',
    fixedAssetsUnder7000: '',
    generatorLease: '',
    professionalLegalFees: '',
    television: ''
  });

  const [headOfficeExpensesData, setHeadOfficeExpensesData] = useState<HeadOfficeExpensesData>({
    obRoyaltyFees: '',
    obMarketingFees: ''
  });

  const [otherExpensesData, setOtherExpensesData] = useState<OtherExpensesData>({
    otherExpenses1: '',
    otherExpenses1Comment: '',
    otherExpenses2: '',
    otherExpenses2Comment: '',
    otherExpenses3: '',
    otherExpenses3Comment: '',
    otherExpenses4: '',
    otherExpenses4Comment: '',
    otherExpenses5: '',
    otherExpenses5Comment: '',
    otherExpenses6: '',
    otherExpenses6Comment: '',
    otherExpenses7: '',
    otherExpenses7Comment: '',
    otherExpenses8: '',
    otherExpenses8Comment: '',
    otherExpenses9: '',
    otherExpenses9Comment: '',
    otherExpenses10: '',
    otherExpenses10Comment: ''
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
    { id: 6, title: 'Head Office Expenses', isActive: currentStep === 6 },
    { id: 7, title: 'Other Expenses', isActive: currentStep === 7 },
    { id: 8, title: 'Other Income', isActive: currentStep === 8 },
    { id: 9, title: 'Profit And Loss', isActive: currentStep === 9 }
  ];

  const getFormData = (stepId: number) => {
    switch (stepId) {
      case 1: return salesData;
      case 2: return expensesData;
      case 3: return expensesStaffData;
      case 4: return expensesStoreData;
      case 5: return expensesAdministrativeHQData;
      case 6: return headOfficeExpensesData;
      case 7: return otherExpensesData;
      case 8: return otherIncomeData;
      case 9: return profitLossData;
      default: return {};
    }
  };

  const handleNext = () => {
    if (currentStep < 9) {
      const currentFormData = getFormData(currentStep);
      
      // Custom validation for Other Expenses (step 7)
      if (currentStep === 7) {
        const otherExpensesData = currentFormData as OtherExpensesData;
        let isValid = true;
        
        // Check each expense field and make comment required if expense is filled
        for (let i = 1; i <= 10; i++) {
          const expenseField = `otherExpenses${i}`;
          const commentField = `otherExpenses${i}Comment`;
          const expenseValue = otherExpensesData[expenseField as keyof OtherExpensesData];
          const commentValue = otherExpensesData[commentField as keyof OtherExpensesData];
          
          if (expenseValue && expenseValue.trim() !== '' && (!commentValue || commentValue.trim() === '')) {
            isValid = false;
            break;
          }
        }
        
        if (isValid) {
          // Mark current step as completed
          if (!completedSteps.includes(currentStep)) {
            setCompletedSteps([...completedSteps, currentStep]);
          }
          setCurrentStep(currentStep + 1);
        }
      } else {
        // Use general validation for all other steps
        if (isFormValid(currentFormData)) {
          // Mark current step as completed
          if (!completedSteps.includes(currentStep)) {
            setCompletedSteps([...completedSteps, currentStep]);
          }
          setCurrentStep(currentStep + 1);
        }
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
        obid: userObid,
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
      headOfficeExpensesData,
      otherExpensesData,
      otherIncomeData,
      profitLossData
    };
    
    console.log('Final submission data:', allData);
    
    // Send data to webhook
    await sendWebhookData(allData);
    
    onSubmissionComplete();
  };

  return (
    <OceanBackground variant="form">
      {/* Mobile Navigation Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg">
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-semibold text-primary font-sans">
            Step {currentStep}: {navigationItems.find(item => item.id === currentStep)?.title}
          </h2>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-secondary text-primary"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm border-t shadow-lg max-h-80 overflow-y-auto">
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
                    ? 'bg-secondary text-primary' 
                    : isStepAccessible(item.id)
                      ? 'hover:bg-gray-50 text-muted-foreground' 
                      : 'opacity-50 cursor-not-allowed text-muted-foreground'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  item.isActive 
                    ? 'bg-primary text-white' 
                    : completedSteps.includes(item.id) 
                      ? 'bg-primary/80 text-white' 
                      : 'bg-secondary text-primary'
                }`}>
                  {completedSteps.includes(item.id) ? '✓' : item.id}
                </div>
                <span className="text-sm font-medium font-sans">
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
        <div className="hidden md:block w-80 text-white p-6 relative z-10">
          <div className="space-y-3">
            {navigationItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleStepClick(item.id)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  item.isActive 
                    ? 'bg-secondary text-primary border-l-4 border-secondary shadow-lg' 
                    : isStepAccessible(item.id)
                      ? 'hover:bg-white/10 backdrop-blur-sm text-white' 
                      : 'opacity-50 cursor-not-allowed text-white/60'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  item.isActive 
                    ? 'bg-primary text-white' 
                    : completedSteps.includes(item.id) 
                      ? 'bg-white/20 text-white' 
                      : 'bg-secondary text-primary'
                }`}>
                  {completedSteps.includes(item.id) ? '✓' : item.id}
                </div>
                <span className="text-sm font-medium font-sans">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 pt-20 md:pt-8 p-4 md:p-8 relative z-10">
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-white/20">
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
              <HeadOfficeExpensesForm 
                data={headOfficeExpensesData} 
                setData={setHeadOfficeExpensesData} 
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 7 && (
              <OtherExpensesForm 
                data={otherExpensesData} 
                setData={setOtherExpensesData} 
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 8 && (
              <OtherIncomeForm 
                data={otherIncomeData} 
                setData={setOtherIncomeData} 
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {currentStep === 9 && (
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
    </OceanBackground>
  );
};

export default MultiStepForm;
