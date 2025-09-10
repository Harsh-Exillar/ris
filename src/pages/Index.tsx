
import React, { useState, useEffect } from 'react';
import MultiStepForm from "@/components/MultiStepForm";
import SuccessPage from "@/components/SuccessPage";
import Login from "@/components/Login";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userObid, setUserObid] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on component mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const email = session.user.email;
          if (email && email.includes('@oceanbasket.com')) {
            const obid = email.split('@')[0];
            setUserObid(obid);
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.warn('Error checking session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          setIsLoggedIn(false);
          setShowSuccess(false);
          setUserObid('');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (obid: string) => {
    if (!obid.trim()) {
      console.error('Invalid OBID provided');
      return;
    }
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
    } catch (error) {
      console.warn('Error during logout:', error);
    } finally {
      setIsLoggedIn(false);
      setShowSuccess(false);
      setUserObid('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <span className="text-primary">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (showSuccess) {
    return <SuccessPage onGoHome={handleGoHome} />;
  }

  return <MultiStepForm onSubmissionComplete={handleSubmissionComplete} userObid={userObid} onLogout={handleLogout} />;
};

export default Index;
