'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface LogoWrapperProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  forceDark?: boolean;
}

export function LogoWrapper({ className = '', size = 'md', forceDark = false }: LogoWrapperProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = forceDark || resolvedTheme === 'dark';

  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32'
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`${sizeClasses[size]} relative ${className} bg-gray-200 dark:bg-gray-800 animate-pulse`}>
        <div className="w-full h-full rounded-lg"></div>
      </div>
    );
  }

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