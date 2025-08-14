'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Loader2,
  Zap,
  Globe
} from 'lucide-react';
import { enhancedAuditUrlAction, type EnhancedAuditState } from '@/app/actions';
import { EnhancedAuditReport } from '@/components/enhanced-audit-report';

export default function EnhancedAuditResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const url = searchParams.get('url');
  const userAgent = searchParams.get('userAgent') || 'gptbot';
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentStage, setCurrentStage] = useState<'cloudflare' | 'ai-eval' | 'report' | 'complete'>('cloudflare');
  const [auditResult, setAuditResult] = useState<EnhancedAuditState>({
    error: null,
    message: null,
    data: null,
  });

  useEffect(() => {
    console.log('Enhanced Audit Results - Component mounted', { url, userAgent });
    
    if (!url) {
      console.log('Enhanced Audit Results - No URL provided, redirecting');
      router.push('/dashboard/audit/enhanced');
      return;
    }

    // Run the enhanced audit
    const runAudit = async () => {
      console.log('Enhanced Audit Results - Starting audit', { url, userAgent });
      setIsLoading(true);
      setCurrentStage('cloudflare');
      
      const formData = new FormData();
      formData.append('url', url);
      formData.append('userAgent', userAgent);
      
      console.log('Enhanced Audit Results - FormData created', {
        url: formData.get('url'),
        userAgent: formData.get('userAgent')
      });
      
      try {
        console.log('Enhanced Audit Results - Calling server action');
        console.log('Enhanced Audit Results - About to call enhancedAuditUrlAction...');
        
        // Test if the function exists
        if (typeof enhancedAuditUrlAction !== 'function') {
          throw new Error('enhancedAuditUrlAction is not a function');
        }
        
        // Simulate progress updates
        setTimeout(() => setCurrentStage('ai-eval'), 2000);
        setTimeout(() => setCurrentStage('report'), 4000);
        
        const result = await enhancedAuditUrlAction(auditResult, formData);
        console.log('Enhanced Audit Results - Server action completed', result);
        
        // Debug: Check the actual data structure
        if (result.data) {
          console.log('=== CLIENT-SIDE DATA DEBUG ===');
          console.log('Overall score:', result.data.overall_score);
          console.log('Verdict:', result.data.verdict);
          console.log('Summary:', result.data.summary);
          console.log('Categories:', Object.keys(result.data.categories));
          console.log('Technical insights:', result.data.technical_insights);
          
          // Check if this looks like real data or fallback
          const wordCount = result.data.technical_insights?.contentStructure?.wordCount;
          const hasRealData = wordCount && wordCount > 0;
          console.log('Has real data (wordCount > 0):', hasRealData);
          
          // Debug: Check what type of fallback data we're getting
          if (!hasRealData) {
            console.log('=== FALLBACK DATA ANALYSIS ===');
            console.log('Word count:', wordCount);
            console.log('Content structure:', result.data.technical_insights?.contentStructure);
            console.log('This appears to be fallback data (all zeros)');
          }
        }
        setCurrentStage('complete');
        setAuditResult(result);
      } catch (error) {
        console.error('Enhanced Audit Results - Server action failed', error);
        console.error('Enhanced Audit Results - Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          type: error instanceof Error ? error.constructor.name : 'Unknown'
        });
        setAuditResult({
          error: null,
          message: 'Failed to perform enhanced audit. Please try again later.',
          data: null,
        });
      } finally {
        setIsLoading(false);
      }
    };

    runAudit();
  }, [url, userAgent, router]);

  if (!url) {
    return null; // Will redirect
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/95 backdrop-blur-sm z-50">
        <main className="flex flex-col items-center justify-center p-4 w-full max-w-md">
          <div className="text-center space-y-6">
          {/* Loading Icon */}
          <div className="relative">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg mx-auto w-fit">
              <Zap className="h-12 w-12" />
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-xl animate-pulse" />
          </div>

          {/* Loading Text */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold gradient-text">
              {currentStage === 'cloudflare' && 'Analyzing Your Content'}
              {currentStage === 'ai-eval' && 'Evaluating with AI'}
              {currentStage === 'report' && 'Generating Report'}
              {currentStage === 'complete' && 'Analysis Complete'}
            </h2>
            <p className="text-muted-foreground">
              {currentStage === 'cloudflare' && 'Fetching technical data from Cloudflare Worker...'}
              {currentStage === 'ai-eval' && 'Processing with Google Gemini AI...'}
              {currentStage === 'report' && 'Compiling detailed analysis...'}
              {currentStage === 'complete' && 'Preparing your results...'}
            </p>
            <div className="flex items-center gap-2 text-sm bg-muted/30 rounded-lg p-3">
              <Globe className="h-4 w-4 text-primary" />
              <span className="font-medium truncate">{url}</span>
            </div>
          </div>

          {/* Loading Steps */}
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
              currentStage === 'cloudflare' 
                ? 'bg-blue-50/50 border-blue-200 shadow-sm' 
                : currentStage === 'ai-eval' || currentStage === 'report' || currentStage === 'complete'
                ? 'bg-green-50/50 border-green-200'
                : 'bg-blue-50/50 border-blue-200'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                currentStage === 'cloudflare' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-green-500 text-white'
              }`}>
                {currentStage === 'cloudflare' ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-3 w-3" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={currentStage === 'cloudflare' ? 'text-blue-700 font-medium' : 'text-green-700'}>
                  Cloudflare Worker analysis
                </span>
                {currentStage === 'cloudflare' && (
                  <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                )}
              </div>
            </div>
            
            <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
              currentStage === 'ai-eval' 
                ? 'bg-purple-50/50 border-purple-200 shadow-sm' 
                : currentStage === 'report' || currentStage === 'complete'
                ? 'bg-green-50/50 border-green-200'
                : 'bg-purple-50/50 border-purple-200 opacity-50'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                currentStage === 'ai-eval' 
                  ? 'bg-purple-500 text-white' 
                  : currentStage === 'report' || currentStage === 'complete'
                  ? 'bg-green-500 text-white'
                  : 'bg-purple-500 text-white opacity-50'
              }`}>
                {currentStage === 'ai-eval' ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : currentStage === 'report' || currentStage === 'complete' ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  '2'
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={currentStage === 'ai-eval' ? 'text-purple-700 font-medium' : currentStage === 'report' || currentStage === 'complete' ? 'text-green-700' : 'text-muted-foreground'}>
                  AI evaluation
                </span>
                {currentStage === 'ai-eval' && (
                  <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                )}
              </div>
            </div>
            
            <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
              currentStage === 'report' 
                ? 'bg-emerald-50/50 border-emerald-200 shadow-sm' 
                : currentStage === 'complete'
                ? 'bg-green-50/50 border-green-200'
                : 'bg-emerald-50/50 border-emerald-200 opacity-50'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                currentStage === 'report' 
                  ? 'bg-emerald-500 text-white' 
                  : currentStage === 'complete'
                  ? 'bg-green-500 text-white'
                  : 'bg-emerald-500 text-white opacity-50'
              }`}>
                {currentStage === 'report' ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : currentStage === 'complete' ? (
                  <CheckCircle2 className="h-3 w-3" />
                ) : (
                  '3'
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className={currentStage === 'report' ? 'text-emerald-700 font-medium' : currentStage === 'complete' ? 'text-green-700' : 'text-muted-foreground'}>
                  Report generation
                </span>
                {currentStage === 'report' && (
                  <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                )}
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            This may take 30-60 seconds depending on your content complexity.
          </p>
        </div>
      </main>
        </div>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-8 p-4 lg:gap-10 lg:p-8 max-w-7xl mx-auto">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.push('/dashboard/audit/enhanced')}
          className="hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          New Audit
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Enhanced LLMO Audit Results</h1>
          <p className="text-muted-foreground">Advanced technical analysis completed</p>
        </div>
      </div>

      {/* Error State */}
      {auditResult.message && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {auditResult.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {auditResult.data && (
        <div className="space-y-6">
          <div className="flex items-center justify-center mb-6">
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 px-4 py-2 text-sm">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Enhanced Analysis Complete
            </Badge>
          </div>
          
          <EnhancedAuditReport result={auditResult.data} url={url} userAgent={userAgent} />
        </div>
      )}

      {/* No Results State */}
      {!auditResult.data && !auditResult.message && (
        <div className="text-center py-12">
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-muted/50 text-muted-foreground mx-auto w-fit">
              <AlertCircle className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">No Results Available</h3>
              <p className="text-muted-foreground">
                The audit completed but no results were generated.
              </p>
            </div>
            <Button 
              onClick={() => router.push('/dashboard/audit/enhanced')}
              className="btn-gradient"
            >
              Try Again
            </Button>
          </div>
        </div>
      )}
    </main>
  );
} 