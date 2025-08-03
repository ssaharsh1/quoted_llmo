'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
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
    <main className="flex flex-1 h-full p-6">
      <div className="grid grid-cols-12 gap-6 w-full">
        {/* Left Section - Header */}
        <div className="col-span-4 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400">
                <Zap className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold text-foreground dark:text-white">
                LLMO Audit
              </h1>
            </div>
            <p className="text-lg text-muted-foreground dark:text-gray-400">
              Analyze your content's optimization for AI models and search engines
            </p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="col-span-8">
          <Card className="h-full border border-border/50 dark:border-gray-600/50 shadow-lg dark:shadow-gray-900/20">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* URL Input */}
                <div className="space-y-3">
                  <label htmlFor="url" className="text-base font-medium text-foreground dark:text-gray-200 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-muted-foreground" />
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
                    className="h-14 text-lg border-border/50 dark:border-gray-600/50 focus:border-primary dark:focus:border-blue-400 transition-colors"
                  />
                  {errors.url && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">{errors.url[0]}</p>
                  )}
                </div>

                {/* User Agent Selection */}
                <div className="space-y-3 pt-4">
                  <label htmlFor="userAgent" className="text-base font-medium text-foreground dark:text-gray-200 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-muted-foreground" />
                    AI Model Focus
                  </label>
                  <Select value={selectedUserAgent} onValueChange={setSelectedUserAgent} name="userAgent">
                    <SelectTrigger className="h-14 text-lg border-border/50 dark:border-gray-600/50 focus:border-primary dark:focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-border/50 dark:border-gray-600/50">
                      {userAgents.map((agent: UserAgent) => (
                        <SelectItem key={agent.value} value={agent.value} className="py-4">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex flex-col items-start">
                              <span className="font-medium text-base text-foreground dark:text-gray-200">{agent.label}</span>
                              <span className="text-sm text-muted-foreground dark:text-gray-400 mt-1">{agent.description}</span>
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
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                    Choose which AI model to optimize for
                  </p>
                </div>

                {/* Submit Button */}
                <div className="pt-8">
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium transition-colors group"
                  >
                    <Brain className="mr-2 h-5 w-5" />
                    Start Analysis
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Quick Info */}
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    Analysis includes technical crawling, schema detection, and AI optimization recommendations
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
} 