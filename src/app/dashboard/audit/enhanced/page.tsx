'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  Sparkles, 
  AlertCircle, 
  Globe,
  ArrowRight,
  Zap
} from 'lucide-react';

interface UserAgent {
  value: string;
  label: string;
  description: string;
  badge?: string;
}

const userAgents = [
  { 
    value: 'llm-comprehensive', 
    label: '🤖 Overall LLM Audit', 
    description: 'Comprehensive analysis across all major AI models',
    badge: 'Recommended'
  },
  { 
    value: 'gptbot', 
    label: 'GPTBot (OpenAI)', 
    description: 'Optimize for ChatGPT citations' 
  },
  { 
    value: 'perplexitybot', 
    label: 'PerplexityBot', 
    description: 'Perplexity AI crawler optimization' 
  },
  { 
    value: 'claude-web', 
    label: 'Claude-Web (Anthropic)', 
    description: 'Anthropic Claude AI optimization' 
  },
  { 
    value: 'gemini', 
    label: 'Google-Extended (Gemini)', 
    description: 'Google AI models optimization' 
  }
];

export default function EnhancedAuditPage() {
  const router = useRouter();
  const [selectedUserAgent, setSelectedUserAgent] = useState('llm-comprehensive');
  const [url, setUrl] = useState('');
  const [errors, setErrors] = useState<{url?: string[]}>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate URL
    try {
      new URL(url);
      setErrors({});
      
      // Navigate to results page
      const searchParams = new URLSearchParams({
        url: url,
        userAgent: selectedUserAgent
      });
      
      router.push(`/dashboard/audit/enhanced/results?${searchParams.toString()}`);
    } catch (error) {
      setErrors({ url: ['Please enter a valid URL.'] });
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-6 p-4 lg:gap-8 lg:p-8 max-w-3xl mx-auto">
      {/* Clean Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center mb-2">
          <div className="p-2 rounded-xl bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400">
            <Zap className="h-6 w-6" />
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground dark:text-white">
          LLMO Audit
        </h1>
        <p className="text-muted-foreground dark:text-gray-400 max-w-xl mx-auto">
          Analyze your content's optimization for AI models and search engines
        </p>
      </div>

      {/* Main Form Card */}
      <Card className="border border-border/50 dark:border-gray-600/50 shadow-lg dark:shadow-gray-900/20">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
              <label htmlFor="url" className="text-sm font-medium text-foreground dark:text-gray-200 flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                Website URL
              </label>
              <Input
                id="url"
                name="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/blog-post"
                required
                className="h-12 text-base border-border/50 dark:border-gray-600/50 focus:border-primary dark:focus:border-blue-400 transition-colors"
              />
              {errors.url && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.url[0]}</p>
              )}
            </div>

            {/* User Agent Selection */}
            <div className="space-y-2">
              <label htmlFor="userAgent" className="text-sm font-medium text-foreground dark:text-gray-200 flex items-center gap-2">
                <Brain className="h-4 w-4 text-muted-foreground" />
                AI Model Focus
              </label>
              <Select value={selectedUserAgent} onValueChange={setSelectedUserAgent} name="userAgent">
                <SelectTrigger className="h-12 border-border/50 dark:border-gray-600/50 focus:border-primary dark:focus:border-blue-400">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border/50 dark:border-gray-600/50">
                  {userAgents.map((agent: UserAgent) => (
                    <SelectItem key={agent.value} value={agent.value} className="py-3">
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-foreground dark:text-gray-200">{agent.label}</span>
                          <span className="text-sm text-muted-foreground dark:text-gray-400">{agent.description}</span>
                        </div>
                        {agent.badge && (
                          <Badge variant="secondary" className="ml-2 text-xs bg-primary/10 text-primary dark:bg-blue-900/30 dark:text-blue-400">
                            {agent.badge}
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground dark:text-gray-400">
                Choose which AI model to optimize for
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full h-12 bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium transition-colors group"
              >
                <Brain className="mr-2 h-4 w-4" />
                Start Analysis
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Quick Info */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground dark:text-gray-400">
          Analysis includes technical crawling, schema detection, and AI optimization recommendations
        </p>
      </div>
    </main>
  );
} 