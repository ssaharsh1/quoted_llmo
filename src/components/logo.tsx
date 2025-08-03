'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20'
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

export function LogoIcon({ className = '', size = 'md' }: LogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

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