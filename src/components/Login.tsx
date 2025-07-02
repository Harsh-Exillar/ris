
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

    // Check credentials
    if (email && password && validateEmail(email)) {
      console.log('Checking credentials...');
      if (email === 'harshm@exillar.com' && password === '123456789') {
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
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Wave pattern background - positioned to show above and below the login box */}
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
      
      {/* Login container centered */}
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative z-10 w-full max-w-2xl">
          {/* Blue login box - centered */}
          <div 
            className="rounded-lg shadow-2xl p-8 md:p-16 text-center mx-4 md:mx-8"
            style={{ backgroundColor: '#00263A' }}
          >
            {/* Logo/Brand */}
            <div className="mb-8 md:mb-16">
              <div className="flex flex-col md:flex-row items-center justify-center mb-6 md:mb-10">
                <div className="bg-white rounded-full p-4 md:p-6 mb-4 md:mb-0 md:mr-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 145.98 31.92" className="w-12 h-3 md:w-16 md:h-4">
                    <defs>
                      <style>
                        {`.slw { fill: #00263A; }`}
                      </style>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                      <g id="Layer_1-2" data-name="Layer 1">
                        <path className="slw" d="M5.45,29c-3.06.23-3.6-2.24-4.39-2.64s-1.22.45-1,1.67,2.09,3.28,5.09,3.32c3.57,0,7.14-4.92,12.31-4.58,4.85.31,8.6,4,9.7,4.92h0l.05,0s0,0,0,0h0a.93.93,0,0,0,.7.17h0l.05,0h0c.26-.09.43-.43,0-1.44-.36-.83-4.27-7.07-9.22-7.54S9.88,28.63,5.45,29M22.82,7.23a12.06,12.06,0,0,1-1.42,4.59,21.38,21.38,0,0,1-4.77,5.53c-5.21,4.5-7,2.81-7,2.81-1-.85.28-4,.28-4,2.11-5,7.3-10.08,7.3-10.08.95-.71,1.28-.69,1.28-.69,3-.22,2.89-1.63,2.89-1.63,1.54.68,1.42,3.5,1.42,3.5m1,5.6a11,11,0,0,0,2.33-6.64C26.4.08,21.31.48,21.31.48,14.39,1.07,9.5,6.8,9.5,6.8c-1.6,2.09-1,2.42-1,2.42.15.47,1.83,1.18,1.83,1.18a34.58,34.58,0,0,0-3.23,5.67C5.65,19.12,5.73,21,6.12,22c.57,1.54,2.48,1.88,3.16,1.86a5.12,5.12,0,0,0,.94-.12h0l.19,0,.07,0c1.09-.3,5.52-1.83,10.61-7.44a27,27,0,0,0,2.47-3l.05-.07.26-.36Zm25.56-1.91s-1,1.68-1.3,2.38c0,0-.21.37-.31.5a25.11,25.11,0,0,1-3.48,3.63s-1.32,1.09.29-1.81a22.82,22.82,0,0,1,3.89-4.91s.68-.65.91-.47c0,0,.28.1,0,.68M37.13,12.5A7.05,7.05,0,0,1,39.65,10c.8-.1.44,1.14.44,1.14-.68,1.8-3,1.38-3,1.38M53.43,10c.26-.76-.49-1.66-.49-1.66a7.57,7.57,0,0,0-.91-1A2,2,0,0,0,50,7.05c-5.16,2.66-7.9,7.89-8.92,10.25a8.8,8.8,0,0,1-3.43,2c-3.15.41-1.74-3.77-1.74-3.77a8.28,8.28,0,0,0,3.45-.88,6.87,6.87,0,0,0,3.22-3.53c.8-2.28-.32-3.4-.32-3.4a2.06,2.06,0,0,0-2.62-.39,14.19,14.19,0,0,0-5.36,5.33h0C29.46,18.46,27,19,27,19c-2.23.74-1.38-1.89-1.38-1.89C27.46,11.92,29.79,10,29.79,10l.14-.1a1.16,1.16,0,0,0,.89.7c1.62.28,2.33-1.9,2.33-1.9a2.09,2.09,0,0,0,0-1.24h0v0A.92.92,0,0,0,33,7.16a2.28,2.28,0,0,0-1.89-.78h0a2.52,2.52,0,0,0-1.28.6,25.58,25.58,0,0,0-5.64,7.44c-3.36,6.78-1,7.82-1,7.82,3.31,2.2,9.09-4.57,9.09-4.57l.12-.16a7.76,7.76,0,0,0-.12,1.53,4.45,4.45,0,0,0,.62,2.48l0,.08h0a1.69,1.69,0,0,0,.28.32,3,3,0,0,0,2.41.62l.31,0h0a3.48,3.48,0,0,0,.44-.1l.14,0,.21-.07a8.31,8.31,0,0,0,1.06-.46l.23-.12.06,0h0a17.48,17.48,0,0,0,2-1.29,1.62,1.62,0,0,0,1.2,1.2c1.58.49,5.47-3.64,5.47-3.64,0,1.17.18,2.67.18,2.67.58,3.22,2.42,3.12,2.42,3.12a2.51,2.51,0,0,0,2-1.15,1.29,1.29,0,0,0,0-1.66,3.32,3.32,0,0,1-.37-.35,1,1,0,0,1-.2-.39,10.23,10.23,0,0,1,1.94-8.93,3.12,3.12,0,0,0,.7-1.28m16.06,12.3c1-1,.79-1.69.79-1.69h0a.92.92,0,0,0-.08-.27A1.9,1.9,0,0,0,69,19.48a4.37,4.37,0,0,1-2.06-2,13.13,13.13,0,0,1-.85-3.6S65.82,11.68,65,11.5a3,3,0,0,0-2.51.82,42.8,42.8,0,0,0-6.73,5.79s-.45-.13,1.09-3.53c0,0,1.7-3.63,2.27-4.77,0,0,.78-1.4.28-1.8,0,0-.25-.47-1.39.19a18.63,18.63,0,0,0-1.76,1.3,2.21,2.21,0,0,0-.42.6s-3.06,6.65-3.72,8.67c0,0-.92,1.87.8,2.65,0,0,1.55,1,3.27-1L62,15.33l.24-.19s.27-.25.29.66c0,0,.2,3.69,2.37,5.83h0l.07.06a5.14,5.14,0,0,0,1.45,1,4.55,4.55,0,0,0,.83.3,2,2,0,0,0,.53.09h0a2.44,2.44,0,0,0,1.76-.78M86.86,11.82s-2.23,4-8.2,8.91A42.44,42.44,0,0,1,79,14.8a20.4,20.4,0,0,1,7.55-4s1.24-.39.31,1.06m-7-1.75a21.17,21.17,0,0,1,2.64-6.36c1.29-.3,3.2-.67,3-.18,0,0-1,2.17-5.66,6.54m11.22-.6a2.62,2.62,0,0,0,0-.48.87.87,0,0,1,0-.11h0c-.22-1.33-1.78-1.22-1.78-1.22a20.2,20.2,0,0,0-5.52,1.51L83.92,9l2.17-2.32c2.62-2.6,3-4.25,3-4.25C89.71-.22,86.48,0,86.48,0A15.72,15.72,0,0,0,76.33,4c-.73.75-.24,1.07-.24,1.07l.66.39a1.45,1.45,0,0,0,1.15,0h0a33.25,33.25,0,0,0-2.35,8.87c-2,1.63-4.4,3.86-4.4,3.86-.54.52-.4.89-.18,1a2.43,2.43,0,0,0,.52.32,1,1,0,0,0,.73,0,14.26,14.26,0,0,0,3.14-2.22,22.55,22.55,0,0,0,.2,3.26c-3.29,3.63-1.9,4.32-1.9,4.32.6.49,1.72,0,1.72,0,7.5-3,14-11.45,14.52-12.28l0-.05a6.23,6.23,0,0,0,1.14-3.11m6.18.67s-1,1.69-1.3,2.39a4.56,4.56,0,0,1-.31.49,25.26,25.26,0,0,1-3.47,3.64s-1.33,1.09.28-1.82a22.7,22.7,0,0,1,3.9-4.91s.67-.65.9-.46c0,0,.29.1,0,.67m4-.94c.26-.76-.5-1.65-.5-1.65a6.81,6.81,0,0,0-.9-1,2,2,0,0,0-2.06-.28,19.41,19.41,0,0,0-7.6,7.65h0l-.06.1c-.28.5-.53,1-.74,1.4A12.45,12.45,0,0,0,88,19.27h0a1.57,1.57,0,0,0,1.22,1.55c1.58.49,5.48-3.63,5.48-3.63,0,1.16.18,2.67.18,2.67.57,3.22,2.41,3.11,2.41,3.11a2.45,2.45,0,0,0,2-1.15,1.26,1.26,0,0,0,0-1.65,2.41,2.41,0,0,1-.36-.36.82.82,0,0,1-.2-.38c-1-5.17,1.15-7.88,1.94-8.93a3.29,3.29,0,0,0,.7-1.29m25.85,3a7.07,7.07,0,0,1,2.52-2.51c.8-.11.44,1.14.44,1.14-.68,1.79-3,1.37-3,1.37m-15.51,4v0h0l0,0M146,9.55a.54.54,0,0,0-.32-.58,13,13,0,0,0-5.9-.53c.59-.83,1-1.31,1-1.31a3.06,3.06,0,0,0,1.12-1.77c.18-.93-.78-.93-.78-.93a3.63,3.63,0,0,0-1.79.78,19.79,19.79,0,0,0-3.06,4.06,15.21,15.21,0,0,0-2.59,1.13c-1.05.65-.74,1-.74,1,.08.5,1.48,1.17,1.48,1.17h0l-.05.12h0c-3.51,5.53-6.73,6.34-6.73,6.34-3.16.42-1.75-3.76-1.75-3.76a8.41,8.41,0,0,0,3.46-.89,6.87,6.87,0,0,0,3.22-3.53c.8-2.28-.32-3.39-.32-3.39a2.06,2.06,0,0,0-2.62-.39,14,14,0,0,0-6.41,7.65c-1.11,3.29-.81,5.31-.51,6.14a60.17,60.17,0,0,1-4.39-8.5,3.48,3.48,0,0,1,2.38-1.22c.5,0,1.59-1.15,1.59-1.15A2.18,2.18,0,0,0,123,8.84a.62.62,0,0,0-.46-.67,1.47,1.47,0,0,0-.66,0,14,14,0,0,0-4.95,2.86c1.59-3.34,3-6.05,3-6.05a2.63,2.63,0,0,0,.57-1.43c.1-1.06-1-.78-1-.78a4.66,4.66,0,0,0-2.33,1.53,96,96,0,0,0-4.91,10.34,1.23,1.23,0,0,0,0-.45c-.72-1.87-4.5-1.65-4.5-1.65a7.9,7.9,0,0,1-2.14-.14c-.5-.12,0-1,0-1a3.66,3.66,0,0,1,2.11-1.81,1.37,1.37,0,0,0,.41.11A5.47,5.47,0,0,0,110.67,9c.52-.31.65-.64.64-.92h0a.94.94,0,0,0-.08-.34,2.33,2.33,0,0,0-1.08-1.12h0a3.19,3.19,0,0,0-2.38,0,15.63,15.63,0,0,0-6.28,5.5,1.83,1.83,0,0,0,.14,2.28c1.36,1.72,6.1,1.39,6.1,1.39.73.05.09.66.09.66a21.35,21.35,0,0,1-5,3.77c-4.26,2.18-3.27,3.16-3.13,3.4l.14.16a1,1,0,0,0,1,.13,29.38,29.38,0,0,0,9.08-5.86A12,12,0,0,0,111,17a5.67,5.67,0,0,0,.53-.66l.07-.07c-1.14,2.93-1.76,4.88-1.76,4.88-.54,1.61.68,2.08.68,2.08.83.42,1.52-.23,1.94-.73a3.36,3.36,0,0,0,1-2.64,10.73,10.73,0,0,1,.29-1.54c.44-1.19.92-2.34,1.5-3.66,2.71,6.39,4.93,8.72,4.93,8.72a1.31,1.31,0,0,0,.89.42,1.82,1.82,0,0,0,1.37-.88,4.71,4.71,0,0,0,.49-1,.9.9,0,0,0,0-.53h0a2.69,2.69,0,0,0,.27.32,3.06,3.06,0,0,0,2.42.62l.31-.05h0l.44-.1.14,0,.21-.07a6.75,6.75,0,0,0,.86-.37h0a22.82,22.82,0,0,0,4.49-3.14,9.54,9.54,0,0,0-.28,2.42,2.78,2.78,0,0,0,0,.57s0,.06,0,.09a1.25,1.25,0,0,0,.07.23,1.12,1.12,0,0,0,1.09.87c1.09,0,2.16-1.5,2.16-1.5.62-.83.08-1.23.08-1.23-.29-.12-.31-.25-.31-.25A22.62,22.62,0,0,1,137.61,12l.13,0a10.23,10.23,0,0,1,3.06-.5,4.39,4.39,0,0,1,2.44.45h0l.06,0a1.47,1.47,0,0,0,.31.11.83.83,0,0,0,.85-.21A5.16,5.16,0,0,0,146,9.67a.2.2,0,0,0,0-.07.11.11,0,0,0,0,0"></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <h1 className="text-white text-3xl md:text-5xl font-light text-center md:text-left" style={{ fontFamily: 'Montserrat, sans-serif' }}>Restaurant Income Statement</h1>
              </div>
              <h2 className="text-white text-3xl md:text-4xl font-light tracking-wider">LOG-IN</h2>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-white px-0 py-6 text-white text-xl placeholder-gray-300 focus:outline-none"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    borderBottomColor: 'white'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderBottomColor = '#FFC801'}
                  onBlur={(e) => e.currentTarget.style.borderBottomColor = 'white'}
                  placeholder="Email"
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
                  className="w-full bg-transparent border-b-2 border-white px-0 py-6 text-white text-xl placeholder-gray-300 focus:outline-none pr-12"
                  placeholder="Password"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    borderBottomColor: 'white'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderBottomColor = '#FFC801'}
                  onBlur={(e) => e.currentTarget.style.borderBottomColor = 'white'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white"
                >
                  {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
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

              <div className="pt-10">
                <button
                  type="submit"
                  className="w-full bg-transparent border-2 border-white text-white py-5 px-10 rounded-full text-2xl font-light hover:bg-white transition-colors duration-300"
                  style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#00263A';
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
