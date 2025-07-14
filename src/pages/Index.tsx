
import React, { useState } from 'react';
import MultiStepForm from "@/components/MultiStepForm";
import SuccessPage from "@/components/SuccessPage";

const Index = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmissionComplete = () => {
    setShowSuccess(true);
  };

  const handleGoHome = () => {
    setShowSuccess(false);
  };

  if (showSuccess) {
    return <SuccessPage onGoHome={handleGoHome} />;
  }

  return <MultiStepForm onSubmissionComplete={handleSubmissionComplete} />;
};

export default Index;
