'use client';

import { useState } from 'react';
import { useAuditCacheContext } from '@/contexts/audit-cache-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Trash2, 
  Clock, 
  Globe, 
  Bot, 
  TrendingUp,
  Calendar,
  Database
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export function AuditCacheManager() {
  const { 
    cachedAudits, 
    clearCachedAudit, 
    clearAllCache, 
    getCacheStats 
  } = useAuditCacheContext();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const stats = getCacheStats();

  const handleClearCache = (url: string, userAgent: string) => {
    clearCachedAudit(url, userAgent);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all cached audits? This action cannot be undone.')) {
      clearAllCache();
    }
  };

  if (cachedAudits.length === 0) {
    return (
      <Card className="bg-muted/50 dark:bg-gray-800/50">
        <CardContent className="p-6 text-center">
          <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Cached Audits</h3>
          <p className="text-sm text-muted-foreground">
            Audit results will be automatically cached when you perform audits.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-muted/50 dark:bg-gray-800/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Audit Cache ({cachedAudits.length})
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {stats.valid} valid • {stats.expired} expired
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleClearAll}
              disabled={cachedAudits.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {cachedAudits.map((audit, index) => (
              <div
                key={`${audit.url}-${audit.userAgent}-${index}`}
                className="p-4 rounded-lg border bg-background dark:bg-gray-900/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm font-medium truncate" title={audit.url}>
                        {audit.url}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Bot className="h-3 w-3" />
                      <span>{audit.userAgent}</span>
                      <Clock className="h-3 w-3 ml-2" />
                      <span>{formatDistanceToNow(audit.timestamp, { addSuffix: true })}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    {audit.result.data && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {audit.result.data.overall_score}/100
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {audit.result.data.verdict}
                        </Badge>
                      </div>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleClearCache(audit.url, audit.userAgent)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {audit.result.data && (
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">Categories:</span> {Object.keys(audit.result.data.categories || {}).length} analyzed
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Cache expires after {stats.expiryDays} days</span>
              <span>Max cache size: {stats.maxSize}</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
