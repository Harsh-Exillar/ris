
import React, { useState } from 'react';
import Login from "@/components/Login";
import MultiStepForm from "@/components/MultiStepForm";
import SuccessPage from "@/components/SuccessPage";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleSubmissionComplete = () => {
    setShowSuccess(true);
  };

  const handleGoHome = () => {
    setShowSuccess(false);
    setIsAuthenticated(false);
  };

  if (showSuccess) {
    return <SuccessPage onGoHome={handleGoHome} />;
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return <MultiStepForm onSubmissionComplete={handleSubmissionComplete} />;
};

export default Index;
