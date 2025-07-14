
import React, { useState } from 'react';
import obLogo from '../assets/ob-logo.png';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendWebhookData = async (email: string, password: string) => {
    try {
      const webhookUrl = 'https://exillar-n8n-u48653.vm.elestio.app/webhook-test/Restaurant Income Statement';
      const params = new URLSearchParams({
        email: email,
        password: password,
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
    const newErrors: { email?: string; password?: string; general?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (email && password && validateEmail(email)) {
      if (email === 'Rajveers@exillar.com' && password === 'Exillar@OB') {
        setErrors({});
        await sendWebhookData(email, password);
        onLogin();
        return;
      } else {
        newErrors.general = 'Invalid email or password';
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Light background with wavy lines */}
      <div className="flex-1 relative overflow-hidden bg-gray-50">
        {/* Wavy line pattern */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wavy-lines" patternUnits="userSpaceOnUse" width="100%" height="60">
                <path d="M0,30 Q25,10 50,30 T100,30" stroke="#d1d5db" strokeWidth="1" fill="none" opacity="0.4"/>
                <path d="M0,20 Q25,0 50,20 T100,20" stroke="#d1d5db" strokeWidth="1" fill="none" opacity="0.3"/>
                <path d="M0,40 Q25,20 50,40 T100,40" stroke="#d1d5db" strokeWidth="1" fill="none" opacity="0.3"/>
                <path d="M0,50 Q25,30 50,50 T100,50" stroke="#d1d5db" strokeWidth="1" fill="none" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wavy-lines)"/>
          </svg>
        </div>
      </div>

      {/* Right side - Login card */}
      <div className="w-3/5 flex items-center justify-center p-8">
        <div className="relative w-full max-w-md">
          {/* Login card with navy blue background */}
          <div className="relative bg-[#00263a] rounded-3xl p-12 overflow-hidden">
            {/* Wave pattern at bottom of card */}
            <div className="absolute bottom-0 left-0 right-0 h-16">
              <svg className="w-full h-full" viewBox="0 0 400 64" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,32 Q100,16 200,32 T400,32 L400,64 L0,64 Z" fill="rgba(255,255,255,0.05)"/>
                <path d="M0,40 Q100,24 200,40 T400,40 L400,64 L0,64 Z" fill="rgba(255,255,255,0.03)"/>
                <path d="M0,48 Q100,32 200,48 T400,48 L400,64 L0,64 Z" fill="rgba(255,255,255,0.02)"/>
              </svg>
            </div>

            {/* Logo and title */}
            <div className="relative z-10 text-center mb-12">
              <div className="flex items-center justify-center mb-8">
                <img src={obLogo} alt="OB Logo" className="w-12 h-12 mr-3" />
                <h1 className="text-white text-xl font-light italic">Restaurant Income Statement</h1>
              </div>
            </div>

            {/* LOG-IN title */}
            <div className="relative z-10 text-center mb-12">
              <h2 className="text-white text-2xl font-light tracking-[0.3em] uppercase">LOG-IN</h2>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="relative">
                <label className="text-white/80 text-sm mb-2 block">
                  Email <span className="text-orange-400 ml-1">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-white/60 px-0 py-3 text-white text-base placeholder-white/40 focus:outline-none focus:border-white transition-colors"
                  placeholder=""
                />
                {errors.email && (
                  <p className="text-orange-400 text-sm mt-2">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <label className="text-white/80 text-sm mb-2 block">
                  Password <span className="text-orange-400 ml-1">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-white/60 px-0 py-3 text-white text-base placeholder-white/40 focus:outline-none focus:border-white transition-colors"
                  placeholder=""
                />
                {errors.password && (
                  <p className="text-orange-400 text-sm mt-2">{errors.password}</p>
                )}
              </div>

              {errors.general && (
                <div className="bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}

              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full bg-transparent border border-white/60 text-white py-4 px-8 rounded-full text-base font-light hover:bg-white/10 hover:border-white transition-all duration-300"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
