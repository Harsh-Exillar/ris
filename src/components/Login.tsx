
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
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Wave pattern background */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url('/lovable-uploads/b23a763b-14af-41fa-a224-4a3938194160.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6
        }}
      />
      
      {/* Login container positioned on the right */}
      <div className="min-h-screen flex items-center justify-end pr-16">
        <div className="relative z-10 w-full max-w-md">
          {/* Blue login box */}
          <div 
            className="rounded-lg shadow-2xl p-12 text-center"
            style={{ backgroundColor: '#003A70' }}
          >
            {/* Logo/Brand */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-white rounded-full p-4 mr-4">
                  <span className="text-2xl font-bold" style={{ color: '#003A70' }}>OB</span>
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
                  className="w-full bg-transparent border-b-2 border-white px-0 py-4 text-white text-lg placeholder-gray-300 focus:outline-none focus:border-yellow-300"
                  placeholder="Email"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
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
                  className="w-full bg-transparent border-b-2 border-white px-0 py-4 text-white text-lg placeholder-gray-300 focus:outline-none focus:border-yellow-300 pr-10"
                  placeholder="Password"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
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

              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full bg-transparent border-2 border-white text-white py-4 px-8 rounded-full text-xl font-light hover:bg-white transition-colors duration-300"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#003A70';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'white';
                  }}
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
