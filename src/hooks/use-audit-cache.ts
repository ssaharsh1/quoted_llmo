import { useState, useEffect, useCallback } from 'react';
import { type EnhancedAuditState } from '@/app/actions';

export interface CachedAudit {
  url: string;
  userAgent: string;
  timestamp: number;
  result: EnhancedAuditState;
}

const CACHE_KEY = 'quoted_audit_cache';
const MAX_CACHE_SIZE = 50; // Maximum number of cached audits
const CACHE_EXPIRY_DAYS = 7; // Cache expires after 7 days

export function useAuditCache() {
  const [cachedAudits, setCachedAudits] = useState<CachedAudit[]>([]);

  // Load cached audits from localStorage on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        // Filter out expired entries
        const now = Date.now();
        const validEntries = parsed.filter((audit: CachedAudit) => 
          now - audit.timestamp < CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000
        );
        setCachedAudits(validEntries);
        
        // Update localStorage with cleaned cache
        if (validEntries.length !== parsed.length) {
          localStorage.setItem(CACHE_KEY, JSON.stringify(validEntries));
        }
      }
    } catch (error) {
      console.error('Failed to load audit cache:', error);
      // Clear corrupted cache
      localStorage.removeItem(CACHE_KEY);
    }
  }, []);

  // Save cache to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cachedAudits));
    } catch (error) {
      console.error('Failed to save audit cache:', error);
    }
  }, [cachedAudits]);

  // Get cached audit result
  const getCachedAudit = useCallback((url: string, userAgent: string): EnhancedAuditState | null => {
    const cached = cachedAudits.find(
      audit => audit.url === url && audit.userAgent === userAgent
    );
    
    if (cached) {
      // Check if cache is still valid
      const now = Date.now();
      if (now - cached.timestamp < CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000) {
        return cached.result;
      } else {
        // Remove expired entry
        setCachedAudits(prev => prev.filter(audit => audit !== cached));
        return null;
      }
    }
    
    return null;
  }, [cachedAudits]);

  // Cache audit result
  const cacheAudit = useCallback((url: string, userAgent: string, result: EnhancedAuditState) => {
    const newAudit: CachedAudit = {
      url,
      userAgent,
      timestamp: Date.now(),
      result,
    };

    setCachedAudits(prev => {
      // Remove existing entry for same URL + userAgent combination
      const filtered = prev.filter(
        audit => !(audit.url === url && audit.userAgent === userAgent)
      );
      
      // Add new entry at the beginning (most recent first)
      const updated = [newAudit, ...filtered];
      
      // Limit cache size
      if (updated.length > MAX_CACHE_SIZE) {
        return updated.slice(0, MAX_CACHE_SIZE);
      }
      
      return updated;
    });
  }, []);

  // Clear specific audit from cache
  const clearCachedAudit = useCallback((url: string, userAgent: string) => {
    setCachedAudits(prev => 
      prev.filter(audit => !(audit.url === url && audit.userAgent === userAgent))
    );
  }, []);

  // Clear all cache
  const clearAllCache = useCallback(() => {
    setCachedAudits([]);
    localStorage.removeItem(CACHE_KEY);
  }, []);

  // Get cache statistics
  const getCacheStats = useCallback(() => {
    const now = Date.now();
    const validEntries = cachedAudits.filter(
      audit => now - audit.timestamp < CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    );
    
    return {
      total: cachedAudits.length,
      valid: validEntries.length,
      expired: cachedAudits.length - validEntries.length,
      maxSize: MAX_CACHE_SIZE,
      expiryDays: CACHE_EXPIRY_DAYS,
    };
  }, [cachedAudits]);

  return {
    getCachedAudit,
    cacheAudit,
    clearCachedAudit,
    clearAllCache,
    getCacheStats,
    cachedAudits,
  };
}
