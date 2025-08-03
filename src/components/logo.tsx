'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md', forceDark = false }: LogoProps & { forceDark?: boolean }) {
  const { resolvedTheme } = useTheme();
  const isDark = forceDark || resolvedTheme === 'dark';

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32'
  };

  return (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      <Image
        src={isDark ? '/images/logos/logo-dark.png' : '/images/logos/logo-light.png'}
        alt="Quoted Logo"
        fill
        className="object-contain"
        priority
      />
    </div>
  );
}

export function LogoIcon({ className = '', size = 'md', forceDark = false }: LogoProps & { forceDark?: boolean }) {
  const { resolvedTheme } = useTheme();
  const isDark = forceDark || resolvedTheme === 'dark';

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
        priority
      />
    </div>
  );
} 