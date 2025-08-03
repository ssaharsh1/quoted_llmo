'use client';

import { useTheme } from 'next-themes';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg flex items-center justify-center`}>
        <div className="flex items-center justify-center w-full h-full">
          <div className="flex flex-col gap-0.5">
            <div className="w-3 h-0.5 bg-black rounded-full transform rotate-12"></div>
            <div className="w-3 h-0.5 bg-black rounded-full transform rotate-12"></div>
          </div>
        </div>
      </div>
      
      {/* Text */}
      <span className={`font-bold ${textSizes[size]} ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Quoted
      </span>
    </div>
  );
}

export function LogoIcon({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg flex items-center justify-center ${className}`}>
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col gap-0.5">
          <div className="w-3 h-0.5 bg-black rounded-full transform rotate-12"></div>
          <div className="w-3 h-0.5 bg-black rounded-full transform rotate-12"></div>
        </div>
      </div>
    </div>
  );
} 