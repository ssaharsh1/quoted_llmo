'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuditCache, type CachedAudit } from '@/hooks/use-audit-cache';

interface AuditCacheContextType {
  getCachedAudit: (url: string, userAgent: string) => any;
  cacheAudit: (url: string, userAgent: string, result: any) => void;
  clearCachedAudit: (url: string, userAgent: string) => void;
  clearAllCache: () => void;
  getCacheStats: () => {
    total: number;
    valid: number;
    expired: number;
    maxSize: number;
    expiryDays: number;
  };
  cachedAudits: CachedAudit[];
}

const AuditCacheContext = createContext<AuditCacheContextType | undefined>(undefined);

export function AuditCacheProvider({ children }: { children: ReactNode }) {
  const cacheUtils = useAuditCache();

  return (
    <AuditCacheContext.Provider value={cacheUtils}>
      {children}
    </AuditCacheContext.Provider>
  );
}

export function useAuditCacheContext() {
  const context = useContext(AuditCacheContext);
  if (context === undefined) {
    throw new Error('useAuditCacheContext must be used within an AuditCacheProvider');
  }
  return context;
}
