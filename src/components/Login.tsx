
import React, { useState } from 'react';
import logoImage from '@/assets/logo.png';

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
      {/* Left side - Light gray background */}
      <div className="w-2/5 bg-gray-100">
      </div>

      {/* Right side - Deep teal section with login form */}
      <div className="w-3/5 bg-teal-800 relative flex items-center justify-center overflow-hidden">
        {/* Multiple wave layers at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <svg className="w-full h-full" viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
            {/* First wave layer */}
            <path 
              d="M0,120 C300,80 600,40 900,60 C1050,70 1150,90 1200,100 L1200,120 Z" 
              fill="rgba(45, 212, 191, 0.2)" 
            />
            {/* Second wave layer */}
            <path 
              d="M0,120 C200,100 400,80 600,85 C800,90 1000,95 1200,100 L1200,120 Z" 
              fill="rgba(45, 212, 191, 0.15)" 
            />
            {/* Third wave layer */}
            <path 
              d="M0,120 C150,110 350,90 550,95 C750,100 950,105 1200,110 L1200,120 Z" 
              fill="rgba(45, 212, 191, 0.1)" 
            />
          </svg>
        </div>

        {/* Login form container */}
        <div className="relative z-10 w-full max-w-md px-8">
          {/* Logo section */}
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-12">
              <div className="w-20 h-20 rounded-full overflow-hidden mr-6 bg-white flex items-center justify-center">
                <img 
                  src={logoImage} 
                  alt="Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h1 className="text-white text-xl font-medium uppercase tracking-wide">
                RESTAURANT INCOME STATEMENT
              </h1>
            </div>
            <h2 className="text-white text-4xl font-light tracking-[0.4em] uppercase">LOG-IN</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-16">
            <div className="relative">
              <label className="text-white text-sm mb-3 block font-medium">
                Email <span className="text-orange-400 ml-1">•</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white px-0 py-4 text-white text-lg placeholder-white/50 focus:outline-none focus:border-teal-300 transition-colors"
                placeholder=""
              />
              {errors.email && (
                <p className="text-orange-400 text-sm mt-3 italic">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label className="text-white text-sm mb-3 block font-medium">
                Password <span className="text-orange-400 ml-1">•</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white px-0 py-4 text-white text-lg placeholder-white/50 focus:outline-none focus:border-teal-300 transition-colors"
                placeholder=""
              />
              {errors.password && (
                <p className="text-orange-400 text-sm mt-3 italic">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <div className="bg-red-900/30 border border-red-400 text-red-300 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <div className="pt-12">
              <button
                type="submit"
                className="w-full bg-transparent border-2 border-white text-white py-5 px-8 rounded-2xl text-lg font-medium hover:bg-white hover:text-teal-800 transition-all duration-300 tracking-wide"
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
