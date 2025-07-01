
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
      {/* Left side - White with wave pattern */}
      <div className="flex-1 bg-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('/lovable-uploads/b23a763b-14af-41fa-a224-4a3938194160.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      {/* Right side - Blue with login form */}
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded-lg px-4 py-4 text-gray-800 text-lg placeholder-gray-500"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-300 text-sm mt-2">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white rounded-lg px-4 py-4 text-gray-800 text-lg placeholder-gray-500 pr-12"
                placeholder="Enter Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-300 text-sm mt-2">{errors.password}</p>
              )}
            </div>

            {errors.general && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-transparent border-2 border-white text-white py-4 px-8 rounded-full text-xl font-light hover:bg-white hover:text-blue-800 transition-colors duration-300"
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
