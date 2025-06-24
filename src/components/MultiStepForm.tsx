
import React, { useState } from 'react';
import SalesForm from './SalesForm';
import ExpensesForm from './ExpensesForm';

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

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const navigationItems = [
    { id: 1, title: 'Sales', isActive: currentStep === 1 },
    { id: 2, title: 'Expense Operational Main', isActive: currentStep === 2 },
    { id: 3, title: 'Expense Staff Main', isActive: false },
    { id: 4, title: 'Expense Store', isActive: false },
    { id: 5, title: 'Expense Administrative HQ', isActive: false },
    { id: 6, title: 'Other Expense OB', isActive: false },
    { id: 7, title: 'Other Income', isActive: false },
    { id: 8, title: 'Profit And Loss', isActive: false }
  ];

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    if (stepId <= 2) {
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navigation */}
      <div className="w-80 bg-blue-900 text-white p-6">
        <div className="space-y-3">
          {navigationItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleStepClick(item.id)}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                item.isActive 
                  ? 'bg-blue-800 border-l-4 border-white' 
                  : item.id <= 2 
                    ? 'hover:bg-blue-800' 
                    : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                item.isActive ? 'bg-white text-blue-900' : 'bg-blue-800 text-white'
              }`}>
                {item.id}
              </div>
              <span className="text-sm font-medium">{item.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
