import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import SalesForm from './SalesForm';
import ExpensesForm from './ExpensesForm';
import ExpensesStaffForm from './ExpensesStaffForm';
import ExpensesStoreForm from './ExpensesStoreForm';
import ExpensesAdministrativeHQForm from './ExpensesAdministrativeHQForm';
import HeadOfficeExpensesForm from './HeadOfficeExpensesForm';
import OtherIncomeForm from './OtherIncomeForm';

import { isFormValid } from '../utils/validation';

export interface SalesData {
  month: string;
  grossSales: string;
  vat: string;
  netSales: string;
  costOfSales: string;
  otherSalesExpense1: string;
  otherSalesExpense1Comment: string;
  otherSalesExpense2: string;
  otherSalesExpense2Comment: string;
}

export interface ExpensesData {
  cleaningMaterialsLaundry: string;
  consumablePackaging: string;
  cutleryCrockery: string;
  obVouchers: string;
  pestControl: string;
  printingStationery: string;
  promotions: string;
  otherOperationalExpense1: string;
  otherOperationalExpense1Comment: string;
  otherOperationalExpense2: string;
  otherOperationalExpense2Comment: string;
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
  bargainingCouncil: string;
  coida: string;
  staffMealsKitchenCrew: string;
  staffMealsManagersWaiters: string;
  staffMealsOwners: string;
  staffMedicalCost: string;
  staffTransport: string;
  training: string;
  otherStaffExpense1: string;
  otherStaffExpense1Comment: string;
  otherStaffExpense2: string;
  otherStaffExpense2Comment: string;
}

export interface ExpensesStoreData {
  electricity: string;
  communalElectricity: string;
  water: string;
  gas: string;
  meterReadingFees: string;
  parking: string;
  refuse: string;
  sanitation: string;
  internetCosts: string;
  wifi: string;
  insurance: string;
  licenses: string;
  liquorLicense: string;
  cipc: string;
  rent: string;
  operationalCosts: string;
  landlordMarketing: string;
  rates: string;
  otherRentalExpenses: string;
  repairsMaintenance: string;
  securityAlarmsGuards: string;
  telephone: string;
  generatorLease: string;
  otherStoreExpense1: string;
  otherStoreExpense1Comment: string;
  otherStoreExpense2: string;
  otherStoreExpense2Comment: string;
}

export interface ExpensesAdministrativeHQData {
  advertisingOwn: string;
  auditFees: string;
  bankCreditCardCharges: string;
  computerRepairs: string;
  posSoftwareRental: string;
  consultingFeesFCSAudits: string;
  depreciationComputerEquipment: string;
  depreciationOtherShopfitting: string;
  interestPaid: string;
  entertainment: string;
  equipmentRental: string;
  fixedAssetsUnder7000: string;
  professionalLegalFees: string;
  television: string;
  subscriptions: string;
  radio: string;
  loyalty: string;
  audits: string;
  otherHQExpenses: string;
  otherAdministrativeHQExpense1: string;
  otherAdministrativeHQExpense1Comment: string;
  otherAdministrativeHQExpense2: string;
  otherAdministrativeHQExpense2Comment: string;
}

export interface HeadOfficeExpensesData {
  obRoyaltyFees: string;
  obMarketingFees: string;
  otherHeadOfficeExpense1: string;
  otherHeadOfficeExpense1Comment: string;
  otherHeadOfficeExpense2: string;
  otherHeadOfficeExpense2Comment: string;
}

export interface OtherIncomeData {
  fixedAssetDisposal: string;
  totalOtherIncome: string;
  otherIncomeComment: string;
}


