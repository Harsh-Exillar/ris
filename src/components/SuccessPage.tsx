
import React from 'react';
import { CheckCircle, Home } from 'lucide-react';

interface SuccessPageProps {
  onGoHome: () => void;
}

const SuccessPage: React.FC<SuccessPageProps> = ({ onGoHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-md w-full mx-4">
        <div className="mb-6">
          <CheckCircle className="mx-auto text-green-500" size={80} />
        </div>
        
        <h1 className="text-3xl font-bold mb-4" style={{ color: '#003A70', fontFamily: 'Montserrat, sans-serif' }}>
          Submission Successful!
        </h1>
        
        <p className="text-gray-600 mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Your form has been submitted successfully. Thank you for providing all the required information.
        </p>
        
        <button
          onClick={onGoHome}
          className="flex items-center justify-center space-x-2 mx-auto px-8 py-3 rounded-full font-semibold text-black transition-colors hover:opacity-90"
          style={{ backgroundColor: '#FFF091', fontFamily: 'Montserrat, sans-serif' }}
        >
          <Home size={20} />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
