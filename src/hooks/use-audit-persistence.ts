import { useState, useEffect } from 'react';
import { type EnhancedAuditState } from '@/app/actions';

const STORAGE_KEY = 'quoted_current_audit_v2';

type PersistedAudit = {
  state: EnhancedAuditState;
  url?: string;
  userAgent?: string;
  timestamp: number;
};

export function useAuditPersistence() {
  const [persisted, setPersisted] = useState<PersistedAudit | null>(null);

  // Load persisted audit from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PersistedAudit;
        setPersisted(parsed);
      }
    } catch (error) {
      console.error('Failed to load audit from localStorage:', error);
      setPersisted(null);
    }
  }, []);

  const auditResult: EnhancedAuditState = persisted?.state ?? {
    error: null,
    message: null,
    data: null,
  };

  const latestUrl = persisted?.url;
  const latestUserAgent = persisted?.userAgent;

  // Save audit result + context to localStorage
  const persistAuditResult = (
    result: EnhancedAuditState,
    url?: string,
    userAgent?: string,
  ) => {
    const payload: PersistedAudit = {
      state: result,
      url,
      userAgent,
      timestamp: Date.now(),
    };
    setPersisted(payload);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
      console.error('Failed to save audit to localStorage:', error);
    }
  };

  // Clear stored audit
  const clearAuditResult = () => {
    setPersisted(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear audit from localStorage:', error);
    }
  };

  return {
    auditResult,
    latestUrl,
    latestUserAgent,
    persistAuditResult,
    clearAuditResult,
  };
}