interface MultiStepFormProps {
  onSubmissionComplete: () => void;
  userObid: string;
  onLogout: () => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onSubmissionComplete, userObid, onLogout }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  
  const [salesData, setSalesData] = useState<SalesData>({
    month: '',
    grossSales: '',
    vat: '',
    netSales: '',
    costOfSales: '',
    otherSalesExpense1: '',
    otherSalesExpense1Comment: '',
    otherSalesExpense2: '',
    otherSalesExpense2Comment: ''
  });
  
  const [expensesData, setExpensesData] = useState<ExpensesData>({
    cleaningMaterialsLaundry: '',
    consumablePackaging: '',
    cutleryCrockery: '',
    obVouchers: '',
    pestControl: '',
    printingStationery: '',
    promotions: '',
    otherOperationalExpense1: '',
    otherOperationalExpense1Comment: '',
    otherOperationalExpense2: '',
    otherOperationalExpense2Comment: ''
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
    bargainingCouncil: '',
    coida: '',
    staffMealsKitchenCrew: '',
    staffMealsManagersWaiters: '',
    staffMealsOwners: '',
    staffMedicalCost: '',
    staffTransport: '',
    training: '',
    otherStaffExpense1: '',
    otherStaffExpense1Comment: '',
    otherStaffExpense2: '',
    otherStaffExpense2Comment: ''
  });

  const [expensesStoreData, setExpensesStoreData] = useState<ExpensesStoreData>({
    electricity: '',
    communalElectricity: '',
    water: '',
    gas: '',
    meterReadingFees: '',
    parking: '',
    refuse: '',
    sanitation: '',
    internetCosts: '',
    wifi: '',
    insurance: '',
    licenses: '',
    liquorLicense: '',
    cipc: '',
    rent: '',
    operationalCosts: '',
    landlordMarketing: '',
    rates: '',
    otherRentalExpenses: '',
    repairsMaintenance: '',
    securityAlarmsGuards: '',
    telephone: '',
    generatorLease: '',
    otherStoreExpense1: '',
    otherStoreExpense1Comment: '',
    otherStoreExpense2: '',
    otherStoreExpense2Comment: ''
  });

  const [expensesAdministrativeHQData, setExpensesAdministrativeHQData] = useState<ExpensesAdministrativeHQData>({
    advertisingOwn: '',
    auditFees: '',
    bankCreditCardCharges: '',
    computerRepairs: '',
    posSoftwareRental: '',
    consultingFeesFCSAudits: '',
    depreciationComputerEquipment: '',
    depreciationOtherShopfitting: '',
    interestPaid: '',
    entertainment: '',
    equipmentRental: '',
    fixedAssetsUnder7000: '',
    professionalLegalFees: '',
    television: '',
    subscriptions: '',
    radio: '',
    loyalty: '',
    audits: '',
    otherHQExpenses: '',
    otherAdministrativeHQExpense1: '',
    otherAdministrativeHQExpense1Comment: '',
    otherAdministrativeHQExpense2: '',
    otherAdministrativeHQExpense2Comment: ''
  });

  const [headOfficeExpensesData, setHeadOfficeExpensesData] = useState<HeadOfficeExpensesData>({
    obRoyaltyFees: '',
    obMarketingFees: '',
    otherHeadOfficeExpense1: '',
    otherHeadOfficeExpense1Comment: '',
    otherHeadOfficeExpense2: '',
    otherHeadOfficeExpense2Comment: ''
  });

  const [otherIncomeData, setOtherIncomeData] = useState<OtherIncomeData>({
    fixedAssetDisposal: '',
    totalOtherIncome: '',
    otherIncomeComment: ''
  });


  const navigationItems = [
    { id: 1, title: 'Sales', isActive: currentStep === 1 },
    { id: 2, title: 'Expense Operational', isActive: currentStep === 2 },
    { id: 3, title: 'Expense Staff', isActive: currentStep === 3 },
    { id: 4, title: 'Expense Store', isActive: currentStep === 4 },
    { id: 5, title: 'Expense Administrative HQ', isActive: currentStep === 5 },
    { id: 6, title: 'Head Office Expenses', isActive: currentStep === 6 },
    { id: 7, title: 'Other Income', isActive: currentStep === 7 }
  ];

  const getFormData = (stepId: number) => {
    switch (stepId) {
      case 1: return salesData;
      case 2: return expensesData;
      case 3: return expensesStaffData;
      case 4: return expensesStoreData;
      case 5: return expensesAdministrativeHQData;
      case 6: return headOfficeExpensesData;
      case 7: return otherIncomeData;
      default: return {};
    }
  };

  const handleNext = () => {
    if (currentStep < 7) {
      const currentFormData = getFormData(currentStep);
      
      // Use general validation for all steps
      if (isFormValid(currentFormData)) {
        // Mark current step as completed
        if (!completedSteps.includes(currentStep)) {
          setCompletedSteps([...completedSteps, currentStep]);
        }
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep === 7) {
      // Final step - OtherIncomeForm handles its own validation
      handleFinalSubmit();
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
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      
      if (!webhookUrl) {
        console.warn('Webhook URL not configured, skipping webhook submission');
        return;
      }
      
      // Flatten all nested objects into a single flat structure
      const flattenedData = {
        timestamp: new Date().toISOString(),
        obid: userObid,
        action: 'form_submission',
        // Sales data
        ...allData.salesData,
        // Expenses data
        ...allData.expensesData,
        // Expenses staff data
        ...allData.expensesStaffData,
        // Expenses store data
        ...allData.expensesStoreData,
        // Expenses administrative HQ data
        ...allData.expensesAdministrativeHQData,
        // Head office expenses data
        ...allData.headOfficeExpensesData,
        // Other income data
        ...allData.otherIncomeData
      };
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flattenedData)
      });

      if (!response.ok) {
        throw new Error(`Webhook request failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error sending form data to webhook:', error);
      throw error; // Re-throw to handle in submission flow
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
      otherIncomeData
    };
    
    try {
      // Send data to webhook
      await sendWebhookData(allData);
      
      // Show success page
      onSubmissionComplete();
    } catch (error) {
      console.error('Error during form submission:', error);
      
      // Show user-friendly error using toast instead of alert
      const errorMessage = error instanceof Error 
        ? `Submission failed: ${error.message}` 
        : 'There was an error submitting your data. Please check your internet connection and try again.';
      
      // Use a more secure way to show errors
      setSubmitError(errorMessage);
    }
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
        <div className="hidden md:flex md:flex-col w-80 text-white p-6 min-h-screen">
          <div className="space-y-3 flex-1">
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
          <div className="mt-6">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center px-4 py-3 rounded-lg font-semibold"
              style={{ backgroundColor: '#FFC801', color: '#00263A', fontFamily: 'Montserrat, sans-serif' }}
            >
              Logout
            </button>
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
              <HeadOfficeExpensesForm 
                data={headOfficeExpensesData} 
                setData={setHeadOfficeExpensesData} 
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
