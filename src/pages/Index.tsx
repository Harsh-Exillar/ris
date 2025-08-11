
import React, { useState } from 'react';
import MultiStepForm from "@/components/MultiStepForm";
import SuccessPage from "@/components/SuccessPage";
import Login from "@/components/Login";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userObid, setUserObid] = useState('');

  const handleLogin = (obid: string) => {
    setUserObid(obid);
    setIsLoggedIn(true);
  };

  const handleSubmissionComplete = () => {
    setShowSuccess(true);
  };

  const handleGoHome = () => {
    setShowSuccess(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      setIsLoggedIn(false);
      setShowSuccess(false);
      setUserObid('');
    }
  };
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (showSuccess) {
    return <SuccessPage onGoHome={handleGoHome} />;
  }

  return <MultiStepForm onSubmissionComplete={handleSubmissionComplete} userObid={userObid} onLogout={handleLogout} />;
};

export default Index;
