
import React, { useState } from 'react';
import MultiStepForm from "@/components/MultiStepForm";
import SuccessPage from "@/components/SuccessPage";
import Login from "@/components/Login";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSubmissionComplete = () => {
    setShowSuccess(true);
  };

  const handleGoHome = () => {
    setShowSuccess(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (showSuccess) {
    return <SuccessPage onGoHome={handleGoHome} />;
  }

  return <MultiStepForm onSubmissionComplete={handleSubmissionComplete} />;
};

export default Index;
