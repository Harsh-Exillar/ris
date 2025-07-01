
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

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (email && password && validateEmail(email)) {
      if (email !== 'harshm@exillar.com' || password !== '123456789') {
        newErrors.general = 'Invalid email or password';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - White/Light with diagonal patterns */}
      <div className="flex-1 bg-gray-50 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(/lovable-uploads/cef92998-6b48-4893-976f-f000861e8b80.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Diagonal line patterns */}
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
            <g opacity="0.1">
              {Array.from({ length: 20 }, (_, i) => (
                <line
                  key={i}
                  x1={i * 50 - 200}
                  y1="0"
                  x2={i * 50 + 200}
                  y2="600"
                  stroke="#003A70"
                  strokeWidth="1"
                />
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* Right side - Blue login form */}
      <div className="flex-1 bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center relative overflow-hidden">
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

        {/* Login form container */}
        <div className="relative z-10 w-full max-w-md px-8">
          {/* Logo/Brand */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white rounded-full p-3 mr-3">
                <span className="text-blue-800 font-bold text-lg">OB</span>
              </div>
              <h1 className="text-white text-3xl font-light italic">CashPlate</h1>
            </div>
          </div>

          {/* LOG-IN title */}
          <div className="text-center mb-12">
            <h2 className="text-white text-2xl font-light tracking-wider">LOG-IN</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-white/50 text-white placeholder-white/70 px-0 py-3 focus:outline-none focus:border-white text-lg"
                  placeholder="Email"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                />
                <span className="absolute right-0 top-3 text-white/70 text-lg">•</span>
              </div>
              {errors.email && (
                <p className="text-red-300 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 border-b-2 border-white/50 text-white placeholder-white/70 px-0 py-3 focus:outline-none focus:border-white text-lg"
                  placeholder="Password"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-3 text-white/70 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-300 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            <div className="pt-8">
              <button
                type="submit"
                className="w-full bg-transparent border-2 border-white text-white py-3 px-8 rounded-full text-lg font-light hover:bg-white hover:text-blue-800 transition-colors duration-300"
                style={{ fontFamily: 'Arial, sans-serif' }}
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
