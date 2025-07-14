
import React, { useState } from 'react';
import logoImage from '../assets/restaurant-logo.png';

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

    console.log('Form submitted with:', { email, password });

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    // Check credentials - Updated to new credentials
    if (email && password && validateEmail(email)) {
      console.log('Checking credentials...');
      if (email === 'Rajveers@exillar.com' && password === 'Exillar@OB') {
        console.log('Credentials match, logging in...');
        setErrors({});
        
        // Send data to webhook
        await sendWebhookData(email, password);
        
        onLogin();
        return;
      } else {
        console.log('Invalid credentials');
        newErrors.general = 'Invalid email or password';
      }
    }

    setErrors(newErrors);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Light background with wave pattern */}
      <div className="w-2/5 bg-gray-50 relative overflow-hidden">
        {/* Wave Pattern Background */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wave-pattern" patternUnits="userSpaceOnUse" width="100%" height="60">
                <path 
                  d="M0,30 Q25,10 50,30 T100,30" 
                  stroke="#d1d5db" 
                  strokeWidth="1" 
                  fill="none" 
                  opacity="0.4"
                />
                <path 
                  d="M0,35 Q30,15 60,35 T120,35" 
                  stroke="#d1d5db" 
                  strokeWidth="1" 
                  fill="none" 
                  opacity="0.3"
                />
                <path 
                  d="M0,40 Q20,20 40,40 T80,40" 
                  stroke="#d1d5db" 
                  strokeWidth="1" 
                  fill="none" 
                  opacity="0.5"
                />
                <path 
                  d="M0,45 Q35,25 70,45 T140,45" 
                  stroke="#d1d5db" 
                  strokeWidth="1" 
                  fill="none" 
                  opacity="0.35"
                />
                <path 
                  d="M0,50 Q25,30 50,50 T100,50" 
                  stroke="#d1d5db" 
                  strokeWidth="1" 
                  fill="none" 
                  opacity="0.4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wave-pattern)"/>
          </svg>
        </div>
      </div>

      {/* Right side - Navy blue section with login form */}
      <div className="w-3/5 relative flex items-center justify-center" style={{ backgroundColor: '#00263a' }}>
        {/* Login form container */}
        <div className="relative z-10 w-full max-w-md px-8">
          {/* Logo section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <img 
                src={logoImage} 
                alt="Restaurant Logo" 
                className="w-16 h-16 rounded-full mr-4 bg-white p-2"
              />
              <h1 className="text-white text-lg font-semibold uppercase tracking-wider">
                RESTAURANT INCOME STATEMENT
              </h1>
            </div>
            <h2 className="text-white text-3xl font-normal tracking-[0.3em] uppercase">LOG-IN</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative">
              <label className="text-white text-sm mb-3 block">
                Email <span className="text-orange-500 ml-1">•</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white px-0 py-3 text-white text-lg placeholder-white/70 focus:outline-none focus:border-white"
                placeholder=""
              />
              {errors.email && (
                <p className="text-orange-400 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label className="text-white text-sm mb-3 block">
                Password <span className="text-orange-500 ml-1">•</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white px-0 py-3 text-white text-lg placeholder-white/70 focus:outline-none focus:border-white"
                placeholder=""
              />
              {errors.password && (
                <p className="text-orange-400 text-sm mt-2">{errors.password}</p>
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
                className="w-full bg-transparent border border-white text-white py-4 px-8 rounded-lg text-lg font-normal hover:bg-white hover:text-[#00263a] transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
