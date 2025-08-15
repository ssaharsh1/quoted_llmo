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
    <main className="flex flex-1 h-full p-3 sm:p-4 lg:p-6">
      <div className="w-full max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Section - Header */}
          <div className="lg:col-span-4 flex flex-col justify-center text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3">
                <div className="p-2 sm:p-3 rounded-xl bg-primary/10 dark:bg-blue-900/30 text-primary dark:text-blue-400">
                  <Zap className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white">
                  LLMO Audit
                </h1>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground dark:text-gray-400">
                Analyze your content's optimization for AI models and search engines
              </p>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="lg:col-span-8">
            <Card className="h-full border border-border/50 dark:border-gray-600/50 shadow-lg dark:shadow-gray-900/20">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* URL Input */}
                  <div className="space-y-2 sm:space-y-3">
                    <label htmlFor="url" className="text-sm sm:text-base font-medium text-foreground dark:text-gray-200 flex items-center gap-2">
                      <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
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
                      className="h-12 sm:h-14 text-base sm:text-lg border-border/50 dark:border-gray-600/50 focus:border-primary dark:focus:border-blue-400 transition-colors"
                    />
                    {errors.url && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-2">{errors.url[0]}</p>
                    )}
                  </div>

                  {/* User Agent Selection */}
                  <div className="space-y-2 sm:space-y-3 pt-2 sm:pt-4">
                    <label htmlFor="userAgent" className="text-sm sm:text-base font-medium text-foreground dark:text-gray-200 flex items-center gap-2">
                      <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                      AI Model Focus
                    </label>
                    <Select value={selectedUserAgent} onValueChange={setSelectedUserAgent} name="userAgent">
                      <SelectTrigger className="h-12 sm:h-14 text-base sm:text-lg border-border/50 dark:border-gray-600/50 focus:border-primary dark:focus:border-blue-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-border/50 dark:border-gray-600/50">
                        {userAgents.map((agent: UserAgent) => (
                          <SelectItem key={agent.value} value={agent.value} className="py-3 sm:py-4">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex flex-col items-start">
                                <span className="font-medium text-sm sm:text-base text-foreground dark:text-gray-200">{agent.label}</span>
                                <span className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400 mt-1">{agent.description}</span>
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
                    <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400 mt-1">
                      Choose which AI model to optimize for
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 sm:pt-8">
                    <Button 
                      type="submit" 
                      className="w-full h-12 sm:h-14 text-base sm:text-lg bg-primary hover:bg-primary/90 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium transition-colors group"
                    >
                      <Brain className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Start Analysis
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>

                  {/* Quick Info */}
                  <div className="mt-2 sm:mt-4">
                    <p className="text-xs sm:text-sm text-muted-foreground dark:text-gray-400">
                      Analysis includes technical crawling, schema detection, and AI optimization recommendations
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
} 