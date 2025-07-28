import React from 'react';

interface OceanBackgroundProps {
  variant?: 'login' | 'form';
  children: React.ReactNode;
}

const OceanBackground: React.FC<OceanBackgroundProps> = ({ variant = 'login', children }) => {
  return (
    <div className={`min-h-screen relative overflow-hidden ${variant === 'login' ? 'bg-gradient-to-br from-blue-50 via-white to-cyan-50' : 'bg-primary'}`}>
      {/* Enhanced Ocean wave background effect */}
      <div className="absolute inset-0">
        {/* Animated gradient waves */}
        <div className={`absolute inset-0 ${variant === 'login' ? 'bg-gradient-to-br from-primary/20 via-primary/10 to-transparent' : 'bg-gradient-to-br from-primary via-primary/90 to-primary/80'}`}></div>
        
        {/* Multiple wave layers with different opacities */}
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 800" xmlns="http://www.w3.org/2000/svg">
          {/* Background wave fills */}
          <defs>
            <linearGradient id={`wave1-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={variant === 'login' ? "0.1" : "0.3"}/>
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={variant === 'login' ? "0.3" : "0.5"}/>
            </linearGradient>
            <linearGradient id={`wave2-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.05"/>
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={variant === 'login' ? "0.2" : "0.4"}/>
            </linearGradient>
            <linearGradient id={`wave3-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.3"/>
            </linearGradient>
          </defs>
          
          {/* Multiple layered wave shapes for depth */}
          <path d="M0,400 Q360,320 720,400 T1440,400 L1440,800 L0,800 Z" fill={`url(#wave1-${variant})`} />
          <path d="M0,500 Q360,420 720,500 T1440,500 L1440,800 L0,800 Z" fill={`url(#wave2-${variant})`} />
          <path d="M0,600 Q200,550 400,600 T800,600 T1200,600 T1440,600 L1440,800 L0,800 Z" fill={`url(#wave3-${variant})`} />
          
          {/* Wave line patterns for texture */}
          <g stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity={variant === 'login' ? "0.3" : "0.4"}>
            <path d="M0,200 Q360,150 720,200 T1440,200" />
            <path d="M0,250 Q360,200 720,250 T1440,250" />
            <path d="M0,300 Q360,250 720,300 T1440,300" />
            <path d="M0,350 Q200,300 400,350 T800,350 T1200,350 T1440,350" />
          </g>
          
          {/* Additional decorative wave lines */}
          <g stroke="hsl(var(--secondary))" strokeWidth="1" fill="none" opacity="0.2">
            <path d="M0,180 Q300,130 600,180 T1200,180 T1440,180" />
            <path d="M0,320 Q400,270 800,320 T1440,320" />
            <path d="M0,450 Q300,400 600,450 T1200,450 T1440,450" />
          </g>
        </svg>
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-secondary/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary/15 rounded-full animate-pulse delay-500"></div>
        <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-accent/25 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-primary/10 rounded-full animate-pulse delay-300"></div>
      </div>

      {children}
    </div>
  );
};

export default OceanBackground;