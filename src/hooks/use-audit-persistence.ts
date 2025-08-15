import { useState, useEffect } from 'react';
import { type EnhancedAuditState } from '@/app/actions';

const STORAGE_KEY = 'quoted_current_audit';

export function useAuditPersistence() {
  const [auditResult, setAuditResult] = useState<EnhancedAuditState>({
    error: null,
    message: null,
    data: null,
  });

  // Load audit result from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setAuditResult(parsed);
      }
    } catch (error) {
      console.error('Failed to load audit result from localStorage:', error);
    }
  }, []);

  // Save audit result to localStorage whenever it changes
  const persistAuditResult = (result: EnhancedAuditState) => {
    setAuditResult(result);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
    } catch (error) {
      console.error('Failed to save audit result to localStorage:', error);
    }
  };

  // Clear stored audit result
  const clearAuditResult = () => {
    setAuditResult({ error: null, message: null, data: null });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear audit result from localStorage:', error);
    }
  };

  return {
    auditResult,
    persistAuditResult,
    clearAuditResult,
  };
}
