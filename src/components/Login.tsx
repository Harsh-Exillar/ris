
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    // Check credentials
    if (email && password && validateEmail(email)) {
      console.log('Checking credentials...');
      if (email === 'harshm@exillar.com' && password === '123456789') {
        console.log('Credentials match, logging in...');
        setErrors({});
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
      {/* Left side - Clean white/light */}
      <div className="flex-1 bg-gray-100 relative flex items-center justify-center">
        {/* OB CashPlate logo on left side */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white rounded-full p-4 mr-4 shadow-lg">
              <span className="text-blue-800 font-bold text-2xl">OB</span>
            </div>
            <h1 className="text-gray-400 text-4xl font-light italic">CashPlate</h1>
          </div>
          <h2 className="text-gray-400 text-3xl font-light tracking-wider">LOG-IN</h2>
          
          {/* Login form on left side */}
          <form onSubmit={handleSubmit} className="mt-12 space-y-6 max-w-sm">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-0 border-b-2 border-gray-300 text-gray-600 placeholder-gray-400 px-0 py-3 focus:outline-none focus:border-gray-500 text-lg"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-0 border-b-2 border-gray-300 text-gray-600 placeholder-gray-400 px-0 py-3 focus:outline-none focus:border-gray-500 text-lg"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <div className="pt-6">
              <button
                type="submit"
                className="bg-gray-300 text-gray-600 py-3 px-12 rounded-full text-lg font-light hover:bg-gray-400 transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Blue with form */}
      <div className="flex-1 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center relative overflow-hidden">
        {/* Wave patterns at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-32" viewBox="0 0 1200 200" fill="none">
            <path
              d="M0,100 C150,150 300,50 450,100 C600,150 750,50 900,100 C1050,150 1200,100 1200,100 L1200,200 L0,200 Z"
              fill="rgba(255,255,255,0.1)"
            />
            <path
              d="M0,120 C150,170 300,70 450,120 C600,170 750,70 900,120 C1050,170 1200,120 1200,120 L1200,200 L0,200 Z"
              fill="rgba(255,255,255,0.05)"
            />
          </svg>
        </div>

        {/* Right side content */}
        <div className="relative z-10 w-full max-w-md px-8 text-center">
          {/* Logo/Brand */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white rounded-full p-4 mr-4">
                <span className="text-blue-800 font-bold text-2xl">OB</span>
              </div>
              <h1 className="text-white text-4xl font-light italic">CashPlate</h1>
            </div>
            <h2 className="text-white text-3xl font-light tracking-wider">LOG-IN</h2>
          </div>

          {/* Error message display */}
          {errors.general && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
              {errors.general}
            </div>
          )}

          {/* Prefilled form display */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-4">
              <input
                type="text"
                value="harshm@exillar.com"
                readOnly
                className="w-full text-gray-800 text-lg bg-transparent border-none outline-none"
              />
            </div>

            <div className="bg-white rounded-lg p-4 flex items-center justify-between">
              <span className="text-gray-800 text-lg">12345678</span>
              <Eye className="text-gray-400" size={20} />
            </div>

            <button
              onClick={() => {
                setEmail('harshm@exillar.com');
                setPassword('123456789');
                onLogin();
              }}
              className="w-full bg-transparent border-2 border-white text-white py-4 px-8 rounded-full text-xl font-light hover:bg-white hover:text-blue-800 transition-colors duration-300"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
