'use client';

import { AuditCacheManager } from '@/components/audit-cache-manager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Info, Clock, TrendingUp } from 'lucide-react';

export default function CacheManagementPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Database className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Audit Cache Management</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          View and manage your cached audit results. Cached audits are automatically saved and can be accessed instantly without re-running the analysis.
        </p>
      </div>

      {/* Cache Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
              <Info className="h-5 w-5" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700 dark:text-blue-200">
              Audit results are automatically cached when you perform an analysis. This allows you to quickly access previous results without waiting for re-analysis.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-300">
              <Clock className="h-5 w-5" />
              Cache Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700 dark:text-green-200">
              Cached audits are stored for 7 days and automatically cleaned up when expired. The cache can hold up to 50 recent audit results.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-300">
              <TrendingUp className="h-5 w-5" />
              Performance Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700 dark:text-purple-200">
              Instant access to previous results saves time and reduces API calls. Perfect for comparing results or revisiting analysis.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cache Manager */}
      <AuditCacheManager />
    </div>
  );
}
