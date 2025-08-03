'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

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
      {/* Logo Image */}
      <div className={`${sizeClasses[size]} relative`}>
        <Image
          src={isDark ? '/images/logos/logo-dark.png' : '/images/logos/logo-light.png'}
          alt="Quoted Logo"
          fill
          className="object-contain"
        />
      </div>
      
      {/* Text */}
      <span className={`font-bold ${textSizes[size]} ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Quoted
      </span>
    </div>
  );
}

export function LogoIcon({ className = '', size = 'md' }: LogoProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      <Image
        src={isDark ? '/images/logos/logo-dark.png' : '/images/logos/logo-light.png'}
        alt="Quoted Logo"
        fill
        className="object-contain"
      />
    </div>
  );
} 